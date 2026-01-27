# 硬性排除规则清单 v2.0

## 概述

硬性排除规则是质量筛选的**红线**。任何触发这些规则的公司将被**直接排除**出Top 20候选池，无论其他指标多么优秀。

**设计原则**:
1. **宁缺毋滥**: 排除低质量公司比遗漏优质公司更重要
2. **证据导向**: 所有规则基于可量化的财务指标
3. **行业调整**: 部分规则考虑行业特性

---

## 硬性排除规则 (Hard Exclusions)

### 规则1: 现金流质量严重不足

**规则**: OCF/Net Income < 0.5 连续2年

| 参数 | 值 |
|------|---|
| 阈值 | OCF/NI < 0.5 |
| 连续年数 | 2年 |
| 严重程度 | Hard |

**原因**:
- 利润无法转化为现金，表明盈利质量严重存疑
- 可能存在激进的收入确认、资本化费用、或应收账款问题
- 高概率表明利润被操纵或业务模式根本问题

**检测逻辑**:
```python
def check_ocf_quality(data):
    """
    检查OCF/NI连续2年低于0.5
    """
    cash_flow = data.get('cash_flow_statement', [])
    income = data.get('income_statement', [])

    low_quality_years = 0

    for i in range(min(2, len(cash_flow), len(income))):
        ocf = cash_flow[i].get('operatingCashFlow', 0) or 0
        ni = income[i].get('netIncome', 0) or 0

        if ni > 0:
            ratio = ocf / ni
            if ratio < 0.5:
                low_quality_years += 1

    if low_quality_years >= 2:
        return {
            'excluded': True,
            'reason': 'OCF/Net Income < 0.5 连续2年，盈利质量严重存疑'
        }
    return {'excluded': False}
```

**例外情况**:
- 高增长公司首次盈利: 营运资本增加可能暂时拉低OCF/NI
- 一次性项目: 需剔除非经常性损益后重新计算

---

### 规则2: 持续摧毁股东价值

**规则**: ROIC < WACC 连续3年

| 参数 | 值 |
|------|---|
| 阈值 | ROIC < 估算WACC (约8%) |
| 连续年数 | 3年 |
| 严重程度 | Hard |

**原因**:
- ROIC低于资本成本意味着公司正在**摧毁股东价值**
- 长期低ROIC表明缺乏定价权或竞争优势
- 资本配置能力差

**检测逻辑**:
```python
def check_roic_vs_wacc(data):
    """
    检查ROIC连续3年低于WACC

    WACC估算:
    - 默认使用8%作为WACC近似值
    - 可根据行业调整
    """
    metrics = data.get('key_metrics', [])
    wacc_threshold = 0.08

    low_roic_years = 0

    for m in metrics[:3]:
        roic = m.get('roic', 0) or 0
        if roic < wacc_threshold:
            low_roic_years += 1

    if low_roic_years >= 3:
        return {
            'excluded': True,
            'reason': 'ROIC低于WACC连续3年，持续摧毁股东价值'
        }
    return {'excluded': False}
```

**行业调整**:
- **REIT/Utilities**: 可使用更低的WACC阈值(5%)
- **金融行业**: 使用ROA替代ROIC
- **周期性行业**: 使用周期平均ROIC

---

### 规则3: 无可验证护城河

**规则**: 护城河评分 = 0分

| 参数 | 值 |
|------|---|
| 阈值 | Moat Score = 0 |
| 严重程度 | Hard |

**原因**:
- 缺乏可持续竞争优势的公司难以维持高回报
- 容易被竞争者蚕食市场份额
- 长期投资风险高

**检测逻辑**:
```python
def check_moat(dimension_scores):
    """
    检查护城河评分是否为0
    """
    moat_score = dimension_scores.get('moat_strength')

    if moat_score and moat_score.score == 0:
        return {
            'excluded': True,
            'reason': '无可验证护城河，缺乏可持续竞争优势'
        }
    return {'excluded': False}
```

**注意**:
- 护城河评分基于五个维度的综合评估
- 至少需要在一个维度有证据才不会被排除
- 新兴公司可能尚未建立护城河，需谨慎评估

---

### 规则4: 杠杆过高

**规则**: Net Debt / EBITDA > 5x (或行业90分位)

| 参数 | 值 |
|------|---|
| 通用阈值 | Net Debt/EBITDA > 5x |
| 行业调整 | 使用行业90分位数 |
| 严重程度 | Hard |

**原因**:
- 高杠杆在经济下行期可能导致财务困境
- 债务服务压力限制战略灵活性
- 信用评级下调风险

**检测逻辑**:
```python
def check_leverage(data, sector):
    """
    检查杠杆是否过高

    行业调整:
    - REIT: 允许更高杠杆(阈值7x)
    - Utilities: 允许更高杠杆(阈值6x)
    - 其他: 5x
    """
    ttm = data.get('ttm_data', {})

    ebitda = ttm.get('ebitda', 0)
    total_debt = ttm.get('total_debt', 0)
    cash = ttm.get('cash', 0)
    net_debt = total_debt - cash

    # 行业调整阈值
    threshold_by_sector = {
        'Real Estate': 7.0,
        'Utilities': 6.0,
        'Financials': 'use_different_metric',
    }

    threshold = threshold_by_sector.get(sector, 5.0)

    if threshold == 'use_different_metric':
        return {'excluded': False, 'note': 'Use different metric for Financials'}

    if ebitda > 0:
        nd_ebitda = net_debt / ebitda
        if nd_ebitda > threshold:
            return {
                'excluded': True,
                'reason': f'杠杆过高(Net Debt/EBITDA = {nd_ebitda:.1f}x)，财务风险显著'
            }
    return {'excluded': False}
```

