# 产品矩阵网络分析框架 v1.0

> **Skill ID**: `ecosystem_graph.product_matrix_network_v1.0`
> **主路由**: Ecosystem Graph (80%)
> **辅助路由**: Research Mechanism (证伪协议)
> **来源**: 美股公司产品矩阵分析skill.docx
> **归档日期**: 2026-01-27

---

## Skill 用途

将任意公司的"产品矩阵"从线性清单升级为**网络化平台/生态系统**模型：
- 产出节点(Node)-关系(Edge)-分层网络-飞轮-利润池迁移-情景推演-证伪清单
- 确保不遗漏关键视角：分发/默认入口、身份、支付计费、开发者供给、数据闭环、信任合规等

---

## 输入要求

```yaml
inputs:
  target_company: "[必填] 目标公司"
  time_window: "3-5y (可选1-10y)"
  scope:  # 必须覆盖
    - hardware
    - software
    - services
    - platform
    - developers
    - AI
    - payments
    - billing
    - distribution
    - identity
    - data
    - trust
    - compliance
  geo_regulatory: "global (必要时按地区拆分，因监管改变边强度)"
  depth: "investor-grade"
```

---

## 角色定义 (Roles)

每个节点可被标记为一个或多个角色：

| Role ID | 角色名称 | 描述 |
|---------|----------|------|
| **ENTRY** | 获客入口 | 装机/装载/用户获取入口 |
| **TRAFFIC** | 流量引擎 | 使用频次/留存/数据采集 |
| **MONETIZE** | 变现通道 | 订阅/广告/抽佣/交易/金融等 |
| **PROFIT** | 利润承载 | 高毛利/高贡献利润池 |
| **MOAT** | 护城河 | 锁定/标准/生态控制/数据/规模经济/信任合规 |

---

## 边类型定义 (Edge Types) - MECE

| Edge Type | 描述 | 典型示例 |
|-----------|------|----------|
| **DISTRIBUTION_DEFAULTS** | 分发/默认入口：预装、默认搜索、渠道入口、合作分发 | iOS预装Safari、Google默认搜索协议 |
| **IDENTITY** | 账号与身份：统一账户、SSO、跨端同步、权限体系 | Apple ID、Google Account |
| **PAYMENTS_BILLING** | 支付与计费：订阅、抽佣、结算、金融服务、统一账单 | App Store 30%抽成、AWS账单 |
| **DATA_FLYWHEEL** | 数据回流：行为→模型/规则→体验→更多行为 | FSD数据闭环、推荐算法 |
| **DEVELOPER_SUPPLY** | 开发者供给：API/SDK/商店/分发→供给扩张 | App Store生态、AWS服务 |
| **HARDWARE_INTEGRATION** | 硬件绑定/体验协同：跨设备、传感器、互操作 | Apple生态设备协同 |
| **BUNDLING_CROSSSUBSIDY** | 捆绑/交叉补贴：套餐、低价入口喂养高毛利层 | Prime会员捆绑、Office 365 |
| **MFG_SUPPLYCHAIN_REUSE** | 制造/供应链复用：工艺、产线、规模/范围经济 | Tesla电池产线复用 |
| **NETWORK_EFFECTS** | 网络效应：直接/间接/多边平台（供需两侧） | 社交网络、marketplace |
| **TRUST_COMPLIANCE_SAFETY** | 信任/合规/安全：隐私、内容治理、认证成为壁垒 | 金融牌照、隐私合规 |

---

## 输出产物 (Artifacts)

### A0. Executive Map (一页结论图)

**7项必答**：

```yaml
exec_map:
  1_platform_judgment: "是否已平台化？平台化程度评分[1-5]"
  2_core_assets_trifecta:
    traffic_assets: "[流量资产列表]"
    monetization_assets: "[变现资产列表]"
    moat_assets: "[护城河资产列表]"
  3_hub_nodes: "[网络中心节点，度数最高]"
  4_role_hierarchy: "入口层→体验层→中台层→变现层→护城河层"
  5_primary_flywheel: "[最强飞轮描述]"
  6_profit_migration: "[利润池从___迁移到___]"
  7_kill_switch: "[硬前提，如果___则整体论点失效]"
```

