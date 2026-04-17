# FORM Phase 3 补强: 上下游产业链 + 中国竞争 + AI技术路线

> **补强目标**: 填补Phase 3主文件的四个盲区——上游设备依赖、下游ATE信号、中国竞争者、AI测试技术演进
> **写作日期**: 2026-04-17 | **参照**: LITE供应链验证框架(M11/M12)

---

## S1: 上游供应链——Disco垄断与MEMS设备依赖

### 上游结构图

探针卡制造的上游供应链有一个被忽视的瓶颈:

```
[Disco Corporation] → MEMS加工设备(切割/研磨) → [探针卡制造商(FORM/Technoprobe)] → [ATE集成商(Advantest/Teradyne)] → [芯片厂(SK Hynix/Samsung/TSMC)]
```

**Disco的隐性垄断**[DM-UP-001]: 日本Disco Corporation控制了MEMS探针卡生产所需的关键加工设备——晶圆切割和研磨系统。Disco在全球半导体切割/研磨设备市场占据主导地位。这意味着FORM和Technoprobe都依赖同一家上游设备供应商。

**对FORM的含义**:
1. **成本转嫁能力弱**: Disco设备是FORM的必需品投入，Disco有定价权而FORM没有[DM-UP-002]。当Disco提价时，FORM的GM被压缩(下游客户不接受探针卡涨价)
2. **产能扩张受限**: 如果FORM想扩产，必须排队采购Disco设备。HBM超级周期中，Disco设备需求来自整个半导体产业，FORM不是优先级最高的客户
3. **竞争者同源**: Technoprobe买的也是Disco设备——上游瓶颈不构成FORM的竞争壁垒

**LITE参照 (M11框架)**[DM-UP-003]: LITE面临InP基板供应商AXT的产能约束(6英寸晶圆有限)。但LITE的情况更好——LITE是200G/lane EML的唯一量产商，有足够的下游定价权消化上游成本。FORM没有这种定价权(Phase 1已证伪)，因此上游成本压力对FORM的利润侵蚀更大。

### 上游材料: 钨微探针 + 陶瓷基板

- **钨微探针**: MEMS探针卡的核心消耗品。供应商分散，不构成瓶颈
- **陶瓷基板**: 高精度陶瓷基板供应商集中在日本(京瓷等)，供应稳定但价格逐年上升[DM-UP-004]
- **总结**: 上游材料不是FORM的风险点，Disco设备才是真正的上游约束

---

## S2: 下游信号——ATE市场验证探针卡需求

### Advantest + Teradyne: AI测试需求的领先指标

ATE(自动测试设备)市场是探针卡需求的**领先指标**——ATE先行，探针卡跟随(每台ATE需要配套探针卡)。

**ATE市场2025-2026**[DM-DOWN-001]:
| 指标 | Advantest | Teradyne | 行业总计 |
|------|----------|----------|---------|
| 2025收入 | — | $3.19B (+13% YoY) | $15.06B |
| 2026E收入 | — | $4.18B (+31%) | $16.04B |
| 2031E市场 | — | — | $21.59B |
| 份额 | 58% | ~22% | 80%合计 |

**Teradyne Compute增长90%**[DM-DOWN-002]: Teradyne的Compute产品线(服务AI加速器和数据中心芯片)FY2025增长90%，现在占SoC收入约一半(2023年仅10%)。这验证了AI驱动的测试需求是真实的，不是概念。

**对FORM的传导验证**:
- **正面信号**: ATE市场2026E增长6.5%($16.04B)，Teradyne Compute+90% → 确认AI测试需求真实
- **但传导有衰减**: ATE增长31%(Teradyne) vs 探针卡市场增长9.3% → 探针卡增速远低于ATE[DM-DOWN-003]
- **原因**: ATE是设备(一次性CapEx)，探针卡是消耗品(跟随wafer start)。AI芯片的wafer start增速远低于ATE采购增速(首次配置)
- **含义**: 用ATE增速外推探针卡增速 = 高估。探针卡增长更像DRAM wafer start增速(~10-15%)，不是ATE增速(31%)

### Advantest双重投资的深层含义

Advantest在2025年同时投资FORM和Technoprobe[DM-DOWN-004]。表面是"对冲"，深层含义:

