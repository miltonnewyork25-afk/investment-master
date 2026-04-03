## Handoff Note — FTNT Phase 2 → Phase 3

### 1. 主要请求与意图
FTNT Tier 3深度分析, Phase 2(财务与价格含义)已完成。下一步Phase 3: 竞争格局与护城河深度。

### 2. 关键技术概念
- **核心发现**: $82.53精确定价共识(Reverse DCF隐含12% CAGR = 共识11.8%)
- **H2修正**: "估值压缩创造不对称机会"→修正为"当前定价≈共识, 不对称性较弱(Bull+7% vs Bear-36%)"
- **新发现**: 隐含信念脆弱度仅1.7/5(网安行业最低), SBC仅吞噬12.6% FCF
- **黄色信号**: D&A跳升174%($123M→$336M) + PP&E增长41% → 未来FCF压力
- **三维状态更新**: [合理偏低估 × 改善中 × 催化可能]
- **6方法加权公允价值: $81 ≈ 当前$82.53**

### 3. 已完成的文件和产出
- `reports/FTNT/staging/FTNT_P2_AgentA.md` — Phase 2正文(24.4K字符, 89 DM锚点, 14章)
- `reports/FTNT/data/ftnt_phase2_valuation.py` — Python估值模型(Reverse DCF + 3情景DCF + 回购eta + NRR + 三PE)
- `reports/FTNT/data/ftnt_phase2_valuation.json` — 估值结果JSON
- `reports/FTNT/data/checkpoint.yaml` — Phase 2 completed
- **关键数字**:
  - Reverse DCF隐含CAGR: 12.0% (Standard) / 14.0% (Owner)
  - DCF 3-scenario: Bull $89 / Base $74 / Bear $53, 混合$67
  - 6方法加权公允价值: $81
  - 三PE: GAAP 33.1x / Owner 31.5x / Core 35.9x / P/FCF 27.6x / Fwd 27.8x
  - 回购: 累计$6.5B, 均价$96/股, 退出68M股
  - NRR推算: 115-125% (弱结论)
  - EPS增长分解: 有机NI CAGR 32.2% + 回购贡献2.9pp = EPS CAGR 35.1%
  - ROIC 28.7%, ROCE 38.9%, 增量ROIC >60%
  - 递延覆盖率1.05x

### 4. 已解决的问题
- CQ4(股价隐含什么): **已回答**(70%置信度) — 精确定价共识, 脆弱度低
- CQ8(增长质量): **部分回答**(60%置信度) — 有机增长11-12%, 92%来自利润增长而非回购
- 被否决方案: 未否决
- **H2修正**: 从"估值压缩创造不对称机会"调整为"当前≈共识, 需要催化剂才有超额回报"

### 5. 用户反馈记录
- 无特殊偏好指令

### 6. 待办任务 (Phase 3)
1. **ASIC竞争深度验证(CQ1)**: FortiSP5 vs 竞品(PANW ML + CRWD内核), ASIC在不同场景的适用性
2. **PANW/CRWD竞争分析(CQ3/CQ5)**: 平台化竞争的胜负格局, enterprise vs mid-market
3. **MSFT Defender威胁量化(CQ5)**: 从25.8%端点份额到网络安全的传导路径
4. **护城河评分**: 转换成本/网络效应/成本优势/无形资产分维度评估
5. **定价权验证**: Accelerate 2026提价信号的量化影响
6. **CVE/安全漏洞系统分析**: 5+关键CVE被野外利用的品牌影响

### 7. 当前精确状态
- Phase 2 **已完成, 待commit**
- P1+P2累计: 48.6K字符, 127 DM锚点, 6 Mermaid
- CQ置信度更新: CQ4 70%(↑20), CQ8 60%(↑10), 其余不变
- 新增DM锚点: DM-VAL-P2-001~009, DM-COMP-P2-001

### 8. 下一步唯一优先
**Phase 3开始**: 先做PANW/CRWD/FTNT三方竞争对标(CQ3), 再做ASIC竞争验证(CQ1), 最后做MSFT威胁量化(CQ5)。Phase 3目标≥30K字符。

**不要重复的事**: 不需要重新做估值(Phase 2已完成)。不需要重新收集基础财务数据。不需要重新做PE对标(P2 Ch17已完成)。Phase 3聚焦"竞争+护城河", 不再讨论估值数字。
