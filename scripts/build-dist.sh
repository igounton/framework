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
  mkdir -p "$TARGET"
  cd "$TARGET"
  "$CLI" setup --path "$FRAMEWORK_ROOT" --docs-dir aidd_docs --ai "$tool" --ide vscode
  cd "$FRAMEWORK_ROOT"
done
