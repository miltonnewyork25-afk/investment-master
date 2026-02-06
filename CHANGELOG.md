# Changelog

本文件追踪生态科技worktree的所有框架变更。

## [v19.13] - 2026-02-06

### Added
- **会话效率系统 v1.0**：基于4,977消息/849会话的Insights报告驱动
  - 规则1: 强制单目标会话（解决59% partially_achieved问题）
  - 规则2: 会话预算评估（解决时间错配问题）
  - 规则3: 文件操作防错（减少922次Command Failed + 275次File Not Found）
  - 规则4: Edit防错前置检查（减少232次Edit Failed）
  - 规则5: 大文件分段处理（减少79次File Too Large）
  - 规则6: CHANGELOG自动化（版本追踪）
  - 规则7: Phase完成度量化（提升fully_achieved率从17%到50%+）

### Changed
- 版本从 v19.12 升级到 v19.13 (Insights-Enhanced)
- CLAUDE.md 标题增加升级说明
- **5个生态科技skills全部升级到v1.1 (Prediction Market Enhanced)**:
  - policy-impact-assessor: +预测市场政策概率验证 +PPDA政策版 +Kill Switch联动
  - lcoe-analyzer: +成本概率区间 +平价概率化 +碳价预测市场验证
  - green-finance-evaluator: +ESG趋势概率验证 +Greenium预测 +碳金融概率
  - carbon-footprint-calculator: +碳价概率区间 +投资信号映射 +CBAM概率
  - tech-maturity-assessor: +技术突破概率验证 +TRL加速/减速信号 +投资时机概率化
- 所有5个skills新增: 跨skill联动接口 + 投资决策输出映射 + 数据质量标注 + Kill Switch触发条件

## [v19.12] - 2026-02-04

### Added
- 初始生态科技worktree配置
- Worktree小白友好规则 v1.0
- 工作流程严格区分规则 v1.1
- 基础投资研究框架（4阶段阻断式）

---

## 变更分类说明
- **Added**: 新功能/新规则
- **Changed**: 现有功能修改
- **Fixed**: Bug修复
- **Removed**: 删除的功能
- **Breaking**: 不向后兼容的变更
