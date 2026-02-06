# Changelog

本文件追踪生态科技worktree的所有框架变更。

## [v19.16] - 2026-02-06

### Added
- **Phase 3: 深度引擎三件套完成**
- **stress-tester.skill.md v1.0**: 逆向压力测试引擎
  - 5层压力测试框架（论点解构/熊市情景/敏感性矩阵/反向DCF/Pre-Mortem）
  - 6大生态科技专用熊市情景（补贴悬崖/技术颠覆/原材料危机/碳政策逆转/利率冲击/黑天鹅）
  - 假设脆弱性评级(S/A/B/C/F) + 仓位调整建议
- **historical-analogy.skill.md v1.0**: 历史类比引擎
  - 4大类比库（S曲线/政策周期/泡沫模式/公司路径配对）
  - 7个生态科技政策周期历史案例（531新政/西班牙FIT/美国PTC等）
  - 3个泡沫崩盘案例（2008清洁科技/2021 SPAC/2010中国光伏）
  - 3对成功vs失败公司配对（隆基vs尚德/NextEra vs SunEdison/宁德vs A123）
  - 泡沫预警评分系统(0-10) + "这次不一样"强制检验
- **supply-chain-mapper.skill.md v1.0**: 供应链风险地图
  - 4大子行业完整供应链图谱（光伏/风电/储能/氢能）
  - 供应链韧性评分模型（材料可用性/地缘集中度/替代性/价格稳定/ESG，0-100分）
  - HHI地缘集中度量化 + 价格传导弹性分析
  - 关键材料数据库（硅料/稀土/锂/钴/镍/铂/铜/碳纤维）

### Changed
- eco-tech-orchestrator升级到v1.2: 全11 Skill执行流水线
  - 新增Phase 2深度验证层（压力测试+历史类比）
  - 新增Skill全景图（编排层/数据层/分析层/深度层/输出层）
  - 支持深度分析/标准分析/快速扫描/单skill四种执行命令
- report-assembler升级: 8-Skill联合分析 + 八维雷达图
  - 新增3组交叉验证（供应链vs LCOE/压力测试vs建议/历史类比vs增长）
  - 报告结构扩展到9章（+供应链+压力测试+历史类比）

## [v19.15] - 2026-02-06

### Added
- **Phase 2: 并行Agent执行框架完成**
- **data-collector.skill.md v1.0**: 实时数据采集器
  - 4层数据采集矩阵（基本面/行业/政策碳价/ESG金融）
  - WebSearch查询模板 + 标准化数据包输出
  - 数据质量分级(A-E) + 缺失数据处理策略
  - 与5个分析skills的数据分发映射
- **report-assembler.skill.md v1.0**: 报告自动组装器
  - 5 Skill输出→完整报告的自动编排
  - 交叉验证矩阵（LCOE-技术/碳-政策/政策-金融/技术-LCOE）
  - 五维雷达图加权评分系统
  - Kill Switch汇总 + 可验证预测整合
  - 质量门控4维检查（字数/深度/完整性/一致性）
- **docs/parallel_agent_prompts.md**: 并行Agent执行模板
  - 5个skill的具体Task tool prompt模板
  - Wave 1(3并行) + Wave 2(2并行)执行方案
  - Quick-Scan单agent快速模式
  - 标准化输入/输出格式规范

### Changed
- eco-tech-orchestrator升级到v1.1: 新增Step 6完整执行流水线
  - 集成data-collector + report-assembler
  - 支持深度分析/快速扫描/单skill三种执行命令

## [v19.14] - 2026-02-06

### Added
- **eco-tech-orchestrator.skill.md v1.0**: 生态科技自动编排器
  - 子行业自动识别（光伏/风电/储能/氢能/综合清洁能源）
  - 5 skills智能链式执行（数据流自动串联）
  - 并行Agent模式支持（3+2方案和全并行方案）
  - 快速扫描模式（/quick-scan, 15分钟Go/No-Go决策）
- `docs/session_efficiency_details.md`: 会话效率模板（从CLAUDE.md分离）
- `docs/worktree_rules_details.md`: Worktree详细协议（从CLAUDE.md分离）

### Changed
- **CLAUDE.md Context压缩77%**: 602行→140行
  - 会话效率规则: 190行→7条核心规则（详细模板移至docs/）
  - Worktree规则: 200行→5条核心规则（详细协议移至docs/）
  - Git工作流: 80行→3条核心规则
- 版本从 v19.13 升级到 v19.14 (Context-Optimized)
- 文档索引新增2个docs文件引用

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
