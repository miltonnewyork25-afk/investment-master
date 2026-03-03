# DM标注强制执行器 v1.0

> **触发**: 每个Phase开始和结束时自动提醒
> **目标**: 确保100%数据诚信，杜绝SBUX类型的标注密度=0问题

---

## 🚨 强制提醒模板

**在每个Phase开始时，Agent必须看到这个提醒**:

```
⚠️ DM标注检查点 ⚠️
- 每个数字必须有[DM-XX-YYY]标注
- 目标密度: ≥15个标注/万字符
- 无标注数字 = 数据诚信失败
- 当前Phase完成前会自动检查
```

---

## 🎯 强制标注规则 (升级版)

### **强制DM格式**
```
财务数据: [DM-F01] 到 [DM-F99]
行业数据: [DM-I01] 到 [DM-I99]
估值数据: [DM-V01] 到 [DM-V99]
风险数据: [DM-R01] 到 [DM-R99]
```

### **密度要求升级**
| 报告长度 | 最低DM标注数 | 密度要求 |
|----------|--------------|----------|
| 100K字符 | 150个 | 15/万字符 |
| 150K字符 | 225个 | 15/万字符 |
| 250K字符 | 375个 | 15/万字符 |
| 300K字符+ | 450个+ | 15/万字符 |

### **Phase检查点**
- **Phase 1结束**: 必须≥50个DM标注
- **Phase 2结束**: 必须≥100个DM标注
- **Phase 3结束**: 必须≥150个DM标注
- **Phase 5完成**: 必须达到最终密度要求

---

## 🛡️ 自动化检查脚本

### **Early Warning检查**
```bash
#!/bin/bash
# dm_density_check.sh - Phase 1-3期间的早期警告
FILE="$1"
EXPECTED_DM="$2"

ACTUAL_DM=$(grep -o '\[DM-[^]]*\]' "$FILE" | wc -l)
if [ "$ACTUAL_DM" -lt "$EXPECTED_DM" ]; then
    echo "❌ DM标注不足: $ACTUAL_DM/$EXPECTED_DM"
    echo "⚠️ 必须补充 $((EXPECTED_DM - ACTUAL_DM)) 个标注"
    exit 1
else
    echo "✅ DM标注充足: $ACTUAL_DM/$EXPECTED_DM"
fi
```

### **集成到phase_complete.sh**
在第68行Fast Gate之前添加DM密度检查：
```bash
# DM密度预检查
echo -e "${CYAN}[0/5] DM标注预检查...${NC}"
bash scripts/dm_density_check.sh "$REPORT" "$((MIN_CHARS/10000*15))"
```

---

## ⚡ 紧急修复SBUX的方案

**立即可用的自动DM注入**:
```bash
#!/bin/bash
# inject_dm_annotations.sh - 为现有报告自动注入DM标注
FILE="$1"

# 财务数据正则匹配并添加DM标注
sed -i '' 's/\$[0-9,.-]\+[BM]/&[DM-F##]/g' "$FILE"
sed -i '' 's/[0-9]\+%\|[0-9]\+x/&[DM-F##]/g' "$FILE"

# 替换##为递增数字
python3 -c "
import re, sys
content = open('$FILE').read()
counter = 1
def replace(match):
    global counter
    result = match.group(0).replace('##', f'{counter:02d}')
    counter += 1
    return result
content = re.sub(r'\[DM-F##\]', replace, content)
open('$FILE', 'w').write(content)
"
```

---

## 📋 执行清单

- [ ] 1. 部署dm_annotation_enforcer.md到docs/
- [ ] 2. 修改phase_complete.sh添加预检查
- [ ] 3. 创建dm_density_check.sh脚本
- [ ] 4. 测试自动DM注入工具
- [ ] 5. 在所有worktree部署更新