#!/usr/bin/env python3
"""
Direct injection: reads MCP JSON response from stdin, injects into raw file.
Usage: echo '{"data":[...]}' | python3 inject_direct.py SYMBOL key_name
"""
import json
import sys

def main():
    symbol = sys.argv[1]
    key_name = sys.argv[2]
    raw_dir = "/Users/milton/投资大师/data/screener/raw"
    raw_file = f"{raw_dir}/{symbol}.json"

    # Read MCP response from stdin
    mcp = json.load(sys.stdin)
    records = mcp.get("data", [])

    # Read existing
    with open(raw_file, 'r') as f:
        data = json.load(f)

    # Inject
    data[key_name] = records

    # Write back
    with open(raw_file, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"{symbol}/{key_name}: {len(records)} records")

if __name__ == "__main__":
    main()
