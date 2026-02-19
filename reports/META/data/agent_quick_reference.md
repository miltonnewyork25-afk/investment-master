# META Agent协作快速参考卡

> 执行时快速查阅，完整方案见 `agent_collaboration_plan.md`

---

## Phase概览

| Phase | Agent数 | 字符目标 | 核心产出 | DM版本 |
|-------|:------:|:-------:|---------|:------:|
| 0 | 1 | 自动 | 14个DM锚点 + KAL模板 | v1.0 |
| 0.5 | 2 | 自动 | Top 10维度 + 5-8个CQ | v1.0 |
| 1 | 3 | 20K | 公司画像 + 预测市场 + Hot-Patch | v1.1 |
| 2 | 4 | 25K | SOTP + DCF + 财务分析 | v1.2 |
| 3 | 5 | 25K | 护城河 + 广告 + RL + 五引擎 | v1.2 |
| 3.5 | 3 | 10K | AI冲击矩阵 + L×S + AI调整估值 | v1.3 |
| 4 | 3 | 15K | 偏差检查 + 看空≥8 + 事实核查 | v1.3冻结 |
| 5 | 3 | 15K | 评级 + KS≥15 + 预测≥20 | v1.3最终 |

---

## META特有Agent速查

### Reality Labs专家 (Phase 3 Agent C)
- **产出**: VR/AR市场/产品路线/盈亏平衡路径
- **挑战**: $20B/年亏损，无可比公司
- **KAL**: Quest销量/盈亏平衡时间

### Llama/AI开源专家 (Phase 3 Agent E)
- **产出**: 开源策略/商业转化/vs闭源劣势
- **挑战**: 开源如何赚钱？
- **数据**: GitHub星标/下载/API调用

### 社交竞争专家 (Phase 3 Agent E)
- **产出**: Instagram vs TikTok / Threads vs X
- **关键指标**: 用户时长/创作者分成/算法效率
- **KAL**: Threads 5亿MAU时间窗口

### 广告经济学专家 (Phase 3 Agent B)
- **产出**: ARPU趋势/Reels变现/Advantage+
- **TP02完整**: 5年ARPU表（地区+产品）
- **核心争议**: Reels能否达到Feed 70%变现？

### 监管诉讼专家 (Phase 4 Agent B)
- **看空论点**: FTC拆分/DMA罚款/青少年诉讼
- **KS**: 拆分概率>35%→Hard清仓
- **预测市场**: Polymarket FTC上诉概率

---

## 反幻觉检查清单（每个Agent）

```markdown
✅ 财务数字来自WebSearch或DM锚点？
✅ 可比公司倍数有≥3家真实数据来源？
✅ 预测市场概率来自Polymarket/Kalshi？
✅ "合理推算"写出完整公式+输入值来源？
✅ 所有DM引用附带版本号 [DM-xxx vN.N]？
```

---

## SOTP特别规程（Phase 2 Agent B）

### Reality Labs估值困境
- **问题**: 无可比公司，持续巨额亏损
- **方案1**: 期权定价法（成功概率 × 未来价值）
- **方案2**: 情景分析（Bull $50B / Base $10B / Bear -$20B减值）
- **方案3**: VC方法（按融资轮次倒推估值）
- **禁止**: "参考同业"（无同业）

### 三步验证
```
Step 1: 段值 → Family of Apps用Snap/Pinterest倍数
              Reality Labs用期权/情景法
Step 2: 汇总 → 检查无重复/遗漏
Step 3: 每股 → SOTP÷稀释股数 vs DCF偏离<20%
```

---

## 看空论点清单（Phase 4 Agent B）

**必须≥8个，每个含四要素**:

1. Reality Labs持续亏损→减值/关停
2. TikTok蚕食Instagram→MAU负增长
3. FTC上诉成功→强制剥离→营收-30%
4. 广告负载天花板→ARPU停滞
5. 欧盟DMA罚款+限制→欧洲营收-20%
6. Llama开源无变现→AI投入ROI负
7. Threads增长停滞→错失Twitter窗口
8. 青少年诉讼→使用限制→DAU下降
9. (Agent B补充其他...)

---

## Kill Switch清单（Phase 5 Agent B）

**必须≥15个，含≥2个AI相关**:

| # | 触发条件 | 类型 | 动作 |
|:-:|---------|:----:|------|
| 1 | DAU连续2Q下降>5% | Hard | 立即清仓 |
| 2 | 广告收入连续2Q<0% | Hard | 立即清仓 |
| 3 | FTC拆分概率>35% | Hard | 立即清仓 |
| 4 | RL累计亏损>$150B无突破 | Soft | 减仓50% |
| 5 | Reels 2026未达Feed 50% | Soft | 减仓50% |
| 6 | Instagram MAU首次负增长 | Hard | 立即清仓 |
| 7 | 欧盟DMA罚款>$50B | Soft | 减仓50% |
| 8 | Threads 2026<3亿MAU | Soft | 减仓50% |
| 9 | 监管限制广告定向→ARPU-15% | Hard | 立即清仓 |
| 10 | CapEx/营收>30%持续4Q | Soft | 减仓50% |
| 11 | (Agent B补充...) | ... | ... |

---

## 质量门控速查

### P-G (过程门控) - 自动化
```bash
bash tests/research_fast.sh reports/META/META_Phase{N}_{date}.md {min_chars} 3
```

### R-G (结果门控) - Agent执行
**Phase 4/5强制检查**:
1. SOTP一致性 → 各Agent引用同一DM-VAL-001版本
2. KS一致性 → Phase 5 KS覆盖Phase 4看空论点
3. KAL一致性 → 报告结论vs假设无冲突
4. DM一致性 → 所有引用版本号一致
5. 估值可追溯 → 每次调整有审计日志
6. 数字一致性 → 同一数字报告各处值相同

---

## WebSearch模板（复制使用）

### Phase 0.5
```
META Reality Labs losses metaverse ROI
Instagram Reels monetization vs TikTok
META FTC antitrust appeal Instagram WhatsApp
Threads growth vs Twitter X 2026
META Llama AI open source strategy
site:polymarket.com META regulation
```

### Phase 2
```
META SOTP valuation Family of Apps
Reality Labs fair value venture capital
Snap Pinterest valuation multiples 2026
```

### Phase 3
```
Instagram vs TikTok market share 2026
META Advantage+ advertising AI ROI
META developer ecosystem Llama
```

### Phase 4
```
META bear case analyst short seller
Reality Labs shutdown probability
TikTok Instagram user exodus data
```

---

## 执行检查点

**Phase开始前**:
- [ ] 创建 `current_tasks/Agent_{X}.lock.md`
- [ ] 更新 `STATUS.md` 所有Agent=PENDING
- [ ] 确认DM当前版本

**Agent返回时**:
- [ ] 运行 P-G (research_fast.sh)
- [ ] PASS → 归档到Phase主文件 + 删锁 + git commit
- [ ] FAIL → 记录STATUS.md + 重试（最多1次）

**Phase结束时**:
- [ ] 全部Agent完成
- [ ] P-G通过（Phase 4/5: R-G也通过）
- [ ] STATUS.md合并入progress.md
- [ ] git commit "Phase {N} Complete"
- [ ] 清空 `current_tasks/`

---

**最后更新**: 2026-02-07
