from __future__ import annotations

import sys
import unittest
from pathlib import Path
from unittest import mock


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from read_peer_proposals import PeerReaderError, fetch_bytes  # noqa: E402


class FakeResponse:
    def __init__(self, content_length: str, chunks: list[bytes]) -> None:
        self.headers = {"Content-Length": content_length}
        self.chunks = iter(chunks)

    def __enter__(self) -> "FakeResponse":
        return self

    def __exit__(self, *_args: object) -> None:
        return None

    def read(self, _size: int) -> bytes:
        return next(self.chunks, b"")


class ReadPeerProposalsTests(unittest.TestCase):
    def test_malformed_content_length_uses_streamed_size_limit(self) -> None:
        small = FakeResponse("unknown", [b"small", b""])
        with mock.patch("read_peer_proposals.urllib.request.urlopen", return_value=small):
            self.assertEqual(fetch_bytes("https://example.test/small", 10), b"small")

        oversized = FakeResponse("-1", [b"123456", b""])
        with mock.patch("read_peer_proposals.urllib.request.urlopen", return_value=oversized):
            with self.assertRaisesRegex(PeerReaderError, "download exceeded limit"):
                fetch_bytes("https://example.test/oversized", 5)

    def test_malformed_content_length_rejects_oversized_body(self) -> None:
        oversized = FakeResponse("unknown", [b"123456", b""])
        with mock.patch("read_peer_proposals.urllib.request.urlopen", return_value=oversized):
            with self.assertRaisesRegex(PeerReaderError, "download exceeded limit"):
                fetch_bytes("https://example.test/oversized", 5)


if __name__ == "__main__":
    unittest.main()
