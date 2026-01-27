# 质量指标计算引擎 - 快速参考卡

**一页纸速查手册** | 打印备用

---

## 核心指标速查表

### 现金流质量 (Cash Flow Quality)

| 指标 | 公式 | 优秀 | 警告 |
|------|------|------|------|
| **OCF/NI** | OCF ÷ NI | ≥1.2 | <0.8 |
| **FCF/NI** | (OCF-CapEx) ÷ NI | ≥0.9 | <0.5 |
| **CCC** | DSO+DIO-DPO | <30 | >90 |

**速判**: OCF/NI<0.8连续2年 → 盈利质量存疑 ⚠

---

### 资本效率 (Capital Efficiency)

| 指标 | 公式 | 优秀 | 一般 |
|------|------|------|------|
| **ROIC** | NOPAT ÷ IC | ≥15% | <10% |
| **ROE** | NI ÷ Equity | ≥20% | <15% |

**ROIC计算**:
```
NOPAT = EBIT × (1 - Tax Rate)
IC = Equity + Debt - Cash
ROIC = NOPAT ÷ IC
```

**杜邦分解**:
```
ROE = 净利率 × 资产周转 × 权益乘数

高ROE来源:
✓ 高利润率 → 定价权 (好)
⚠ 高杠杆 → 风险 (需警惕)
```

---

### 护城河评分 (Moat Score)

| 总分 | 评级 | 含义 |
|------|------|------|
| ≥70 | Wide Moat | 强大且持久的竞争优势 |
| 50-69 | Narrow Moat | 一定优势但可能被侵蚀 |
| <50 | No Moat | 缺乏可持续竞争优势 |

**评分维度** (满分100):
- 定价权 (25): 毛利率、品牌溢价
- 转换成本 (25): 留存率、产品嵌入
- 成本优势 (25): 单位成本、规模效应
- 网络效应 (15): 多边平台
- 监管壁垒 (10): 牌照、准入

---

### 财务稳健性 (Balance Sheet)

| 指标 | 公式 | 安全 | 危险 |
|------|------|------|------|
| **D/E** | Debt ÷ Equity | <1.0 | >2.0 |
| **NetD/EBITDA** | (Debt-Cash) ÷ EBITDA | <3.0 | >4.0 |
| **Int Coverage** | EBIT ÷ Interest | >5.0 | <2.0 |
| **Current Ratio** | CA ÷ CL | >1.5 | <1.0 |

---

## 危险信号 (Red Flags)

| 信号 | 含义 | 立即行动 |
|------|------|---------|
| 🔴 OCF/NI<0.8连续2年 | 盈利质量差 | 深挖应收账款、存货 |
| 🔴 ROIC<WACC | 摧毁价值 | 评估管理层能力 |
| 🔴 D/E>2且IntCov<2 | 财务脆弱 | 检查债务到期结构 |
| 🔴 DSO大幅上升 | 可能虚增收入 | 审查收入确认政策 |
| 🔴 CCC恶化 | 营运资本效率下降 | 分析库存、应付款 |

---

## 优质公司特征

**现金流**: OCF/NI>1.0 + CCC<60天
**资本**: ROIC>15%连续5年 + ROE>20%
**护城河**: 总分≥70 (Wide Moat)
**稳健**: D/E<1.0 + IntCov>5.0

**综合**: 4项全满足 → A级质量 ✓

---

## 行业调整快查

| 行业 | 特殊处理 |
|------|---------|
| **科技SaaS** | NRR>100%, Rule of 40, CapEx<10% |
| **制造业** | ROIC>10%即优秀, CapEx 10-20% |
| **金融** | 用ROA/ROE替代ROIC, D/E>5正常 |
| **REIT** | 用FFO替代NI, D/E 3-5倍正常 |
| **半导体** | 高CapEx可接受, 关注技术领先 |

---

## 快速计算示例

**案例: NVIDIA**

```
输入数据 (FY2024):
- Revenue: 60,922
- Net Income: 29,760
- EBIT: 32,972
- OCF: 28,465
- CapEx: 1,069
- Total Equity: 42,985
- Total Debt: 9,719
- Cash: 25,984

计算:
OCF/NI = 28,465 ÷ 29,760 = 0.956 (Acceptable)
FCF = 28,465 - 1,069 = 27,396
ROIC = [32,972×0.89] ÷ [42,985+9,719-25,984]
     = 29,345 ÷ 26,720 = 109.8% (Excellent!)

评级: A级 (优质)
```

---

## 使用流程 (3步)

### 1. 准备数据
从10-K提取: 收入、利润、现金流、资产负债

### 2. 运行计算
```bash
python3 demo_quality_analysis.py
```

### 3. 查看结果
打开 `quality_dashboard.csv`

---

## 常见问题 (FAQ)

**Q: ROIC为负？**
A: 检查是否负利润公司，金融公司用ROA替代

**Q: OCF/NI>3正常吗？**
A: 可能是预收款（好）或营运资本波动（需分析）

**Q: CCC为负？**
A: 优秀！先收钱后付款（如Amazon, Apple）

**Q: 某行业D/E很高？**
A: 金融/REIT天然高杠杆，用行业中位数对比

---

## 数据来源

**10-K关键位置**:
- OCF: Consolidated Statements of Cash Flows
- EBIT: Consolidated Statements of Operations (Operating Income)
- D/E: Consolidated Balance Sheets
- Interest: Income Statement (Interest Expense)

**推荐API**:
- Financial Modeling Prep (FMP)
- Alpha Vantage
- Yahoo Finance

---

## 文件速查

| 需求 | 文件 |
|------|------|
| 了解方法 | README.md |
| 详细公式 | calculation_methodology.md |
| 运行示例 | demo_quality_analysis.py |
| 核心代码 | quality_calculator.py |
| 现金流数据 | cash_flow_quality.csv |
| 资本效率 | capital_efficiency.csv |
| 护城河评分 | moat_scores.csv |
| 综合仪表板 | quality_dashboard.csv |

---

## 评级速查

**A级** (优质):
- OCF/NI>1.0, ROIC>15%, Moat≥70, D/E<1.0

**B级** (良好):
- OCF/NI 0.8-1.0, ROIC 10-15%, Moat 50-69

**C级** (可接受):
- OCF/NI 0.6-0.8, ROIC 5-10%, Moat 40-49

**D级** (风险):
- OCF/NI<0.6, ROIC<5%, Moat<40, D/E>3.0

---

## 记住这3个数字

**1.0** - OCF/NI最低标准 (利润能兑现现金)
**15%** - ROIC优秀标准 (强护城河证据)
**70分** - Wide Moat门槛 (持久竞争优势)

---

**版本**: v1.0 | **日期**: 2026-01-25
**路径**: /Users/milton/投资大师/Top20_Screener/quality/

打印此页备用 | 投资决策快速参考
