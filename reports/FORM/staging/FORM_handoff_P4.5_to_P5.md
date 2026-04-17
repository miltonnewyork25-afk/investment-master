# Handoff Note — FORM Phase 4.5 → Phase 5

> **日期**: 2026-04-17 | **分支**: 半导体 worktree | **Phase 4.5 完成**

---

### 1. [SESSION] 主要请求与意图

FORM Tier 3深度报告, 目标150K+字符 / 4.5+质量分。Phase 4.5完成圆桌+压缩+Top 5 Lens。

---

### 2. [SESSION] 核心矛盾 + Thesis + 变量

**主假说 (Phase 4.5最终)**: "FORM不是HBM消耗品垄断供应商, 是'HBM叙事溢价的周期股'——增长方向和利润方向结构性相反, $128中约$30-50是HBM叙事溢价而非基本面价值。概率加权公允价值$86.75, 高估47.5%。"

**母钉子命名**: "HBM叙事溢价的周期股"
**第一变量**: GAAP GM持续性 (非HBM content per wafer)
**估值语言**: Owner PE on Owner Earnings (非Forward non-GAAP PE)

**评级**: **审慎关注 (高不确定性)** [贵×方向未确认×有催化(4/29+5/11)]
- 圆桌5/5一致, 0异议
- **黑箱比例40%≥30%阈值 → 禁止单点目标价, 必须区间估值**

**四种情景 (三锚校准后)**:
- Bear 30% → $55-70(中值$62.5) | Base 45% → $80-100(中值$90) | Bull 20% → $110-130(中值$120) | Extreme 5% → $140-160(中值$150)
- **公允价值区间: $70-100, 中位$90** (vs $128, 高估30-42%)
- 安全边际入场区间: $55-65

**Kill Switch 5红/3黄/2绿**: 详见P4 red team

---

### 3. [REFRESH] 文件清单

**Phase 4-4.5产出 (4个staging文件)**:
- `staging/FORM_P4_red_team.md` — 13K, 10 DM, RT-1~7+双向校准+概率三锚+KS
- `staging/FORM_P4_assumption_audit.md` — 6K, 8 DM, 信念反演+叙事解构+约束分类
- `staging/FORM_P4.5_roundtable.md` — 14K, 10 DM, 5大师3轮+4洞见+裁决
- `staging/FORM_compression_test.md` — 5K, compression+Top 5 Lens

**Phase 1-4.5累计**: ~124K字符staging, ~273 DM锚点

---

### 4. [SESSION] 关键数字汇总 (Phase 5写作用)

| 数据点 | 值 | DM |
|--------|-----|-----|
| 概率加权公允价值 | $86.75 | DM-RT合成 |
| Owner Earnings FY25 | ~$27M | DM-RT-017 |
| Owner PE FY25 | 370x | DM-RT-017 |
| Owner PE FY27E (乐观) | 67x | 圆桌 |
| 巴菲特安全边际入场价 | $55-65 | DM-RT-020 |
| 圆桌加权公允价值中位 | $75-85 | 圆桌 |
| GM mix驱动天花板 | 43-44% GAAP | DM-RT-016 |
| 凸性N/M比 | 0.17 | DM-RT-012 |
| 叙事溢价 | $30-50/share | DM-RT-015 |
| HBM需求>2年概率 | 65% | P4三锚 |
| Technoprobe DRAM概率 | 25-35% | P4修正 |
| DRAM CapEx周期下行概率(2027-28) | 45-55% | DM-RT-011 |

---

### 5. Phase 5工程清单

