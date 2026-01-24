# Marketing Metrics Tracking System
# Super Marketing Agent v1.0
# 创建时间: 2026-01-24

## 概述
本文档定义了营销效果的追踪体系、报告格式和优化决策框架。

---

## 一、数据采集清单

### Twitter/X
| 指标 | 获取方式 | 频率 |
|------|---------|------|
| 粉丝总数 | Profile页 | 每日 |
| 粉丝增长 | 差值计算 | 每日 |
| Thread印象数 | Tweet Analytics | 每条 |
| 互动率 | (Like+RT+Reply)/Impression | 每条 |
| Profile访问 | Analytics Dashboard | 每周 |
| 链接点击 | UTM追踪 | 每条 |

### Substack
| 指标 | 获取方式 | 频率 |
|------|---------|------|
| 总订阅者 | Dashboard | 每日 |
| 新增订阅 | Dashboard | 每日 |
| 取消订阅 | Dashboard | 每日 |
| 打开率 | Email Analytics | 每期 |
| 点击率 | Email Analytics | 每期 |
| Notes 互动 | Notes Dashboard | 每日 |

### GitHub
| 指标 | 获取方式 | 频率 |
|------|---------|------|
| Stars | Repo page | 每日 |
| Forks | Repo page | 每日 |
| Clones | Traffic | 每周 |
| Unique visitors | Traffic | 每周 |
| Referral sources | Traffic | 每周 |

### YouTube
| 指标 | 获取方式 | 频率 |
|------|---------|------|
| 订阅者 | Studio | 每日 |
| 观看次数 | Studio | 每视频 |
| 平均观看时长 | Studio | 每视频 |
| 点击率(CTR) | Studio | 每视频 |
| 来源分布 | Studio | 每周 |

### Reddit
| 指标 | 获取方式 | 频率 |
|------|---------|------|
| 帖子 Upvotes | 帖子页 | 每帖 |
| 评论数 | 帖子页 | 每帖 |
| Profile Karma | Profile | 每周 |
| 引流点击 | UTM | 每帖 |

---

## 二、周报模板

```markdown
# Marketing Weekly Report
## Week of: [DATE]

### 📊 North Star Metrics
| Metric | Last Week | This Week | Δ | Target |
|--------|-----------|-----------|---|--------|
| Total Reach | | | | |
| Total Subscribers | | | | |
| Engagement Rate | | | | |

### 📈 Channel Performance
| Channel | Followers/Subs | Growth | Best Content | Score |
|---------|---------------|--------|-------------|-------|
| Twitter | | +X | Thread #N | |
| Substack | | +X | Issue #N | |
| GitHub | | +X stars | | |
| YouTube | | +X | Video #N | |
| Reddit | | +X karma | Post #N | |

### 🏆 Top Content This Week
| # | Content | Platform | Impressions | Engagement | Score |
|---|---------|----------|------------|-----------|-------|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |

### Content Score Formula
Score = (Shares×3 + Comments×2 + Likes×1) / Impressions × 1000

### 📉 Underperformers (Score < 20)
| Content | Platform | Score | Root Cause | Action |
|---------|----------|-------|------------|--------|
| | | | | |

### 🧪 A/B Test Results
| Test | Variant A | Variant B | Winner | Δ |
|------|-----------|-----------|--------|---|
| | | | | |

### 💡 Key Learnings
1.
2.
3.

### 📅 Next Week Plan
| Day | Content | Platform | Hook Type |
|-----|---------|----------|-----------|
| Mon | | | |
| Tue | | | |
| Wed | | | |
| Thu | | | |
| Fri | | | |
| Sat | | | |
| Sun | | | |

### 🔄 Methodology Updates
- [ ] New methods to integrate:
- [ ] Methods to deprecate:
- [ ] Framework adjustments:
```

---

## 三、A/B 测试记录系统

### 测试日志格式
```yaml
test_id: "AB-001"
date: "2026-01-27"
platform: "Twitter"
variable: "Hook type"
hypothesis: "Data shock hooks get 2x more impressions than curiosity gap hooks"
variant_a:
  description: "100% accuracy across 164 data points"
  type: "data_shock"
variant_b:
  description: "There's one indicator that predicted every bull market for 10 years"
  type: "curiosity_gap"
metric: "impression_count"
duration: "48 hours"
sample_size: "organic reach"
result:
  winner: ""
  variant_a_score: 0
  variant_b_score: 0
  significance: ""
  learning: ""
action: ""
```

