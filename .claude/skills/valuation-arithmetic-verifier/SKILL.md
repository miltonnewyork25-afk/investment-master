---
name: valuation-arithmetic-verifier
description: 估值算术验证器 v1.0。Phase 5估值完成后用Python脚本验证DCF全链条算术正确性。消灭FCFF表矛盾、敏感性矩阵伪造等低级但致命的数值错误。源自MSFT v1.0双FCFF表矛盾+敏感性矩阵8/9格错误的教训。
---

# 估值算术验证器 v1.0

> **核心价值**: AI做多步乘除不可靠(50+次运算的累积误差)。用Python脚本做算术验证——零hallucination，100%可重现。
> **来源验证**: MSFT v1.0 (FCFF概览表vs推导表偏差5-7%, 敏感性矩阵8/9格不匹配重算)

## 触发条件

Phase 5 Agent C(定量估值分析师)写完DCF + 敏感性矩阵**之后**，在估值结果写入报告**之前**强制执行。

## 为什么需要这个Skill

| 问题 | MSFT的教训 | 本Skill的解决方案 |
|------|-----------|-----------------|
| FCFF双表矛盾 | 概览表和推导表FY29偏差$7.1B(4.5%) | Python逐行验证FCFF公式 |
| 敏感性矩阵伪造 | 9格中仅中心格正确，其余偏差5-9% | Python重算全部9格 |
| 折现因子错误 | 未发现但风险存在 | Python验证1/(1+WACC)^n |
| PV=FCFF×DF | 未发现但风险存在 | Python验证每行乘积 |
| 终端价值公式 | MSFT正确但其他报告可能出错 | Python验证Gordon公式 |

## 执行流程

### Step 1: 从Agent C产出中提取参数

从staging文件中提取以下参数（手动或用grep）:

```python
# 必须提取的参数
params = {
    "wacc": 0.095,           # 折现率
    "terminal_g": 0.03,      # 终端增长率
    "tax_rate": 0.18,        # 有效税率
    "net_debt": 30.3,        # 净债务 ($B)
    "shares": 7.46,          # 稀释股数 (B)
    "market_cap": 2995,      # 当前市值 ($B)
}

# 每年的输入 (从Agent C的表格提取)
years = [
    # (Revenue, OPM, D&A, CapEx, NWC变动)  -- 全部$B
    (320, 0.450, 38.0, 80.0, 3.0),   # FY26E
    (371, 0.440, 48.0, 82.0, 3.5),   # FY27E
    # ... 逐年填入
]
```

### Step 2: 运行验证脚本

```bash
python3 scripts/verify_dcf_arithmetic.py \
    --staging reports/{TICKER}/staging/phase5_agent_c.md \
    --wacc 0.095 \
    --terminal-g 0.03 \
    --tax-rate 0.18
```

脚本自动执行:

#### 2a. FCFF逐行验证
```
FCFF = EBIT × (1-t) + D&A - CapEx - |NWC变动|
     = (Revenue × OPM) × (1-tax) + D&A - CapEx - NWC

对每年:
  - 计算EBIT = Revenue × OPM
  - 计算EBIT(1-t)
  - 计算FCFF
  - 与Agent C的表格数字比较
  - 偏差>1%标记ERROR，0.5-1%标记WARN
```

#### 2b. 折现因子验证
```
DF_n = 1 / (1 + WACC)^n

对每年:
  - 计算DF
  - 与Agent C的DF比较
  - 偏差>0.001标记ERROR
```

#### 2c. PV = FCFF × DF 逐行验证
```
对每年:
  - PV_calc = FCFF × DF
  - 与Agent C的PV比较
  - 偏差>$0.5B标记ERROR
```

#### 2d. 终端价值验证
```
TV = FCFF_last × (1+g) / (WACC - g)
PV_TV = TV × DF_last

验证:
  - TV金额
  - PV(TV)金额
  - TV/EV比例(应在50-65%)
```

