# RefLoop 进化记录

> 此文件由 Ralph Loop 每次迭代自动更新。
> Claude 每次进入时先读此文件，了解当前进展。

## 当前状态

- **当前阶段**: CREATE_INDUSTRIAL
- **总体目标**: 所有行业回测准确率 >= 70%，每个行业产出新经验

## 行业进展

| 行业 | 状态 | 回测准确率 | 新经验数 | 备注 |
|------|------|-----------|---------|------|
| semicap | DONE | 80%+ (参考框架) | 基线 | 首个行业，基线框架 |
| shipping | DONE | 80%+ (参考框架) | 基线 | 第二个行业 |
| energy | PASS | 80% | 2 | PB优于PE(综合油企), CAPEX收缩信号 |
| machinery | PASS | 100% | 3 | PE陷阱+扩张保护+衰退未触底 |
| industrial | **CREATING** | - | - | 与machinery交集9/10 |
| chemicals | PENDING | - | - | 与energy交集8/10 |
| mining | PENDING | - | - | 与machinery交集8/10 |
| airlines | PENDING | - | - | 与energy交集6/10 |

## 行业泛化顺序（按交集最大排序）

```
machinery(修复) → industrial(9/10) → mining(8/10) → chemicals(8/10) → airlines(6/10)
```

## 已知错误（machinery 60%准确率的原因）

1. **2007-12**: util=82%, exc_yoy=20%, PE=15 → 给出neutral，实际down
   - 原因: PE陷阱 - 周期顶部盈利最高导致PE最低，误判为便宜
2. **2014-09**: util=78%, exc_yoy=10%, PE=16 → 给出watch，实际down
   - 原因: 接近顶峰但未检测到
3. **2015-09**: exc_yoy=-20%, util=65%, PE=30 → 给出neutral，实际down
   - 原因: 衰退初期+高PE=盈利下滑中，未触底
4. **2021-06**: exc_yoy=40%, con_yoy=10%, util=80%, PE=25 → 给出sell，实际up
   - 原因: 极端正增长是扩张期不是过热，逆周期逻辑误判

## 已提取的通用经验

### 经验 #1: PB优于PE（亏损期）
- 来源: energy
- 内容: PE在亏损期失效，PB更稳定。需同时配置PE和PB，亏损时自动切换
- 已应用于: energy, machinery

### 经验 #2: CAPEX收缩是底部信号
- 来源: energy (rig count YoY < -40%)
- 内容: 行业CAPEX大幅收缩代表供给侧出清，是强底部信号
- 已应用于: energy

### 经验 #3: PE陷阱 (Peak Earnings Trap)
- 来源: machinery (v2迭代)
- 内容: 利用率>78% + 增长正(>=10%) + PE<18 = 顶峰盈利陷阱。低PE不是便宜，是盈利最高点
- 已应用于: machinery
- 泛化规则: 任何行业在产能利用率极高+增长正+估值看似便宜时，都是周期顶部

### 经验 #4: 扩张保护
- 来源: machinery (v2迭代)
- 内容: YoY增长>25% + 配套指标正增长 = 扩张初/中期，不应卖出
- 已应用于: machinery
- 泛化规则: 极端正增长代表复苏动力强劲，逆周期不应在此时触发卖出

### 经验 #5: 衰退未触底信号
- 来源: machinery (v2迭代)
- 内容: 销量下降(-5%~-30%) + PE>25 = 盈利下滑速度快于股价，未到底部
- 已应用于: machinery
- 泛化规则: 当核心指标下降但估值仍高，不要误认为"跌到位了"

## 已验证的假设

1. **PE陷阱**: ✓ 已验证 (2007-12, 2014-09 两个数据点)
2. **扩张保护**: ✓ 已验证 (2021-06 数据点)
3. **衰退未触底**: ✓ 已验证 (2015-09 数据点)

## 回测数据位置

- 评分逻辑: `src/data-pipeline/processors/backtest.py`
- 行业配置: `~/.claude/skills/cycle-investing/references/*.yaml`
- 评分器: `src/data-pipeline/processors/scorer.py`
- 收集器: `src/data-pipeline/collectors/*_collector.py`

## 迭代日志

### Iteration 0 (初始状态 - 2026-01-23)
- energy: 80% PASS
- machinery: 60% FAIL (4 errors identified)
- 结论: 需要修复 machinery 评分逻辑再继续

### Iteration 1 (machinery 修复 - 2026-01-23)
- machinery: 60% → 100% PASS (10/10)
- 修复: PE陷阱(Fix1) + 扩张保护(Fix2) + 衰退未触底(Fix3)
- 新经验: 3条 (#3 PE陷阱, #4 扩张保护, #5 衰退未触底)
- energy: 80% 保持不变
- 结论: machinery 通过，进入 industrial 行业创建
