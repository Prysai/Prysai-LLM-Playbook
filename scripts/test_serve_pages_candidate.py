"""Regression checks for the bounded local Pages-candidate preview server."""

from __future__ import annotations

import functools
import http.client
import sys
import threading
from pathlib import Path
from tempfile import TemporaryDirectory


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from serve_pages_candidate import CandidateArtifactHandler  # noqa: E402
from serve_pages_candidate import main as serve_main  # noqa: E402
from build_pages_artifact import build  # noqa: E402
from http.server import ThreadingHTTPServer  # noqa: E402


def fetch(port: int, path: str) -> tuple[int, str]:
    connection = http.client.HTTPConnection("127.0.0.1", port, timeout=3)
    connection.request("GET", path)
    response = connection.getresponse()
    body = response.read().decode("utf-8", errors="replace")
    connection.close()
    return response.status, body


def main() -> int:
    # Verify the CLI server opts into daemon workers, so a slow local client
    # cannot keep the preview process alive after the user stops it.
    class InspectingServer(ThreadingHTTPServer):
        def serve_forever(self, poll_interval: float = 0.5) -> None:
            if not self.daemon_threads:
                raise AssertionError("preview worker threads are not daemon threads")
            raise KeyboardInterrupt

    import serve_pages_candidate

    with TemporaryDirectory(prefix="pages-candidate-cli-") as temporary:
        artifact = Path(temporary) / "artifact"
        build(artifact)
        original_server = serve_pages_candidate.http.server.ThreadingHTTPServer
        original_output = serve_pages_candidate.DEFAULT_OUTPUT
        original_args = sys.argv
        serve_pages_candidate.http.server.ThreadingHTTPServer = InspectingServer
        serve_pages_candidate.DEFAULT_OUTPUT = artifact
        sys.argv = ["serve_pages_candidate.py", "--skip-build", "--port", "4174"]
        try:
            if serve_main() != 0:
                raise AssertionError("preview CLI did not exit cleanly after shutdown")
            (artifact / ".nojekyll").unlink()
            try:
                serve_main()
            except SystemExit as exc:
                if "not a valid Pages candidate" not in str(exc):
                    raise AssertionError("invalid --skip-build artifact was not rejected") from exc
            else:
                raise AssertionError("invalid --skip-build artifact was served")
        finally:
            sys.argv = original_args
            serve_pages_candidate.DEFAULT_OUTPUT = original_output
            serve_pages_candidate.http.server.ThreadingHTTPServer = original_server

    with TemporaryDirectory(prefix="pages-candidate-preview-") as temporary:
        artifact = Path(temporary) / "artifact"
        artifact.mkdir()
        (artifact / "index.html").write_text("<h1>Candidate preview</h1>", encoding="utf-8")
        (artifact / "no-index").mkdir()
        outside_secret = artifact.parent / "outside-secret.txt"
        outside_secret.write_text("must not be served", encoding="utf-8")

        handler = functools.partial(CandidateArtifactHandler, directory=str(artifact))
        server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            address, port = server.server_address[:2]
            if address != "127.0.0.1":
                raise AssertionError(f"preview bound to {address}, not loopback")
            status, body = fetch(port, "/")
            if status != 200 or "Candidate preview" not in body:
                raise AssertionError("candidate artifact root was not served")
            status, _ = fetch(port, "/no-index/")
            if status != 404:
                raise AssertionError(f"directory listing was exposed with status {status}")
            status, body = fetch(port, "/%2e%2e/outside-secret.txt")
            if status == 200 or "must not be served" in body:
                raise AssertionError("path traversal escaped the candidate artifact")
        finally:
            server.shutdown()
            thread.join(timeout=3)
            server.server_close()

    print("PAGES_CANDIDATE_PREVIEW_TESTS_OK loopback=1 listing=disabled traversal=blocked workers=daemon")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
