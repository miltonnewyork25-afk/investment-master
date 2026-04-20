# FTAI Aviation — Top 5 Lens Registry (铁律 N 减法 #5 产物)

> **目的**: 锁定 Phase 5 组装时的 Top 5 分析透镜 (Lens). 其中至少 3 条**必须明确包含一次范畴重分配** (Hofstadter 方法) — 99% 的非共识投资观点本质都是一次范畴重分配。
> **日期**: 2026-04-20
> **规范**: 铁律 N 减法 #5 + 铁律 S-2 压缩 + 铁律 R-3/R-4 硬约束
> **校准锚**: 本 registry 必须与 `FTAI_compression_test.md` 的母命题 (CFM56 窗口捕获机) 保持一致, 不得出现第二个与母命题竞争的 lens。

---

## Lens 排序原则

按"对股东回报方向的解释力"排序:
- **Lens 1 = 母 lens** (与 compression_test 命名一致, 统领全报告)
- **Lens 2-3 = 承重 lens** (独立解释力强, 不依赖 Lens 1 就能成立)
- **Lens 4-5 = 验证 lens** (在 Lens 1-3 已成立的前提下, 进一步固化评级和 Kill Switch)

**硬约束**: Top 5 中**至少 3 条**必须包含格式化范畴重分配 (old_category → new_category + 估值方法切换 + 关键变量切换).

---

## Lens 1: CFM56 窗口捕获机 (母 lens, 与 compression_test 一致)

### 范畴重分配 (Hofstadter 格式) ★

```yaml
lens_1:
  old_category: "航空租赁+航空产品的混合成长股 (市场默认 GICS 分类: Industrials / Rental & Leasing)"
  new_category: "CFM56 窗口捕获机 — 有 7 年物理寿命的有限窗口价值提取结构"
  
  why: |
    市场当 FTAI 是"execute型 compounder, 像 TransDigm/HEICO 那样的航空后市场成长股",
    但 FCF -$3.1B 累计 + DIO +132 天 + CapEx 2026 指引塌陷 70% + PE 56x vs WLFC 5x 这 4 件事
    在 compounder 框架下无法一致解释. 在"窗口捕获机"框架下, 这 4 件事统一于一个机制:
    2022-2025 = 窗口内 feedstock 囤积; 2026-2031 = 窗口内年度 throughput 捕获; 
    2032+ = 窗口关闭, 业务塌陷 (若 FTAI Power 未接棒).
  
  valuation_implication: |
    从 EV/EBITDA 21.6x (永续倍数) 
    → 有限寿命 DCF (terminal = 0 at 2035) + SOTP 三段 (Aviation Leasing WLFC 5x + Aerospace 7年DCF + FTAI Power 期权)
    → 公允价值 $9-11B vs 市值 $26B, 高估 50-65%
  
  key_variable_shift: |
    从 "EBITDA 增速 / Margin 扩张 / Module throughput 绝对数"
    → "窗口剩余年数 × 年度可捕获模块数 × 单位模块 FCF 转化率"
  
  evidence_chain:
    - "FCF 连续 3 年 -$1B, 累计 -$3.1B [DM-FIN-001 来自 10-K 2023-2025]"
    - "DIO 从 120 天 → 252 天 (+132 天), 同期毛利率改善 +19pp [DM-FIN-008]"
    - "CapEx 2026+ 指引 $100-130M 下降 70% [DM-FIN-015]"
    - "WLFC PE 5x vs FTAI PE 56x, 同为 CFM56 租赁商 [DM-VAL-003]"
    - "SCI $2B LP + $2.5B debt = $4.5B 新资本 ≈ 3 年负 FCF 累计额 [DM-CAP-001]"
  
  causal_chain: |
    资本募集 $4.5B → feedstock 囤积 + 产能扩张 (因为 CFM56 服役机群进入 2028-2035 最后大修波峰) 
    → DIO 恶化 + 毛利率改善 (因为囤货是为了 throughput 爬坡, 毛利率改善是规模效应一次性释放) 
    → 2026 进入稳态年度捕获 (CapEx 塌陷到 maintenance level, FCF 从负转正 $915M 指引) 
    → 2032+ 窗口物理关闭 (CFM56 退役机群减少 60%+, LEAP 取代) 
    → 业务塌陷到 Aviation Leasing 单段估值 $3B 水位 (若 FTAI Power 未接棒)
  
  counter_conditions:
    - "条件 A (25% 概率): LEAP/GTF 替代速度慢 → 窗口从 2032 延长到 2038 → 窗口长度 +6 年"
    - "条件 B (25% 概率): FTAI Power 2027 前贡献 $200M+ EBITDA → 终值 ≠ 0, 定义升级为'分段转型平台'"
    - "条件 C (15% 概率): FTAI 2028 前多元化到 CF34/V2500/GEnx → 窗口假设放宽"
    - "三条件汇总概率 55% 新定义主体成立, 35% 窗口延长, 10% 升级为转型平台"
  
  kill_switch_signals:
    - "Q1 2026 模块交付数 <220 = 窗口捕获效率不足 (指引 1,050/4 = 263 月度基线)"
    - "2030 AAR 合同续签率 <45% (管理层 55%, 我们 Bayesian 45%) = 窗口末期渠道失去"
    - "CEO Adams 连续 3 季度净卖出 = 内部人判断窗口关闭早于预期"
  
  priority: "母 lens — 执行摘要段 2 展开, 全报告每章末尾回扣"
```