### A1. 节点表 (Node Table)

| 字段 | 说明 |
|------|------|
| node | 节点ID |
| name | 产品/服务名称 |
| value_prop | 价值主张 |
| payer | 付费方(用户/广告主/企业/政府) |
| form | 形态(硬件/软件/服务/平台/能力/基础设施) |
| geo_notes | 地区特殊性说明 |

**原则**：宁滥勿缺，覆盖scope所有维度

### A2. 强边表 (Edge Table)

| 字段 | 说明 |
|------|------|
| from | 起始节点 |
| to | 目标节点 |
| edge_type | 边类型(10种之一) |
| mechanism | 传导机制 |
| metrics | 量化指标 |
| evidence | 证据来源 |

**规则**：
- 只保留强边(解释战略/利润流向)
- 边数建议20-50条
- **必须覆盖**：DISTRIBUTION_DEFAULTS / IDENTITY / PAYMENTS_BILLING / DATA_FLYWHEEL / TRUST_COMPLIANCE_SAFETY

### A3. 邻接表 (Adjacency List)

```
节点A: → 节点B (边类型), → 节点C (边类型), ...
节点B: → 节点A (边类型), → 节点D (边类型), ...
```

便于画图/导入图数据库

### A4. 分层网络图 (Layered Map)

```
L4 护城河层   ┌─────────────────────────────────────┐
              │ [MOAT资产: 数据/网络效应/合规/...]   │
              └─────────────────────────────────────┘
                              ↑
L3 变现层     ┌─────────────────────────────────────┐
              │ [MONETIZE/PROFIT: 订阅/广告/抽佣]   │
              └─────────────────────────────────────┘
                              ↑
L2 中台层     ┌─────────────────────────────────────┐
              │ Identity │ Payments │ Dev │ Data    │
              └─────────────────────────────────────┘
                              ↑
L1 体验层     ┌─────────────────────────────────────┐
              │ [TRAFFIC: 高频产品/服务]            │
              └─────────────────────────────────────┘
                              ↑
L0 入口层     ┌─────────────────────────────────────┐
              │ [ENTRY: 获客入口/预装/默认]         │
              └─────────────────────────────────────┘
```

**识别关键节点**：
- **Hub节点**：连接数最多，网络中心
- **Bridge节点**：连接不同簇群，结构洞位置

### A5. 飞轮卡 (Flywheels)

每个飞轮包含：

```yaml
flywheel:
  id: "FW1"
  name: "[飞轮名称]"
  loop_path: "A → B → C → D → A"
  accelerators: "[加速器: 什么因素让飞轮转得更快]"
  break_points: "[断裂点: 什么因素会让飞轮停转]"
  kpis:  # 2-4个
    - metric: "[指标1]"
      current: "[当前值]"
      trend: "↑/↓/→"
    - metric: "[指标2]"
      current: "[当前值]"
      trend: "↑/↓/→"
```

**数量要求**：3-7个飞轮

### A6. 利润池地图 (Profit Pools)

```yaml
profit_pools:
  current:  # 当前
    - pool: "[利润池1]"
      gross_margin: "%"
      contribution: "$"
      layer: "L[0-4]"
      role: "[PROFIT/MONETIZE]"

  emerging:  # 新兴
    - pool: "[利润池2]"
      potential: "$"
      timeline: "年"

  future:  # 未来
    - pool: "[利润池3]"
      scenario: "[情景描述]"

  migration_direction: "利润从___层迁移到___层，因为___"
```

### A7. 情景推演 (Scenarios)

对1-2个战略项目做推演：

```yaml
scenario:
  project: "[战略项目名称]"

  asset_reuse:
    - "[复用资产1]"
    - "[复用资产2]"

  new_nodes:
    - node: "[新增节点]"
      role: "[角色]"

  edge_strengthening:
    - edge: "A → B"
      before: "[强度/指标]"
      after: "[强度/指标]"

  flywheel_impact:
    - flywheel: "FW1"
      impact: "加速/减速/新增"

  new_risks:
    - regulatory: "[监管风险]"
    - cannibalization: "[自相残杀风险]"
    - execution: "[执行风险]"
```