1. **ATE-探针卡整合趋势**: Advantest投资探针卡公司 = ATE和探针卡的技术边界在模糊。未来ATE可能内置更多测试功能，减少对独立探针卡的依赖
2. **谁先被整合?**: 如果Advantest最终收购一家探针卡公司，被收购方在定价/份额上将获得ATE通道优势。另一家将被边缘化
3. **FORM的风险**: 如果Advantest选择整合Technoprobe(利润率更高、增速更快)，FORM将失去ATE合作通道[DM-DOWN-005]

### Memory客户CapEx验证 (M12框架: 真实需求 vs 渠道填充)

**LITE教训 (M12)**[DM-DOWN-006]: LITE面临"管理层叙事vs真实出货"的验证挑战——hyperscaler CapEx指引↑但实际光模块部署可能滞后。

**FORM同样面临这个问题**:
- Memory CapEx 2026: $60.5B (+23%)[DM-SUPPLY-001, Phase 3主文件]
- 但CapEx中多少真正转化为探针卡订单？需要监控:
  - **SK Hynix/Samsung HBM晶圆投片量** (非CapEx公告)——实际投片量才驱动探针卡消耗[DM-DOWN-007]
  - **FORM DSO变化**: Phase 2已发现CCC从81天恶化到107天。如果DSO继续上升→可能是渠道填充(客户收货但推迟付款)[DM-DOWN-008]
  - **FORM库存天数**: 如果成品库存上升→订单可能在放缓而管理层仍在生产

**Q1 FY2026验证窗口 (April 29, 2026)**: 12天后的earnings call将是关键验证点——
1. DRAM收入是否真的创新高？(管理层预告)
2. GM是否维持>42%？(Q4结构性改善是否持续？)
3. F&L是否继续萎缩？(Technoprobe份额蚕食)
4. 全年guidance是否给出？(管理层对2026可见度)

---

## S3: 中国竞争者——第三条战线

### 强一半导体(MaxOne Semiconductor): 中国探针卡龙头

**基本面**[DM-CN-001]:
- 成立2015年，总部苏州，华为哈勃投资
- 国内**唯一实现MEMS探针卡批量产业化**的公司
- 2022-2024营收CAGR 58.85%
- 2023年全球探针卡行业第9位(Yole数据)——首次有中国企业进入全球前十
- 已启动IPO辅导(科创板)
- 技术水平: 探针密度数万针，45μm间距，精度~7μm

**中国探针卡市场格局**[DM-CN-002]:
- 中国市场规模~$6亿(2023), 占全球~24%
- 国产化率<10% — 替代空间巨大
- 主要国产企业: 强一半导体、矽电半导体、泽丰半导体、道格特、迈斯卡德等
- 但整体技术水平仍在追赶: 高端MEMS探针卡(HBM/先进逻辑)仍依赖FORM/Technoprobe进口

### 对FORM的影响评估

**短期(2026-2027): 影响有限**[DM-CN-003]
- 中国企业在HBM/先进DRAM领域尚无法与FORM竞争
- 强一半导体的客户主要是中国成熟制程芯片厂(非HBM)
- FORM在中国的收入占比不高(主要客户是SK Hynix/Samsung/Micron/TSMC，非中国厂商)

**中期(2028-2030): 需要关注**[DM-CN-004]
- **如果中国DRAM厂(长鑫存储/CXMT)成功量产HBM**: 国产探针卡需求将急剧上升
- **强一半导体IPO后资本充裕**: 可能加速向先进MEMS技术追赶
- **地缘政治**: 美国出口管制可能限制FORM向中国客户销售先进探针卡 → 为中国企业创造市场真空
- **CAGR 58.85%的增速**: 虽然基数小，但如果维持5年，强一半导体将成为$200-300M收入规模的企业

**与Technoprobe威胁的对比**:
- Technoprobe是**现实威胁**(2-3年内可能进入DRAM)
- 中国竞争者是**结构性威胁**(5-8年，但方向确定)
- 两者叠加 = FORM的护城河在两个方向同时被侵蚀[DM-CN-005]

### 中国上下游信号

**中国Memory客户信号**[DM-CN-006]:
- 长鑫存储(CXMT): 中国最大DRAM厂，目前仅量产DDR4/LPDDR4，HBM技术差距>3年
- 中国HBM市场2025年~$300亿，2030年预计$980亿 → 但中国企业在HBM几乎零份额
- 中国DRAM总产能占全球<5% → 短期内不影响FORM全球市场份额

