# 核心原则守护系统 v1.0

## 🎯 设计目的

防止任何框架变更或升级无意中违背CLAUDE.md中定义的核心原则。建立不可突破的边界保护机制。

## 🔒 核心原则边界（不可变更）

### Tier 1: 绝对禁止原则
```yaml
评级表述禁止:
  - ❌ 买入/卖出/推荐/持有
  - ❌ Buy/Sell/Recommend/Hold
  - ❌ 强烈推荐/谨慎推荐
  - ❌ 目标价/Target Price（作为投资建议时）
  - ❌ 任何仓位建议

允许的替代表述:
  - ✅ 深度关注/关注/中性关注/审慎关注
  - ✅ 期望回报计算（作为分析工具）
  - ✅ 估值区间（作为价值评估）
  - ✅ 条件性估值（发现系统模式）
```

### Tier 2: 方法论边界
```yaml
估值方法要求:
  - ✅ 反向估值/Reverse DCF（挖掘隐含假设）
  - ✅ 概率加权估值（多情景）
  - ✅ 估值验证而非预测（分析导向）
  - ❌ 单点目标价预测（投资建议导向）
```

### Tier 3: 发布合规边界
```yaml
地缘政治表述:
  - ❌ 中国入侵台湾/invasion of Taiwan
  - ✅ 台海冲突/台海危机/cross-strait tension

数据诚信:
  - ❌ 编造数字
  - ✅ MCP工具获取 + DM锚点验证
```

## 🛡️ 多层边界守护机制

### Layer 1: 预防性检查（Generation前）
```python
def pre_generation_guard():
    """
    生成前的核心原则检查
    """
    current_context = analyze_generation_context()

    if detect_investment_advice_intent(current_context):
        return block_generation_with_warning(
            "检测到投资建议意图，违背核心原则。使用分析评级替代。"
        )

    if detect_prohibited_terminology(current_context):
        return redirect_to_compliant_terminology()

    return proceed_with_compliant_generation()

prohibited_terms_detector = {
    'investment_advice': ['买入', '卖出', '推荐', '持有', 'buy', 'sell', 'recommend'],
    'target_pricing': ['目标价', 'target price', '价格目标'],
    'position_advice': ['仓位', '配置', '持仓比例']
}
```

### Layer 2: 实时监控检查（Generation中）
```python
def realtime_content_monitor():
    """
    生成过程中的实时合规监控
    """
    generated_content = get_current_generation()

    compliance_check = validate_core_principles(generated_content)

    if not compliance_check.passed():
        return halt_generation_and_correct(
            violations=compliance_check.violations,
            corrections=compliance_check.suggested_fixes
        )

    return continue_generation()
```

### Layer 3: 输出验证检查（Generation后）
```python
def post_generation_validation():
    """
    生成完成后的最终合规验证
    """
    final_content = get_generated_content()

    # 核心原则扫描
    violations = scan_for_principle_violations(final_content)

    if violations.critical():
        return reject_output_and_regenerate(
            message="输出违背核心原则，已阻止发布",
            violations=violations.list(),
            regeneration_guidance=violations.correction_guidance()
        )

    return approve_output_for_delivery()

def scan_for_principle_violations(content):
    """
    深度扫描内容中的原则违规
    """
    violation_patterns = {
        'investment_advice': r'(买入|卖出|推荐|持有|buy|sell|recommend|hold)',
        'target_price': r'目标价.*\$\d+|target\s+price.*\$\d+',
        'position_sizing': r'仓位.*%|配置.*%|持仓比例',
        'geographic_violations': r'中国入侵|invasion.*taiwan',
    }

    detected_violations = []
    for category, pattern in violation_patterns.items():
        if re.search(pattern, content, re.IGNORECASE):
            detected_violations.append({
                'category': category,
                'pattern': pattern,
                'severity': get_violation_severity(category)
            })

    return ViolationReport(detected_violations)
```

### Layer 4: 边界变更保护
```python
def core_principle_change_guard():
    """
    核心原则变更的保护机制
    """
    def detect_principle_modification_attempt():
        current_claude_md = read_claude_md()
        proposed_changes = detect_claude_md_changes()

        if changes_affect_core_principles(proposed_changes):
            return require_explicit_user_confirmation(
                message="检测到核心原则变更，需要用户明确确认",
                changes=proposed_changes.summary(),
                impact_assessment=assess_principle_change_impact(proposed_changes)
            )

    def changes_affect_core_principles(changes):
        """
        检测变更是否影响核心原则
        """
        core_principle_indicators = [
            'tier_3_rating_standards',
            'prohibited_terminology',
            'investment_advice_boundaries',
            'valuation_methodology_requirements',
            'geographic_expression_rules'
        ]

        return any(indicator in changes for indicator in core_principle_indicators)
```

## 🚨 自动守护系统

