# SBC瀑布驱动因素分解模板 v1.0 (EVO-ADSK-01)

> **来源**: ADSK v1.0→v2.0升级(SBC/Rev收敛70%靠分母增长,非管理层纪律)
> **适用**: 所有SBC/Rev>8%的SaaS公司
> **触发**: Phase 2财务分析中,与`sbc_three_layer_profitability.md`配合使用
> **解决问题**: 三层盈利回答"SBC多高",瀑布分解回答"SBC为什么这么高+会不会收敛"
> **与现有模块关系**: `sbc_three_layer_profitability.md`(WHAT) + 本模块(WHY+WHEN)

---

## 一、何时触发

| 条件 | 阈值 | 说明 |
|------|------|------|
| SBC/Rev | >8% | 大多数SaaS(DDOG 22%, NOW 15%, CRM 18%, ADSK 11%) |
| SBC YoY增速 | >10% 且 >Rev增速 | SBC不收敛信号 |
| Owner FCF Yield | <4% | Owner基础不便宜→SBC是关键变量 |

**不触发**: SBC/Rev<5%的公司(BSY 4.8%, AAPL ~1%)→SBC不是估值的关键变量

---

## 二、SBC瀑布分解模板 (3步)

### Step 1: SBC/Rev变化拆解 (过去5年)

将SBC/Rev的变化分解为3个驱动因素:

```
SBC/Rev变化 = 分母效应 + 绝对值效应 + 结构效应

分母效应 = SBC(不变) / Rev(增长后) - SBC/Rev(原始)
  → 衡量"收入增长把SBC/Rev自然摊薄了多少"

绝对值效应 = (SBC增量 - Rev增长假设不变时的SBC) / Rev(新)
  → 衡量"SBC绝对值是增加还是减少了"

结构效应 = RSU/PSU比例变化 + 地理薪酬变化 + 员工结构变化
  → 衡量"SBC的构成是否在优化"
```

**计算表模板**:

| 驱动因素 | FY{T-4}→FY{T} | 贡献(pp) | 贡献(%) |
|---------|:-----------:|:-------:|:------:|
| **分母效应**(Rev CAGR摊薄) | Rev从$X→$Y, SBC/Rev自然↓ | -X.Xpp | XX% |
| **绝对值效应**(SBC绝对增减) | SBC从$X→$Y, 增速vs Rev增速 | ±X.Xpp | XX% |
| **结构效应**(RSU/PSU/地理) | PSU占比变化, 地理分布变化 | ±X.Xpp | XX% |
| **净变化** | SBC/Rev从X%→Y% | -X.Xpp | 100% |

**ADSK示例**:
```
ADSK FY2022→FY2026: SBC/Rev从12.6%→10.9% (-1.7pp)
  分母效应: -4.8pp (70%) ← Rev +64%把SBC自然摊薄
  绝对值效应: +3.6pp (抵消53%) ← SBC +42%部分抵消
  结构效应: -0.5pp (7%) ← RSU→PSU占比↑(FY2026 PSU 60%)
  净变化: -1.7pp
```

### Step 2: 收敛投影 (未来5年)

基于Step 1的驱动因素趋势,投射SBC/Rev路径:

| FY | Rev增速 | SBC增速 | SBC/Rev | 变化 | 关键假设 |
|----|:------:|:------:|:------:|:----:|---------|
| FY{T}(实际) | X% | X% | X% | — | — |
| FY{T+1}E | X% | X% | X% | -Xpp | [假设说明] |
| FY{T+2}E | X% | X% | X% | -Xpp | |
| FY{T+3}E | X% | X% | X% | -Xpp | |
| FY{T+4}E | X% | X% | X% | -Xpp | |
| FY{T+5}E | X% | X% | X% | -Xpp | Terminal state |

**收敛速度公式**:
```
年收敛速度(pp) ≈ SBC/Rev × (Rev增速 - SBC增速) / (1 + Rev增速)

例: SBC/Rev=11%, Rev增速=12%, SBC增速=6%
  → 年收敛 ≈ 11% × (12%-6%) / 1.12 = 0.59pp/年
  → 5年收敛: ~3pp → 11%→8%
```

**红线情景**: 如果SBC增速>Rev增速→SBC/Rev不收敛→红线。计算"SBC增速需要<X%才能收敛"的阈值:
```
收敛条件: SBC增速 < Rev增速
阈值: SBC增速 < Rev增速(当年guidance)

ADSK FY2027: Rev guidance +12.5% → SBC增速必须<12.5%才能继续收敛
```

### Step 3: 收敛对估值的影响

**SBC/Rev敏感性表**(通用模板):

| SBC/Rev | Owner FCF Margin | Owner PE | 估值/股变化 |
|:-------:|:---------------:|:-------:|:----------:|
| 当前X% | X% | Xx | 基准 |
| -1pp | +0.8pp | -0.8x | +$X |
| -2pp | +1.6pp | -1.6x | +$X |
| -3pp | +2.4pp | -2.4x | +$X |

**经验法则**: SBC/Rev每降1pp → Owner FCF Margin +0.8pp → 估值+2.5-3.5%
(具体系数取决于税率和收入规模)

---

## 三、与其他模块的集成

| 步骤 | 本模块产出 | 传递给 |
|------|---------|--------|
| Step 1 | 分母/绝对值/结构贡献 | `sbc_three_layer_profitability.md`(解释三层差距) |
| Step 2 | 收敛投影表 | Phase 2估值假设(DCF terminal margin) |
| Step 3 | 敏感性表 | Phase 4红队(Bear: SBC不收敛情景) |

**Kill Switch集成**:
```
KS-SBC: SBC/Rev > [当前+2pp] 连续2季度
  → 触发: 收敛投影失效 → 重新评估Owner Economics → 可能下调评级
```

---

## 四、同行SBC收敛基准

| 公司 | FY2022 SBC/Rev | FY2026 SBC/Rev | 5年变化 | 分母贡献 | 收敛类型 |
|------|:----------:|:----------:|:------:|:------:|---------|
| **ADSK** | 12.6% | 10.9% | -1.7pp | 70% | 分母驱动(慢) |
| **NOW** | 19.2% | 14.7% | -4.5pp | 60% | 分母+绝对值双驱动 |
| **CRM** | 18.0% | ~9.5% | -8.5pp | 40% | 绝对值压缩(强纪律) |
| **DDOG** | ~22% | ~22% | 0pp | — | **不收敛** |
| **PTC** | ~12% | 7.9% | -4pp | 50% | 完成收敛(≤8%) |

**结论**: CRM是收敛最成功的案例(8.5pp/5年)→可作为ADSK的乐观参考。DDOG是不收敛的案例→如果ADSK步DDOG后尘=Bear scenario。
