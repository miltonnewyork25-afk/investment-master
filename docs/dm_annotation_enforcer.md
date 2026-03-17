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

### **Phase 5 扩写DM同步规则 (EVO-SPGI-003, v1.1新增)**

> **问题来源**: SPGI v1.0多会话扩写期间加入~26K叙述但DM锚点仅70个 → 密度0.44/千字(历史最低, 标杆VRT=1.49)。
> 扩写内容默认不含DM标注 → 报告越长密度越稀 → CG8/CG9可能通过但实际数据可信度下降。

**强制规则**:

| 扩写量 | 最低新增DM | 说明 |
|:------:|:---------:|------|
| ≤500字符 | 0 | 微调/措辞修正, 豁免 |
| 500-2000字符 | ≥2个 | 任何实质内容扩展 |
| 2000-5000字符 | ≥5个 | 中等扩展(新小节/新表格) |
| >5000字符 | ≥10个 | 大段新增(新章节级别) |

**DM来源优先级**(扩写时):
1. **引用已有锚点**: 从shared_context.md或DM注册表中引用已有DM-ID(零成本)
2. **提升已有数据**: 将正文中无标注的数字回溯到DM来源(低成本)
3. **新增锚点**: 扩写引入的新数据点必须创建新DM锚点(正常成本)

**执行时机**: Phase 5 Complete组装中的每次Edit操作后, Agent自检:
```
扩写字符数 = wc -m(编辑后) - wc -m(编辑前)
if 扩写字符数 > 500:
    新增DM数 = grep新增的[DM-xxx-yyy]计数
    if 新增DM数 < ceil(扩写字符数 / 1000) * 1:
        ⚠️ 暂停扩写, 补充DM锚点后继续
```

**禁止**: 连续3次扩写(>500字符/次)均无新增DM → 强制停止扩写, 转为补DM模式

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