### 为什么 Lens 1 是母 lens

这个 lens 同时做到:
1. **范畴重分配**: compounder → 有限寿命捕获机 (最大 Hofstadter 位移)
2. **变量重制**: EBITDA → 窗口年数 × 年度模块 × FCF 转化率 (三维度)
3. **估值语言切换**: 永续倍数 → 有限寿命 DCF + SOTP
4. **统一解释 5 个 failure_points** (负 FCF / DIO / PE vs WLFC / CapEx 塌陷 / CEO 持股增长)
5. **留下可测试证伪条件**: A/B/C 三条件在 12-18 个月内有实际数据验证

---

## Lens 2: 黑箱垂直整合 — 不是护城河, 是定价缺乏锚点

### 范畴重分配 (Hofstadter 格式) ★

```yaml
lens_2:
  old_category: "垂直整合护城河 (市场叙事: Strategic Capital Initiative + Aerospace Products + Aviation Leasing 形成闭环, 壁垒上升)"
  new_category: "黑箱定价缺锚 — 垂直整合在账上, 但单位经济学完全不透明, 市场给的 21.6x 倍数没有事实依据"
  
  why: |
    "垂直整合护城河"在财务上应该体现为 ≥1 个可观测指标: 
    交叉销售率 / 内部使用 feedstock 占比 / 垂直整合 ROI 超过非整合组 / 单位利润率高于行业.
    FTAI 这 4 个指标全部**未披露或不可推导** (可推演度 58%).
    → 市场给 FTAI 21.6x EV/EBITDA 倍数时, 是基于"看起来像 TransDigm/HEICO 的叙事", 
    不是基于"单位经济学证据". 这不是护城河, 是**估值缺锚**.
  
  valuation_implication: |
    从 "垂直整合溢价 → 按 TDG/HEI 20-28x 给倍数"
    → "黑箱折价 → 按可推演度 58% × 行业中位数 12-15x 给倍数 = 等效 7-9x EBITDA"
    → 公允价值再下修 20-30% (从 Lens 1 的 $9-11B 到 $7-9B)
  
  key_variable_shift: |
    从 "Aerospace Products EBITDA margin"
    → "单位模块 cash-on-cash 回报 (披露或可推导性) × 黑箱折价率"
  
  evidence_chain:
    - "管理层 8 季度 earnings call 从未披露单模块 revenue / cost / cash margin [DM-MAN-001]"
    - "segment reporting 合并维护+替换 CapEx, 未拆分 growth vs maintenance 的单位来源 [DM-FIN-020]"
    - "可推演度 58% (R-4 认知边界评估), 黑箱比例 63.5% (超 Klarman too hard 35% 阈值) [DM-CQI-001]"
    - "SCI fund 对 LP 披露的单位经济学与 SEC filings 不一致 (推测, 基于 LP marketing materials 未公开) [DM-CQI-008]"
  
  causal_chain: |
    管理层选择不披露单位经济学 
    → 卖方分析师无法验证 "margin 可持续性" 这一核心叙事 
    → 估值完全依赖管理层指引+叙事惯性 (因为找不到反证, 所以假设叙事成立) 
    → 一旦叙事松动 (如连续 Q4 miss), 估值 reprice 没有锚, 下跌幅度会超过业务基本面变化
  
  counter_conditions:
    - "条件 D (20% 概率): FTAI 在 2026 年度 Investor Day 披露单模块经济学 → 黑箱比例从 63.5% 降到 30-40% → 可投资"
    - "条件 E (10% 概率): 卖方 (Morgan Stanley / JPMorgan) 基于渠道调研重构 unit economics → 市场定价消化黑箱"
    - "条件 F (70% 概率): 管理层继续不披露, 2026-2027 季度 miss 累积 → 市场强制 reprice"
  
  priority: "承重 lens — 用于执行摘要段 3 (评级 + 黑箱), 以及 Ch 7 认知边界章节"
```

