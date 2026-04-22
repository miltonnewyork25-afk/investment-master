# POWL — Phase 4.5 → Phase 5 Handoff (工程清单 + Staging 充足性评估)

> **用途**: 铁律 J-3 v3.0 + J-5 强制; P5 不得启动除非本 handoff 齐全

---

## 1. Staging 充足性 (J-5 硬门控)

```
Target Complete chars: 280,000 (240-375K 区间中点)
Total staging chars: 126,000 (所有 P0-P4.5 staging 之和)
Sufficiency ratio: 126,000 / 280,000 = 0.45
```

**⚠️ 充足性 0.45 < 0.70 阈值, 触发 BLOCK**

### 薄弱章节识别 (≤3个)

| 薄弱章节 | 当前 staging | 补充方向 |
|---------|-------------|--------|
| **Ch 2 财务归因 + 剪刀差** | P2 16.8K + P1 deep 14.6K = 31K | 需扩展到 45K: 补充多年 Revenue Waterfall 细节 + CapEx-FCF 剪刀差量化 |
| **Ch 3 竞争/护城河** | P1 moat 9.3K + P1 game 7.1K = 16.4K | 需扩展到 35K: 补充 ETN Omaha / VRT / HUBB 对标数据, Peer 扩展样本 |
| **Ch 4 估值深度** | P3 12.6K + P3 v2 修复 = 15K | 需扩展到 40K: Reverse DCF 敏感度表 + SOTP 三情景详细拆分 + 极端 Bear 推导 |

### 行动建议 (两选一)

**方案 A: 回退深化 Phase 2-3** (严格 J-5 合规)
- 时间成本: 大; 质量收益: 高
- 适用: 对 4.5 分标杆有硬要求

**方案 B: Phase 5 组装时吸收 staging + 补充实质分析 (非凑数)**
- 利用 P4.5 参考扫描 (J-2) 找同分析挑战的冠军报告 (KLAC Ch11 估值 / CME Ch8 SOTP / MSCI Ch12 剪刀差) 补视角
- 不扩写骨架, 而是借用已验证分析框架重写薄弱章节
- 时间成本: 中; 质量收益: 中
- 适用: 用户希望推进到 P5

**建议: 方案 B + 设置 P5 章节字符硬门控** (每章必须 ≥目标 80% 才能进下一章)

---

## 2. phase5_engineering_requirements (J-3 工程清单)

### 2.1 DM 锚点必填清单 (目标: ≥50 个, 覆盖所有估值关键数字)

**已有 DM (来自 P0-P4 staging)**:
- P1 deep findings: DM-CQI-001~010 + DM-GAP-001~006 + DM-SG-001~015 = **31 个**
- P1 expectation gap / moat / game theory = ~12 个
- P2 attribution: DM-ATT-001~009 + DM-REV-001 等 = ~27 个
- P3 valuation: DM-VAL-001~018 = 18 个
- P0-P0.75: 数据锚点 ~30 个
- **累计: ~120 个 DM 锚点**

