"""Statically validate standalone SVG visual assets without rendering them."""

from __future__ import annotations

import re
from pathlib import Path
from urllib.parse import unquote
from xml.parsers import expat


SVG_NAMESPACE = "http://www.w3.org/2000/svg"
XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace"
MAX_SVG_BYTES = 5 * 1024 * 1024
FORBIDDEN_ELEMENTS = {
    "script",
    "foreignobject",
    "iframe",
    "object",
    "embed",
    "handler",
    "listener",
    "link",
    "audio",
    "video",
    "animate",
    "animatemotion",
    "animatetransform",
    "set",
    "discard",
}
URI_ATTRIBUTES = {"href", "src", "data", "poster", "action", "formaction", "base"}
URI_SCHEME_RE = re.compile(r"^[a-z][a-z0-9+.-]*:", re.I)
CSS_COMMENT_RE = re.compile(r"/\*.*?\*/", re.S)
CSS_LINE_CONTINUATION_RE = re.compile(r"\\(?:\r\n|[\n\r\f])")
CSS_ESCAPE_RE = re.compile(r"\\([0-9a-fA-F]{1,6})(?:\s)?|\\(.)", re.S)
CSS_URL_RE = re.compile(r"\burl\s*\(\s*(['\"]?)(.*?)\1\s*\)", re.I | re.S)
CSS_IMPORT_RE = re.compile(
    r"@import\s+(?:url\s*\(\s*)?(['\"]?)([^'\"\s;)]+)\1",
    re.I,
)


class _RejectedDeclaration(Exception):
    pass


def _local_name(name: str) -> str:
    return name.rsplit("}", 1)[-1].rsplit(":", 1)[-1].casefold()


def _expanded_name(name: str) -> tuple[str, str]:
    if "}" in name:
        namespace, local = name.rsplit("}", 1)
        return namespace, local.casefold()
    return "", name.rsplit(":", 1)[-1].casefold()


def _decode_css_escapes(text: str) -> str:
    def replace(match: re.Match[str]) -> str:
        if match.group(1) is not None:
            codepoint = int(match.group(1), 16)
            return chr(codepoint) if codepoint <= 0x10FFFF else ""
        return match.group(2) or ""

    without_comments = CSS_COMMENT_RE.sub("", text)
    without_continuations = CSS_LINE_CONTINUATION_RE.sub("", without_comments)
    return CSS_ESCAPE_RE.sub(replace, without_continuations)


def _is_external_or_active_uri(value: str) -> bool:
    stripped = value.strip()
    if not stripped:
        return False
    if "\\" in stripped or any(ord(character) <= 0x20 for character in stripped):
        return True
    if stripped.startswith("/") or URI_SCHEME_RE.match(stripped) is not None:
        return True
    local_path = stripped.split("#", 1)[0].split("?", 1)[0]
    for _ in range(2):
        local_path = unquote(local_path)
    return ".." in Path(local_path).parts


def _css_has_external_or_active_uri(text: str) -> bool:
    normalized = _decode_css_escapes(text)
    targets = [match.group(2) for match in CSS_URL_RE.finditer(normalized)]
    targets.extend(match.group(2) for match in CSS_IMPORT_RE.finditer(normalized))
    return any(_is_external_or_active_uri(target) for target in targets)