```yaml
phase5_engineering_requirements:
  dm_anchors_to_add:
    - id: DM-EXEC-001
      number: "概率加权公允价值$86.75 vs $128(高估47.5%)"
      source: "P4情景加权"
      chapter: "执行摘要"
    - id: DM-EXEC-002
      number: "评级: 审慎关注 [贵×方向未确认×有催化]"
      source: "圆桌5/5一致"
      chapter: "执行摘要"
    - id: DM-EXEC-003
      number: "4/29 Q1 + 5/11 Analyst Day = 12天关键窗口"
      source: "德鲁肯米勒催化剂日历"
      chapter: "执行摘要"
    - id: DM-BIZ-001~010
      number: "P1业务数据(收入拆分/DRAM增长/F&L衰退/MEMS专利)"
      source: "10-K + FMP"
      chapter: "Ch 1-3"
    - id: DM-FIN-001~015
      number: "P2财务数据(归因瀑布/GM Bridge/EPS瀑布/剪刀差/ROIC)"
      source: "10-K + Python验证"
      chapter: "Ch 4-6"
    - id: DM-COMP-001~015
      number: "P3竞争数据(Technoprobe对比/份额/供应链/WFE comp)"
      source: "Technoprobe IR + 行业报告"
      chapter: "Ch 7-9"
    - id: DM-VAL-001~010
      number: "估值数据(EV/Sales/Reverse DCF/SOTP/Owner PE/概率加权)"
      source: "Python模型 + P2/P4计算"
      chapter: "Ch 10-11"
    - id: DM-RT-001~020
      number: "红队+圆桌数据(偏差修正/三锚/洞见)"
      source: "P4+P4.5"
      chapter: "Ch 12-14"
    # 总计: ~70个DM锚点已在staging中标注

  mermaid_diagrams_to_add:
    - title: "FORM增长vs利润方向相反示意"
      type: "graph"
      chapter: "Ch 1 核心争议"
    - title: "收入归因瀑布 FY23→FY25"
      type: "flowchart"
      chapter: "Ch 4 财务归因"
    - title: "毛利率Bridge FY23→FY25"
      type: "flowchart"
      chapter: "Ch 4"
    - title: "FORM vs Technoprobe财务对比"
      type: "graph"
      chapter: "Ch 7 竞争"
    - title: "探针卡市场份额结构"
      type: "pie"
      chapter: "Ch 7"
    - title: "HBM→探针卡传导链"
      type: "flowchart"
      chapter: "Ch 8 供应链"
    - title: "四情景概率加权"
      type: "flowchart"
      chapter: "Ch 10 估值"
    - title: "Owner PE vs Non-GAAP PE对比"
      type: "graph"
      chapter: "Ch 10"
    - title: "Kill Switch信号灯 5红3黄2绿"
      type: "flowchart"
      chapter: "Ch 13 风险"
    - title: "催化剂日历时间轴"
      type: "gantt"
      chapter: "Ch 12"
    - title: "凸性评估(上行vs下行)"
      type: "graph"
      chapter: "Ch 11"
    - title: "圆桌公允价值分布"
      type: "graph"
      chapter: "Ch 12 圆桌洞见"

  mid_assembly_checkpoints:
    - 50K
    - 100K
    - 150K

  phase5_process_erasure_check:
    q1_reader_ignorance_test: "读者不需要知道Phase/Agent/staging, 报告用投资者语言"
    q2_engineering_perspective_check: "禁止'分析显示/研究发现/多轮验证'等工程化视角"
    q3_bloomberg_test: "每段能直接放进Bloomberg研报"
    process_language_families_to_avoid:
      agent_family: ["Agent findings", "子Agent", "并行Agent"]
      phase_family: ["Phase X完成", "P1-A", "P4回流"]
      workflow_family: ["staging文件", "handoff note", "checkpoint"]
      skill_family: ["调用skill", "skill产出"]
```

---

### 6. Phase 5章节规划

```
执行摘要 (800-1200字, 6拍)
Ch 1: 核心争议 — 市场在买什么 / 旧地图为什么失灵
Ch 2: 业务理解 — 探针卡商业模式 / 消耗品vs制造业真相
Ch 3: DRAM/HBM深度 — 需求真实性 / content传导 / 周期位置
Ch 4: 财务归因 — 收入瀑布 / GM Bridge / EPS瀑布 / ROIC路径
Ch 5: 剪刀差分析 — 4+1个剪刀差
Ch 6: F&L — 结构性失地分析
Ch 7: 竞争格局 — FORM vs Technoprobe / 份额动态
Ch 8: 供应链传导 — 上游(Disco/材料) / 下游(DRAM FAB) / 传导衰减
Ch 9: 护城河评估 — 真伪检验 / 定价权 / 认证壁垒
Ch 10: 估值 — 5种方法 / Owner PE / 概率加权 / SOTP
Ch 11: 红队审查 — 偏差修正 / 最强反方 / 凸性
Ch 12: 圆桌洞见 — 4个碰撞洞见(无痕融入)
Ch 13: 风险 — Kill Switch 5/3/2 / 催化剂日历
Ch 14: 认知边界 + 跟踪指标
附录: DM注册表 / 数据源
```

---

### 7. [SESSION] 下一步唯一优先

**Phase 5启动**: 单会话组装。先写执行摘要(6拍), 然后逐章组装。每50K调用mid_assembly_check。

**关键提醒**:
- 过程无痕化: 禁止Phase/Agent/staging/skill等词
- Voice: 用"我们", 不用"本报告/笔者"
- 禁hedging: 用具体数字, 不用"可能/或许"
- DM密度≥1.0/千字
- 圆桌洞见无痕融入(禁止"巴菲特认为")
- **R-4黑箱40% → 禁止单点目标价, 全文用区间$70-100**
- **EPS口径: 禁止"-34%", 用"正常化零增长"(FY2023含$73M一次性)**
- **执行摘要必须承认: 精确公允价值是低置信度判断, 当前价格不提供安全边际是高置信度判断**
- **Too Hard边界: 拉宽估值区间+更严安全边际要求**