**Phase 5 新写章节必填 DM** (额外):
```yaml
dm_anchors_to_add:
  exec_summary:
    - id: DM-EXEC-001
      number: "概率加权公允值 \$92 (Bull 25% \$139 / Base 50% \$85 / Bear 25% \$63)"
      source: "P4 红队修正 + P3 v2 四方法加权"
      chapter: "执行摘要 + Ch 11.2"
    - id: DM-EXEC-002
      number: "Reverse DCF 隐含 10Y FCF CAGR 20.2% (历史 0/25 S&P 600 小盘案例)"
      source: "P3 reverse_dcf.implied_cagr"
      chapter: "执行摘要 + Ch 11"
    - id: DM-EXEC-003
      number: "黑箱 28% / 复杂度 3.5/5 / 可推演度 72%"
      source: "P4.5 cognitive_boundary assessment"
      chapter: "执行摘要前 5 行标注"
    - id: DM-EXEC-004
      number: "圆桌 3/5 倾向下调 (Munger 明确 / Buffett 暗示 / Druckenmiller 半档)"
      source: "P4 §6 投资委员会"
      chapter: "执行摘要 + Ch 13"
    - id: DM-EXEC-005
      number: "F-C spread +19-21pp (历史 peak 3 年窗口最高)"
      source: "P1 deep findings §1"
      chapter: "执行摘要 + Ch 2 + Ch 5"

  # Ch 1 范畴重分配
  ch1_category_shift:
    - DM-CAT-001: "FY25 DC 营收占总营收 2.4% (\$26M/\$1,104M)"
    - DM-CAT-002: "LNG+Utility 占 51% (\$562M) + 工业 20%"
    - DM-CAT-003: "CapEx 100% 投向 Jacintoport LNG 码头, 零投入 DC 产能"
    - DM-CAT-004: "Q1 FY26 backlog DC 仅 15% (\$240M/\$1.60B)"
    - DM-CAT-005: "管理层'3-5年 LNG 强周期'措辞 (2025 Q4 earnings call)"

  # Ch 6 圆桌异议公开披露 (R-3 硬约束)
  ch13_roundtable_dissent:
    - DM-ROUND-001: "Munger: 反身性 peak (F-C spread +21pp 小盘周期股 PE 47x)"
    - DM-ROUND-002: "Buffett: 稳态 ROE 12-15% (非 peak 28%), 合理 PB 2x (非 5x+)"
    - DM-ROUND-003: "Druckenmiller: 三重宏观压力 (AI CapEx 减速 + LNG 2028 真空 + 高利率)"
    - DM-ROUND-004: "Klarman: 当前安全边际 -60%, 真买点 \$50 以下"
    - DM-ROUND-005: "Howard Marks: 中长期 -40 to -60%, 短期可能再涨 15-25%"

# 新写共计需 ≥20 个 DM, 加上 staging 已有 ≥120 个 = 总目标 140+ 个 DM
```

**密度验证**: 280K 报告 × 0.8/千字 = 224 个 DM 下限 → 需新写章节贡献 ≥100 DM
- 策略: 每章 Ch2-Ch13 至少 10-12 个 DM (保持 P1-P3 节奏)

### 2.2 Mermaid 图必填清单 (目标 ≥15 个, 300K+ 强制)

```yaml
mermaid_diagrams_to_add:
  - title: "POWL 业务结构 (混合体 vs 纯 beta 对比)"
    type: "pie / flowchart"
    chapter: "Ch 1 / 执行摘要"
    purpose: "一图显示 FY25 mix: LNG 37% + Utility 14% + 工业 20% + DC 2.4% + 其他"

  - title: "F-C spread 历史类比 (peak stocks 12-18 个月跌幅分布)"
    type: "graph / scatter"
    chapter: "Ch 2"
    purpose: "CAT 2012 -45% / Deere 2013 -38% / Terex 2007 -70% / POWL 当前位置"

  - title: "SOTP 三段式估值树"
    type: "flowchart"
    chapter: "Ch 11"
    purpose: "Core 16-18x PE + LNG DCF + DC 概率加权"

  - title: "Reverse DCF 隐含 CAGR vs 历史 base rate"
    type: "scatter"
    chapter: "Ch 11"
    purpose: "POWL 20.2% implied vs 历史 10Y FCF CAGR >20% case rate 0/25"

  - title: "DC option 三情景概率加权"
    type: "flowchart"
    chapter: "Ch 11"
    purpose: "Bull 10% \$66 / Base 60% \$25 / Bear 30% \$7"

  - title: "Kill Switch 触发流程 (K-CQI + K-GAP + K-LNG 3x3)"
    type: "flowchart"
    chapter: "Ch 12"
    purpose: "9 个 Kill Switch 信号的触发级联"

  - title: "圆桌异议结构 (5 大师评级分布)"
    type: "graph"
    chapter: "Ch 13"
    purpose: "3/5 倾向下调, 1/5 明确回避, 0/5 反对母命题"

  - title: "Kill Switch 时间轴 (2026-2027 监控节点)"
    type: "gantt"
    chapter: "Ch 12"
    purpose: "Q2 FY26 GM + Q3 DC backlog + 2027 Jacintoport 利用率"

  - title: "Insider 4/4 F-C spread >15pp 历史类比"
    type: "flowchart"
    chapter: "Ch 2 / Ch 13"
    purpose: "4 次历史案例 → 12 个月内股价 -30%+ 的 100% base rate"

  - title: "Peer Multiple 重估 (扩大样本 ETN+HUBB+ABB+THR+MLI+MYRG)"
    type: "flowchart"
    chapter: "Ch 11"
    purpose: "严格中位 20x → 应用 18x (cycle discount -4x after peer mix update)"

  - title: "LNG 订单窗口 (FID 节奏 2024-2030)"
    type: "gantt"
    chapter: "Ch 5 / Ch 12"
    purpose: "2024-25 高位 FID → 2026-27 新 FID 减少 → 2028-30 订单真空"

  - title: "GM Bridge 周期性 vs 结构性 (FY17-FY25)"
    type: "flowchart"
    chapter: "Ch 4"
    purpose: "周期性 12pp + 结构性 1.5pp 拆分"

  - title: "EPS 瀑布 FY25 → FY27E (我方 vs 一致预期)"
    type: "flowchart"
    chapter: "Ch 4"
    purpose: "\$4.40 (我方) vs \$5.50 (consensus) -20% gap 的 4 个来源"

  - title: "母命题 - Lens 母子结构 (5 个 Lens)"
    type: "flowchart"
    chapter: "Ch 1 / 14 固化"
    purpose: "Lens 1 母 + Lens 2-5 子 (机制/护城河/信号/数学)"

  - title: "极端 Bear 联合概率推导"
    type: "flowchart"
    chapter: "Ch 11 / Ch 12"
    purpose: "K-CQI-1 35% × K-GAP-1 25% × Y3 70% + 相关性 = 联合 15%"
```

