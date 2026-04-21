# LNG 上游卡点追溯表 v1.0 (2026-04-21)

基于 industry-chain-mapper v3.2 第八项硬产出：对 LNG 主链每个模块执行七步法追溯，输出 YAML 结构化卡点清单。

---

## 1. 追溯起点：LNG 主链 12 个模块的"事物节点"归一

（禁止从板块名开始；每个模块翻译为 1-3 个真正稀缺的事物节点）

```yaml
modules:
  - module: 液化装置
    thing_nodes:
      - "超低温液化处理能力（-162°C）"
      - "液化工艺 API 化与许可 know-how"
      - "主冷剂压缩机驱动能力"

  - module: 低温储罐
    thing_nodes:
      - "大型低温密封容器建造能力"
      - "9% 镍钢高等级板材供给"

  - module: LNG 船
    thing_nodes:
      - "大型低温液货舱运输能力"
      - "膜式液货舱专利技术"
      - "大型双燃料船用发动机"

  - module: 管道
    thing_nodes:
      - "大流量高压气体输送能力"
      - "大口径 line pipe 冶金能力"

  - module: 接收终端
    thing_nodes:
      - "再气化与储存能力"
      - "码头大型卸料臂与泵系统"

  - module: 上游气源
    thing_nodes:
      - "低成本持续页岩气 / 常规气储量"
      - "钻井与压裂执行能力"

  - module: 长期合同与交易
    thing_nodes:
      - "信用 + 现金流确定性的金融基础设施"
```

---

## 2. 八维打分：终端卡点候选表