---

## Lens 3: 资本募集式扩张 — 不是 compounder, 是外部 LP 资金放大前端押注

### 范畴重分配 (Hofstadter 格式) ★

```yaml
lens_3:
  old_category: "Self-funding compounder (巴菲特式 — 经营 FCF 正向 → 再投资 → 更多 FCF)"
  new_category: "资本募集式扩张 — 用外部 LP 资金 + 高杠杆 debt 放大窗口期前端押注, 类似黑石式 private equity fund 结构"
  
  why: |
    真正的 compounder 在扩张期也应该是**经营活动 FCF 正** + **投资活动 FCF 负** (融资主要是 debt rollover).
    FTAI 2023-2025 **经营活动 FCF 累计 +$1.6B**, **投资活动 FCF 累计 -$3.2B**, 
    **融资活动 FCF 累计 +$3.5B** (SCI $2B + debt $2.5B 扣除回购).
    这个现金流结构更接近黑石 GP (管理外部 LP 资金 + 自己跟投) 而不是 TransDigm/HEICO (内部复利).
    
    **关键证据**: SCI $2.5B commitment 的**法律结构**是 Segregated Portfolio Company (SPC), 
    FTAI 是 GP (管理费 + 业绩费), 外部 LP (如 OneSky) 提供 majority equity. 
    这是 fund management business, 不是公司 B/S 扩张.
  
  valuation_implication: |
    从 "compounder DCF (持续再投资, 10-12% 永续增长)"
    → "fund GP 估值 (管理费 AUM × 倍数 + 业绩费 option value + 自有资产 NAV)"
    → Aerospace Products 部分 = GP 业务按 fee stream DCF (~10x fee EBITDA ≈ $2B), 
      Aviation Leasing 部分 = 传统 NAV (WLFC 5x ≈ $3B), 
      合计 ~$5-7B 核心业务 + 资本募集 option value $2-3B = $7-10B 总估值
    → 实际上与 Lens 1 的 $9-11B 收敛 (不同路径相同结论, 三角测量成功)
  
  key_variable_shift: |
    从 "经营现金流增长 / ROIC / CapEx 效率"
    → "AUM 增长 / management fee % / carry distribution / LP IRR 要求"
  
  evidence_chain:
    - "SCI 2024 Q3 宣布, 2025 年已 deploy $1.5B, 年化管理费 ~0.5-1.5% = $7.5-22M revenue [DM-CAP-003]"
    - "debt-to-equity 10.46x (2025), 行业中位数 1.5-2.5x → 杠杆水位像 private equity 而非工业公司 [DM-FIN-031]"
    - "FTAI 2023 分拆 (from Fortress Investment Group) 保留 GP 思维: Joe Adams 和 David Moreno 都是前对冲基金经理 [DM-MAN-005]"
    - "2025 年 10-K 新增 'fund management' 作为单独营收类别 (虽然占比小) [DM-FIN-035]"
  
  causal_chain: |
    管理层识别 CFM56 窗口机会 (2028-2035 peak MRO demand) 
    → 单靠自有 B/S 规模受限 ($26B 市值) 
    → 通过 SCI 募集外部 LP 资金 (总 commitment $2.5B) 放大押注 
    → 同时加杠杆 (D/E 10.46x) 进一步放大 
    → 2026-2031 年如果窗口兑现, 外部 LP 和内部股东同时受益 (LP 8-10% IRR, 股东 EBITDA × 倍数) 
    → 2032+ 窗口关闭时, GP 业务 (fund management) 可能存续, 但 Aerospace Products operating 部分萎缩
    → 长期股东回报取决于"GP 业务能否在窗口关闭后继续募集并部署新 fund" — 这是一个独立的期权
  
  counter_conditions:
    - "条件 G (30% 概率): SCI 到 2027 完全部署 + 超过 8% IRR → FTAI 启动 SCI II 再募 $3-5B → GP 业务成为可持续主营, 窗口关闭后仍有价值"
    - "条件 H (40% 概率): SCI 部署正常但 FTAI GP 业务无法扩张到其他机型 → 窗口关闭时 GP 业务自然解散"
    - "条件 I (30% 概率): SCI 部署 IRR < 8% → LP 失望, 不参与后续 fund → GP 业务在 2030 前无价值"
  
  priority: "承重 lens — 独立解释 SCI 结构, 与 Lens 1 交叉验证估值收敛, 用于 Ch 2 商业模式 + Ch 4 资本配置"
```