**中国ATE/测试设备信号**[DM-CN-007]:
- 华峰测控: 中国最大ATE公司，但主要在成熟制程
- 中国半导体测试设备国产化率~15%(比探针卡的<10%稍高)
- 政策支持: 大基金二期加大测试设备投资，但距离先进制程仍有差距

---

## S4: AI技术路线——HBM世代演进与测试需求变化

### HBM技术路线图 (2026-2028)

[DM-AI-001] HBM世代演进与测试需求对照:

| 世代 | 量产时间 | Stack高度 | 带宽 | 接口宽度 | 对探针卡需求 |
|------|---------|----------|------|---------|------------|
| HBM3E | 2024-2025 (量产中) | 8-12层 | 1.17 TB/s | 1024-bit | 基线需求 |
| HBM4 | 2026H1 (Samsung首发, SKH/Micron跟进) | 12-16层 | 2+ TB/s | 2048-bit | pin count 2x → 探针卡复杂度↑ |
| HBM4E | 2027H2 (开发完成2026H1) | 16层 | ~3 TB/s | 2048-bit+, 12.8GT/s | 极高频测试要求 |
| C-HBM4E | 2027-2028 | 16层+ | >3 TB/s | 定制化 | TSMC 3nm base die → 全新测试方案 |

**关键时间节点**:
- **2026Q1-Q2**: Samsung/SK Hynix HBM4量产认证完成[DM-AI-002]
- **2026H2**: HBM4放量 → FORM DRAM收入加速的关键窗口
- **2027**: HBM4E占HBM需求40%[DM-AI-003] → 如果FORM拿到HBM4E认证，收入再上台阶
- **2027-2028**: C-HBM4E引入TSMC 3nm base die → 测试复杂度质变(不仅测DRAM die，还要测logic base die)

### Chiplet/异构集成对探针卡的影响

**正在发生的范式转变**[DM-AI-004]: 半导体测试正从"die-level test"向"system-level test"演进。

**传统测试流程**: 
单个die → 探针卡测试(wafer level) → 切割 → 封装 → 最终测试

**异构集成测试流程**:
多个chiplet die → 各自探针卡KGD测试 → 组装(CoWoS/hybrid bond) → 系统级测试(SLT) → 最终测试

**对FORM的含义**[DM-AI-005]:
1. **正面**: KGD(Known Good Die)要求更严 → 每个chiplet都必须单独探针卡测试，测试覆盖率从90%+提升到99%+。探针卡用量增加
2. **正面**: 异构集成的die间距缩小到<10μm → 需要更高精度的MEMS探针卡，技术壁垒上升
3. **负面**: 系统级测试(SLT)可能部分替代wafer级探针卡测试 — 如果SLT能发现更多缺陷，减少对前道wafer test的依赖[DM-AI-006]
4. **负面**: MPI+ASE合作开发chiplet探针卡(2026Q2首产品)[DM-AI-007] → 新竞争者进入

**净影响评估**: 短期(2026-2027)正面大于负面 — KGD需求上升确定，SLT替代尚未成熟。中期(2028+)不确定 — 取决于SLT技术进步速度。

### CoWoS产能约束的间接影响

**CoWoS是当前AI芯片的主要瓶颈**[DM-AI-008]:
- TSMC: "CoWoS产能非常紧张，2025年和2026年处于售罄状态"
- HBM供应已预分配至2026年
- CoWoS产能限制了HBM的实际部署速度

**对FORM的含义**:
- **CoWoS瓶颈 = HBM测试需求的天花板**: 即使HBM die产出增加，如果CoWoS无法封装，这些die就堆积在库存中，不产生新的探针卡消耗需求[DM-AI-009]
- **反面**: CoWoS扩产2027年会缓解 → 被压抑的测试需求可能在2027-2028释放
- **净效果**: HBM探针卡需求增长可能是"台阶式"(2027跳升)而非"斜坡式"(持续线性增长)

---

## S5: CEO减持信号

### Mike Slessor (CEO) 持续减持

[DM-INSIDER-001] CEO减持记录:
| 日期 | 股数 | 均价 | 金额 | 备注 |
|------|------|------|------|------|
| 2025年10月 | — | ~$45 | $162K | 10b5-1计划 |
| 2026年2月18日 | 8,664股 | $92-95 | $816K | 10b5-1计划 |
| 2026年3月18日 | 10,227股 | ~$100 | ~$1.0M | 10b5-1计划 |
| 2026年4月15日 | 11,204股 | $125-129 | $1.44M | 10b5-1计划 |

