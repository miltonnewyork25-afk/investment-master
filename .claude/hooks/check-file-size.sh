#!/bin/bash
# Post-edit/write hook: warn about large files that may cause "File Too Large" errors
# Reads tool input from stdin JSON

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path',''))" 2>/dev/null)

if [ -n "$FILE_PATH" ] && [ -f "$FILE_PATH" ]; then
  LINE_COUNT=$(wc -l < "$FILE_PATH")
  if [ "$LINE_COUNT" -gt 2000 ]; then
    echo "{\"additionalContext\": \"WARNING: $FILE_PATH has $LINE_COUNT lines (>2000). Consider splitting into smaller files to avoid File Too Large errors. Use offset+limit for future reads.\"}"
  fi
fi

exit 0