### 守护进程
```python
class CorePrincipleGuardian:
    """
    24/7运行的核心原则守护系统
    """
    def __init__(self):
        self.claude_md_baseline = load_claude_md_baseline()
        self.violation_detector = ViolationDetector()
        self.emergency_stop = EmergencyStopSystem()

    def continuous_monitoring(self):
        """
        持续监控系统合规性
        """
        while True:
            # 检查CLAUDE.md是否被意外修改
            if self.detect_claude_md_drift():
                self.alert_principle_drift()

            # 检查最近生成的内容是否合规
            recent_outputs = get_recent_analysis_outputs()
            for output in recent_outputs:
                if not self.validate_output_compliance(output):
                    self.quarantine_non_compliant_output(output)

            # 检查框架升级是否威胁核心原则
            if self.detect_framework_upgrade_risk():
                self.emergency_stop.engage("框架升级可能威胁核心原则")

            time.sleep(monitoring_interval)

    def alert_principle_drift(self):
        """
        核心原则偏移警报
        """
        return {
            'alert_type': 'CORE_PRINCIPLE_VIOLATION',
            'severity': 'CRITICAL',
            'message': 'CLAUDE.md核心原则被意外修改，立即暂停系统',
            'action': 'EMERGENCY_STOP',
            'require_user_intervention': True
        }
```

### 紧急停止机制
```python
class EmergencyStopSystem:
    """
    核心原则违规时的紧急停止系统
    """
    def engage(self, reason):
        """
        立即停止所有可能违规的操作
        """
        self.halt_all_generation()
        self.quarantine_suspect_outputs()
        self.alert_user_immediately(reason)
        self.require_manual_restart_approval()

    def halt_all_generation(self):
        """
        停止所有内容生成
        """
        return "系统检测到核心原则违规风险，已启动紧急停止协议"
```

## 📋 边界变更协议

### 变更分类与审批

#### Class A: 核心原则变更（最高级别）
```yaml
定义: 影响评级体系、投资建议边界、估值方法要求的变更
审批要求:
  - 必须获得用户明确书面确认
  - 需要详细影响评估报告
  - 需要回滚预案
  - 需要测试验证
示例: 修改"禁止买入/卖出建议"规则
```

#### Class B: 方法论调整（中级别）
```yaml
定义: 不触及核心边界但影响分析方法的变更
审批要求:
  - 需要用户确认
  - 影响评估
  - 兼容性检查
示例: 调整递归思考的触发条件
```

#### Class C: 技术实现（低级别）
```yaml
定义: 不影响原则和方法的纯技术改进
审批要求:
  - 自动化检查通过即可
  - 用户可选择启用/禁用
示例: 界面优化、性能提升
```

### 变更确认流程
```python
def principle_change_confirmation_protocol():
    """
    核心原则变更确认协议
    """
    def require_user_confirmation(proposed_change):
        confirmation_request = {
            'title': '🚨 核心原则变更确认',
            'change_type': classify_change_severity(proposed_change),
            'current_principle': extract_current_principle(),
            'proposed_change': proposed_change.description,
            'impact_assessment': assess_change_impact(proposed_change),
            'risks': identify_change_risks(proposed_change),
            'rollback_plan': design_rollback_plan(proposed_change),
            'confirmation_required': "请明确输入 'I CONFIRM PRINCIPLE CHANGE' 以继续",
            'denial_option': "输入 'DENY' 取消变更"
        }

        return await_user_explicit_confirmation(confirmation_request)
```

## 🔧 立即实施方案

### Phase 1: 紧急修复（立即执行）
```bash
# 1. 修复AMZN报告违规内容
sed -i 's/投资评级.*买入/分析评级: 关注/g' Top20_Screener/deep_research/AMZN_Deep_Research.md
sed -i 's/目标价.*\$/估值区间:/g' Top20_Screener/deep_research/AMZN_Deep_Research.md

# 2. 扫描所有报告查找类似违规
grep -r "买入\|卖出\|推荐\|目标价" reports/ || echo "扫描完成"
```

### Phase 2: 边界守护系统部署（今天完成）
```yaml
部署清单:
  - [ ] 核心原则检测脚本
  - [ ] 自动合规验证系统
  - [ ] 紧急停止机制
  - [ ] 变更确认协议
```

### Phase 3: 递归升级边界集成（升级前完成）
```yaml
升级前必须:
  - [ ] 边界守护系统全面测试
  - [ ] 递归系统边界兼容性验证
  - [ ] 用户变更确认机制就绪
  - [ ] 回滚机制验证通过
```

## 🎯 成功标准

### 边界保护有效性
- [ ] 任何违规内容生成前被自动阻止
- [ ] 核心原则变更必须获得明确用户确认
- [ ] 所有历史违规内容被识别和修正
- [ ] 紧急停止机制在检测到威胁时正常工作

### 用户体验
- [ ] 边界守护不影响正常分析功能
- [ ] 违规阻止时提供清晰的替代方案
- [ ] 变更确认流程简单明确
- [ ] 系统保持高可用性

---

**这个边界守护系统将确保任何框架升级都无法违背你设定的核心原则！** 🛡️