---

## Lens 4: 2030 AAR 续约赔率 — 单一最大 Kill Switch

### 非范畴重分配 Lens (验证型)

```yaml
lens_4:
  old_category: "AAR 是竞争对手 (市场叙事)"
  new_category: "AAR 是窗口 throughput 的上游门阀 — 决定 FTAI 能在 7 年窗口里摸到多少台发动机"
  
  why: |
    AAR PBH (Power-By-Hour) 网络控制全球 ~80% CFM56 engine shop visits, 
    AAR/FTAI 合作让 FTAI 获得 feedstock 优先权. 2030 年合约到期, 续约 vs 不续约 
    = **二元 Kill Switch**, 直接决定窗口捕获效率 40%+ 的差异.
  
  valuation_implication: |
    Base case (55% 续签, Bayesian 45%) → Lens 1 SOTP $9-11B
    Bear case (不续签 / 30% renewal) → Aerospace Products 窗口捕获量 -40% → SOTP 降到 $6-7B
    Bull case (完全续签 + 扩展到其他机型) → 窗口捕获量 +20% → SOTP 上修到 $12-14B
  
  key_variable:
    name: "2030 AAR 合同续签率"
    current_estimate: "55% (管理层) / 45% (我们 Bayesian, 考虑 AAR 自建 module repair capability 风险)"
    measurement_timing: "2029 Q4 或 2030 Q1 公告"
    pre_signal: "2027-2028 AAR quarterly earnings call 中关于 CFM56 module capability 的投入指引"
  
  evidence_chain:
    - "AAR 2024 annual report 披露 CFM56 PBH 业务 +22% YoY, 但未披露 FTAI 合作贡献 [DM-COMP-001]"
    - "AAR 2025 capital allocation 新增 $150M 投向 engine component shop 自建 [DM-COMP-005]"
    - "FTAI/AAR 协议于 2020 年签订, 10 年期, 2030 年到期 [DM-COMP-008]"
    - "WLFC 作为 AAR 历史合作商在 2018 年被 downgrade → 给 AAR 自建 capability 创造先例 [DM-COMP-012]"
  
  priority: "验证 lens — 用于 Ch 5 竞争+博弈 + Ch 14 Kill Switch 章节, 不进执行摘要 (太具体)"
```

---

## Lens 5: CEO 持股 vs 股价反身性 — 内部人情报优势还是确认偏差

### 非范畴重分配 Lens (验证型)

