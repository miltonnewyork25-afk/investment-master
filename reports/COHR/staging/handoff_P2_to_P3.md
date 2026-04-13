# Handoff Note — COHR Phase 2 → Phase 3
> 2026-04-13

---

## 1. 主要请求与意图
COHR Tier 3深度分析, 目标4.4分/200K+。Phase 2完成财务深挖+SOTP估值。

## 2. 关键技术概念
- **核心矛盾(不变)**: $50.7B市值的"AI光通信成长股"实际是后合并混合体, SOTP拆分后base case仅$251 vs $307.50
- **主线thesis强化**: "不是AI增长股, 而是后合并去杠杆+SOTP价值释放故事" — Phase 2确认SOTP加权$250, -18.8%
- **新发现: Owner FCF≈零**: 在$50B市值下Owner FCF仅$33M, ROIC 4.2% < WACC 10%
- **最确定催化**: GAAP/Non-GAAP收窄 — D&A从$554M递减至~$300M(FY29)是自动发生的
- **最大风险**: 收入增长80%+依赖AI单引擎, Hyperscaler CapEx放缓→6-7x放大效应
- **CQ加权: 52.3%** (从P1的41.5%上调, 但仍<60%)

## 3. 已完成的文件和产出
- `staging/P2_financial_deep_dive.md` (18,837 chars) — Ch11-16: R-1归因+R-2剪刀差+SOTP+资本效率+CQ更新
- `data/valuation_model.py` — Python SOTP三情景模型, 已验证
- `data/valuation_summary.json` — 估值结果JSON

### 关键数据点(必须保留):
- SOTP: Bear $158 / Base $251 / Bull $358 → Weighted $250 (30%/45%/25%)
- 三PE (FY26E): GAAP 72.4x / Owner 93.8x / Non-GAAP 57.5x
- Owner FCF FY25: $33M (OCF $634M - CapEx $441M - SBC $160M)
- ROIC: 4.2% vs WACC 10%
- 收入Bridge: FY25 $5.81B → FY26E $6.96B (+20%) → FY27E $8.76B (+26%)
- GM: FY24 30.9% → FY25 35.4% → Q2 FY26 37.0% → FY26E ~37.5-38.5%
- D&A递减: $554M(FY25) → $480M(FY26E) → $300M(FY29E)
- 利息递减: $243M(FY25) → $180M(FY26E) → $120M(FY27E)
- Net Debt: FY25 $2.98B → FY27E ~$1.2B (ND/EBITDA 2.7x→0.7x)
- 5个剪刀差: CapEx vs FCF / GAAP vs Non-GAAP / Hyperscaler CapEx / Inventory / R&D

## 4. 已解决的问题
- Preferred stock转换: 确认FY25 Q4强制转换, ~13.5M shares稀释, 消除preferred dividend
- FY25异常高税率(68%): 主要由preferred转换相关非经常性项目驱动, FY26E正常化至~15%
- SOTP vs 统一PE: 确认SOTP是正确的估值框架(三引擎增速/利润率/周期性完全不同)

## 5. 用户反馈记录
- 直接进入Phase 2, 未提出额外要求

## 6. 待办任务 (Phase 3重点)
1. **竞争格局深度**: LITE vs COHR vs 旭创 vs Broadcom — 1.6T份额预测
2. **供应链交叉验证(铁律Q)**: NVIDIA/AMD光模块采购策略, 上游InP衬底供需
3. **CPO深度分析**: 真正的TAM/时间表/COHR技术位置 vs Broadcom vs Ayar Labs
4. **博弈论透镜**: AI光模块定价博弈 — NVIDIA vs 供应商权力平衡
5. **护城河衰退风险**: CPO时代InP BOM从30-40%降至10-15%, 对COHR护城河的影响

## 7. 当前精确状态
- Phase 2 **完成**: 1个staging文件, 18.8K chars, 76 DM, 5 Mermaid
- P0+P0.75+P1+P2 累计: ~99K chars staging
- CQ加权: 52.3%
- 评级方向: 审慎关注 (SOTP -18.8%, CQ<60%)
- Python模型已验证并保存

## 8. 下一步唯一优先
**Phase 3**: 竞争格局+战略深度
- 第一动作: LITE vs COHR 1.6T技术路线对比 + 市场份额建模
- 不要重复P1的业务描述或P2的财务数据, 直接引用DM锚点
- 铁律Q: 供应链交叉验证必须有独立模块
- 需要WebSearch获取最新1.6T/CPO竞争动态
