---
name: Digest Card System v1.1
description: TurboQuant启发的报告压缩摘要卡设计 — 6层YAML格式，21x压缩比，存推理过程而非仅结论
type: feedback
---

## 摘要卡系统 v1.1 (TurboQuant论文启发, 2026-03-26)

**位置**: `reports/{TICKER}/{TICKER}_digest.yaml`
**压缩比**: 270K→13K (21x) — v1.0为8K/34x但缺因果链和元学习, v1.1补上后更完整
**格式**: YAML (机器解析零overhead, 人也能读, Python可批量处理)

### 六层结构

| Layer | 对应概念 | 占比 | 存什么 | 复利价值 |
|-------|---------|------|--------|---------|
| L0 坐标 | 元数据 | 3% | ticker/日期/股价/评分/路径 | 检索 |
| L1 主信号 | PolarQuant | 22% | 论点(方向×强度×kill_switch) + 护城河 + 估值 | 快速理解 |
| L1.5 因果链 | 推理保真 | 19% | 核心因果链 + reasoning_habit + transferable_to | **最高** |
| L2 残差 | QJL | 11% | 假设翻转 + 反直觉发现 + 盲区 | alpha来源 |
| L3 关系 | 内积保真 | 10% | 最相似公司 + 比较排序 + 行业坐标 | 持久性最强 |
| L4 基向量 | 稀疏表示 | 12% | 已知模式引用 + 新模式贡献 | 框架升级 |
| L5 元学习 | Meta | 19% | reasoning habits + 质量反馈 + 假说检验 + 局限性 | AI自训练 |

### v1.0→v1.1的关键改进

1. **新增L1.5因果链** — v1.0只存结论("切换成本无限大"), v1.1存推理过程(Dodd-Frank→Basel III→offset→资本不可能→制度加速器) + reasoning_habit(可迁移的思维模式)
2. **新增L5元学习** — v1.0不知道报告"做对了什么/做错了什么", v1.1包含质量记分卡反馈、跨报告假说检验(确认/扩展/否定)、局限性声明
3. **核心洞见**: 结论会过期(CME PE会变), 推理过程不会("如何识别PE幻觉"永远有用)。L1.5的reasoning_habit才是真正的复利资产

### 使用场景

- **分析新公司**: L3找相似→L1快速理解→L1.5复用因果链模板→L4检查已知模式
- **框架升级**: 批量读L5的hypothesis_tested→哪些规则被多份报告确认→提炼为铁律
- **AI自训练**: L5的reasoning_habits_acquired = 可迁移的思维模式→每张卡贡献3-5个
- **投资跟踪**: L1的kill_switch + L2的blind_spots.monitor = 自动跟踪清单
- **跨公司比较**: 多张卡的L3构建关系图谱 | L1.5的transferable_to构建模式应用网络

**Why:** 270K报告的价值不在字数，在因果链和反直觉洞见。v1.1把"可复利的推理"从"一次性的细节"中蒸馏出来。
**How to apply:** 每份Tier 3报告Complete后生成。Demo: `reports/CME/CME_digest.yaml`