**总减持**: 仅2026年已减持~$3.3M(30,000+股)[DM-INSIDER-002]
**剩余持仓**: 449,565股 (~$57M at $128)
**回购对比**: 公司回购授权仅剩$36.6M[DM-INSIDER-003] — CEO个人减持$3.3M vs 公司回购$36.6M → 回购规模很小，无法对冲内部人卖出

**信号解读**:
- 10b5-1计划是预设的(2025年8月设立)，不一定代表实时看法
- 但减持加速(从$162K → $816K → $1.0M → $1.44M)与股价上涨同步 → CEO在利用股价高位减持
- Phase 2已发现: 公司回购η仅0.13-0.22(双重价值毁灭)。CEO减持+低效回购=资本配置差[DM-INSIDER-004]

**LITE参照**: LITE的NVIDIA $2B投资是正向资本信号(大客户用真金白银背书)。FORM没有类似的外部验证——相反，CEO在卖出[DM-INSIDER-005]。

---

## S6: LITE供应链框架(M11/M12)对FORM的映射总结

| M11/M12框架要素 | LITE情况 | FORM情况 | 对FORM更有利/不利? |
|----------------|---------|---------|------------------|
| **上游供应约束** | AXT InP基板有限→稀缺性支撑定价权 | Disco设备共享→不构成竞争壁垒 | 不利 |
| **下游客户集中** | NVIDIA+Google~43%→高但有长期合同 | SK Hynix 22.9%+Samsung→无长期排他 | 不利 |
| **定价权** | 200G/lane EML唯一量产→定价权强 | 标准化探针卡+客户培育第二供应商→弱 | 明显不利 |
| **替代威胁** | SiPh/CPO 3-5年→明确路线图 | Technoprobe 2-3年+SLT长期→多路径 | 不利 |
| **Hyperscaler CapEx** | 直接受益(光模块)→传导系数高 | 间接受益(CapEx→WFE→test→probe)→衰减4层 | 不利 |
| **AI bubble风险** | Polymarket 16%概率→可量化 | 同等暴露但传导滞后→风险同等 | 中性 |
| **管理层信号** | NVIDIA $2B投资=外部背书 | CEO减持$3.3M=内部人退出 | 明显不利 |

[DM-LITE-001] **总结**: LITE和FORM都是AI/HBM受益标的，但供应链框架对比显示FORM在每个维度都更弱——定价权更弱、替代威胁更近、传导衰减更多、管理层信号更差。市场给FORM更高的EV/Sales(12.7x vs LITE ~6-8x)缺乏基本面支撑。

---

## S7: Phase 3补强后的整合评估

### 补强前 vs 补强后的论据对比

| 维度 | 补强前(Phase 3主文件) | 补强后新增 | 对thesis影响 |
|------|---------------------|-----------|-------------|
| **竞争** | Technoprobe双寡头对比 | +中国MaxOne(长期第三战线) +MPI/ASE chiplet探针卡 | 强化看空 |
| **上游** | 未覆盖 | +Disco设备垄断=不构成FORM壁垒 +上游成本转嫁能力弱 | 强化看空 |
| **下游** | 供应链传导粗略 | +ATE市场验证(Teradyne Compute +90%) +传导衰减量化 +DSO/CCC监控 | 中性偏空 |
| **AI路线** | HBM content粗略 | +HBM3E→4→4E完整时间表 +Chiplet/SLT双向影响 +CoWoS瓶颈天花板 | 中性(正负对冲) |
| **Insider** | Phase 2已发现 | +2026年减持加速$3.3M +回购仅$36.6M | 强化看空 |

### 更新后的Kill Switch (Phase 3完整版)

**红灯 (thesis断裂)**:
1. Hyperscaler CapEx连续2季<+10% YoY
2. ROIC FY27仍<WACC (目前4.9% vs 9.0%)
3. Technoprobe获任何HBM maker量产订单
4. GM<38%连续2季

**黄灯 (需要修正)**:
5. SK Hynix开始Technoprobe DRAM认证 (新增)
6. SPHBM4标准被主要HBM maker采用 (新增)
7. SK Hynix HBM4系统级测试设备商业化 (新增)
8. FORM DSO继续恶化>120天 (新增)

