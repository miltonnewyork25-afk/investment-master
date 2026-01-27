# 三段式漏斗筛选结果

**生成时间**: 2026-01-26 11:04:24

---

## 方法论

### 三段式漏斗架构

```
Stage 1: 候选池筛选
  输入: 聪明钱持仓 (N-PORT + 13F)
  过滤: Sharpe >= 0.3, MDD >= -50%, 排除烟草/博彩
  输出: ~150-200只
  速度: 极快

Stage 2: 排序筛选
  输入: Stage 1通过者
  方法: 综合评分 (Sharpe 30% + 尾部风险 15% + 基本面 25% + 估值 20% + SEC 10%)
  输出: Top 50
  速度: 中等

Stage 3: 证据链核验
  输入: Top 50
  验证: 数据来源完整性
  输出: Top 20
  速度: 最慢，但仅对20-30家做
```

---

## 执行结果摘要

| 阶段 | 输入 | 输出 | 通过率 |
|------|------|------|--------|
| Stage 1 | 46 | 22 | 48% |
| Stage 2 | 22 | 22 | - |
| Stage 3 | 22 | 20 | - |

---

## Top 20 最终名单

| Rank | Ticker | Company | Score | Sharpe | MDD | Fundamental | Valuation | Validated |
|------|--------|---------|-------|--------|-----|-------------|-----------|-----------|
| 1 | **AXP** | American Express Company | 63.2 | 1.18 | -31.5% | 70 | 60 | Yes |
| 2 | **AVGO** | Broadcom Inc. | 62.7 | 1.23 | -41.1% | 85 | 50 | Yes |
| 3 | **LLY** | Eli Lilly and Company | 62.4 | 1.14 | -34.5% | 80 | 50 | Yes |
| 4 | **BKNG** | Booking Holdings Inc. | 61.0 | 0.99 | -39.5% | 80 | 60 | Yes |
| 5 | **CB** | Chubb Limited | 58.9 | 0.43 | -19.3% | 80 | 70 | Yes |
| 6 | **ABBV** | AbbVie Inc. | 58.4 | 0.76 | -21.9% | 65 | 60 | Yes |
| 7 | **COST** | Costco Wholesale Corporat | 57.4 | 0.84 | -31.4% | 75 | 50 | Yes |
| 8 | **CAT** | Caterpillar Inc. | 55.0 | 0.76 | -34.0% | 70 | 55 | Yes |
| 9 | **LIN** | Linde plc | 53.7 | 0.49 | -22.8% | 75 | 50 | Yes |
| 10 | **MA** | Mastercard Incorporated | 51.4 | 0.33 | -28.3% | 80 | 55 | Yes |
| 11 | **SPGI** | S&P Global Inc. | 49.7 | 0.49 | -39.8% | 75 | 55 | Yes |
| 12 | **LOW** | Lowe's Companies, Inc. | 48.8 | 0.34 | -33.9% | 75 | 55 | Yes |
| 13 | **MSFT** | Microsoft Corporation | 47.7 | 0.52 | -37.1% | 85 | 26 | Yes |
| 14 | **KO** | The Coca-Cola Company | 47.1 | 0.49 | -17.3% | 70 | 15 | Yes |
| 15 | **GOOGL** | Alphabet Inc. | 47.1 | 0.90 | -44.3% | 85 | 0 | Yes |
| 16 | **MRK** | Merck & Co., Inc. | 46.6 | 0.31 | -43.4% | 80 | 55 | Yes |
| 17 | **JPM** | JPMorgan Chase & Co. | 45.2 | 0.70 | -38.8% | 60 | 33 | Yes |
| 18 | **DE** | Deere & Company | 45.2 | 0.34 | -33.8% | 65 | 50 | Yes |
| 19 | **V** | Visa Inc. | 44.2 | 0.38 | -28.6% | 85 | 8 | Yes |
| 20 | **ISRG** | Intuitive Surgical, Inc. | 44.1 | 0.34 | -49.9% | 80 | 50 | Yes |

---

## 数据来源

- **N-PORT**: SEC EDGAR公募基金月度持仓报告
- **13F**: SEC EDGAR机构季度持仓报告
- **风险指标**: 3年历史价格数据计算
- **基本面**: 公司财务报表数据
- **估值**: DCF、可比公司、历史分位

---

**注意**:
1. N-PORT/13F数据有45-60天滞后
2. 此名单需结合市场环境和个人风险偏好使用
3. 仅供研究参考，不构成投资建议
