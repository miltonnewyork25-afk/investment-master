# Engine 2: Social Sentiment Real-Time Tracker

## 项目结构

```
IntelligenceEngine_v10/
├── engines/
│   ├── sentiment_tracker.py           # 核心引擎（主文件）
│   ├── generate_sample_data.py        # 示例数据生成器
│   ├── test_with_sample_data.py       # 测试脚本
│   └── README_ENGINE2.md              # 本文件
├── config/
│   └── sentiment_config.json          # 配置文件（包含API密钥）
├── data/
│   └── sentiment/                     # 数据存储目录
│       ├── sample_positive.json       # 示例数据（乐观）
│       ├── sample_negative.json       # 示例数据（悲观）
│       ├── sample_neutral.json        # 示例数据（中性）
│       ├── sentiment_*.csv            # 分析结果（CSV）
│       ├── sentiment_*.json           # 分析结果（JSON）
│       ├── report_*.txt               # 文本报告
│       ├── subreddit_analysis_*.csv   # 子版块分析
│       └── keyword_analysis_*.csv     # 关键词分析
├── requirements.txt                   # Python依赖列表
├── INSTALL_DEPENDENCIES.sh            # 依赖安装脚本
├── README_SENTIMENT.md                # 完整文档
└── QUICKSTART_SENTIMENT.md            # 快速开始指南
```

---

## 文件说明

### 核心文件

#### 1. `sentiment_tracker.py` (700+ 行)
**核心引擎类 - SentimentTracker**

主要功能：
- Reddit API集成（支持多子版块并发抓取）
- VADER情感分析（包含备用简化版）
- OCI指数计算（Owner Confidence Index）
- 多维度数据分析（子版块对比、关键词趋势）
- 数据持久化（JSON + CSV双格式）
- 报告自动生成

关键方法：
```python
# 初始化
tracker = SentimentTracker(config_path='../config/sentiment_config.json')

# 完整分析流程
df, oci_metrics = tracker.run_full_analysis(
    subreddits=['teslamotors', 'TeslaFSD', 'RealTesla'],
    time_filter='week',
    limit_per_sub=100
)

# 单独使用各模块
posts = tracker.scrape_reddit('teslamotors', limit=50)
sentiment = tracker.analyze_sentiment("FSD is amazing!")
oci = tracker.calculate_oci(df)
keyword_trends = tracker.analyze_keyword_trends(df)
```

#### 2. `generate_sample_data.py` (400+ 行)
**示例数据生成器 - SampleDataGenerator**

功能：
- 模拟真实Reddit帖子和评论
- 可配置情感倾向（-1.0到+1.0）
- 生成三种场景：乐观、悲观、中性
- 自动填充关键词

用法：
```bash
python3 generate_sample_data.py
# 生成3个JSON文件，每个包含100篇帖子+1000条评论
```

或自定义：
```python
gen = SampleDataGenerator(sentiment_bias=0.5)  # 强烈乐观
posts = gen.generate_dataset(num_posts=200, comments_per_post=20)
gen.save_to_json(posts, 'custom_data.json')
```

#### 3. `test_with_sample_data.py` (150+ 行)
**自动化测试脚本**

功能：
- 加载示例数据
- 运行完整分析流程
- 验证OCI计算逻辑
- 生成测试报告

预期输出：
```
测试场景         OCI分数      7天MA       30天MA      解读
--------------------------------------------------------------
乐观情绪          25.34       25.34       25.34      乐观（Bullish）
悲观情绪         -22.15      -22.15      -22.15      悲观（Bearish）
中性情绪           3.45        3.45        3.45      轻微乐观

✓ PASS - 乐观场景OCI > 0
✓ PASS - 悲观场景OCI < 0
✓ PASS - 中性场景OCI接近0
✓ PASS - 乐观OCI > 悲观OCI
```

---

## 技术架构

### 数据流

```
[Reddit API]
    ↓
[scrape_reddit] → 帖子+评论原始数据
    ↓
[process_posts] → VADER情感分析 → DataFrame
    ↓
[calculate_oci] → OCI指数 + 情感分布
    ↓
[analyze_by_subreddit] → 子版块对比
    ↓
[analyze_keyword_trends] → 关键词热度
    ↓
[generate_report] → 文本报告
    ↓
[save_data] → JSON + CSV存储
```

### OCI计算逻辑

