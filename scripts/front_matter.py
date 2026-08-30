"""Dependency-free parsing for the repository's Markdown front matter."""

import re

BLOCK_SCALARS = {">", ">-", "|", "|-"}


def _block_value(lines: list[str], style: str) -> str:
    nonempty = [line for line in lines if line.strip()]
    indent = min((len(line) - len(line.lstrip()) for line in nonempty), default=0)
    values = [line[indent:] if line.strip() else "" for line in lines]
    if style.startswith("|"):
        value = "\n".join(values)
    else:
        parts: list[str] = []
        previous = ""
        blank_count = 0
        for line in values:
            if not line:
                blank_count += 1
                continue
            if parts:
                if blank_count:
                    separator = "\n" * blank_count
                elif previous.startswith(" ") or line.startswith(" "):
                    separator = "\n"
                else:
                    separator = " "
                parts.append(separator)
            parts.append(line)
            previous = line
            blank_count = 0
        value = "".join(parts)
    value = value.rstrip("\n")
    return value if style.endswith("-") else value + "\n"


def parse_front_matter(text: str) -> tuple[dict[str, str], str]:
    """Parse scalar front matter, including folded and literal block strings."""
    text = text.lstrip("\ufeff\r\n")
    opening = re.match(r"^---[ \t]*\r?\n", text)
    if opening is None:
        return {}, text
    closing = re.search(r"(?m)^---[ \t]*\r?$", text[opening.end() :])
    if closing is None:
        return {}, text
    closing_start = opening.end() + closing.start()
    closing_end = opening.end() + closing.end()
    lines = text[opening.end() : closing_start].splitlines()
    body = text[closing_end:].lstrip("\r\n")
    metadata: dict[str, str] = {}
    index = 0
    while index < len(lines):
        stripped = lines[index].strip()
        index += 1
        if not stripped or stripped.startswith("#") or ":" not in stripped:
            continue
        key, value = stripped.split(":", 1)
        value = value.strip()
        if value in BLOCK_SCALARS:
            block: list[str] = []
            while index < len(lines):
                candidate = lines[index]
                if candidate.strip() and not candidate[:1].isspace():
                    break
                block.append(candidate)
                index += 1
            metadata[key.strip()] = _block_value(block, value)
        else:
            metadata[key.strip()] = value.strip('"').strip("'")
    return metadata, body
