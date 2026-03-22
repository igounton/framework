#!/usr/bin/env bash
set -e

FRAMEWORK_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if command -v aidd &>/dev/null; then
  CLI="aidd"
else
  echo "Error: aidd CLI not found. Install it with: npm install -g @ai-driven-dev/cli" >&2
  exit 1
fi

which aidd && aidd --version

for tool in claude cursor copilot opencode; do
  TARGET="$FRAMEWORK_ROOT/dist/$tool"
  rm -rf "$TARGET"
  mkdir -p "$TARGET/.aidd"
  echo '{"version":1,"docsDir":"aidd_docs","tools":{},"docs":{"version":"0.0.0","files":[]}}' > "$TARGET/.aidd/manifest.json"
  cd "$TARGET"
  "$CLI" install "$tool" --path "$FRAMEWORK_ROOT" --force
  cd "$FRAMEWORK_ROOT"
done
