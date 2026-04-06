#!/usr/bin/env python3
"""
Harness Integration Script
=========================

将投资harness系统集成到现有框架中的自动化脚本

Version: 1.0
Author: 投资大师 Framework v19.9+
"""

import os
import sys
import shutil
from pathlib import Path
from typing import List, Dict, Optional

class HarnessIntegrator:
    """Harness集成器"""

    def __init__(self, framework_root: str):
        self.framework_root = Path(framework_root)
        self.harness_dir = self.framework_root / ".claude" / "harness"
        self.scripts_dir = self.framework_root / "scripts"
        self.skills_dir = self.framework_root / ".claude" / "skills"

        # 确保路径存在
        if not self.framework_root.exists():
            raise ValueError(f"Framework root not found: {framework_root}")

    def integrate_launch_script(self) -> bool:
        """集成启动脚本"""
        print("🚀 Integrating harness into launch scripts...")

        # 创建harness集成版本的tier3_launch.sh
        harness_launch_script = """#!/bin/bash
# Tier 3 Analysis Launch with Harness Integration
# Version: v19.9+ with Investment Harness

set -e

TICKER="${1}"
INDUSTRY="${2}"
MODE="${3:-production}"

if [ -z "$TICKER" ] || [ -z "$INDUSTRY" ]; then
    echo "Usage: $0 <TICKER> <INDUSTRY> [MODE]"
    echo "MODE: development|production|cost_optimized|research_intensive"
    exit 1
fi

echo "🎯 Starting Tier 3 Analysis with Investment Harness"
echo "Ticker: $TICKER"
echo "Industry: $INDUSTRY"
echo "Harness Mode: $MODE"

# 1. Initialize harness
echo "📊 Initializing Investment Harness..."
python3 -c "
import sys
sys.path.append('.')
from claude.harness import create_investment_harness
from claude.harness.config import load_config

# Create harness with specified mode
config = load_config('${MODE}')
harness = create_investment_harness('${TICKER}', 'tier_3_deep')

# Save harness session info
session_info = harness.get_current_status()
print(f'Harness initialized: {session_info}')

# Create harness context file for Claude to read
import json
with open('reports/${TICKER}/data/harness_context.json', 'w') as f:
    json.dump({
        'session_id': session_info['session_id'],
        'harness_mode': '${MODE}',
        'ticker': '${TICKER}',
        'initialization_time': session_info.get('initialization_time', ''),
        'cost_monitoring': True,
        'uncertainty_handling': True,
        'compliance_checking': True,
        'regime_detection': True
    }, f, indent=2)
"

# 2. Execute original tier3_launch.sh logic with harness context
echo "🔧 Running original analysis pipeline with harness supervision..."

# Create reports directory if it doesn't exist
mkdir -p "reports/${TICKER}/data"

# Run the original tier3_launch.sh but with harness context
bash scripts/tier3_launch_original.sh "${TICKER}" "${INDUSTRY}"

echo "✅ Tier 3 Analysis with Harness completed successfully"
echo "📋 Check reports/${TICKER}/data/harness_context.json for harness session details"
"""

        # 备份原始脚本
        original_script = self.scripts_dir / "tier3_launch.sh"
        backup_script = self.scripts_dir / "tier3_launch_original.sh"

        if original_script.exists():
            shutil.copy2(original_script, backup_script)
            print(f"✅ Backed up original script to {backup_script}")

        # 写入新的harness集成脚本
        with open(original_script, 'w') as f:
            f.write(harness_launch_script)

        # 设置执行权限
        os.chmod(original_script, 0o755)
        print(f"✅ Created harness-integrated launch script")

        return True

    def create_harness_skill(self) -> bool:
        """创建harness技能"""
        print("🛠️ Creating harness skill...")

        skill_dir = self.skills_dir / "harness-controller"
        skill_dir.mkdir(exist_ok=True)

        skill_content = """# Harness Controller Skill

智能投资harness控制技能，提供四大核心能力：不确定性管理、市场制度检测、成本优化、合规检查。

## 核心功能

### 1. 不确定性处理
- 数据失败时自动fallback
- 分析矛盾转化为预期差机会
- 低置信度情况下的概率加权

### 2. 市场制度感知
- 实时检测市场环境变化
- 动态调整分析权重
- 制度变化的方法论调整

### 3. 成本智能控制
- 基于复杂度的层级路由
- 实时预算监控和预警
- 成本优化建议生成

### 4. 合规风险防护
- 自动检测合规问题
- 生成修正建议
- 披露声明生成

## 使用场景

1. **分析启动时**: 初始化harness环境，评估复杂度，设定预算
2. **工具失败时**: 智能fallback，避免分析中断
3. **Phase完成时**: 质量评估，成本监控，合规检查
4. **最终输出时**: 生成不确定性披露，合规摘要

## 调用方式

```python
# 初始化harness
from claude.harness import create_investment_harness

harness = create_investment_harness("AAPL", "tier_2_standard")

# 处理不确定性
if data_missing:
    result = harness.handle_tool_failure("fmp_data", error_message)

# 追踪进度和成本
progress = harness.track_analysis_progress(phase, tokens, tools)

# 最终检查
compliance = harness.compliance_check(final_content)
```

## 输出特点

- **成本透明**: 每个阶段的token使用和成本估算
- **质量量化**: 置信度评分和不确定性程度
- **合规清单**: 风险点识别和修正建议
- **市场感知**: 当前制度和权重调整建议

---

**注意**: 此技能是框架增强，与现有Phase流程协同工作，不是替代关系。
"""

        skill_file = skill_dir / "SKILL.md"
        with open(skill_file, 'w', encoding='utf-8') as f:
            f.write(skill_content)

        print(f"✅ Created harness skill at {skill_file}")
        return True

    def create_phase_integration_templates(self) -> bool:
        """创建Phase集成模板"""
        print("📝 Creating Phase integration templates...")

        templates_dir = self.harness_dir / "integration_templates"
        templates_dir.mkdir(exist_ok=True)

        # Phase启动模板
        phase_start_template = """# Phase启动时的Harness集成

```python
# 在每个Phase开始前调用
def phase_start_with_harness(phase_name, harness, current_context):
    '''Phase启动时的harness检查和准备'''

    # 1. 检查预算状态
    budget_status = harness.get_current_status()['budget_status']
    if budget_status and budget_status['status'] == 'critical':
        print("⚠️ Budget critical - applying cost optimization")
        optimizations = harness.cost_optimizer.suggest_cost_optimization(
            harness.cost_session_id, phase_name
        )
        for opt in optimizations:
            print(f"  - {opt['suggestion']}")

    # 2. 获取市场制度调整
    market_context = harness.regime_detector.assess_current_regime()
    adjustments = harness.regime_detector.should_adjust_methodology(market_context)
    if adjustments:
        print(f"📈 Market regime: {market_context.current_regime.value}")
        print("Methodology adjustments:")
        for method, adjustment in adjustments.items():
            print(f"  - {method}: {adjustment}")

    # 3. 检查未解决的不确定性
    uncertainty_assessment = harness.uncertainty_manager.assess_overall_analysis_confidence()
    if uncertainty_assessment['overall_confidence'] < 0.5:
        print(f"⚠️ Low analysis confidence: {uncertainty_assessment['overall_confidence']:.1%}")
        print(f"Active uncertainties: {uncertainty_assessment['active_uncertainties']}")

    return {
        'budget_status': budget_status,
        'market_adjustments': adjustments,
        'confidence_level': uncertainty_assessment['overall_confidence']
    }
```
"""

        # Phase完成模板
        phase_end_template = """# Phase完成时的Harness集成

```python
def phase_end_with_harness(phase_name, harness, content, tokens_used, tools_used):
    '''Phase完成时的harness检查和记录'''

    # 1. 追踪进度和成本
    progress = harness.track_analysis_progress(
        phase=phase_name,
        tokens_used=tokens_used,
        tools_called=tools_used
    )

    print(f"📊 Phase {phase_name} completed:")
    print(f"  - Tokens used: {tokens_used:,}")
    print(f"  - Tools called: {len(tools_used)}")
    if 'budget_status' in progress:
        budget = progress['budget_status']
        print(f"  - Budget utilization: {budget['utilization']:.1%}")
        if budget['status'] != 'normal':
            print(f"  - Budget status: {budget['status']}")

    # 2. 质量评估
    if phase_name in ['Phase_4', 'Phase_5']:  # 关键Phase质量检查
        quality = harness.assess_analysis_quality()
        print(f"  - Analysis confidence: {quality['overall_confidence']:.1%}")
        print(f"  - Quality grade: {quality['uncertainty_analysis']['quality_grade']}")

    # 3. 中期合规检查（如有内容）
    if content and len(content) > 10000:  # 超过10K字符时检查
        compliance_preview = harness.compliance_check(content[:5000], f"{phase_name}_preview")
        if compliance_preview['critical_issues'] > 0:
            print(f"⚠️ Compliance issues found: {compliance_preview['critical_issues']} critical")

    return {
        'progress': progress,
        'quality_check': quality if phase_name in ['Phase_4', 'Phase_5'] else None,
        'compliance_preview': compliance_preview if content else None
    }
```
"""

        # 错误处理模板
        error_handling_template = """# 错误处理的Harness集成

```python
def handle_error_with_harness(harness, tool_name, error_details, current_phase):
    '''使用harness处理分析中的错误'''

    print(f"🔧 Harness handling error in {tool_name}: {error_details}")

    # 1. 通过不确定性管理器处理
    recovery_result = harness.handle_tool_failure(tool_name, error_details)

    print(f"Recovery strategy: {recovery_result['recommended_action']}")
    print(f"Available fallbacks: {recovery_result.get('fallback_options', [])}")

    # 2. 如果有fallback选项，尝试执行
    fallback_options = recovery_result.get('fallback_options', [])
    for i, option in enumerate(fallback_options[:2]):  # 尝试前两个fallback
        print(f"Trying fallback {i+1}: {option}")
        # 这里实际执行fallback策略
        # 示例: 如果是数据源失败，切换到备用数据源

    # 3. 记录错误处理到成本追踪
    if harness.cost_session_id:
        harness.cost_optimizer.track_tool_usage(
            harness.cost_session_id, f"{tool_name}_error_recovery"
        )

    return recovery_result

def handle_contradiction_with_harness(harness, analysis_a, analysis_b, severity=0.5):
    '''处理分析矛盾'''

    contradiction_result = harness.handle_analysis_contradiction(
        analysis_a, analysis_b, severity
    )

    if contradiction_result.get('expectation_gap_potential'):
        print("💡 Contradiction identified as potential expectation gap opportunity")
        print("Next steps:")
        for step in contradiction_result.get('next_steps', []):
            print(f"  - {step}")

    return contradiction_result
```
"""

        # 写入模板文件
        templates = {
            "phase_start_integration.md": phase_start_template,
            "phase_end_integration.md": phase_end_template,
            "error_handling_integration.md": error_handling_template
        }

        for filename, content in templates.items():
            template_file = templates_dir / filename
            with open(template_file, 'w', encoding='utf-8') as f:
                f.write(content)

        print(f"✅ Created integration templates in {templates_dir}")
        return True

    def update_claude_md(self) -> bool:
        """更新主CLAUDE.md文件以包含harness信息"""
        print("📋 Updating main CLAUDE.md with harness integration...")

        claude_md = self.framework_root / "CLAUDE.md"
        if not claude_md.exists():
            print("⚠️ Main CLAUDE.md not found, skipping update")
            return False

        # 读取现有内容
        with open(claude_md, 'r', encoding='utf-8') as f:
            content = f.read()

        # 添加harness部分（如果不存在）
        harness_section = """
---

## 投资Harness系统 (v19.9+新增)

**四大核心模块**:
- **不确定性管理**: 数据失败→智能fallback，分析矛盾→预期差机会
- **市场制度检测**: 实时环境感知，动态权重调整
- **成本智能控制**: 复杂度评估，预算监控，优化建议
- **合规风险防护**: 自动检测，修正建议，披露生成

**自动集成点**:
- Tier 3启动时自动初始化harness环境
- 工具失败时自动触发fallback策略
- Phase完成时自动成本追踪和质量评估
- 最终输出时自动合规检查

**使用方式**:
```bash
# 启动时指定harness模式
bash scripts/tier3_launch.sh AAPL TECHNOLOGY production
# 模式: development|production|cost_optimized|research_intensive
```

详见: `.claude/harness/README.md`
"""

        if "投资Harness系统" not in content:
            # 在文档末尾添加harness部分
            content += harness_section

            with open(claude_md, 'w', encoding='utf-8') as f:
                f.write(content)

            print("✅ Added harness section to main CLAUDE.md")
        else:
            print("ℹ️ Harness section already exists in CLAUDE.md")

        return True

    def create_python_path_setup(self) -> bool:
        """创建Python路径设置"""
        print("🐍 Setting up Python path configuration...")

        # 创建__init__.py文件以使harness成为可导入包
        claude_init = self.framework_root / ".claude" / "__init__.py"
        if not claude_init.exists():
            with open(claude_init, 'w') as f:
                f.write('# Claude framework package\n')

        # 创建便捷导入脚本
        import_helper = self.framework_root / "setup_harness_imports.py"
        helper_content = """#!/usr/bin/env python3
'''
Harness Import Setup Helper
==========================

设置Python路径以便导入harness模块
在Claude分析脚本开头调用此文件
'''

import sys
from pathlib import Path

# 添加框架根目录到Python路径
framework_root = Path(__file__).parent
if str(framework_root) not in sys.path:
    sys.path.insert(0, str(framework_root))

# 验证harness可以导入
try:
    from claude.harness import create_investment_harness
    print("✅ Harness system ready for import")
except ImportError as e:
    print(f"❌ Harness import failed: {e}")
    print("Please check harness installation")

# 便捷函数
def quick_harness_check():
    '''快速检查harness系统状态'''
    try:
        from claude.harness.config import load_config, validate_config

        config = load_config("production_standard")
        warnings = validate_config(config)

        if warnings:
            print("⚠️ Configuration warnings:")
            for warning in warnings:
                print(f"  - {warning}")
        else:
            print("✅ Harness configuration valid")

        return len(warnings) == 0
    except Exception as e:
        print(f"❌ Harness check failed: {e}")
        return False

if __name__ == "__main__":
    quick_harness_check()
"""

        with open(import_helper, 'w') as f:
            f.write(helper_content)

        os.chmod(import_helper, 0o755)
        print(f"✅ Created import helper at {import_helper}")

        return True

    def run_integration(self) -> bool:
        """运行完整集成流程"""
        print("🔄 Starting Investment Harness Integration...")
        print(f"Framework root: {self.framework_root}")

        steps = [
            ("Integrating launch script", self.integrate_launch_script),
            ("Creating harness skill", self.create_harness_skill),
            ("Creating integration templates", self.create_phase_integration_templates),
            ("Updating CLAUDE.md", self.update_claude_md),
            ("Setting up Python imports", self.create_python_path_setup)
        ]

        success_count = 0
        for step_name, step_func in steps:
            try:
                print(f"\n📍 {step_name}...")
                if step_func():
                    success_count += 1
                    print(f"✅ {step_name} completed")
                else:
                    print(f"⚠️ {step_name} partially completed")
            except Exception as e:
                print(f"❌ {step_name} failed: {e}")

        print(f"\n🎉 Integration completed: {success_count}/{len(steps)} steps successful")

        if success_count == len(steps):
            print("\n🚀 Investment Harness System fully integrated!")
            print("\nNext steps:")
            print("1. Test the integration: bash scripts/tier3_launch.sh AAPL TECHNOLOGY")
            print("2. Check harness documentation: .claude/harness/README.md")
            print("3. Review integration templates: .claude/harness/integration_templates/")
            return True
        else:
            print("\n⚠️ Integration completed with some issues")
            print("Please check the error messages above and retry failed steps")
            return False

def main():
    """主函数"""
    if len(sys.argv) != 2:
        print("Usage: python integrate_harness.py <framework_root_path>")
        print("Example: python integrate_harness.py /Users/milton/投资大师")
        sys.exit(1)

    framework_root = sys.argv[1]

    try:
        integrator = HarnessIntegrator(framework_root)
        success = integrator.run_integration()

        sys.exit(0 if success else 1)

    except Exception as e:
        print(f"❌ Integration failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()