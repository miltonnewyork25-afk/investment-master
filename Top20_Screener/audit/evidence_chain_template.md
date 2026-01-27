# 证据链报告模板

**版本**: v1.0
**更新日期**: 2026-01-26
**用途**: 为每个投资标的创建可审计的证据链

---

## 模板结构

### 1. 公司基本信息

```markdown
## [TICKER] - 证据链审计报告

**公司名称**: [Company Name]
**CIK**: [10-digit CIK number]
**审计时间**: [YYYY-MM-DD HH:MM:SS]
**数据截止**: [Latest filing date]
```

### 2. 核心结论与证据表

每个核心结论必须使用以下格式记录：

```markdown
#### [类别名称]（如：财务数据 / 业务描述 / 风险因素）

| 结论ID | 结论内容 | 证据类型 | 来源链接 | 原文摘录 | 状态 |
|--------|----------|----------|----------|----------|------|
| claim_id | 具体结论 | Tier X: 类型 | [来源](URL) | "原文..." | ✅/⚡/❓ |
```

### 3. 必须覆盖的结论类型

以下6类结论是**必需项**，每份报告必须包含：

| 结论ID | 说明 | 推荐证据来源 |
|--------|------|--------------|
| `revenue_ttm` | 年度/TTM总营收 | 10-K Item 8 |
| `net_income_ttm` | 年度/TTM净利润 | 10-K Item 8 |
| `market_cap` | 当前市值 | 10-K Cover + Stock Price |
| `business_description` | 主营业务描述 | 10-K Item 1 |
| `competitive_advantage` | 竞争优势/护城河 | 10-K Item 1 Competition |
| `key_risks` | 关键风险因素 | 10-K Item 1A |

### 4. 推荐覆盖的结论类型

以下是**推荐项**，增强报告完整性：

| 结论ID | 说明 | 推荐证据来源 |
|--------|------|--------------|
| `free_cash_flow_ttm` | 自由现金流 | 10-K/10-Q 现金流量表 |
| `quarterly_revenue` | 最新季度营收 | 10-Q Item 1 |
| `quarterly_update` | 季度业务更新 | 10-Q MD&A |
| `material_events` | 重大事件 | 8-K filings |
| `insider_activity` | 内部人交易 | Form 4 |
| `executive_compensation` | 高管薪酬 | DEF 14A |
| `board_composition` | 董事会构成 | DEF 14A |
| `management_outlook` | 管理层展望 | Earnings Call |
| `company_guidance` | 业绩指引 | 8-K / IR Page |

---

## 证据类型分层

### Tier 1: 公司原始材料（最高可信度）

| 类型 | SEC Form | 披露频率 | 主要内容 |
|------|----------|----------|----------|
| 10-K年报 | 10-K | 年度 | 全面财务报告、业务描述、风险因素 |
| 10-Q季报 | 10-Q | 季度 | 季度财务更新、MD&A |
| 8-K重大事件 | 8-K | 事件驱动 | 重大事件即时披露 |
| 财报电话会议 | N/A | 季度 | 管理层解读、分析师问答 |
| 投资者演示 | N/A | 不定期 | 战略更新、业务亮点 |
| 公司指引 | 8-K/IR | 季度 | 未来业绩预期 |

### Tier 2: SEC监管文件（高可信度）

| 类型 | SEC Form | 披露频率 | 主要内容 |
|------|----------|----------|----------|
| 内部人交易 | Form 4 | 2工作日内 | 高管/董事股票交易 |
| 机构持仓 | 13F-HR | 季度 | 机构投资者持仓变化 |
| 重要持股 | 13D/13G | 事件驱动 | >5%持股披露 |
| 代理声明 | DEF 14A | 年度 | 高管薪酬、治理结构 |

### Tier 3: 权威第三方（中等可信度）

| 来源 | 类型 | 使用场景 |
|------|------|----------|
| Bloomberg | 终端数据 | 市场数据、估值指标 |
| Reuters | 新闻/数据 | 事件报道、财务数据 |
| Wall Street Journal | 新闻 | 深度报道、分析 |
| 行业研究报告 | 报告 | 行业趋势、竞争分析 |
| 分析师报告 | 报告 | 估值、投资建议 |

### Tier 4: 计算/推断（需标注）

| 类型 | 说明 | 标注方式 |
|------|------|----------|
| 基于原始数据计算 | 如FCF = OCF - CapEx | [CALCULATED] |
| 基于多源数据推断 | 综合多个来源得出 | [INFERENCE] |
| 未验证数据 | 无法追溯来源 | [UNKNOWN] |

---

## 状态标识说明

