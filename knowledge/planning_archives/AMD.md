# AMD Planning Archive
> v2.0 | 349K | CG 13/13 | 2026-02-11 | PW=5 → mixed_mode

## 什么有效（可复用）
- **方法离散度4.42x量化不确定性**: 比给点估计更有决策价值 → 适用于所有混合模式报告
- **CQ下调=P4对抗成功**: 5/8 CQ在P4后下调=成功校准 → P4后≥30%CQ应有下调是健康信号
- **CI注册表嵌入P5**: 5个非共识洞察直接放在Phase 5 Summary内 → 修复CG12的最简方案
- **EPYC vs ROCm置信度差异**: 最强CQ5 EPYC(65%) vs 最弱CQ3 ROCm(38%) → 反映AI软件生态的真实不确定性

## 什么无效（需避免）
- **P5 Agent C OAuth失败**: 被迫手动写CQ闭环 → 根因: 关键Agent需重试或兜底机制
- **ROCm生态评估过度依赖定性判断**: 缺少开发者调查/GitHub活跃度等硬数据 → 根因: 软件生态指标公开数据少

## 关键指标
- Agents: 标准 | CQ置信度: 47.1% | 方法离散度: 4.42x | DM: 1,573 (45.1/万)
- Mermaid: 49 | KS: 14 | TS: 8 | CQ: 12 | CI: 5

## 独特贡献
- 第二份v9.0框架报告, 验证了方法离散度作为不确定性量化工具
- CQ下调校准机制: P4对抗→CQ置信度调整的标准流程
- CI嵌入P5的可行性验证(解决CG12)

## 如果重做
- ROCm需硬数据(GitHub stars/开发者人数/benchmark结果)
- Agent容错: 关键Agent(如P5 Agent C)需自动重试3次
- 与NVDA的GPU竞争需更多crosscheck(第三方benchmark数据)
