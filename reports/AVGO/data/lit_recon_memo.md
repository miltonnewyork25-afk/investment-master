# AVGO (Broadcom) 文献侦察备忘录
> Phase -0.5 | 5路WebSearch合成 | 2026-03-06 | ~45K chars详细文件在data/lit_recon_*.md

---

## 一、VMware竞争格局 (详见 lit_recon_vmware.md)

**核心发现**:
- Gartner预测VMware HCI份额从70%(2024)→40%(2029)，Nutanix是主要受益者
- Nutanix每季度新增~700客户(多数来自VMware迁移)，Q2 FY2026新增1,000+(8年最高)
- Broadcom策略: "更少客户，更高ARPU" — 价格提150%-1,500%，吸收SMB流失，锁定大企业
- 90%+顶级10,000客户已转订阅制，软件OPM达77%
- **VCF 9.0 AI整合**: Private AI Services成为标配，定位企业私有AI基础设施平台
- **关键矛盾**: Q1 FY2026软件收入仅+1% YoY — 提价红利是否已耗尽?

**分析影响**: CQ-3(VMware提价红利vs客户流失)是报告最大信息缺口已填补。牛市=93%毛利+AI-native平台黏性; 熊市=HCI份额腐蚀+K8s结构性威胁

---

## 二、AI ASIC竞争 (详见 lit_recon_ai_asic.md)

**核心发现**:
- Broadcom 60-70% ASIC设计服务份额，$73B backlog(18个月可见性)
- **Google TPU Ironwood**: Broadcom仍保留核心XPU设计，但MediaTek获I/O+SerDes+TSMC协调(成本低20-30%)。Google计划2027年500万颗TPU v7
- **OpenAI Titan**: Broadcom联合设计，TSMC 3nm，H2 2026量产。短期利好(设计服务收入)，长期风险(能力内化)
- **推理转移**: NVIDIA推理份额预计从80%→20-30%(2028)，ASIC捕获70-75%。这是AVGO最大结构性顺风
- **Marvell**: ~15%份额(Amazon Trainium+Microsoft Maia)，但Broadcom捕获不成比例的价值
- **JPMorgan估计**: 定制AI ASIC市场2025年达$30B

**分析影响**: CQ-1(AI ASIC永续平台vs CapEx周期)信息充分度从"高"升至"极高"。训练vs推理分叉是估值关键假设

---

## 三、网络+光互连 (详见 lit_recon_networking.md)

**核心发现**:
- 交换芯片~90%云数据中心份额，Tomahawk 6(102.4T)领先NVIDIA Spectrum-X约1年
- **以太网>InfiniBand**: 2025年中以太网在AI后端网络采用率超过InfiniBand。UEC 1.0标准+Meta验证RoCE≈IB性能
- **CPO**: 第3代TH6-Davisson出货中，2026是CPO量产拐点年。可能颠覆插拔式光模块厂商
- **Arista依赖**: $6.8B PO(从$4.8B上涨)，Arista CEO称芯片定价"horrendous"——Broadcom捕获定价权
- **800G/1.6T**: 前5大光学供应商之一，垂直整合(交换芯片+光学DSP+CPO)是差异化

**分析影响**: 网络可能是比ASIC更持久的护城河。CQ-2(客户集中锁定vs脆弱)中，网络锁定深度>ASIC锁定深度

---

## 四、估值+SBC+管理层 (详见 lit_recon_valuation.md)

**核心发现**:
- Q1 FY2026: $19.3B收入(+29%), AI $8.4B(+106%), 软件$6.8B(+1%)
- **SBC 11.3%且上升中**(非正常化): $2.18B/Q(+70% YoY), 未确认余额$27B→至少持续到FY2027
- SBC调整后FCF收益率仅~1.5%(vs报告2.1%)——安全边际极薄
- 29位分析师Buy/2位Hold，平均目标价$458(+38%上行)
- **Hock Tan合同延至2030**, 但继任计划不透明。FY2024薪酬投票仅61%通过
- Q2指引$22B(+14% QoQ), AI半导体$10.7B

**分析影响**: CQ-4(估值AI溢价合理vs泡沫)关键输入: SBC调整后FCF yield 1.5%要求完美执行。CQ-5(Hock Tan)风险降低(合同至2030)但长期不变

---

## 五、传统半导体+Apple风险 (详见 lit_recon_traditional.md)

**核心发现**:
- **Apple N1芯片已量产**: 2025年iPhone 17替代Broadcom WiFi，2026扩展至iPad/Mac。收入影响~$2.7B(占总收入4.3%)
- Apple仍保留Broadcom RF滤波器，未100%去Broadcom化
- 非AI半导体~$16-17B(FY2025), U型复苏中(宽带领先，企业网络/存储滞后)
- 资本回报加速: Q1 FY2026回购$7.8B(年化~$31B) + 股息$3.1B
- Wall Street共识FY2026收入$96B(+50%)

**分析影响**: CQ-6(传统半导体稳定vs衰退)Apple WiFi替代已执行但影响可控(4.3%). 非共识风险: Apple替代+周期复苏延迟同时发生可能触发"基座稳定性"重估

---

## 六、信息缺口更新 (vs pre_research_brief)

| 缺口 | pre_research状态 | 文献侦察后状态 |
|------|-----------------|---------------|
| VMware竞争格局 | 最大缺口 | **已填补** — Nutanix+K8s+VCF 9.0 AI |
| Google TPU迁移 | 50%概率未建模 | **已填补** — MediaTek获I/O模块,Broadcom保留核心XPU |
| OpenAI Titan | 外部标记2026H2 | **已确认** — H2 2026量产,Titan 2计划A16制程 |
| Hock Tan继任 | 零信息 | **部分填补** — 合同延至2030,但继任人选仍不透明 |
| SBC正常化 | 12%是否回归? | **已填补** — 11.3%且上升,$27B未确认余额,不会很快正常化 |
| 光模块/CPO | 零覆盖 | **已填补** — Gen 3出货,2026 CPO拐点年 |

---

## 七、核心矛盾预锐化

1. **最尖锐矛盾**: SBC调整后FCF yield 1.5% vs AI推理转移(80%→20-30% NVIDIA份额)的结构性顺风 — 估值需要$100B+ AI收入(管理层FY2027目标)才能合理化
2. **最大不确定性**: VMware软件+1% YoY — 是提价红利耗尽还是暂时停滞? 下一季度将是关键验证点
3. **最被低估的优势**: 网络护城河(90%交换芯片+CPO+以太网趋势)可能比ASIC设计更持久
4. **最被低估的风险**: SBC不正常化(11.3%且上升)使真实FCF增长远低于非GAAP叙事
