#!/usr/bin/env python3
"""
IntelligenceEngine v10 安装脚本
"""

from setuptools import setup, find_packages
from pathlib import Path

# 读取README
readme_file = Path(__file__).parent / "README.md"
long_description = readme_file.read_text(encoding='utf-8') if readme_file.exists() else ""

# 读取依赖
requirements_file = Path(__file__).parent / "requirements.txt"
requirements = []
if requirements_file.exists():
    with open(requirements_file, 'r', encoding='utf-8') as f:
        requirements = [
            line.strip()
            for line in f
            if line.strip() and not line.startswith('#')
        ]

setup(
    name="intelligence-engine",
    version="10.0.0",
    author="Investment Research Team",
    author_email="research@example.com",
    description="可复用的投资情报自动化系统 - 6大引擎监控SEC/情绪/供应链/期权/竞品/财报",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/intelligence-engine",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Financial and Insurance Industry",
        "Topic :: Office/Business :: Financial :: Investment",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
    python_requires=">=3.9",
    install_requires=requirements,
    entry_points={
        'console_scripts': [
            'intelligence-engine=main:main',
        ],
    },
    include_package_data=True,
    package_data={
        '': ['*.yaml', '*.yml', '*.txt'],
    },
    zip_safe=False,
    keywords=[
        'investment',
        'research',
        'automation',
        'SEC',
        'sentiment',
        'supply chain',
        'options',
        'earnings',
        'financial intelligence'
    ],
    project_urls={
        'Documentation': 'https://intelligence-engine.readthedocs.io/',
        'Source': 'https://github.com/yourusername/intelligence-engine',
        'Tracker': 'https://github.com/yourusername/intelligence-engine/issues',
    },
)
