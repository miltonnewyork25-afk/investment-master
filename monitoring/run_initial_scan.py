#!/usr/bin/env python3
"""
初始批量扫描脚本
Run initial scan on key markdown files to populate dashboard
"""

import subprocess
import sys
from pathlib import Path

# 重点扫描的文件
KEY_FILES = [
    "Tesla_Analysis_Report_v8.0_Part1_Data_Revolution.md",
    "Tesla_v8.0_Part2_Framework_Innovations.md",
    "Tesla_v8.0_Part4_Psychological_Innovations.md",
    "CLAUDE_v7.0_Framework_Design.md",
    "Tesla_v9.0_Complete_Professional_Report.md",
    "Tesla_v9.0_Data_Integrity_Audit.md",
]

def main():
    base_path = Path("/Users/milton/投资大师")

    print("="*80)
    print("开始批量扫描关键文件...")
    print("="*80)

    success_count = 0
    fail_count = 0

    for file_name in KEY_FILES:
        file_path = base_path / file_name

        if not file_path.exists():
            print(f"\n⚠️ 文件不存在，跳过: {file_name}")
            fail_count += 1
            continue

        print(f"\n{'='*80}")
        print(f"扫描 [{success_count + 1}/{len(KEY_FILES)}]: {file_name}")
        print(f"{'='*80}")

        try:
            result = subprocess.run(
                ["python3", "data_integrity_monitor_v2.0.py", str(file_path)],
                cwd=str(base_path),
                capture_output=False,
                timeout=120
            )

            if result.returncode == 0:
                success_count += 1
                print(f"✅ 扫描完成: {file_name}")
            else:
                fail_count += 1
                print(f"❌ 扫描失败: {file_name}")

        except subprocess.TimeoutExpired:
            fail_count += 1
            print(f"⏱️ 超时: {file_name}")
        except Exception as e:
            fail_count += 1
            print(f"❌ 错误: {file_name} - {e}")

    print(f"\n{'='*80}")
    print("批量扫描完成")
    print(f"{'='*80}")
    print(f"成功: {success_count}/{len(KEY_FILES)}")
    print(f"失败: {fail_count}/{len(KEY_FILES)}")
    print(f"\n查看结果:")
    print(f"  - 质量仪表盘: Quality_Dashboard.md")
    print(f"  - 修正建议: Auto_Fix_Suggestions.md")
    print(f"  - 各文件JSON报告: *_quality_report_v2.json")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
