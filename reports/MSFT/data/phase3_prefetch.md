# MSFT Phase 3 Prefetch — 3路WebSearch结果
> 执行时间: 2026-02-17 | 6轮搜索 | 目标: Ch17/Ch19/Ch23数据支撑

---

## 搜索1: Azure AI贡献拆分 (Ch17)

### 1a. AI对Azure增长贡献 (季度趋势)
**来源**: Futurum Research, MSDynamicsWorld, Constellation Research
**关键数据点**:
- Q3 FY2025: AI services贡献Azure增长中的**16个百分点** (Azure整体增长~35%)
- Q4 FY2025: Azure整体增长**39%** YoY (AI贡献pp未单独披露)
- Q1 FY2026: Azure整体增长**40%**, AI贡献**~18个百分点** (占总增长45%)
- 趋势: AI贡献从FY2024 Q2的~8pp加速至Q1 FY2026的~18pp, 占比从~30%→~45%

**可信度评估**: 高 — 管理层earnings call直接披露

### 1b. Azure AI收入绝对值 (年化Run Rate)
**来源**: DCD, Constellation Research, Beth Kindig/IO Fund
**关键数据点**:
- Q1 FY2025 (2024.10): AI年化run rate突破**$10B** (Nadella称"史上最快达到$10B的业务")
- Q2 FY2025 (2025.05): AI年化run rate达**$13B**
- Q1 FY2026 (2025.12): AI年化run rate达**$26B** (半年翻倍)
- 推算: Azure FY2025总收入~$75B, AI占比从~13%→~35%快速提升

**可信度评估**: 高 — 管理层直接披露run rate数字

### 1c. Azure市场份额 (IaaS/PaaS)
**来源**: SiliconANGLE, theCUBE Research
**关键数据点**:
- Azure 2025E IaaS/PaaS规模: ~**$87.7B**
- IaaS/PaaS市场份额: AWS ~48.6% (降~4pp) / Azure ~35.3% (升~4pp) / GCP ~10%
- AI inference volume是Azure份额增长的核心驱动力

**可信度评估**: 中 — 第三方分析师估算, 口径可能不一致

### 1d. 收入构成: Inference vs Training
**来源**: DCD, Ed Zitron
**关键数据点**:
- Nadella明确: **"It's all inference"** — AI收入主要来自推理, 非训练
- MSFT拒绝出售裸GPU用于训练, 因推理需求太大
- OpenAI leaked docs: OpenAI支付MSFT的compute费用中, inference占大头

**可信度评估**: 高 — CEO公开发言

---

## 搜索2: SaaS产品渗透曲线历史类比 (Ch19)

### 2a. Microsoft Teams渗透曲线
**来源**: Business of Apps, Desk365, Notta
**关键数据点**:
- 2017年3月: 发布, **2M** DAU
- 2019年11月: **20M** DAU (发布后~2.5年)
- 2020年3月: **44M** DAU (COVID开始, 4个月内+120%)
- 2020年4月: **75M** DAU
- 2021年4月: **145M** DAU
- 2022年: **270M** DAU
- 2023年: **320M** DAU
- 从0到3亿: **~6年** (2017→2023), 但COVID加速了2-3年进程
- Fortune 100中**93%+**使用Teams

**可信度评估**: 高 — MSFT官方披露+第三方统计

### 2b. Slack渗透曲线
**来源**: SQ Magazine, SEO Sandwitch
**关键数据点**:
- 2014年2月: 公开发布
- 2019年: **12M** DAU (发布后~5年)
- 2025年: **79M** DAU
- 从0到1200万: ~5年
- 市场份额: 整体18.6% (但tech sector <500人公司占52%)

**可信度评估**: 中 — 部分为第三方估算

### 2c. Zoom渗透曲线
**来源**: SQ Magazine, M.io
**关键数据点**:
- 2013年发布, COVID前缓慢增长
- 2020年: 爆发式增长至**~300M** MAU (会议参与者, 非注册用户)
- 视频会议市场份额: **55.9%** (2024), Teams **32.3%**
- 从小众到主流: COVID加速了~5年的自然渗透

**可信度评估**: 中 — MAU vs DAU口径不同, 300M为会议参与者非DAU