### A8. 对标与反证 (Disconfirm)

```yaml
disconfirm:
  kill_switch:
    condition: "[硬前提条件]"
    consequence: "如果此条件不成立，整体论点失效"

  falsification_list:  # ≥5条
    - id: "F1"
      trigger: "[触发条件]"
      conclusion_overturned: "[被推翻的结论]"
      monitoring_metric: "[监控指标]"
      threshold: "[阈值]"

    - id: "F2"
      trigger: "..."
      conclusion_overturned: "..."

  benchmarks:  # 2-3个对标点
    - comparable: "[对标公司]"
      dimension: "[对比维度]"
      finding: "[发现]"
```

### A9. 证据来源包 (Source Pack)

```yaml
sources:
  tier_1_primary:  # 一手来源优先
    - "[10-K/10-Q]"
    - "[Earnings Call Transcript]"
    - "[Company IR Presentation]"

  tier_2_secondary:
    - "[Analyst Report]"
    - "[Industry Association Data]"

  tier_3_reference:
    - "[Media Report]"
    - "[Expert Opinion]"

  citation_map:
    artifact: "[引用位置]"
    source: "[来源]"
```

---

## 10步工作流

### S1. 边界锁定 (BOUNDARY)

```
□ 确认时间窗口: ___年
□ 确认分析范围: scope各维度覆盖检查
□ 确认地区/监管拆分需求
□ 声明分析深度: investor-grade
□ 声明输出顺序
```

### S2. 节点清单 (INVENTORY)

构建A1_NODE_TABLE，覆盖：
- [ ] Hardware
- [ ] Software
- [ ] Services
- [ ] Platform
- [ ] Developers
- [ ] AI
- [ ] Payments/Billing
- [ ] Distribution
- [ ] Identity
- [ ] Data
- [ ] Trust/Compliance

### S3. 角色标注 (ROLE_TAG)

为每个节点标注角色：
```
节点 | 角色(可多选) | 理由 | 可量化指标
```

### S4. 强边提取 (EDGES)

构建A2_EDGE_TABLE：
- [ ] DISTRIBUTION_DEFAULTS 边 ✓
- [ ] IDENTITY 边 ✓
- [ ] PAYMENTS_BILLING 边 ✓
- [ ] DATA_FLYWHEEL 边 ✓
- [ ] TRUST_COMPLIANCE_SAFETY 边 ✓
- [ ] 其他强边(DEVELOPER_SUPPLY/HARDWARE/BUNDLING/MFG/NETWORK_EFFECTS)

### S5. 网络输出 (NETWORK_OUTPUTS)

- 生成A3_ADJ_LIST
- 生成A4_LAYERED_MAP
- 识别Hub节点
- 识别Bridge节点(结构洞)

### S6. 飞轮提炼 (FLYWHEELS)

从强边中提炼A5_FLYWHEELS：
- [ ] 飞轮数量 ≥ 3
- [ ] 每个飞轮有：闭环路径/加速器/断裂点/KPI(2-4)

### S7. 利润池映射 (PROFIT_POOLS)

输出A6_PROFIT_POOLS：
- [ ] 收入/毛利/现金流映射到分层网络
- [ ] 映射到角色标签
- [ ] 描述迁移方向

### S8. 情景推演 (SCENARIOS)

对1-2个战略项目做A7_SCENARIOS：
- [ ] 复用资产分析
- [ ] 新增节点角色
- [ ] 强化边与飞轮
- [ ] 新增风险(监管/自相残杀)

### S9. 反证构建 (DISCONFIRM)

输出A8_DISCONFIRM：
- [ ] 1条KillSwitch
- [ ] ≥5条证伪项
- [ ] 2-3个对标对比点

### S10. 执行摘要 (EXEC_MAP)