| 标识 | 类型 | 含义 | 可用于投资决策 |
|------|------|------|----------------|
| ✅ | FACT | 有Tier 1-2直接证据支持 | 是 |
| ⚡ | INFERENCE | 基于事实的合理推断 | 是（需注明） |
| ❓ | UNKNOWN | 无法验证或来源不明 | 否（需先验证） |

---

## SEC文件URL模板

### 文件搜索URL

```
# 10-K年报
https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK={CIK}&type=10-K&dateb=&owner=exclude&count=5

# 10-Q季报
https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK={CIK}&type=10-Q&dateb=&owner=exclude&count=5

# 8-K重大事件
https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK={CIK}&type=8-K&dateb=&owner=exclude&count=10

# DEF 14A代理声明
https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK={CIK}&type=DEF+14A&dateb=&owner=exclude&count=5

# Form 4内部人交易
https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK={CIK}&type=4&dateb=&owner=only&count=40

# 所有文件
https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK={CIK}&type=&dateb=&owner=include&count=40
```

### 直接文件URL

```
# 文件索引页
https://www.sec.gov/Archives/edgar/data/{CIK_NO_LEADING_ZEROS}/{ACCESSION_NO_DASHES}/{ACCESSION_NO}-index.htm

# 示例（AAPL 10-K）
https://www.sec.gov/Archives/edgar/data/320193/000032019325000008/0000320193-25-000008-index.htm
```

---

## 报告示例

```markdown
## AAPL - 证据链审计报告

**公司名称**: Apple Inc.
**CIK**: 0000320193
**审计时间**: 2026-01-26 10:30:00
**数据截止**: 2025-12-28 (FY Q1 2026)

---

### 核心结论与证据

#### 1. 财务数据

| 指标 | 数值 | 证据类型 | 来源 | 状态 |
|------|------|----------|------|------|
| 营收(TTM) | $383B | 10-K | [SEC Filing](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000320193&type=10-K) p.25 | ✅ FACT |
| 净利润(TTM) | $97B | 10-K | [SEC Filing](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000320193&type=10-K) p.28 | ✅ FACT |
| FCF(TTM) | $110B | 计算值 | 基于10-K现金流数据 | ⚡ INFERENCE |

#### 2. 业务描述

[FACT] Apple设计、制造和销售智能手机、个人电脑、平板电脑、可穿戴设备及配件，并提供各种相关服务。
> **来源**: 10-K 2025, Item 1 - Business, Page 1
> **链接**: [SEC Filing](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000320193&type=10-K)

#### 3. 竞争优势（护城河）

[INFERENCE] 基于以下事实推断Apple具有强大的品牌护城河：
- [FACT] 品牌价值在全球排名前3（基于Interbrand 2025报告）
- [FACT] iPhone用户留存率>90%（来源：10-K客户集中度披露）
- [FACT] 服务业务收入占比提升至22%，毛利率>70%（10-K分部数据）

#### 4. 关键风险

[FACT] 公司在10-K中披露以下关键风险：
1. 供应链集中于中国大陆和东南亚
2. 对iPhone依赖度高（约52%收入）
3. 宏观经济不确定性影响消费者支出

> **来源**: 10-K 2025, Item 1A - Risk Factors
> **链接**: [SEC Filing](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000320193&type=10-K)

---

### 证据完整性检查

| 指标 | 值 |
|------|------|
| 总证据数 | 14 |
| Tier 1证据 | 10 (71.4%) |
| Tier 2证据 | 2 (14.3%) |
| Tier 3证据 | 1 (7.1%) |
| Tier 4证据 | 1 (7.1%) |
| 必需项覆盖率 | 100% |

### 审计结论: 通过 ✅
```

---

## 质量检查清单

在提交证据链报告前，确保以下各项均已完成：

- [ ] 6个必需项全部有证据支持
- [ ] 每个证据有可点击的来源URL
- [ ] Tier 1证据占比 ≥ 50%
- [ ] 事实/推断/未知已正确分类
- [ ] 所有URL已验证可访问
- [ ] 原文摘录来自实际文件
- [ ] 审计时间和数据截止日期已标注

---

## 常见问题

### Q1: 找不到CIK怎么办？
使用SEC公司搜索：https://www.sec.gov/cgi-bin/browse-edgar?company=&CIK=&type=&owner=include&count=40&action=getcompany

### Q2: 10-K还没发布怎么办？
使用最新的10-Q + 上一年度10-K组合，并标注"待更新"。

### Q3: 非美股公司怎么办？
- ADR公司：有20-F年报（代替10-K）
- 外国私人发行人：有6-K报告
- 其他：使用当地监管文件 + 公司官网

### Q4: 数据冲突怎么处理？
以更高Tier的来源为准。如10-K与新闻数据冲突，以10-K为准。

---

**模板版本**: v1.0
**创建日期**: 2026-01-26
**维护者**: Agent 9 - 证据链验证与审计引擎
