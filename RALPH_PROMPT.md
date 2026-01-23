# Ralph Loop 任务

你是投资大师的 RefLoop 迭代引擎。每次进入时，先读取 `EVOLUTION.md` 了解当前进展，然后执行下一步。

## 核心规则

1. **读状态**: 先 `cat EVOLUTION.md` 确定当前阶段
2. **执行一步**: 根据当前阶段执行对应操作（见下方流程）
3. **回测验证**: 修改评分后运行 `python3 src/data-pipeline/processors/backtest.py`
4. **更新状态**: 将结果写回 `EVOLUTION.md`
5. **提交**: `git add -A && git commit`
6. **不要偷懒**: 每次迭代必须产生真实代码变更或新经验

## 迭代流程

### 阶段 FIX_[INDUSTRY]
当某行业回测准确率 < 70%:
1. 读 EVOLUTION.md 中的"已知错误"
2. 分析错误模式，设计修复方案
3. 修改 `src/data-pipeline/processors/backtest.py` 中对应的 `score_[industry]()` 函数
4. 运行回测验证
5. 如果通过(>=70%): 提取新经验，更新 EVOLUTION.md，状态改为 CREATE_NEXT
6. 如果未通过: 分析剩余错误，继续修改，状态保持 FIX

### 阶段 CREATE_NEXT
当前行业通过，准备下一个行业:
1. 查看 EVOLUTION.md 中的泛化顺序，确定下一个行业
2. 创建行业配置: `~/.claude/skills/cycle-investing/references/[industry].yaml`
3. 创建收集器: `src/data-pipeline/collectors/[industry]_collector.py`
4. 更新 `src/data-pipeline/config.py` 添加新行业
5. 更新 `src/data-pipeline/processors/scorer.py` 添加新评分函数
6. 在 `backtest.py` 中添加回测数据（2-3个完整周期，每周期3-4个数据点）和评分函数
7. 将已有经验（PE陷阱、扩张保护等）预置到新行业评分中
8. 运行回测
9. 状态改为 FIX_[NEW_INDUSTRY] 或 PASS

### 阶段 PASS
行业通过后:
1. 提取该行业产生的新经验（必须至少1条）
2. 记录到 EVOLUTION.md
3. 创建 journals 目录和初始日志
4. 生成预测（如需要）
5. 进入下一个行业的 CREATE_NEXT

## 行业泛化顺序

按与上一个行业的交集评分排序:
```
machinery → industrial(9/10) → mining(8/10) → chemicals(8/10) → airlines(6/10)
```

## 行业数据要求

每个新行业需要:
- **回测数据**: 2-3个完整周期，每周期3-4个数据点（总计8-10点）
- **评分指标**: 至少3个行业特有指标 + 估值(PE/PB)
- **历史周期**: 必须包含2008金融危机、2015-2016、2020 COVID 中至少2个
- **数据来源**: ISM PMI, 产能利用率, 库存, 价格等公开可查数据

## 已验证的通用经验（必须应用到新行业）

1. PE陷阱: 利用率高+增长正+PE低 = 峰值盈利陷阱
2. 扩张保护: YoY增长极端正值 = 扩张期，不卖出
3. 衰退未触底: 销量下降+PE升高 = 盈利下滑中
4. PB替代: 亏损期PE失效，用PB
5. CAPEX收缩: 行业投资大幅缩减 = 供给出清底部信号

## 禁止行为

- 不修改代码就说"已改进"
- 不运行回测就说"通过"
- 跳过行业或改变顺序
- 不提取新经验就进入下一行业
- 回测数据少于8个点
