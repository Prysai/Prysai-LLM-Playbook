"""Build and locally serve only the bounded Pages candidate artifact."""

from __future__ import annotations

import argparse
import functools
import http.server
import subprocess
import sys
from http import HTTPStatus
from pathlib import Path

from build_pages_artifact import validate_artifact


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "_site"


class CandidateArtifactHandler(http.server.SimpleHTTPRequestHandler):
    """Serve files from the bounded artifact without directory listings."""

    def list_directory(self, path: str):  # type: ignore[override]
        self.send_error(HTTPStatus.NOT_FOUND, "Directory listings are disabled")
        return None


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build and serve the bounded Pages candidate on 127.0.0.1."
    )
    parser.add_argument("--port", type=int, default=4173, help="local TCP port (default: 4173)")
    parser.add_argument("--skip-build", action="store_true", help="serve an existing _site artifact without rebuilding it")
    return parser.parse_args()


def build_artifact() -> None:
    result = subprocess.run(
        [sys.executable, "scripts/build_pages_artifact.py", "--output", str(DEFAULT_OUTPUT)],
        cwd=ROOT,
        check=False,
    )
    if result.returncode:
        raise SystemExit(result.returncode)


def main() -> int:
    args = parse_args()
    if not 1 <= args.port <= 65535:
        raise SystemExit("--port must be between 1 and 65535")
    if not args.skip_build:
        build_artifact()
    if not DEFAULT_OUTPUT.is_dir():
        raise SystemExit("_site artifact is missing; run without --skip-build")
    try:
        validate_artifact(DEFAULT_OUTPUT)
    except (OSError, UnicodeError, ValueError) as exc:
        raise SystemExit(f"_site artifact is not a valid Pages candidate: {exc}") from exc

    handler = functools.partial(CandidateArtifactHandler, directory=str(DEFAULT_OUTPUT))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    server.daemon_threads = True
    print(f"SERVING_PAGES_CANDIDATE http://127.0.0.1:{args.port}/ root={DEFAULT_OUTPUT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nSTOPPED_PAGES_CANDIDATE")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