```python
# 基础OCI公式
OCI = (正面提及数 - 负面提及数) / 总提及数 × 100

# 加权OCI（考虑帖子热度）
weighted_sentiment = sentiment_score × log(1 + post_score)
weighted_OCI = Σ(weighted_sentiment) / Σ(post_score) × 100

# 移动平均
OCI_7d = 过去7天的平均OCI
OCI_30d = 过去30天的平均OCI
```

### 情感分类阈值

```python
compound_score >= +0.05  → positive
compound_score <= -0.05  → negative
-0.05 < compound_score < +0.05 → neutral
```

### 关键词列表（硬编码）

```python
KEYWORDS = [
    'FSD',              # 全自动驾驶
    'autopilot',        # 自动辅助驾驶
    'service',          # 服务
    'delivery',         # 交付
    'quality',          # 质量
    'reliability',      # 可靠性
    'customer service', # 客户服务
    'build quality',    # 制造质量
    'recall',           # 召回
    'battery',          # 电池
    'range',            # 续航
    'charging',         # 充电
    'supercharger'      # 超级充电站
]
```

---

## 配置说明

### `config/sentiment_config.json`

```json
{
  "reddit": {
    "client_id": "你的Reddit应用ID",
    "client_secret": "你的Reddit应用密钥",
    "user_agent": "TeslaSentimentTracker/1.0 by 你的用户名"
  },
  "data_dir": "../data/sentiment",
  "lookback_days": 7,
  "posts_per_subreddit": 100,
  "comments_per_post": 50,
  "analysis_config": {
    "positive_threshold": 0.05,
    "negative_threshold": -0.05,
    "min_score_threshold": 2,
    "oci_window_days": 7
  }
}
```

**重要**：
- `client_id` 和 `client_secret` 必须从 https://www.reddit.com/prefs/apps 获取
- `user_agent` 必须包含你的Reddit用户名
- 切勿提交包含真实密钥的配置文件到版本控制

---

## 输出数据格式

### CSV文件（`sentiment_YYYYMMDD_HHMMSS.csv`）

| 字段 | 类型 | 说明 |
|-----|------|-----|
| post_id | str | 帖子ID |
| subreddit | str | 子版块名称 |
| created_utc | datetime | 创建时间 |
| title | str | 标题（评论显示为[Comment]） |
| score | int | 热度分数 |
| upvote_ratio | float | 点赞比例（0-1） |
| num_comments | int | 评论数 |
| title_sentiment | float | 标题情感分数 |
| text_sentiment | float | 正文情感分数 |
| compound_sentiment | float | 综合情感分数（-1到+1） |
| has_keywords | bool | 是否包含关键词 |
| matched_keywords | str | 匹配的关键词（逗号分隔） |
| sentiment_label | str | 情感标签（positive/neutral/negative） |
| author | str | 作者 |

### JSON文件（`sentiment_YYYYMMDD_HHMMSS.json`）

```json
{
  "timestamp": "20260125_143022",
  "oci_metrics": {
    "oci_score": 12.5,
    "weighted_oci": 15.3,
    "oci_7d": 10.8,
    "oci_30d": 8.2,
    "positive_ratio": 45.2,
    "negative_ratio": 32.7,
    "neutral_ratio": 22.1,
    "total_mentions": 856,
    "keyword_mentions": 432,
    "avg_compound_score": 0.134,
    "avg_post_score": 78.5
  },
  "data_summary": {
    "total_records": 856,
    "subreddits": ["teslamotors", "TeslaFSD", "RealTesla"],
    "date_range": {
      "start": "2026-01-18T10:30:00",
      "end": "2026-01-25T14:30:00"
    }
  },
  "records": [...]
}
```

---

## 性能指标

### 数据抓取速度
- **单个子版块**：~30秒（100篇帖子+评论）
- **三个子版块**：~2分钟（300篇帖子）
- **限流保护**：每个子版块之间延迟1秒

### 数据处理速度
- **情感分析**：~1000条记录/秒（VADER）
- **OCI计算**：<0.1秒
- **报告生成**：<1秒

### 存储空间
- **单次分析**：~500KB（JSON）+ ~200KB（CSV）
- **每日运行**：~7MB/天（每小时更新）
- **月度数据**：~200MB/月

---

## 错误处理

### Reddit API错误

| 错误 | 原因 | 解决方案 |
|-----|------|---------|
| 403 Forbidden | API密钥错误 | 检查client_id和client_secret |
| 429 Too Many Requests | 触发限流 | 等待60秒或减少抓取频率 |
| 503 Service Unavailable | Reddit服务中断 | 稍后重试 |
| ResponseException | 网络问题 | 检查网络连接 |

### 数据质量问题