```yaml
terminal_nodes:
  # ========== 真正卡点（合计 ≥35/40） ==========
  - name: "GTT 膜式液货舱技术"
    classification: true_bottleneck
    thing_node: "大型低温液货舱运输能力"
    upstream_hop_1:
      raw_materials: []
      process_capability: ["Mark III / NO96 膜式工艺 know-how"]
      equipment: ["膜式液货舱安装专用设备"]
      qualification: ["船级社（ABS/DNV/BV）长期认证"]
      standards: ["IMO IGC Code"]
      capacity_lead_time: "专利型，不受产能约束"
    cross_industry_equivalents: []
    eight_dim_score:
      necessity: 5
      non_substitutable: 5
      qualification: 5
      supply_inelastic: 5
      no_bypass: 5
      profit_capture: 5
      financial_resilience: 5
      investability: 5
      total: 40
    public_companies:
      pure_play: "GTT.PA（Euronext Paris，市值约 €4-5B）"
      quality_compounder: "GTT.PA"
      cyclical: "GTT.PA"
      local_china: "UNKNOWN（Hudong LNT A-Box 属中船集团国企，非独立上市）"
      hidden_pick_shovel: "GTT.PA — 全球最典型 LNG 隐藏 pick-and-shovel"
    kill_switches:
      - "中国 LNT A-Box 累计实船交付 >10 艘"
      - "任一主要买家（JERA / KOGAS / 欧洲 utilities）要求放弃 GTT 转国产方案"
      - "俄罗斯 / 中东独立膜技术研发成功"
    evidence_strength:
      concentration: "HIGH（95%+ 全球 LNG 船建造采用 GTT 系统）"
      qualification_barrier: "HIGH（船级社认证周期 5-10 年）"
      switching_cost: "HIGH（造船厂已投资 GTT 专用工艺）"
      customer_bypass: "LOW（替代方案 Moss 球型已几乎淘汰）"
      profit_durability: "HIGH（永续许可费 + 零 CapEx）"

  - name: "AP-C3MR / AP-X 液化工艺许可"
    classification: true_bottleneck
    thing_node: "超低温液化处理能力"
    upstream_hop_1:
      process_capability: ["AP-C3MR（中型 train）+ AP-X（大型 train）工艺 know-how"]
      equipment: ["APD 自研冷箱 + 匹配工艺包"]
      qualification: ["10 年以上现场运行验证"]
      capacity_lead_time: "专利型"
    cross_industry_equivalents: ["空分工艺（APD / Linde / 液化空气均有，技术有交叉）"]
    eight_dim_score:
      necessity: 5
      non_substitutable: 4
      qualification: 5
      supply_inelastic: 5
      no_bypass: 4
      profit_capture: 5
      financial_resilience: 5
      investability: 5
      total: 38
    public_companies:
      pure_play: "APD（但 LNG 仅占总收入 10-15%）"
      quality_compounder: "APD"
      cyclical: "APD"
      local_china: "UNKNOWN"
      hidden_pick_shovel: "APD — 工艺许可 + 冷箱设备双卡位"
    kill_switches:
      - "Cheniere Cascade 被外部项目采用"
      - "Linde MFC 大型 train 份额突破 20%"
    evidence_strength:
      concentration: "HIGH（约 80% 全球大型液化 train）"
      qualification_barrier: "HIGH"
      switching_cost: "MEDIUM（项目 FID 后工艺锁定）"
      customer_bypass: "MEDIUM（有 Cheniere Cascade + Linde MFC）"
      profit_durability: "HIGH"

  - name: "Baker Hughes 主冷剂压缩机"
    classification: oligopoly_bottleneck
    thing_node: "主冷剂压缩机驱动能力"
    upstream_hop_1:
      raw_materials: ["超合金（热端部件）"]
      process_capability: ["大型离心压缩机制造 + 变频驱动"]
      equipment: ["PCC 超合金铸造 + 精密机加工"]
      qualification: ["API 617 + 长期 field 验证"]
      capacity_lead_time: "30+ 个月"
    cross_industry_equivalents: ["炼油装置压缩机", "燃气管道压缩机"]
    eight_dim_score:
      necessity: 5
      non_substitutable: 3
      qualification: 5
      supply_inelastic: 5
      no_bypass: 4
      profit_capture: 5
      financial_resilience: 5
      investability: 5
      total: 37
    public_companies:
      pure_play: "BKR（LNG 设备段 60-70% 市占）"
      quality_compounder: "BKR"
      cyclical: "SE.DE（Siemens Energy）"
      local_china: "UNKNOWN"
      hidden_pick_shovel: "BKR — LNG 业务纯 CapEx 高毛利"
    kill_switches:
      - "LNG 设备订单同比转负"
      - "Siemens Energy / MHI 新项目份额突破 40%"
    evidence_strength:
      concentration: "HIGH（60-70% 主冷剂压缩机市占）"
      qualification_barrier: "HIGH（API 617 + 工程公司短名单）"
      switching_cost: "MEDIUM"
      customer_bypass: "MEDIUM（有 Siemens Energy + MHI）"
      profit_durability: "HIGH"

  - name: "Chart Industries 低温冷箱与储罐"
    classification: oligopoly_bottleneck
    thing_node: "超低温换热 + 低温储存能力"
    upstream_hop_1:
      raw_materials: ["铝合金（brazed aluminum）", "9% 镍钢（储罐）"]
      process_capability: ["高精度 brazing + 真空焊接"]
      equipment: ["专用 brazing 炉 + 检测设备"]
      qualification: ["ASME Section VIII Div.1"]
      capacity_lead_time: "24 个月"
    cross_industry_equivalents: ["空分冷箱", "氢液化冷箱", "碳捕集冷箱"]
    eight_dim_score:
      necessity: 5
      non_substitutable: 3
      qualification: 5
      supply_inelastic: 5
      no_bypass: 4
      profit_capture: 4
      financial_resilience: 5
      investability: 5
      total: 36
    public_companies:
      pure_play: "GTLS（LNG + 氢能 + CCS 三重驱动）"
      quality_compounder: "GTLS"
      cyclical: "GTLS"
      local_china: "002430.SZ（杭氧股份，空分为主，LNG 冷箱中低端）"
      hidden_pick_shovel: "GTLS — LNG + 氢能双向 beta"
    kill_switches:
      - "订单环比下降 >20%"
      - "Linde Engineering 大型订单突破"
    evidence_strength:
      concentration: "MEDIUM-HIGH（约 50% LNG 冷箱市占）"
      qualification_barrier: "HIGH"
      switching_cost: "MEDIUM"
      customer_bypass: "MEDIUM（有 Linde Engineering + APD）"
      profit_durability: "MEDIUM-HIGH"

  - name: "主冷剂压缩机驱动燃气轮机（LM6000 / LMS100）"
    classification: oligopoly_bottleneck
    thing_node: "大型机械驱动燃气轮机"
    upstream_hop_1:
      raw_materials: ["单晶高温合金（热端）"]
      process_capability: ["单晶生长 + 精铸 + 高温涂层"]
      equipment: ["PCC / Haynes / ATI 产线"]
      qualification: ["航空级验证 + LNG 项目验收"]
      capacity_lead_time: "24-36 个月"
    cross_industry_equivalents: ["航空发动机热端", "地面燃机（电力/工业）"]
    eight_dim_score:
      necessity: 5
      non_substitutable: 3
      qualification: 5
      supply_inelastic: 4
      no_bypass: 4
      profit_capture: 4
      financial_resilience: 5
      investability: 5
      total: 35
    public_companies:
      pure_play: "UNKNOWN（GE Vernova、Siemens Energy 均为综合）"
      quality_compounder: "GE Vernova（GEV）"
      cyclical: "SE.DE（Siemens Energy）"
      local_china: "UNKNOWN"
      hidden_pick_shovel: "GEV + SE.DE（同时受益于 LNG、电力、工业）"
    kill_switches:
      - "电动压缩机驱动大型液化（e-LNG）商业化加速"
    evidence_strength:
      concentration: "HIGH（GE + Siemens Energy 寡占）"
      qualification_barrier: "HIGH"
      switching_cost: "MEDIUM"
      customer_bypass: "LOW"
      profit_durability: "HIGH"

  - name: "韩国大型 LNG 船造船槽位"
    classification: oligopoly_bottleneck
    thing_node: "大型 LNG 船建造能力"
    upstream_hop_1:
      raw_materials: ["9% 镍钢（液货舱）", "高强度船用钢"]
      process_capability: ["膜式 LNG 船总装 + 双燃料发动机集成"]
      equipment: ["大型干船坞 + 专用膜工艺工装"]
      qualification: ["船级社 + 船东技术规格"]
      capacity_lead_time: "3-5 年（新订单到交付）"
    cross_industry_equivalents: ["大型集装箱船 + 海工装备（同一干船坞）"]
    eight_dim_score:
      necessity: 5
      non_substitutable: 3
      qualification: 5
      supply_inelastic: 5
      no_bypass: 3
      profit_capture: 4
      financial_resilience: 4
      investability: 5
      total: 34
    public_companies:
      pure_play: "010140.KS（三星重工，LNG 纯度最高）"
      quality_compounder: "329180.KS（HD 现代重工）"
      cyclical: "042660.KS（韩华海洋）"
      local_china: "UNKNOWN（Hudong 属国企）"
      hidden_pick_shovel: "329180.KS + 010140.KS"
    kill_switches:
      - "新 LNG 船订单同比 -30%"
      - "中国国产膜式 LNG 船市占跃升至 40%+"
    evidence_strength:
      concentration: "HIGH（韩国大三 75-80% 全球市占）"
      qualification_barrier: "MEDIUM-HIGH"
      switching_cost: "MEDIUM"
      customer_bypass: "MEDIUM（中国 Hudong 追赶）"
      profit_durability: "MEDIUM"

  - name: "9% 镍钢高等级板材"
    classification: oligopoly_bottleneck
    thing_node: "低温（-162°C）高强度钢板供给"
    upstream_hop_1:
      raw_materials: ["高纯度镍（约 9% 含量）", "Mn / Mo 合金元素"]
      process_capability: ["真空熔炼 + 控轧控冷（TMCP）"]
      equipment: ["特殊轧机 + 热处理炉"]
      qualification: ["ASME SA-553 / SA-353 + 船级社认证"]
      capacity_lead_time: "产能扩张 3-5 年"
    cross_industry_equivalents: ["核电低温容器", "航空航天 Ni 基合金（上游共用镍原料）"]
    eight_dim_score:
      necessity: 5
      non_substitutable: 4
      qualification: 5
      supply_inelastic: 4
      no_bypass: 4
      profit_capture: 3
      financial_resilience: 4
      investability: 4
      total: 33
    public_companies:
      pure_play: "UNKNOWN（均为综合钢铁公司细分产品）"
      quality_compounder: "5401.T（Nippon Steel）"
      cyclical: "005490.KS（POSCO）"
      local_china: "600019.SH（宝钢，部分 9% Ni 钢能力）"
      hidden_pick_shovel: "5401.T + 005490.KS — LNG 相关板材业务分段可跟踪"
    kill_switches:
      - "LNG 项目 FID 节奏显著放缓"
      - "膜式储罐替代传统 9% Ni 钢大口径罐体"
    evidence_strength:
      concentration: "HIGH（全球 <5 家具规模化产能）"
      qualification_barrier: "HIGH"
      switching_cost: "HIGH（工艺认证周期长）"
      customer_bypass: "LOW（无其他低温钢可用）"
      profit_durability: "MEDIUM（综合钢铁周期拖累）"

  - name: "特殊超合金（主冷剂压缩机/燃气轮机热端）"
    classification: oligopoly_bottleneck
    thing_node: "高温 / 疲劳 / 蠕变抗性金属"
    upstream_hop_1:
      raw_materials: ["高纯度镍 + 钴 + 铬"]
      process_capability: ["真空感应熔炼 + 定向凝固 + 单晶生长"]
      equipment: ["PCC / Haynes / ATI 专用设备"]
      qualification: ["航空 + LNG 双重验收"]
      capacity_lead_time: "12-24 个月（单晶叶片）"
    cross_industry_equivalents: ["航空发动机（同一供应链 + 工艺）"]
    eight_dim_score:
      necessity: 4
      non_substitutable: 3
      qualification: 5
      supply_inelastic: 4
      no_bypass: 4
      profit_capture: 4
      financial_resilience: 5
      investability: 3
      total: 32
    public_companies:
      pure_play: "HAYN（Haynes International，高端耐热合金）"
      quality_compounder: "BRK.B（通过 PCC 子公司，业务占比 <5%）"
      cyclical: "ATI（Allegheny Technologies）"
      local_china: "UNKNOWN"
      hidden_pick_shovel: "HAYN + ATI — 航空 + LNG 双驱动"
    kill_switches:
      - "航空需求显著下降削弱规模效应"
      - "大型电动压缩机替代燃机驱动"
    evidence_strength:
      concentration: "HIGH（PCC + HAYN + ATI 合计 70%+ 高端）"
      qualification_barrier: "HIGH"
      switching_cost: "HIGH"
      customer_bypass: "LOW"
      profit_durability: "HIGH"

  - name: "大型船用双燃料发动机（MAN / Wärtsilä）"
    classification: oligopoly_bottleneck
    thing_node: "大型慢速船用发动机 + LNG 双燃料能力"
    upstream_hop_1:
      raw_materials: ["高端合金钢缸套"]
      process_capability: ["大型船机设计 + 双燃料控制系统"]
      equipment: ["MAN + Wärtsilä 产线"]
      qualification: ["IMO Tier III + 船级社"]
      capacity_lead_time: "12-18 个月"
    cross_industry_equivalents: ["超大型集装箱船", "油轮"]
    eight_dim_score:
      necessity: 5
      non_substitutable: 3
      qualification: 4
      supply_inelastic: 4
      no_bypass: 3
      profit_capture: 3
      financial_resilience: 4
      investability: 4
      total: 30
    public_companies:
      pure_play: "WRT1V.HE（Wärtsilä，能源 + 船舶）"
      quality_compounder: "VOW.DE（Volkswagen，MAN Energy 母公司，稀释严重）"
      cyclical: "WRT1V.HE"
      local_china: "UNKNOWN"
      hidden_pick_shovel: "WRT1V.HE"
    kill_switches:
      - "氨动力 / 氢动力商业化替代双燃料"
    evidence_strength:
      concentration: "HIGH（MAN + Wärtsilä 合计 95%+ 大型船机）"
      qualification_barrier: "MEDIUM-HIGH"
      switching_cost: "MEDIUM"
      customer_bypass: "LOW"
      profit_durability: "MEDIUM"

  # ========== 重要非卡点（25-29 合计） ==========
  - name: "大口径 LNG line pipe"
    classification: important_upstream
    eight_dim_score: {total: 28}
    public_companies:
      pure_play: "X（U.S. Steel）"
      local_china: "600019.SH（宝钢）"

  - name: "镍（原材料）"
    classification: important_upstream
    eight_dim_score: {total: 24}
    public_companies:
      pure_play: "VALE（巴西 Vale）"
      cyclical: "GLCNY（Glencore）"

  # ========== 执行层（<25） ==========
  - name: "再气化器"
    classification: execution_layer
    eight_dim_score: {total: 24}

  - name: "阀门、卸料臂"
    classification: execution_layer
    eight_dim_score: {total: 22}
```