### 可测试变量清单
| 类别 | 变量 | 备选方案 |
|------|------|---------|
| Hook | 类型 | 数据冲击/好奇缺口/反直觉/权威/紧迫性 |
| Hook | 长度 | 1句/2句/3句 |
| 格式 | Thread长度 | 5条/8条/12条/15条 |
| 格式 | 配图 | 有图/无图/GIF |
| 时间 | 发布时段 | 7AM/8AM/12PM/5PM EST |
| 时间 | 星期 | 周一-周日 |
| CTA | 类型 | 关注/订阅/转发/评论 |
| CTA | 位置 | 最后一条/倒数第二条 |
| 标题 | Newsletter主题行 | A/B/C 变体 |
| 内容 | 角度 | 看多/看空/教育/对比 |

---

## 四、内容评分系统

### 评分公式
```
Content Score = (Shares×3 + Comments×2 + Likes×1) / Impressions × 1000
```

### 评分等级
| 等级 | Score范围 | 含义 | 行动 |
|------|----------|------|------|
| S | >100 | 病毒级 | 立即复制模式到其他内容 |
| A | 50-100 | 优秀 | 保持+微调 |
| B | 30-50 | 良好 | 分析可改进的变量 |
| C | 15-30 | 一般 | 测试不同Hook/角度 |
| D | <15 | 差 | 分析失败原因+淘汰 |

### 模式识别规则
- 连续3个S/A级内容使用同一Hook类型 → 该Hook类型升级为"主力Hook"
- 连续3个C/D级内容使用同一格式 → 该格式降级或淘汰
- 某一时段连续表现优于其他 → 固定为主力发布时间

---

## 五、归因模型

### UTM 参数标准
```
来源: utm_source = twitter | substack | reddit | github | youtube | wechat
媒介: utm_medium = thread | newsletter | post | video | note
内容: utm_campaign = framework-intro | lrcx-deep-dive | weekly-score-001
```

### 转化路径追踪
```
Twitter Thread → Bio Link → Substack Landing → Subscribe
Reddit Post → Link Click → Substack → Subscribe
YouTube Video → Description Link → Substack → Subscribe
GitHub README → Newsletter Link → Substack → Subscribe
```

### 渠道归因权重（初始假设，待数据验证）
| 渠道 | 认知贡献 | 转化贡献 | 预估CAC |
|------|---------|---------|---------|
| Twitter | 40% | 25% | $0 (有机) |
| Substack Notes | 25% | 35% | $0 (有机) |
| Reddit | 15% | 20% | $0 (有机) |
| GitHub | 10% | 10% | $0 (有机) |
| YouTube | 10% | 10% | $0 (有机) |

---

## 六、优化决策框架

### 每周优化循环
```
周一: 收集上周数据 → 填写周报
周二: 分析 Top/Bottom 内容 → 识别模式
周三: 制定本周A/B测试计划
周四-周六: 执行测试
周日: 发布周报 + 评估测试结果
```

### 决策规则
| 情况 | 行动 |
|------|------|
| Score > 50 的内容 | 创建变体，复制成功模式 |
| Score < 15 的内容 | 分析原因，调整或淘汰格式 |
| 某渠道连续增长 | 增加该渠道内容频率 |
| 某渠道连续下滑 | 暂停投入，诊断问题 |
| A/B测试有显著赢家 | 全面采用赢家策略 |
| 新方法论效果超30% | 整合到主框架 |

---

## 七、月度回顾模板

```markdown
# Monthly Marketing Review
## Month: [MONTH YEAR]

### Executive Summary
- Total new subscribers: X
- Best performing channel: X
- Content Score average: X
- A/B tests conducted: X
- Methodology updates: X

### Growth Trajectory
[月度增长曲线描述]

### Top 5 All-Time Content
[基于Content Score排名]

### Channel Health Check
[每个渠道的健康度评估]

### Strategy Adjustments for Next Month
[基于数据的策略调整]

### Evolution Log
[本月方法论更新记录]
```