| 问题 | 检测方法 | 处理方式 |
|-----|---------|---------|
| 空帖子 | len(posts_data) == 0 | 返回空DataFrame，不中断流程 |
| 已删除评论 | author == '[deleted]' | 保留记录，标记author |
| 特殊字符 | 编码错误 | 使用utf-8-sig编码 |
| 时间格式 | datetime解析失败 | 转换为ISO格式字符串 |

---

## 扩展指南

### 添加新的子版块

编辑 `sentiment_tracker.py`:
```python
SUBREDDITS = ['teslamotors', 'TeslaFSD', 'RealTesla', 'electricvehicles']
```

### 添加新的关键词

编辑 `sentiment_tracker.py`:
```python
KEYWORDS = [
    'FSD', 'autopilot', ...,
    'cybertruck',  # 新增
    'roadster'     # 新增
]
```

### 使用深度学习模型（替代VADER）

```python
from transformers import pipeline

class AdvancedSentimentTracker(SentimentTracker):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # 使用FinBERT（金融领域BERT）
        self.bert_analyzer = pipeline(
            "sentiment-analysis",
            model="ProsusAI/finbert"
        )

    def analyze_sentiment(self, text: str):
        result = self.bert_analyzer(text[:512])[0]  # BERT限制512 tokens
        # 转换为VADER格式
        label_map = {'positive': 1, 'negative': -1, 'neutral': 0}
        compound = label_map[result['label']] * result['score']
        return {'compound': compound, ...}
```

### 添加Twitter数据源

```python
import tweepy

class MultiPlatformTracker(SentimentTracker):
    def scrape_twitter(self, query, limit=100):
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)

        tweets = []
        for tweet in tweepy.Cursor(api.search_tweets, q=query).items(limit):
            tweets.append({
                'text': tweet.text,
                'created_at': tweet.created_at,
                'score': tweet.retweet_count + tweet.favorite_count,
                ...
            })
        return tweets
```

---

## 最佳实践

### 1. 定时运行（每小时更新）

使用cron（macOS/Linux）：
```bash
crontab -e

# 添加以下行（每小时运行）
0 * * * * cd /Users/milton/投资大师/IntelligenceEngine_v10/engines && /usr/bin/python3 sentiment_tracker.py >> /tmp/sentiment_tracker.log 2>&1
```

### 2. 数据备份

```bash
# 每日备份数据目录
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf sentiment_backup_$DATE.tar.gz data/sentiment/
```

### 3. 监控OCI异动

```python
def check_oci_alert(current_oci, historical_mean, threshold=2):
    """当OCI偏离均值超过2个标准差时告警"""
    if abs(current_oci - historical_mean) > threshold * historical_std:
        send_alert(f"OCI异动警告：{current_oci:.2f}")
```

### 4. 数据清理（避免磁盘占满）

```bash
# 删除30天前的CSV文件（保留JSON）
find data/sentiment/ -name "sentiment_*.csv" -mtime +30 -delete
```

---

## 调试技巧

### 启用详细日志

```python
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

tracker = SentimentTracker(config_path='...')
```

### 检查Reddit连接

```python
try:
    tracker.reddit.user.me()
    print("✓ Reddit连接正常")
except Exception as e:
    print(f"✗ Reddit连接失败: {e}")
```

### 验证VADER准确性

```python
test_cases = [
    ("FSD is amazing!", 'positive'),
    ("Service is terrible", 'negative'),
    ("I received my car", 'neutral')
]

for text, expected in test_cases:
    result = tracker.analyze_sentiment(text)
    label = tracker._label_sentiment(result['compound'])
    status = "✓" if label == expected else "✗"
    print(f"{status} {text} → {label} (expected {expected})")
```

---

## 已知限制

1. **Reddit API限流**：每分钟60次请求
2. **VADER准确率**：约80%（社交媒体文本）
3. **不支持图片**：只分析文本内容
4. **语言限制**：仅英文（中文需替换VADER）
5. **历史数据**：Reddit API只返回近期数据（~1000篇帖子）

---

## 版本历史

- **v1.0** (2026-01-25) - 初始版本
  - Reddit API集成
  - VADER情感分析
  - OCI指数计算
  - 示例数据生成器
  - 自动化测试

---

## 许可

本项目为投资研究工具，仅供学习和个人使用。使用Reddit API需遵守其服务条款。

---

## 联系与支持

- **文档**：`README_SENTIMENT.md`（完整版）
- **快速开始**：`QUICKSTART_SENTIMENT.md`
- **问题报告**：GitHub Issues

**最后更新**：2026-01-25