```yaml
lens_5:
  old_category: "CEO 持股增长 16.7x = 强买入信号 (旧地图: 内部人相信长期故事)"
  new_category: "CEO 持股增长需要解码 — 区分 '股价上涨导致持股账面值上涨' vs '实际增持行为'"
  
  why: |
    $387万 → $6,475万 的 16.7x 增长中, 股价从 $12 → $259 贡献了 21.6x 增长因子, 
    意味着 CEO **实际增持仅 ~40% 额外股份** (不是 16.7x). A/D ratio 3-7x 仍然正向, 
    但这是**2023-2025 窗口打开期**的买入 — 在窗口假设下合理. 真正的信号是 
    **窗口末期 (2028-2030) 的内部人行为**:
    - 如果 CEO 持续净卖出 → 确认窗口早关
    - 如果 CEO 继续净买入 → 确认窗口期还有延续性
  
  valuation_implication: |
    当前 CEO A/D 3-7x 的信号强度 **低于市场假设** — 因为: 
    (1) 持股账面值增长主要来自股价, 不是实际增持 
    (2) 窗口打开期的买入是合理的, 不是非共识 "contrarian bull" 
    (3) 真正有信息价值的是**2028+ 的内部人行为**, 当前不具备
    → 不对估值产生正向修正 (Lens 1 SOTP $9-11B 不因 CEO 行为上修)
  
  key_variable:
    name: "CEO Adams 从 2026 H2 起的 insider trading trend"
    tracking_rule: "连续 3 季度净卖出 → Kill Switch 红灯 3"
    pre_signal: "2025 Q4 Form 4 filings (已显示 CEO 在 $250+ 价位仍有买入, 未来 12 个月关键)"
  
  evidence_chain:
    - "CEO Adams 2025 总增持股数 ~50K shares, 总卖出 ~5K shares, 净买入 45K [DM-INS-001]"
    - "2025 年股价从 $150 → $259 (+73%), 持股账面值 3x 增长来自股价, 实际增持仅贡献 40% [DM-INS-005]"
    - "历史反例: AerCap CEO Aengus Kelly 在 2018 窗口末期从 净买入转为净卖出 18 个月, 之后股价 -35% [DM-INS-008]"
  
  priority: "验证 lens — 用于 Ch 14 Kill Switch 的 '信号' 部分, 作为 leading indicator, 不进 Top 5 主结论"
```

---

## 范畴重分配检查 (铁律 N 减法 #5 硬约束)

| Lens | 含范畴重分配? | Old Category | New Category |
|------|--------------|--------------|--------------|
| Lens 1 | ★ 是 | 航空租赁+产品成长股 | CFM56 窗口捕获机 (有限寿命) |
| Lens 2 | ★ 是 | 垂直整合护城河 | 黑箱定价缺锚 |
| Lens 3 | ★ 是 | Self-funding compounder | 资本募集式扩张 (fund GP) |
| Lens 4 | — 否 (验证型) | — | — |
| Lens 5 | — 否 (验证型) | — | — |

**硬约束达标**: **3/5 含明确范畴重分配** ≥ 铁律 N 减法 #5 要求 (至少 3/5). **PASS**.

**额外检查** — 这 3 条范畴重分配是否**独立** (不是同一个重分配的 3 种说法)?

- Lens 1 是**时间维度**重分配 (永续 → 有限寿命)
- Lens 2 是**认知透明度**重分配 (可分析 → 黑箱)
- Lens 3 是**资本结构**重分配 (内部复利 → 外部 LP 放大)

三个维度独立, **不是同一位移的重复**. 在估值上: Lens 1 + Lens 2 + Lens 3 指向**同一个估值区间** ($7-11B vs 市值 $26B), 这是三角测量成功的标志.

---

## Top 5 Lens 使用分工 (Phase 5 章节映射)

| Phase 5 章节 | 主用 Lens | 辅助 Lens | 作用 |
|-------------|----------|----------|------|
| 执行摘要段 1 (旧地图) | — | — | 不展开 lens, 只陈述市场默认 |
| 执行摘要段 2 (新定义) | Lens 1 | — | 仅展开母 lens |
| 执行摘要段 3 (评级+Kill Switch) | Lens 1 + Lens 4 | Lens 2 (黑箱标注) | Kill Switch 信号来自 Lens 4 |
| Ch 1 核心争议 | 全部 5 个 | — | 铺 5 个承重 lens 的结构 |
| Ch 2 商业模式 | Lens 3 | Lens 1 | 资本结构决定商业模式 |
| Ch 4 财务深度 | Lens 1 | Lens 3 | 现金流结构对照 |
| Ch 5 竞争+博弈 | Lens 4 | Lens 1 | AAR 是 throughput 门阀 |
| Ch 7 认知边界 | Lens 2 | — | 黑箱 63.5% 的拆解 |
| Ch 10 估值 | Lens 1 | Lens 2 + Lens 3 | 三角收敛到 $7-11B |
| Ch 12 圆桌讨论 | 全部 | — | 5 大师视角对 5 lens 的反应 |
| Ch 14 Kill Switch | Lens 4 + Lens 5 | Lens 1 | 窗口关闭信号 |
| Ch 16 三个钉子 (固化) | Lens 1 | — | 仅母 lens 钉入读者记忆 |

