## 铁律 G: Context主动管理

**Agent必须在以下时机主动执行 `bash scripts/context_save.sh`**:
1. **用户说context不够/要clear** — 立即执行，不问问题
2. **并行Agent全部返回后** — 立即commit staging产出，不等Phase完成
3. **任何阶段性产出完成时** — 报告/staging/data有变化就commit，不积压

**禁止**: 让用户手动提醒保存 | 未提交就建议/clear | 积压超过2个Agent产出不commit