### 2d. 渗透曲线类比总结 (Ch19可用)
| 产品 | 0→规模化 | 加速因素 | 自然渗透估算 |
|------|----------|----------|-------------|
| Teams | ~6年(0→300M DAU) | COVID + Office捆绑 | ~8-10年 |
| Slack | ~5年(0→12M DAU) | 开发者社区口碑 | 与实际接近 |
| Zoom | ~7年(0→300M MAU) | COVID | ~12-15年 |
| **Copilot类比** | **目前~2年** | **企业AI需求+Office捆绑** | **预期5-8年达饱和** |

---

## 搜索3: MSFT GPU采购量和Azure AI产能 (Ch23 NVDA桥梁)

### 3a. MSFT CapEx规模与GPU占比
**来源**: CNBC, GlobalDataCenterHub, Platformonomics
**关键数据点**:
- FY2025 CapEx计划: **$80B** (Nadella 2025.01公告, 后续确认)
- Q1 FY2026单季CapEx: **$37.5B** (史上最高单季)
- **2/3为短周期资产**(GPU/CPU), 即Q1 FY2026中~$25B用于GPU/CPU
- 短周期资产折旧匹配~2年合同期
- 1/3为长周期资产(数据中心建筑/电力/土地租赁, 15-20年)
- **每个数据中心每3年需~$3B替换CapEx** (~$1B/年/站点)

**可信度评估**: 高 — CFO Amy Hood earnings call直接披露比例

### 3b. MSFT是否为NVDA最大客户
**来源**: Tom's Hardware, ElectroIQ
**关键数据点**:
- NVDA数据中心收入: FY2025 Q4单季**$35.6B**, 全年**$115.2B**
- NVDA前3大客户合计占数据中心收入**~53%** (~$21.9B/季)
- CSP(AWS/Azure/GCP/OCI/CoreWeave)合计占数据中心收入**~50%**
- NVDA不披露单一客户具体金额, 但MSFT/META/AMZN被广泛认为是前三
- **估算**: MSFT占NVDA数据中心收入**15-20%** (行业共识, 非官方)

**可信度评估**: 中 — NVDA不披露客户细分, 15-20%为分析师估算

### 3c. MSFT自研芯片进展 (Maia)
**来源**: Microsoft Official Blog, SemiAnalysis, IT Pro
**关键数据点**:
- **Maia 100**: 2023.11发布, TSMC 5nm, 64GB HBM2E, 1.8 TB/s带宽
- **Maia 200**: 2026.01发布 — TSMC **3nm**, 216GB HBM3e, **7 TB/s**带宽, 272MB片上SRAM
  - 定位: **推理专用**加速器 (inference-optimized)
  - 部署: US Central (Des Moines, Iowa) 已上线, US West 3 (Phoenix) 即将上线
  - 原计划2025量产, 因设计修改/人员流动延至2026
- CTO Kevin Scott: 长期目标**"mainly Microsoft chips"**运行AI数据中心
- 但同时承认将继续使用NVIDIA/AMD (where best price-performance)
- **Cobalt 100**: ARM架构通用CPU, 与Maia配对

**可信度评估**: 高 — MSFT官方博客+发布会

### 3d. Azure AI产能约束
**来源**: Directions on Microsoft, WindowsForum, CIO Dive
**关键数据点**:
- 产能约束预计**持续至FY2026上半年 (至2026年6月)**
- 约束瓶颈: **电力 > 空间 > 计算** (Nadella: "biggest issue is power, not compute")
- CFO Hood: "has been short now for many quarters" — 连续多个季度供不应求
- 部分Azure区域(Northern Virginia, Texas)限制新订阅
- MSFT有GPU库存但缺电力安装: **"GPUs sitting in inventory"**
- Azure增长被产能约束**cap住**: 实际需求增速>40%, 但供给限制了报告增长

**可信度评估**: 高 — 管理层earnings call直接披露

---

## 数据缺口记录
| 缺口 | 说明 | 影响章节 | 处理建议 |
|------|------|----------|----------|
| Azure workload类型细分 | IaaS/PaaS/AI各workload无官方拆分 | Ch17 | 用AI pp贡献反推, 标注为估算 |
| NVDA客户具体金额 | MSFT占比15-20%为分析师共识非官方 | Ch23 | 标注可信度, 用$17-23B区间 |
| Maia 100实际部署规模 | 未披露具体GPU当量或workload占比 | Ch23 | 定性描述, 注明"早期部署" |
| Copilot用户数/渗透率 | 未在本轮搜索中获取 | Ch19 | 需Phase 3额外搜索 |
