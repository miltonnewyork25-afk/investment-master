# Skills Changelog

记录所有Skill的版本变更历史。

---

## 2026-01-27 (下午更新)

### 系统升级

| 组件 | 版本 | 改进内容 |
|------|------|---------|
| CLAUDE.md | v10→v11 | 新增铁律4（估值逻辑自洽）、数据来源强制标注、API数据强制展示清单、质量门控显式执行 |
| quality_gate | v1→v2 | 四层检查（数据溯源→API展示→深度验证→估值逻辑）、强制附报告模板 |
| lessons_learned | +4条 | LL_007~LL_010（数据溯源、API利用、估值逻辑、质量门控） |

### 经验教训新增

| ID | 类别 | 教训 |
|----|------|------|
| LL_007 | 数据溯源 | 报告中数字来源不清晰，需要强制标注 |
| LL_008 | API利用 | 100baggers 7维度评分未展示，API数据必须全部呈现 |
| LL_009 | 估值逻辑 | SOTP $161 vs 目标价$250-280有断层，必须以SOTP为锚 |
| LL_010 | 质量门控 | 声称通过但未显式执行，必须附检查结果表 |

---

## 2026-01-27 (上午)

### 新增 Skills

| Skill | 版本 | 说明 |
|-------|------|------|
| post_analysis_reflection | v1.0 | 分析后反思skill，检查执行完整性和提取经验教训 |
| compound_learning | v1.0 | 复利学习引擎，将经验转化为系统性改进 |
| innovation_pipeline_executor | v1.0 | Innovation Agent强制执行器 |

### 新增文件

| 文件 | 路径 | 说明 |
|------|------|------|
| lessons_learned.yaml | skills/knowledge_base/ | 经验教训知识库 |
| changelog.md | skills/ | 版本变更日志 |

### 修复

| 问题 | 影响的文件 | 修复内容 |
|------|-----------|---------|
| analyst-estimates缺少period参数 | data_source_registry_v1.yaml | 添加period参数说明 |

### 待办

| 优先级 | 任务 | 状态 |
|--------|------|------|
| P0 | 更新CLAUDE.md添加Rule -2（复利学习） | 进行中 |
| P1 | 升级analysis_preloader到v2 | 待办 |
| P1 | 添加Agent输出格式强制验证 | 待办 |
| P2 | 等待Ralph Loop插件修复 | 阻塞 |

---

## 版本命名规则

```
{skill_name}_v{major}.{minor}.skill.{md|xml|yaml}

major: 重大功能变更
minor: 小改进或bug修复
```

## 归档规则

- 保留最近2个版本
- 旧版本移至 `archives/{skill_name}/` 目录