---

## 3. 假垄断候选（false monopoly）

```yaml
false_monopoly_candidates:
  - name: "X 公司 FSRU 快速部署技术"
    reason: "看似独有的 FSRU 改装能力，但韩国大三 + Wärtsilä 均可做;市场对稀缺性估值过高"

  - name: "Y 公司 LNG 加注船"
    reason: "LNG bunkering 赛道参与者多，非真正垄断"
```

---

## 4. 隐藏 pick-and-shovel 综合评级

| 公司 | 评级 | 说明 |
|---|---|---|
| `GTT.PA` | **★★★★★** | 全球最典型 LNG pick-and-shovel，5% 永续过路费 |
| `GTLS` | **★★★★☆** | LNG + 氢能 + CCS 三重驱动 |
| `BKR` | **★★★★☆** | LNG 设备业务纯 CapEx 高毛利 |
| `APD` | **★★★★☆** | 工艺许可 + 冷箱双卡位 |
| `5401.T` | **★★★☆☆** | 9% Ni 钢寡头；钢铁周期拖累 |
| `005490.KS` | **★★★☆☆** | 同上 |
| `329180.KS` / `010140.KS` | **★★★☆☆** | 造船订单满但周期有波动 |
| `HAYN` | **★★★☆☆** | 航空 + LNG 双驱动 |
| `ATI` | **★★★☆☆** | 同 HAYN |
| `WRT1V.HE` | **★★★☆☆** | 船机 + 能源解决方案 |
| `GEV` | **★★★☆☆** | 大型燃机 LNG 驱动 + 电力 |