#### 2e. 敏感性矩阵验证 (3×3)
```
对WACC ∈ {base-50bps, base, base+50bps}:
  对g ∈ {base-50bps, base, base+50bps}:
    - 重算10Y PV(用新WACC)
    - 重算TV(用新WACC和新g)
    - 重算PV(TV)
    - 重算EV = 10Y PV + PV(TV)
    - 与Agent C矩阵比较
    - 偏差>2%标记ERROR
```

#### 2f. 总EV和每股价值验证
```
EV = 10Y_PV + PV(TV)
Market_Cap = EV - Net_Debt
Price_per_share = Market_Cap / Shares
Expected_Return = (Market_Cap - Current_MarketCap) / Current_MarketCap
```

### Step 3: 输出报告

```markdown
## DCF算术验证报告

**验证时间**: YYYY-MM-DD HH:MM
**TICKER**: MSFT
**WACC**: 9.5% | **g**: 3.0% | **Tax**: 18%

### FCFF验证
| 年份 | Agent FCFF | 计算FCFF | 偏差 | 状态 |
|------|-----------|---------|------|:----:|
| FY27E | $96.3B | $96.3B | 0.0% | ✅ |
| FY29E | $166.6B | $159.5B | 4.5% | ❌ |

### 折现因子验证: ✅ 全部通过

### PV验证: ✅ 全部通过

### 终端价值验证
- TV: Agent $5,364B vs 计算$5,364B → ✅
- PV(TV): Agent $2,167B vs 计算$2,167B → ✅
- TV/EV: 62.1% (50-65%区间内) → ✅

### 敏感性矩阵验证
| WACC\g | 2.5% | 3.0% | 3.5% |
|--------|:----:|:----:|:----:|
| 9.0% | ❌ +9.0% | ✅ | ❌ +7.1% |
| 9.5% | ❌ -5.9% | ✅ | ❌ +7.1% |
| 10.0% | ❌ -9.1% | ✅ | ❌ |

### 总结
- **FCFF**: 2/11 ERROR (FY29, FY30)
- **敏感性矩阵**: 8/9 ERROR
- **最终EV**: $3,489B (验证)
- **建议**: 修正FCFF概览表或添加脚注; 重新生成敏感性矩阵
```

## 关键设计原则

1. **Python做算术，LLM做判断**: 所有乘除法由Python执行，Agent只负责提取参数和解读结果
2. **偏差阈值分层**: >1%=ERROR(必须修正), 0.5-1%=WARN(标注), <0.5%=PASS(舍入容差)
3. **敏感性矩阵必须从模型重算**: 不允许Agent"估算"，必须用完全相同的FCFF流重新折现
4. **终端价值占比检查**: TV/EV>65%触发WARN(过度依赖终端假设)

## 质量门控

| 检查项 | 要求 | 严重度 |
|--------|------|:------:|
| FCFF逐行偏差<1% | 全部通过 | **BLOCK** |
| 折现因子偏差<0.001 | 全部通过 | BLOCK |
| PV=FCFF×DF偏差<$0.5B | 全部通过 | BLOCK |
| 终端价值公式正确 | TV和PV(TV)均通过 | BLOCK |
| 敏感性矩阵9格偏差<2% | 全部通过 | **BLOCK** |
| TV/EV<65% | 在合理区间 | WARN |
| 总EV → 市值 → 每股价值链一致 | 全部通过 | BLOCK |

**如果任何BLOCK项FAIL**: Agent C必须修正后重新提交，不允许带算术错误进入报告。

## 与其他Skill的集成

| 上游 | 本Skill | 下游 |
|------|--------|------|
| Phase 5 Agent C (DCF建模) | 算术验证 | 报告组装 (确认数值可信) |
| constraint-classifier (CQ约束) | — | dispersion-honesty-check (验证后的DCF作为方法之一) |

## 脚本位置

`scripts/verify_dcf_arithmetic.py` — 独立Python脚本，不依赖外部库(仅用标准库math)。

---

*估值算术验证器 v1.0 — 最蠢的错误最伤信誉，用机器消灭它*