回填A0_EXEC_MAP，压缩成一页"结论地图"：
- [ ] 7项必答全部完成

---

## 质量检验清单

```yaml
quality_bar:
  scope_coverage:
    - "□ 分发/默认入口已覆盖"
    - "□ 身份系统已覆盖"
    - "□ 支付/计费已覆盖"
    - "□ 开发者生态已覆盖"
    - "□ 数据闭环已覆盖"
    - "□ 信任/合规已覆盖"

  node_quality:
    - "□ 每个节点有角色标签"
    - "□ 每个节点有可量化指标"

  edge_quality:
    - "□ 每条强边有edge_type"
    - "□ 每条强边有mechanism"
    - "□ 每条强边有metrics"
    - "□ 每条强边有evidence"

  flywheel_quality:
    - "□ 飞轮数量 ≥ 3"
    - "□ 每个飞轮有KPI(2-4个)"

  disconfirm_quality:
    - "□ 有1条KillSwitch"
    - "□ 证伪项 ≥ 5"

  coherence:
    - "□ 利润池与网络分层一致"
    - "□ 入口层如何喂养高毛利层可解释"
```

---

## 与Agent架构整合

### Ecosystem Graph 整合（主）

```yaml
ecosystem_graph_integration:
  capability: "product_matrix_network"

  triggers:
    - "分析产品矩阵"
    - "生态系统映射"
    - "飞轮分析"
    - "利润池分析"

  node_schema:
    required_fields:
      - "node_id"
      - "name"
      - "roles[]"
      - "layer"  # L0-L4
      - "metrics"

  edge_schema:
    required_fields:
      - "from"
      - "to"
      - "edge_type"  # 10种之一
      - "mechanism"
      - "strength"  # 1-5

  output_artifacts:
    - "A0_EXEC_MAP"
    - "A1_NODE_TABLE"
    - "A2_EDGE_TABLE"
    - "A3_ADJ_LIST"
    - "A4_LAYERED_MAP"
    - "A5_FLYWHEELS"
    - "A6_PROFIT_POOLS"
```

### Research Mechanism 整合（辅）

```yaml
research_mechanism_integration:
  capability: "ecosystem_falsification"

  artifacts_used:
    - "A7_SCENARIOS"
    - "A8_DISCONFIRM"
    - "A9_SOURCES"

  kill_switch_format:
    condition: "[可观测条件]"
    threshold: "[触发阈值]"
    consequence: "[论点失效范围]"
```

---

## 使用示例

**推荐执行顺序**：
```
Node → Role → Edge → Network → Flywheel → Profit → Scenario → Disconfirm → ExecMap
```

**示例（Apple）**：

```yaml
# S2 节点示例
nodes:
  - {node: "iPhone", roles: [ENTRY, TRAFFIC, PROFIT], layer: L0}
  - {node: "App Store", roles: [MONETIZE, MOAT], layer: L3}
  - {node: "Apple ID", roles: [MOAT], layer: L2}

# S4 强边示例
edges:
  - from: "iPhone"
    to: "App Store"
    edge_type: "DISTRIBUTION_DEFAULTS"
    mechanism: "预装+唯一安装渠道"
    metrics: "30%抽成率, $85B年收入"
    evidence: "10-K FY2025"

  - from: "Apple ID"
    to: "iCloud"
    edge_type: "IDENTITY"
    mechanism: "统一账户绑定所有服务"
    metrics: "2B+活跃设备"
    evidence: "Earnings Call Q4 2025"

# S6 飞轮示例
flywheel:
  id: "FW1"
  name: "硬件-服务飞轮"
  loop_path: "iPhone销量 → 活跃用户 → 服务收入 → 研发投入 → 更好iPhone"
  accelerators: "换机周期延长反而增加服务收入"
  break_points: "Android在高端市场突破"
  kpis:
    - {metric: "活跃设备数", current: "2.2B", trend: "↑"}
    - {metric: "服务收入占比", current: "22%", trend: "↑"}
```

---

**版本**: v1.0
**归档位置**: `skills/ecosystem_graph/`
**状态**: 已整合到架构