---

## 软性排除规则 (Soft Exclusions)

软性排除规则不会直接排除公司，但会降低评分并标记风险。

### 规则S1: 利息覆盖率过低

**规则**: EBIT/Interest Expense < 2x

| 参数 | 值 |
|------|---|
| 阈值 | Interest Coverage < 2x |
| 影响 | 资本效率维度扣分 |

**原因**:
- 利息支付压力大
- 再融资风险
- 信用评级压力

---

### 规则S2: 流动性紧张

**规则**: Current Ratio < 1.0

| 参数 | 值 |
|------|---|
| 阈值 | Current Ratio < 1.0 |
| 影响 | 资本效率维度扣分 + 标记风险 |

**原因**:
- 短期偿债能力不足
- 可能需要紧急融资
- 运营灵活性受限

---

### 规则S3: 毛利率大幅下滑

**规则**: 毛利率年降幅 > 5%

| 参数 | 值 |
|------|---|
| 阈值 | GM YoY Change < -5% |
| 影响 | 利润结构维度扣分 + 标记风险 |

**原因**:
- 竞争加剧
- 成本控制失效
- 定价权削弱

---

### 规则S4: 应收账款异常增长

**规则**: AR增速 > 营收增速 + 10%

| 参数 | 值 |
|------|---|
| 阈值 | AR Growth > Revenue Growth + 10% |
| 影响 | 现金流质量维度扣分 |

**原因**:
- 可能虚增收入
- 客户付款困难
- 信用政策放松

---

### 规则S5: 存货积压

**规则**: 存货增速 > 营收增速 × 2

| 参数 | 值 |
|------|---|
| 阈值 | Inventory Growth > Revenue Growth × 2 |
| 影响 | 现金流质量维度扣分 |

**原因**:
- 需求放缓
- 过度生产
- 可能需要减值

---

## 排除规则汇总表

| 规则 | 类型 | 阈值 | 触发后果 |
|------|------|------|----------|
| OCF/NI < 0.5 连续2年 | 硬性 | OCF/NI < 0.5 | 直接排除 |
| ROIC < WACC 连续3年 | 硬性 | ROIC < 8% | 直接排除 |
| 护城河评分 = 0 | 硬性 | Moat = 0 | 直接排除 |
| Net Debt/EBITDA > 5x | 硬性 | ND/EBITDA > 5 | 直接排除 |
| 利息覆盖 < 2x | 软性 | IC < 2 | 扣分+警示 |
| 流动比率 < 1.0 | 软性 | CR < 1.0 | 扣分+警示 |
| 毛利率下滑 > 5% | 软性 | GM YoY < -5% | 扣分+警示 |
| AR异常增长 | 软性 | AR > Rev+10% | 扣分+警示 |
| 存货积压 | 软性 | Inv > Rev×2 | 扣分+警示 |

---

## 实施代码

```python
class ExclusionChecker:
    """排除规则检查器"""

    def check_all_rules(self, data, dimension_scores):
        """
        检查所有排除规则

        Returns:
            ExclusionCheck: 排除检查结果
        """
        hard_exclusions = []
        soft_exclusions = []

        # 硬性规则1: OCF质量
        ocf_check = self.check_ocf_quality(data)
        if ocf_check['excluded']:
            hard_exclusions.append(ocf_check['reason'])

        # 硬性规则2: ROIC
        roic_check = self.check_roic_vs_wacc(data)
        if roic_check['excluded']:
            hard_exclusions.append(roic_check['reason'])

        # 硬性规则3: 护城河
        moat_check = self.check_moat(dimension_scores)
        if moat_check['excluded']:
            hard_exclusions.append(moat_check['reason'])

        # 硬性规则4: 杠杆
        leverage_check = self.check_leverage(data)
        if leverage_check['excluded']:
            hard_exclusions.append(leverage_check['reason'])

        # 软性规则
        soft_exclusions = self.check_soft_rules(data)

        is_excluded = len(hard_exclusions) > 0
        severity = 'hard' if is_excluded else ('soft' if soft_exclusions else 'none')

        return ExclusionCheck(
            is_excluded=is_excluded,
            reasons=hard_exclusions + soft_exclusions,
            severity=severity
        )

    def check_soft_rules(self, data):
        """检查软性规则"""
        warnings = []

        # 利息覆盖率
        ttm = data.get('ttm_data', {})
        ebit = ttm.get('operating_income', 0)
        interest = ttm.get('interest_expense', 0)

        if interest > 0 and ebit / interest < 2:
            warnings.append(f"利息覆盖率过低({ebit/interest:.1f}x)")

        # 流动比率
        current_assets = ttm.get('current_assets', 0)
        current_liabilities = ttm.get('current_liabilities', 0)

        if current_liabilities > 0 and current_assets / current_liabilities < 1:
            warnings.append("流动比率 < 1.0")

        return warnings
```

---

## 版本历史

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v2.0 | 2026-01-26 | 完整规则清单，增加软性规则 |
| v1.0 | 2026-01-25 | 初版 |

---

**作者**: Agent 3 - 排除规则检查器
**最后更新**: 2026-01-26
