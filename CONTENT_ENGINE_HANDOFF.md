# Content Engine 营销内容系统 — 转交说明

> 本文档帮助你从 GitHub 获取营销内容创作相关的全部代码和资料。

---

## 1. 仓库地址

```
https://github.com/miltonnewyork25-afk/investment-master
```

---

## 2. 营销代码在哪个分支？

所有营销相关代码都在 **`营销`** 分支上（不在 `main` 分支）。

### 获取方式

```bash
# 克隆仓库
git clone https://github.com/miltonnewyork25-afk/investment-master.git
cd investment-master

# 切换到营销分支
git checkout 营销
```

切换成功后，你就能看到所有营销相关的文件。

---

## 3. 关键目录和文件说明

切换到 `营销` 分支后，以下是你需要关注的内容：

### 3.1 已产出的文章（`content/`）

成品内容，共 25 篇，包含中英文版本：

| 文件 | 内容 |
|------|------|
| `sbux_4min_paradox*.md` | 星巴克"4分钟悖论"系列（v1-v4 + 英文） |
| `ackman_hlt_248*.md` | Ackman/希尔顿248亿系列（v1-v4 + 英文） |
| `niccol_same_person*.md` | Niccol"同一个人"系列（中+英） |
| `nvda_fifth_row*.md` | 英伟达"第五行"系列（v1-v3 + 英文v1-v2） |
| `rcl_waterline*.md` | 皇家加勒比"水位线"系列（v1-v2 + 英文） |
| `cost_my_company_series_v1.md` | Costco"我的公司"系列 |
| `intc_same_stock_v1.md` | 英特尔"同一只股票"系列 |
| `sbux_my_company_series_v2.md` | 星巴克"我的公司"系列v2 |
| `content_engine_lessons.md` | **写作经验总结**（重要参考） |
| `content_scoring_system.md` | 内容评分体系 |

### 3.2 营销策略和渠道（`marketing/`）

```
marketing/
├── strategy/          # 营销策略文档
│   ├── launch-playbook.md              # 发布手册
│   ├── topic-selection-engine.md       # 选题引擎
│   ├── super-headline-engine.md        # 标题引擎
│   ├── platform-intelligence-2026.md   # 平台情报
│   ├── behavioral-psychology-framework.md  # 心理营销框架
│   ├── psychology-marketing-engine.yaml    # 心理营销引擎
│   └── product-profile.yaml            # 产品画像
│
├── content/           # 按平台分类的内容
│   ├── twitter-threads/   # Twitter线程（10篇）
│   ├── newsletter/        # Newsletter（2期）
│   ├── wechat/           # 微信公众号
│   ├── medium/           # Medium文章
│   ├── reddit/           # Reddit帖子
│   ├── hackernews/       # HN帖子
│   ├── short-video/      # 短视频脚本
│   ├── youtube/          # YouTube脚本
│   └── infographics/     # 信息图描述
│
├── channels/          # 渠道运营手册
│   ├── twitter-playbook.md     # Twitter运营
│   ├── substack-playbook.md    # Substack运营
│   ├── github-playbook.md      # GitHub运营
│   ├── cross-promotion-templates.md  # 跨平台联动模板
│   └── google-ads/             # Google广告（投放脚本+campaign）
│
├── evolution/         # 内容迭代日志（7轮进化记录）
│
└── metrics/           # 指标体系
    ├── benchmark.md          # 基准指标
    └── tracking-system.md    # 追踪系统
```

### 3.3 Content Engine 写作系统（核心）

```
.claude/skills/content-engine/SKILL.md    # 816行，完整写作系统定义
```

这是 AI 写作引擎的核心配置文件，定义了：
- **E轨**：13条硬约束（数字人话化、散文腔禁令、不给目标价等）
- **P轨**：8个感受问题（利他性、增秩序感、推理平权）
- **品味Agent**：9根触角（T1-T7品味 + T8优越感感知 + T9焦虑贩卖感知）
- **写作信条**：6条北极星
- **双语支持**：中文v4 + 英文EN v1

### 3.4 营销分支专属配置

```
CLAUDE.md    # 营销worktree的AI配置（44行，Content Engine专用）
```

---

## 4. 如果你只需要营销部分的文件

如果不想克隆整个仓库，可以只下载营销分支的特定目录：

```bash
# 方法1：浅克隆 + 只看营销分支
git clone --branch 营销 --single-branch --depth 1 https://github.com/miltonnewyork25-afk/investment-master.git
cd investment-master

# 你需要的文件在这三个目录：
ls content/           # 成品文章
ls marketing/         # 策略+渠道+内容
ls .claude/skills/content-engine/   # 写作引擎
```

```bash
# 方法2：在GitHub网页上直接浏览
# 1. 打开 https://github.com/miltonnewyork25-afk/investment-master
# 2. 点击左上角分支选择器，切换到「营销」分支
# 3. 浏览 content/ 和 marketing/ 目录
```

---

## 5. 标杆文章（建议优先阅读）

以下 6 篇是经过多轮迭代验证的最佳范本，建议在写新内容前先读：

1. `content/sbux_4min_paradox_v4.md` — 星巴克中文标杆
2. `content/ackman_hlt_248_v4.md` — 希尔顿中文标杆
3. `content/niccol_same_person_v1.md` — Niccol中文标杆
4. `content/niccol_same_person_en_v1.md` — Niccol英文标杆
5. `content/sbux_4min_paradox_en_v1.md` — 星巴克英文标杆
6. `content/ackman_hlt_248_en_v1.md` — 希尔顿英文标杆

---

## 6. 写作经验总结

务必阅读 `content/content_engine_lessons.md`，里面记录了 22+ 篇内容创作过程中积累的核心经验，包括：
- 哪些写法有效、哪些踩过坑
- 中英文风格差异处理
- 评分标准和改进方向

---

## 7. 注意事项

- 营销内容**不包含**投资评级或目标价（合规要求）
- 文章署名采用**匿名+团队背书**模式
- 品牌名使用中文翻译（丽思卡尔顿，不是 Ritz-Carlton）
- 数字需要"人话化"（35% → 快三分之一）
