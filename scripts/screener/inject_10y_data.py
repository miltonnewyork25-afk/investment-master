#!/usr/bin/env python3
"""
Inject 10-year historical data into screener raw JSON files.
Usage: python3 inject_10y_data.py <symbol> <data_key> <json_file>
  Reads JSON from stdin, extracts .data field, saves as data_key in the target file.
"""
import json
import sys

def main():
    if len(sys.argv) != 4:
        print(f"Usage: {sys.argv[0]} <symbol> <data_key> <json_file>")
        sys.exit(1)

    symbol = sys.argv[1]
    data_key = sys.argv[2]
    json_file = sys.argv[3]

    # Read the MCP response from stdin
    mcp_response = json.load(sys.stdin)

    # Extract the data field (list)
    data_list = mcp_response.get("data", [])

    # Read existing file
    with open(json_file, 'r') as f:
        existing = json.load(f)

    # Add new key
    existing[data_key] = data_list

    # Write back
    with open(json_file, 'w') as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)

    print(f"OK: {symbol} {data_key} -> {len(data_list)} records")

if __name__ == "__main__":
    main()