---

## 真压缩自检 — 这 5 个 lens 会不会互相竞争成为"第二母命题"?

**风险**: 如果 Lens 2 (黑箱) 或 Lens 3 (资本募集) 的解释力比 Lens 1 强, 母命题可能被稀释.

**检查**:
- **Lens 2 单独能否替代 Lens 1?** — 不能. 黑箱只解释"为什么估值不可靠", 不解释"正确估值应该是多少". 还需要 Lens 1 提供有限寿命 DCF 框架.
- **Lens 3 单独能否替代 Lens 1?** — 不能. fund GP 估值框架需要先知道"被管理的资产是什么", 而资产定价靠 Lens 1 (CFM56 窗口 throughput).
- **Lens 2 + Lens 3 组合能否替代 Lens 1?** — 接近, 但 2+3 组合给出的估值是 $5-9B (更悲观), 而 Lens 1 给出的是 $9-11B. Lens 1 在中位水平, 是母 lens 的合理位置.

**结论**: Lens 1 作为母 lens 的地位稳固, Lens 2-3 是独立承重 lens, Lens 4-5 是验证 lens. 不存在第二母命题竞争风险.

---

## 与 P3 结晶的一致性检查

P3 FTAI_thesis_crystallization.md 提出 4 个候选范畴:
- A: 航空租赁+产品混合成长股 (旧地图) → 对应 Lens 1 的 old_category
- B: CFM56 Module Manufacturing Specialist → 部分吸收到 Lens 1 + Lens 2
- C: 垂直整合航空售后帝国 (Hybrid 闭环) → 被 Lens 2 (黑箱) 证伪
- D: CFM56 最后 5-10 年现金流提取 (时间窗口) → **Lens 1 的直接升级版 (窗口捕获机)**

**Lens Registry 对 P3 的精化**:
- P3 候选 D 只写了"时间窗口", 没有明确"窗口内结构" (feedstock 囤积 → throughput 捕获 → 塌陷三阶段)
- P3 候选 C 被 Lens 2 证伪 (垂直整合在账上但单位经济学不透明 = 假闭环)
- P3 候选 B 被 Lens 1 + Lens 3 吸收 (module manufacturing 只是窗口捕获机的一个输出端口)

**P0.75 → P4.5 路径**: 5 个 failure_points → P3 4 候选 → P4 红队 + 黑箱定位 → **P4.5 Lens 1 (候选 D 的升级精化) + Lens 2-3 (新维度)** → P5 组装.

---

## 交付状态

- [x] **Top 5 Lens 登记完整**: 5 个 lens 全部含 old/new category + valuation_implication + key_variable + evidence_chain
- [x] **范畴重分配 ≥3/5**: Lens 1/2/3 含明确 Hofstadter 格式
- [x] **三重分配独立性验证**: 时间维度 / 认知透明度 / 资本结构三个独立维度
- [x] **母 lens 稳固性验证**: Lens 1 无第二母命题竞争风险
- [x] **与 compression_test 一致**: Lens 1 new_category = CFM56 窗口捕获机
- [x] **章节映射规划**: 12 个 Phase 5 章节的 lens 分工
- [x] **P3 → P4.5 一致性**: Lens 1 是 P3 候选 D 的升级版

**下一步**: 产出 `FTAI_P4.5_handoff.md` — P5 工程清单 (DM 锚点 ≥30 + Mermaid ≥10 + 中场检测时点 ≥4) + process 无痕化自检 + Phase 5 章节重排规划.
