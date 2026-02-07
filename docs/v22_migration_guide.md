# v21 → v22 迁移指南

> v22.0核心升级: 从"流程合规"到"结果准确"。6个新机制解决GOOGL研究中发现的6个系统性问题。

---

## 升级概览

| 机制 | 文档 | 解决的问题 |
|------|------|-----------|
| M1 数据版本控制 | `docs/data_version_control.md` | S1: 数据版本失控 |
| M2 反幻觉协议 | `docs/anti_hallucination_protocol.md` | S2: Agent幻觉 |
| M3 关键假设主表 | `docs/key_assumptions_list.md` | S3: 假设散落 |
| M4 Kill Switch注册表 | `docs/kill_switch_registry.md` | S4: KS权属不清 |
| M5 估值修正层级 | `docs/valuation_correction_hierarchy.md` | S5: 估值修正无层级 |
| M6 质量门控v2.0 | `docs/quality_gate_v2.md` | S6: 只查流程不查结果 |

---

## 对现有工作流的影响

### Phase 0 变化
- **新增**: 创建Data Master (DM v1.0) + KAL空模板
- **影响**: Phase 0完成标准增加2项

### Phase 1-3 变化
- **新增**: Agent引用数据附带 `[DM-xxx vN.N]`，引用假设附带 `[KA-xxx]`
- **新增**: 每个SubAgent prompt注入反幻觉5条禁令
- **影响**: prompt更长，但输出质量更高

### Phase 4 变化
- **新增**: R-G结果门控12项检查
- **新增**: KAL验证（所有A级假设逐条验证）
- **新增**: DM冻结
- **影响**: Phase 4工作量增加约20%，但能捕获数字不一致

### Phase 5 变化
- **新增**: Kill Switch使用统一注册表（三级阈值）
- **新增**: 估值修正审计日志
- **影响**: KS章节格式变化，需使用注册表模板

---

## 向后兼容

| 项目 | 兼容性 |
|------|--------|
| `research_fast.sh` | 不变，仍为P-G自动化基础 |
| 旧报告 | 可选做R-G，不强制 |
| 旧标注格式 | `[A:]`/`[B:]`仍被识别 |
| 铁律1-13 | 保留不变，新增14/15 |
| 并行Agent | 兼容，prompt增加注入项 |

---

## 新报告(v22+)强制要求

1. Phase 0 必须创建 DM + KAL
2. Agent引用必须带DM/KAL编号
3. SubAgent prompt必须注入反幻觉禁令
4. Phase 4/5 必须通过R-G≥7/10
5. KS必须使用统一注册表
6. 估值修正必须走修正管道+审计日志

---

## 版本历史

| 版本 | 日期 | 变更 |
|:---:|:---:|------|
| v1.0 | 2026-02-07 | 初版迁移指南 |
