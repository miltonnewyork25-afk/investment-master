# CRWD Launch Brief (2026-03-27)

## 目标
- **层级**: Tier 3深度分析
- **质量目标**: 4.4分 (88/110)
- **字符目标**: ≥270K (目标300K+)
- **行业**: 网络安全SaaS (生态科技worktree)

## 框架路由
- **可能性宽度**: 3-4分(窄-中) — CRWD是成熟平台公司,非高期权型
- **推荐框架**: 传统框架+混合模式 (SOTP/DCF → 目标价+评级 + AI可能性附录)
- **系数**: ×1.1 (生态科技)

## 核心矛盾候选 (Phase 0.75结晶)

### CQ1: SBC估值分叉 (最关键)
- SBC/Rev 22.8%且零收敛+零回购 → Owner PE深度负值
- Non-GAAP PE 106x vs Owner PE负值 → 离散度∞
- **问题**: 市场用Non-GAAP定价合理吗? 还是应该用Owner Economics?
- **对标**: DDOG(22%, 同样问题) vs FTNT(4.1%, 行业标杆)

### CQ2: 宕机后复苏真实性
- Q4 FY26首次GAAP盈利+收入加速 → 表面看已恢复
- 但NRR从120%降至112-115%,尚未完全恢复
- **问题**: GRR 97%的韧性是真的还是Customer Commitment Package掩盖的?

### CQ3: LogScale SIEM能否成为第二增长曲线
- LogScale ARR>$585M (+75% YoY) — 增速远超核心端点
- SIEM TAM巨大(Splunk年收入$4B+)
- **问题**: LogScale能否在5年内达到$3B+ ARR成为新支柱?

### CQ4: AI是护城河增强还是竞争威胁?
- Morningstar升级Wide Moat(AI增强数据飞轮)
- 但Microsoft Copilot for Security+Defender捆绑 = 免费AI安全
- **问题**: Charlotte AI是否创造真实的客户价值差异化?

### CQ5: 估值合理性
- Forward PE 64x, P/FCF 76x, P/S 21x — 行业最贵之一
- 但增速22%+, ARR加速, LogScale高增长
- **问题**: 当前估值隐含什么增速/利润率假设? Reverse DCF结论?

## 参考报告

### 最相似可比 (P0对标)
1. **DDOG** — SBC结构最相似(22%/零回购/零收敛), 但usage-based vs subscription
2. **PANW** — 安全行业直接竞争, 但规模更大+GAAP盈利+SBC 14%
3. **WDAY** — SBC分析框架标杆(η效率/循环依赖/飞轮净强度)
4. **NOW** — SBC临界点模型来源($9B触发收敛)

### 行业横向
- `reports/SAAS_SECTOR/SaaS_Expectation_Gap_Sector_Report_v1.0.md` — 7家SaaS预期差
- FTNT作为安全行业对标(SBC纪律标杆)

## WDAY教训 → CRWD修复清单

| WDAY问题 | CRWD修复 |
|---------|---------|
| SBC幻觉(Non-GAAP PE看便宜) | Phase 1第一步算三PE+Owner Economics |
| NRR黑洞(不公开) | 建立dual-track NRR推断(间接法+Flex数据) |
| 飞轮悖论(AI蚕食seat) | 检测Charlotte AI是否蚕食端点计费 |
| 循环依赖(SBC收敛靠分母) | 联合概率修正 |
| KS串联不够 | KS组合矩阵+温水煮青蛙场景 |
| CQ演进不透明 | Phase间CQ置信度演化表 |

## 框架升级清单 (本次分析必须应用)

1. **预期差v2.1**: Step 0知识前置 + 5种PEP模式检测
2. **护城河v1.2**: C-AI抗性评级 + 飞轮摩擦力分析
3. **财务v3.0**: 6项能力(因果拆解/三表联动/质量分级/跨周期/证伪/商业映射)
4. **筛选v1.2**: FCF Yield + SBC覆盖率 + Insider A/D
5. **铁律N**: 三PE并列 + 概率三重锚定 + 因果密度≥5.0/万字
6. **铁律O**: Reverse DCF P1前置
7. **SaaS强制**: NRR推断 + Magic Number + Rule of 40 + 飞轮悖论检测

## 数据文件索引

| 文件 | 内容 |
|------|------|
| `financial_data.md` | 5年财务+季度趋势+三PE+SBC+竞对 |
| `knowledge_context.md` | 公司概况+竞争+宕机+AI+内部人+护城河+TAM |
| `launch_brief.md` | 本文件(启动简报) |

## 下一步
1. Phase -0.5: 5路WebSearch文献侦察 → `lit_recon_memo.md`
2. Phase 0: 数据预取(`/data-prefetch`) + CQ路由
3. Phase 0.75: 核心矛盾结晶 → `thesis_crystallization.md`
4. Phase 1: 围绕CQ1-CQ5组织分析