**上修信号 (对thesis不利)**:
9. FORM GM连续2季>44% (结构性改善确认)
10. DRAM收入FY2026>$350M (超预期)
11. F&L收入企稳(QoQ不再下降)

---

## Phase 3补强 DM锚点注册表 (增量)

| ID | 数据点 | 来源 | 置信度 |
|-----|--------|------|--------|
| DM-UP-001 | Disco垄断MEMS加工设备 | Mordor Intelligence/行业报告 | A |
| DM-UP-002 | FORM无法向下游转嫁Disco成本 | 推断(定价权弱) | B |
| DM-UP-003 | LITE有InP定价权 vs FORM无探针卡定价权 | M11对比 | B |
| DM-UP-004 | 陶瓷基板供应商集中日本(京瓷等) | 行业知识 | B |
| DM-DOWN-001 | ATE市场2025 $15.06B → 2026E $16.04B | Mordor Intelligence | A |
| DM-DOWN-002 | Teradyne Compute FY2025 +90%, 占SoC收入一半 | Teradyne earnings | A |
| DM-DOWN-003 | ATE增速31% vs 探针卡9.3% → 传导衰减 | 计算 | B |
| DM-DOWN-004 | Advantest 2025年投资FORM和Technoprobe | 行业新闻 | A |
| DM-DOWN-005 | Advantest整合Technoprobe风险 | 推断 | C |
| DM-DOWN-006 | LITE M12: 管理层叙事vs真实出货验证 | LITE分析 | B |
| DM-DOWN-007 | 应监控HBM实际投片量(非CapEx公告) | M12框架 | B |
| DM-DOWN-008 | FORM CCC恶化81→107天, DSO需监控 | Phase 2 | A |
| DM-CN-001 | 强一半导体: 中国唯一MEMS探针卡量产, 2023全球第9, CAGR 58.85% | 证券时报/Yole | A |
| DM-CN-002 | 中国探针卡市场$6亿(2023), 国产化率<10% | 格隆汇/行业报告 | A |
| DM-CN-003 | 短期影响有限: 中国企业不在HBM竞争 | 评估 | B |
| DM-CN-004 | 中期威胁: CXMT+出口管制+IPO后资本 | 推断 | B |
| DM-CN-005 | Technoprobe(现实)+中国(结构)=双向侵蚀 | 综合 | B |
| DM-CN-006 | CXMT: HBM差距>3年, 中国DRAM产能<5%全球 | 行业 | B |
| DM-CN-007 | 中国ATE国产化率~15%, 华峰测控主要在成熟制程 | 行业 | B |
| DM-AI-001 | HBM3E→4→4E→C-HBM4E完整路线图 | Tom's Hardware/TrendForce | A |
| DM-AI-002 | Samsung/SKH HBM4量产认证2026Q1-Q2 | Digitimes/TrendForce | A |
| DM-AI-003 | HBM4E占2027 HBM需求40% | TrendForce | A |
| DM-AI-004 | 测试范式从die-level向system-level演进 | IEEE/SemiEngineering | A |
| DM-AI-005 | KGD要求↑→探针卡用量增, die间距<10μm→技术壁垒↑ | 技术分析 | B |
| DM-AI-006 | SLT可能部分替代wafer级探针卡测试 | Integra-Tech FAQ | B |
| DM-AI-007 | MPI+ASE chiplet探针卡2026Q2首产品 | 行业新闻 | A |
| DM-AI-008 | TSMC CoWoS 2025-2026售罄 | TSMC earnings | A |
| DM-AI-009 | CoWoS瓶颈=HBM测试需求天花板 | 推断 | B |
| DM-INSIDER-001 | CEO 2026年减持记录(4笔, 30K+股) | SEC Form 4 | A |
| DM-INSIDER-002 | CEO 2026年减持总额~$3.3M | SEC Form 4 | A |
| DM-INSIDER-003 | 回购授权仅剩$36.6M | FORM Q4 earnings | A |
| DM-INSIDER-004 | CEO减持+低效回购=资本配置差 | 综合 | B |
| DM-INSIDER-005 | LITE有NVIDIA $2B投资背书 vs FORM CEO卖出 | 对比 | B |
| DM-LITE-001 | M11/M12框架: FORM在7个维度均弱于LITE | 对比分析 | B |