def svg_text_issues(text: str) -> list[str]:
    reasons: set[str] = set()
    element_stack: list[str] = []
    style_buffers: list[list[str]] = []
    root_seen = False
    parser = expat.ParserCreate(namespace_separator="}")
    parser.SetParamEntityParsing(expat.XML_PARAM_ENTITY_PARSING_NEVER)

    def reject_declaration() -> None:
        reasons.add("SVG must not contain DOCTYPE or entity declarations")
        raise _RejectedDeclaration

    def start_element(name: str, attributes: dict[str, str]) -> None:
        nonlocal root_seen
        namespace, local = _expanded_name(name)
        if not root_seen:
            root_seen = True
            if local != "svg":
                reasons.add("SVG root element must be <svg>")
            if namespace != SVG_NAMESPACE:
                reasons.add("SVG root element must use the SVG namespace")
        elif namespace != SVG_NAMESPACE:
            reasons.add("SVG must not contain foreign-namespace elements")
        element_stack.append(local)
        if local in FORBIDDEN_ELEMENTS:
            reasons.add(f"SVG must not contain <{local}> elements")
        if local == "style":
            style_buffers.append([])
        for raw_name, value in attributes.items():
            attribute_namespace, attribute = _expanded_name(raw_name)
            if attribute.startswith("on"):
                reasons.add("SVG must not contain event-handler attributes")
            if attribute_namespace == XML_NAMESPACE and attribute == "base":
                reasons.add("SVG must not use xml:base")
            if attribute in URI_ATTRIBUTES and _is_external_or_active_uri(value):
                reasons.add("SVG must not use external, data, or script URIs")
            if _css_has_external_or_active_uri(value):
                reasons.add("SVG CSS must not load external, data, or script resources")

    def end_element(name: str) -> None:
        local = _local_name(name)
        if local == "style" and style_buffers:
            if _css_has_external_or_active_uri("".join(style_buffers.pop())):
                reasons.add("SVG CSS must not load external, data, or script resources")
        if element_stack:
            element_stack.pop()

    def character_data(data: str) -> None:
        if style_buffers:
            style_buffers[-1].append(data)

    def processing_instruction(target: str, data: str) -> None:
        reasons.add("SVG must not contain processing instructions")

    def xml_declaration(version: str, encoding: str | None, standalone: int) -> None:
        if encoding and encoding.casefold().replace("_", "-") not in {"utf-8", "utf8"}:
            reasons.add("SVG XML declarations must specify UTF-8 encoding")

    parser.StartElementHandler = start_element
    parser.EndElementHandler = end_element
    parser.CharacterDataHandler = character_data
    parser.StartDoctypeDeclHandler = lambda *args: reject_declaration()
    parser.EntityDeclHandler = lambda *args: reject_declaration()
    parser.ExternalEntityRefHandler = lambda *args: reject_declaration()
    parser.ProcessingInstructionHandler = processing_instruction
    parser.XmlDeclHandler = xml_declaration
    try:
        parser.Parse(text, True)
    except _RejectedDeclaration:
        pass
    except expat.ExpatError as exc:
        reasons.add(
            f"SVG must be well-formed XML (line {exc.lineno}, column {exc.offset})"
        )
    return sorted(reasons)


def visual_svg_asset_issues(submission_dir: Path) -> list[tuple[str, str]]:
    assets_root = submission_dir / "visual" / "assets"
    if assets_root.is_symlink():
        return [("visual/assets", "visual SVG asset paths must not use symbolic links")]
    if not assets_root.is_dir():
        return []

    issues: list[tuple[str, str]] = []
    try:
        paths = sorted(assets_root.rglob("*"))
    except OSError as exc:
        return [("visual/assets", f"unable to inspect visual SVG assets: {exc}")]
    for path in paths:
        rel_path = path.relative_to(submission_dir).as_posix()
        if path.is_symlink():
            if path.suffix.lower() == ".svg" or path.is_dir():
                issues.append(
                    (rel_path, "visual SVG asset paths must not use symbolic links")
                )
            continue
        if not path.is_file() or path.suffix.lower() != ".svg":
            continue
        try:
            with path.open("rb") as source:
                payload = source.read(MAX_SVG_BYTES + 1)
            if len(payload) > MAX_SVG_BYTES:
                issues.append((rel_path, f"SVG assets must be <= {MAX_SVG_BYTES} bytes"))
                continue
            text = payload.decode("utf-8-sig")
        except UnicodeDecodeError:
            issues.append((rel_path, "SVG assets must be UTF-8 text"))
            continue
        except OSError as exc:
            issues.append((rel_path, f"unable to read visual SVG asset: {exc}"))
            continue
        issues.extend((rel_path, reason) for reason in svg_text_issues(text))
    return issues