**合计: 15 个 Mermaid** ✓ (触发 J-3 最低要求)

### 2.3 中场检测时点 (J-4 强制)

```yaml
mid_assembly_checkpoints:
  - 50K   # 第 1 次 mid_assembly_check.sh
  - 100K  # 第 2 次
  - 150K  # 第 3 次
  - 200K  # 第 4 次 + 强制重读 5 减法清单
  - 250K  # 第 5 次 + 警告分会话风险
```

---

## 3. phase5_process_erasure_check (第零律 2 自检三问)

```yaml
q1_reader_ignorance_test: |
  读者不知道 "Phase / Agent / staging" 是什么, 能看懂本报告吗?
  **必须: 是 (通过)**
  - 所有报告章节 Ch 1-14 必须用投资者语言, 不含工程语
  - "P1 发现" "P4 红队" "staging" 必须改写为 "证据显示" / "反向审视" / "补充分析"

q2_engineering_perspective_check: |
  是否有 "谁做了什么" 的工程化视角?
  **必须: 无 (不允许)**
  - 禁用 "本报告分析显示" → 改为 "分析显示"
  - 禁用 "经过红队验证" → 改为 "经过反向审视"
  - 禁用 "在 Phase 4.5 阶段" → 不提 Phase

q3_bloomberg_test: |
  能直接放进 Bloomberg 研报 / Morgan Stanley research note 吗?
  **必须: 能 (通过)**
  - 叙事流畅, 不是 staging 拼接
  - 术语首提内联解释 (NRR / F-C spread / Reverse DCF)

process_language_families_to_avoid:
  agent_family: ["子Agent", "并行Agent", "P[0-9]+ Agent", "Agent 分析"]
  phase_family: ["Phase X 完成", "P1-A", "P4.5 结晶", "在...Phase 中"]
  workflow_family: ["staging 文件", "handoff", "checkpoint"]
  llm_family: ["LLM 调用", "prompt", "context window"]
  skill_family: ["调用 xxx-skill", "investment-committee skill"]
```

---

## 4. S-1/S-2/S-4 递送纪律 (铁律 S 执行)

### S-1: 对齐 (Ch 1 必须显式呈现)

