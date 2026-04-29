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

MCP_SERVERS=$(node -e "console.log(Object.keys(require('$FRAMEWORK_ROOT/config/mcp.json').mcpServers).join(','))")

for tool in claude cursor copilot opencode codex; do
  TARGET="$FRAMEWORK_ROOT/dist/$tool"
  rm -rf "$TARGET"
  mkdir -p "$TARGET"
  cd "$TARGET"
  "$CLI" setup --path "$FRAMEWORK_ROOT" --docs-dir aidd_docs
  "$CLI" install ai "$tool" --path "$FRAMEWORK_ROOT" --mcp "$MCP_SERVERS" --force
  "$CLI" install ide vscode --path "$FRAMEWORK_ROOT" --force
  cd "$FRAMEWORK_ROOT"
done