---

## 5. 跨行业合并：LNG 与其他产业的等价卡点

| LNG 节点 | 跨行业等价 | 联合受益标的 |
|---|---|---|
| 低温冷箱（GTLS） | 空分 / 氢液化 / CCS | `GTLS / LIN / APD` |
| 超合金（PCC / ATI / HAYN） | 航空发动机 / 地面燃机 | `ATI / HAYN / BRK.B` |
| 9% Ni 钢 | 核电低温设施 / 航空航天 | `5401.T / 005490.KS` |
| 船用发动机 | 超大型集装箱 / 油轮 | `WRT1V.HE` |
| 液化工艺 | 空分 | `APD / LIN` |
| 主冷剂压缩机 | 炼油 + 管道 | `BKR / SE.DE` |

---

## 6. Kill switches 汇总（LNG 全链）

| 信号 | 影响 |
|---|---|
| DOE / FERC 冻结非 FTA 许可 | 美国 LNG 出口商全链 |
| CoWoS-like 的 LNG 卡点：膜技术中国突破 | GTT.PA 估值重估 |
| 卡塔尔 North Field South 延迟 | 全球供给曲线 |
| LNG 船订单 book-to-bill <1.0 | 韩国大三 + GTT |
| Henry Hub <$2.50 持续 2 季度 | 上游 E&P |
| TCE 现货同比 -30% | 运输船现货 |
| 电动液化（e-LNG）商业化 | 燃气轮机驱动链 |

