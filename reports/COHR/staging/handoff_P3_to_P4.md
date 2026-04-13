# Handoff Note — COHR Phase 3 → Phase 4
> 2026-04-13

---

## 1. 主要请求与意图
COHR Tier 3深度分析, 目标4.4分/200K+。Phase 3完成竞争格局+供应链+CPO+博弈论+护城河演化。

## 2. 关键技术概念
- **核心矛盾(不变)**: SOTP加权$250 vs $307.50 = -18.8%, 但护城河从3.3升至3.8/5
- **Phase 3新发现**: NVIDIA $4B($2B COHR + $2B LITE)投资将COHR从"成本优势"升级为"战略必需品"
- **竞争分层**: 激光器层(COHR有定价权) vs 模块层(Innolight有份额) — 两层竞争逻辑完全不同
- **CPO不杀InP**: Broadcom ELS架构仍需InP CW激光器(400mW), COHR受益于CPO而非受损
- **InP稀缺**: 需求200万片 vs 产能60万片(70%缺口), COHR 6-inch线是非中国最大产能
- **CQ加权**: 55.1% (从P2的50.8%上调+4.3pp, 主要因CQ4护城河+7pp)

## 3. 已完成的文件和产出
- `staging/P3_competition_strategy.md` (13,101 chars, Ch17-Ch22)
  - Ch17: 1.6T竞争格局 (层级分化+NVIDIA投资+对标+技术路线)
  - Ch18: 供应链交叉验证(铁律Q) — InP稀缺+CapEx剪刀差+客户集中度
  - Ch19: CPO深度 — 时间表+ELS架构+Ayar风险+InP BOM分析
  - Ch20: 博弈论透镜 — NVIDIA议价+中国供应商囚徒困境
  - Ch21: 护城河演化 — 3.3→3.8/5, Kill Switch更新
  - Ch22: CQ更新 — 55.1%(+4.3pp)

### 关键数据点(必须保留):
- NVIDIA $4B投资: $2B COHR(@$256.80) + $2B LITE(@$695.31), March 2026, nonexclusive
- 1.6T份额预测: Innolight 50-60%(模块), SiPh ~60%(路线), EML ~40%
- InP供需: 需求200万片 vs 产能60万片, AXT 60-70%份额(北京, 地缘风险)
- Hyperscaler CapEx 2026: $600-690B, +36%, CapEx增速5x vs 收入增速
- CPO时间表: 2026 H2 scale-out, 2028-2030大规模替代pluggable
- Ayar Labs: $500M Series E, 2026年3月, NVIDIA+AMD投资
- LITE backlog: 32个月以上(到2028年底)
- Broadcom CPO Gen2: Meta验证100万链路小时零故障
- 护城河综合: P1 3.3/5 → P3 3.8/5

## 4. 已解决的问题
- CPO是否杀死InP: 否, ELS架构需要更高功率InP CW激光器
- COHR vs Innolight: 不同层级竞争, 不是直接替代
- NVIDIA $4B含义: 供应链保险, 不是估值背书

## 5. 用户反馈记录
- 直接进入Phase 3, 未提出额外要求

## 6. 待办任务 (Phase 4重点)
1. **红队7问** — RT-1至RT-7, 重点: AI CapEx崩塌场景(最危险)
2. **双向校准** — 上行(AXT管制COHR受益) vs 下行(CapEx崩塌6-7x)
3. **M4标签坍塌** — COHR当前享受"AI增长股"标签, 如果标签回到"后合并工业混合体"
4. **概率重新赋值** — 结合P3竞争证据修正三情景概率
5. **CQ加权确认** — 55.1%是否需要红队校准

## 7. 当前精确状态
- Phase 3 **完成**: 1个staging文件, 13.1K chars, 61 DM, 4 Mermaid
- P0-P3 累计: ~112K chars, 497 DM, ~21 Mermaid
- CQ加权: 55.1%
- 评级方向: 审慎关注(SOTP -18.8%, CQ<60%), 但接近中性关注边界

## 8. 下一步唯一优先
**Phase 4: 红队对抗**
- 第一动作: RT-1承重墙测试 — "AI CapEx崩塌"是当前最脆弱假设
- 需要: 概率加权三重锚定(历史基准率+反例+自然实验)
- 不要重复: P3的竞争分析, 直接引用DM锚点
- 双向校准: 不能只做偏空红队, 必须同时测试上行(AXT管制/CPO加速)
