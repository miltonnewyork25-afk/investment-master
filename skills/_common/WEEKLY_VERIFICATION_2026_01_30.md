# 周验证仪式 | 2026-01-30 (周五)

> 预计时间: 15-30分钟
> 参考: verification_ritual_v1.yaml

---

## 本周待验证预测

### 1. 2月到期批次（提前检查数据可用性）

| ID | 预测 | 类型 | 验证日期 | 数据来源 | 当前状态 |
|----|------|------|----------|----------|----------|
| PROP_007 | Alchip 2026收入>$3B | structural | 2026-02 | Alchip财报 | ⏳ 待数据 |
| PROP_008 | TSMC 2nm良率75% | structural | 2026-02 | 供应链消息 | ⏳ 待数据 |
| ROI_001 | 企业AI支出增速>30% | structural | 2026-02 | Gartner报告 | ⏳ 待数据 |

**行动**: 搜索上述数据源，确认2月能否验证

---

### 2. 已验证预测确认（闭环检查）

| ID | 预测 | 结果 | Lesson提取 | 已更新文件 |
|----|------|------|------------|------------|
| AMD_OpenAI | AMD从OpenAI获$5-10B | ❌ incorrect | 新合作+12月 | [ ] lessons_learned.yaml |
| ROI_006 | Copilot 50M用户 | ❌ incorrect | 采用率×0.3-0.4 | [ ] predictions_tracker校准 |

**行动**: 确认lessons已记录，校准规则已更新

---

## 执行清单

### Step 1: 检查到期预测 (5分钟)
- [ ] 打开 predictions_tracker_v1.yaml
- [ ] 确认本周/近期到期预测
- [ ] 列出需要验证数据

### Step 2: 搜索验证数据 (10分钟)
- [ ] PROP_007: 搜索 "Alchip 2026 revenue guidance"
- [ ] PROP_008: 搜索 "TSMC 2nm yield rate 2026"
- [ ] ROI_001: 搜索 "enterprise AI spending 2026 growth"

### Step 3: 更新预测状态 (5分钟)
- [ ] 可验证的预测 → 更新status为correct/incorrect
- [ ] 不可验证的 → 记录数据缺失原因

### Step 4: 提取Lessons (5分钟)
- [ ] 错误预测分析原因
- [ ] 写成标准lesson格式
- [ ] 添加到lessons_learned.yaml

### Step 5: 记录验证结果 (5分钟)
- [ ] 填写下方验证记录
- [ ] 更新verification_ritual_v1.yaml的history

---

## 验证记录（完成后填写）

```yaml
weekly_verification_record:
  date: "2026-01-30"
  predictions_checked: ___
  verifiable: ___
  correct: ___
  incorrect: ___
  data_unavailable: ___

  accuracy_this_week: "____%"

  lessons_extracted:
    - id: "LL_XXX"
      from_prediction: "PRED_XXX"
      lesson: "_______________"

  next_actions:
    - "_______________"

  notes: |
    _______________
```

---

## 校准参数检查

当前校准规则 (predictions_tracker):
```
type_multipliers:
  structural: 1.0
  event: 0.75
  timing: 0.6
  adoption: 0.4
```

**本周是否需要调整?** [ ] 是 [ ] 否

如需调整:
- 类型: ___
- 原因: ___
- 新multiplier: ___

---

## 下周预告

下周需要关注的预测:
1. [预测ID]: [内容]
2. [预测ID]: [内容]

---

*仪式完成时间: ___:___*
*下次仪式: 2026-02-06 (周五)*