---

## 7. 研究清单（可直接入筛选器）

### 结构核心池（榜一）
- `GTT.PA`、`APD`、`GTLS`、`BKR`、`LNG`

### 当前研究优先池（榜二）
- `329180.KS`、`010140.KS`、`VG`、`WMB`、`EQT`

### 交易回调池（榜三）
- `NFE`、`FLNG`、`CLCO`

### 附加研究池（v3.2 新增：隐藏 pick-and-shovel）
- `HAYN`、`ATI`、`5401.T`、`005490.KS`、`WRT1V.HE`、`LIN`、`GEV`、`SE.DE`

---

## 8. 首轮追溯结论

**GTT.PA 是当前 LNG 产业链追溯七步法找出的最完美终端卡点**：八维合计 40/40，零 CapEx、永续 5% 过路费、95%+ 市占、替代威胁（中国 LNT A-Box）仍在早期。这正是 v3.2 新增追溯机制最想帮读者抓住的类型——**跨越"LNG 行业"标签之后，才能看到它真正的位置**。

**次序**：APD（38/40）、BKR（37/40）、GTLS（36/40）、燃机驱动（35/40）、韩国大三造船（34/40）、9% Ni 钢（33/40）、特殊超合金（32/40）、船用发动机（30/40）。

**数据更新日期**：2026-04-21
