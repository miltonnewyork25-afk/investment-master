#!/usr/bin/env python3
"""
分层缓存管理器 v21.0
基于 Claude Code 架构启示的智能缓存系统
"""

import os
import hashlib
import json
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple

class LayeredCacheManager:
    """分层Prompt缓存管理器"""

    def __init__(self, base_path: str = ".claude/prompt"):
        self.base_path = Path(base_path)
        self.static_path = self.base_path / "static"
        self.dynamic_path = self.base_path / "dynamic"
        self.cache_path = self.base_path / "cache"

        # 确保目录存在
        for path in [self.static_path, self.dynamic_path, self.cache_path]:
            path.mkdir(parents=True, exist_ok=True)

    def calculate_static_cache_key(self) -> str:
        """计算静态内容的缓存键"""
        static_files = [
            "core_identity.md",
            "analysis_framework.md",
            "ironrules_overview.md",
            "session_protocols.md"
        ]

        content_hash = hashlib.md5()
        for file_name in static_files:
            file_path = self.static_path / file_name
            if file_path.exists():
                content_hash.update(file_path.read_bytes())

        return content_hash.hexdigest()[:16]

    def is_static_cache_valid(self, cache_key: str) -> bool:
        """检查静态缓存是否有效"""
        cache_meta_path = self.cache_path / f"{cache_key}_meta.json"

        if not cache_meta_path.exists():
            return False

        try:
            with open(cache_meta_path, 'r') as f:
                meta = json.load(f)

            # 检查缓存是否过期 (24小时)
            cache_time = datetime.fromisoformat(meta['timestamp'])
            if datetime.now() - cache_time > timedelta(hours=24):
                return False

            return True

        except (json.JSONDecodeError, KeyError, ValueError):
            return False

    def generate_static_prompt(self) -> str:
        """生成静态Prompt内容"""
        static_files = [
            "core_identity.md",
            "analysis_framework.md",
            "ironrules_overview.md",
            "session_protocols.md"
        ]

        content_parts = []
        for file_name in static_files:
            file_path = self.static_path / file_name
            if file_path.exists():
                content_parts.append(file_path.read_text(encoding='utf-8'))

        return "\n\n---\n\n".join(content_parts)

    def cache_static_prompt(self, cache_key: str, content: str) -> None:
        """缓存静态Prompt"""
        # 保存内容
        cache_content_path = self.cache_path / f"{cache_key}_static.md"
        cache_content_path.write_text(content, encoding='utf-8')

        # 保存元数据
        cache_meta_path = self.cache_path / f"{cache_key}_meta.json"
        meta = {
            'timestamp': datetime.now().isoformat(),
            'cache_key': cache_key,
            'type': 'static',
            'size': len(content)
        }

        with open(cache_meta_path, 'w') as f:
            json.dump(meta, f, indent=2)

    def get_static_prompt(self) -> Tuple[str, str]:
        """获取静态Prompt (content, cache_key)"""
        cache_key = self.calculate_static_cache_key()

        # 检查缓存
        if self.is_static_cache_valid(cache_key):
            cache_content_path = self.cache_path / f"{cache_key}_static.md"
            if cache_content_path.exists():
                content = cache_content_path.read_text(encoding='utf-8')
                return content, cache_key

        # 生成新内容并缓存
        content = self.generate_static_prompt()
        self.cache_static_prompt(cache_key, content)

        return content, cache_key

    def generate_dynamic_prompt(self, **kwargs) -> str:
        """生成动态Prompt"""
        template_path = self.dynamic_path / "session_context_template.md"

        if not template_path.exists():
            return f"# Session Context\n\nTarget: {kwargs.get('ticker', 'UNKNOWN')}"

        template = template_path.read_text(encoding='utf-8')

        # 替换模板变量
        replacements = {
            'WORKING_DIR': kwargs.get('working_dir', os.getcwd()),
            'GIT_BRANCH': kwargs.get('git_branch', 'main'),
            'PLATFORM': kwargs.get('platform', 'unknown'),
            'CURRENT_DATE': kwargs.get('current_date', datetime.now().strftime('%Y-%m-%d')),
            'TARGET_TICKER': kwargs.get('ticker', ''),
            'TARGET_INDUSTRY': kwargs.get('industry', ''),
            'ANALYSIS_TIER': kwargs.get('tier', 'Tier 1'),
            'CURRENT_PHASE': kwargs.get('phase', 'Phase 0'),
            'ACTIVE_TOOLS_LIST': kwargs.get('tools', ''),
            'CHARACTER_TARGET': kwargs.get('char_target', '~5K'),
            'DM_DENSITY_REQUIREMENT': kwargs.get('dm_density', '≥1.5/千字'),
            'QUALITY_BASELINE': kwargs.get('quality', '4.4分'),
            'TOKEN_BUDGET': kwargs.get('token_budget', '50000'),
            'TIME_BUDGET': kwargs.get('time_budget', '2小时'),
            'SESSION_MODE': kwargs.get('mode', 'collaborative'),
            'SESSION_MEMORY_SUMMARY': kwargs.get('memory', '新会话，暂无工作记忆')
        }

        for key, value in replacements.items():
            template = template.replace(f"{{{key}}}", str(value))

        return template

    def assemble_full_prompt(self, **dynamic_kwargs) -> Dict[str, any]:
        """组装完整的分层Prompt"""
        static_content, cache_key = self.get_static_prompt()
        dynamic_content = self.generate_dynamic_prompt(**dynamic_kwargs)

        # Claude Code风格的boundary marker
        boundary_marker = "\n\n" + "="*50 + " SESSION BOUNDARY " + "="*50 + "\n\n"

        full_prompt = static_content + boundary_marker + dynamic_content

        return {
            'full_prompt': full_prompt,
            'static_content': static_content,
            'dynamic_content': dynamic_content,
            'cache_key': cache_key,
            'static_size': len(static_content),
            'dynamic_size': len(dynamic_content),
            'total_size': len(full_prompt),
            'cache_hit': self.is_static_cache_valid(cache_key)
        }

if __name__ == "__main__":
    # 测试缓存管理器
    manager = LayeredCacheManager()

    result = manager.assemble_full_prompt(
        ticker="AAPL",
        industry="Technology",
        tier="Tier 3",
        phase="Phase 1"
    )

    print(f"Cache Key: {result['cache_key']}")
    print(f"Cache Hit: {result['cache_hit']}")
    print(f"Static Size: {result['static_size']} chars")
    print(f"Dynamic Size: {result['dynamic_size']} chars")
    print(f"Total Size: {result['total_size']} chars")
    print(f"Token Savings: {result['static_size'] if result['cache_hit'] else 0} chars")