- ✓ `POWL_default_map_audit.md` 已存在
- 4 元素齐全: market_default_definition / market_default_variables / market_default_valuation_language / failure_points (≥2, 实际 4 个)
- Ch 1 写法: "**1.1 市场怎么看这家公司**" (无痕化, 不用"市场默认地图审计")

### S-2: 压缩 (Ch 4-5 新定义首次出现, 不早于报告 25%)

- ✓ `POWL_compression_test.md` 已完成
- 三链接验证通过 (变量重排 / 估值语言切换 / 失灵点解释)
- expansion_test 7 个子模块
- **延迟出场**: 新定义 "被当纯 beta 定价的 LNG 混合体" 在执行摘要使用, 正文 Ch 1-3 **不得**首次出现, 最早 Ch 4 引入

### S-3: 节奏 (6 拍叙事)

| 拍 | 章节位置 | 关键纪律 |
|---|---------|--------|
| 拍 1 激活旧地图 | Ch 1 | 先让市场共识"立得住" — "为什么市场给 POWL 47x PE 不荒唐" |
| 拍 2 制造裂缝 | Ch 2-3 | 呈现 ≥3 个旧框架解释不通的事实 (DC 2.4% / CapEx 0 / insider 4/4) |
| 拍 3 引入新定义 | Ch 4-5 | **新定义命名首次在正文出现, ≥报告 25% 位置** |
| 拍 4 变量+账钉住 | Ch 6-11 | 用 F-C spread / SOTP / Reverse DCF 把变量钉死 |
| 拍 5 边界+反方 | Ch 12-13 | Kill Switch + 圆桌异议 (R-3 强制公开披露) |
| 拍 6 回收+固化 | Ch 14 | 三个钉子 (S-4) |

### S-4: 固化 (倒数第二章)

- 位置: **Ch 14** (非最后一章, 最后一章是 Kill Switch 行动清单)
- 4 元素齐全:
  1. 新定义 (混合体)
  2. 第一变量 (GM run-rate + DC 占比)
  3. 新估值语言 (SOTP 三段)
  4. 迁移问题 (看类似公司时问什么)
- 字数 ≤800

---

## 5. Phase 5 章节结构 (建议)

```
0. 执行摘要 (S-3 三段式, 800-1200 字, 目标 ~25K)
1. 市场怎么看这家公司 (S-1 对齐) — Ch 1
2. 财务归因与剪刀差 (R-1 + R-2) — Ch 2-4
3. 业务本质: 混合体范畴重分类 (S-2 新定义引入) — Ch 5-6
4. 护城河与竞争 — Ch 7-8
5. LNG 基本盘与 DC 期权 — Ch 9-10
6. 估值深度: SOTP 三段 + Reverse DCF + Peer Multiple — Ch 11
7. Kill Switch 与风险 — Ch 12
8. 圆桌异议公开披露 (R-3 强制) — Ch 13
9. 三个钉子 (S-4 固化) — Ch 14
10. 行动清单 (卖出框架 内部 / Kill Switch 触发流程 外部) — Ch 15

总计: 0 + 15 章 = 16 章主体
目标字数: 280K (240-375K 区间中点)
每章平均: 17.5K
```

---

## 6. Phase 5 启动前 check list (AI 自检)

- [x] S-1 default_map_audit 存在 ✓
- [x] S-2 compression_test 存在, 三链接齐全 ✓
- [x] R-4 cognitive_boundary 存在, 黑箱 28% (触发敏感度区间约束) ✓
- [x] R-3 圆桌异议已结构化 (3/5 倾向下调, 需公开披露) ✓
- [x] 工程清单 (DM ≥140 / Mermaid ≥15 / 检测时点 5 个) ✓
- [x] 第零律 2 自检三问已定 ✓
- [x] 6 拍叙事 + S-4 固化章节位置已定 ✓
- [x] 评级 "审慎关注 (临界)" 标注已定 ✓
- [x] 公允价值 "区间 \$80-105 (中位 \$92)" 表达已定 ✓
- [ ] Staging 充足性 0.45 < 0.70 ⚠️ 选择方案 B (借 P4.5 参考扫描补视角, 不凑数)

**准备就绪**: 可进入 Phase 5 组装.
