# Social Sentiment Real-Time Tracker - 使用文档

## 概述

**Engine 2: Social Sentiment Real-Time Tracker** 是一个完整的社交媒体情绪追踪引擎，用于实时监控Tesla相关讨论的情感倾向，计算OCI（Owner Confidence Index，车主信心指数），并提供历史趋势分析。

---

## 核心功能

1. **Reddit API集成** - 抓取多个子版块的帖子和评论
2. **NLP情感分析** - 使用VADER进行情感极性分析
3. **OCI指数计算** - 量化车主/投资者信心水平
4. **历史数据存储** - JSON和CSV双格式存储
5. **关键词趋势分析** - 追踪特定话题的情感变化
6. **子版块对比分析** - 不同社区情绪差异
7. **股价相关性回测框架** - （预留接口）

---

## 快速开始

### 1. 安装依赖

```bash
pip install praw vaderSentiment pandas numpy
```

**依赖说明**：
- `praw` - Reddit API官方Python库
- `vaderSentiment` - 专为社交媒体优化的情感分析库
- `pandas` - 数据处理
- `numpy` - 数值计算

### 2. 获取Reddit API密钥

#### 步骤A：创建Reddit应用

1. 访问 [https://www.reddit.com/prefs/apps](https://www.reddit.com/prefs/apps)
2. 点击 "create another app..." 或 "are you a developer? create an app..."
3. 填写表单：
   - **name**: `TeslaSentimentTracker`（任意名称）
   - **App type**: 选择 `script`
   - **description**: `Sentiment analysis for investment research`
   - **about url**: 留空
   - **redirect uri**: `http://localhost:8080`（必填，但script类型不会用到）
4. 点击 "create app"

#### 步骤B：获取密钥

创建成功后，你会看到：
- **client_id**: 在应用名称下方（14字符的字符串）
- **client_secret**: 标记为 "secret" 的字段（27字符的字符串）

示例：
```
personal use script
abcdefghijklmn  <-- 这是你的 client_id

secret: xyzabcdefghijklmnopqrstuvwxyz123  <-- 这是你的 client_secret
```

#### 步骤C：配置密钥

编辑 `config/sentiment_config.json`：

```json
{
  "reddit": {
    "client_id": "abcdefghijklmn",
    "client_secret": "xyzabcdefghijklmnopqrstuvwxyz123",
    "user_agent": "TeslaSentimentTracker/1.0 by YourRedditUsername"
  }
}
```

**重要**：
- 将 `YourRedditUsername` 替换为你的Reddit用户名
- **切勿公开分享你的密钥**

### 3. 运行分析

```bash
cd /Users/milton/投资大师/IntelligenceEngine_v10/engines
python sentiment_tracker.py
```

---

## 使用示例

### 基础用法

```python
from sentiment_tracker import SentimentTracker

# 初始化追踪器
tracker = SentimentTracker(config_path='../config/sentiment_config.json')

# 运行完整分析（默认参数：过去一周，每个子版块100篇帖子）
df, oci_metrics = tracker.run_full_analysis()

# 查看OCI分数
print(f"当前OCI分数: {oci_metrics['oci_score']}")
print(f"7天移动平均: {oci_metrics['oci_7d']}")
```

### 自定义参数

```python
# 自定义时间范围和抓取数量
df, oci_metrics = tracker.run_full_analysis(
    subreddits=['teslamotors', 'TeslaFSD'],  # 指定子版块
    time_filter='month',                      # 过去一个月（day/week/month/year）
    limit_per_sub=200                         # 每个子版块200篇帖子
)
```

### 单独使用各模块

```python
# 1. 只抓取数据
posts = tracker.scrape_reddit('teslamotors', limit=50, time_filter='day')

# 2. 只分析情感
sentiment = tracker.analyze_sentiment("FSD is amazing! Best feature ever.")
print(sentiment)  # {'neg': 0.0, 'neu': 0.409, 'pos': 0.591, 'compound': 0.8516}

# 3. 处理已有数据
df = tracker.process_posts(posts)

# 4. 计算OCI
oci_metrics = tracker.calculate_oci(df)

# 5. 关键词分析
keyword_trends = tracker.analyze_keyword_trends(df)
print(keyword_trends)
```

---

## 输出说明

### 1. OCI指数（Owner Confidence Index）

**计算公式**：
```
OCI = (正面提及数 - 负面提及数) / 总提及数 × 100
```

**解读标准**：
- **+40 以上** - 极度乐观（Strong Bullish）
- **+20 ~ +40** - 乐观（Bullish）
- **0 ~ +20** - 轻微乐观（Slightly Bullish）
- **-20 ~ 0** - 轻微悲观（Slightly Bearish）
- **-40 ~ -20** - 悲观（Bearish）
- **-40 以下** - 极度悲观（Strong Bearish）

**加权OCI**：
```
加权OCI = Σ(情感分数 × log(1 + 帖子热度)) / Σ帖子热度 × 100
```
考虑了高热度帖子的影响力。

### 2. 数据文件

所有输出保存在 `data/sentiment/` 目录：

#### A. CSV文件（`sentiment_YYYYMMDD_HHMMSS.csv`）
包含所有帖子和评论的详细数据：
- `post_id` - 帖子ID
- `subreddit` - 子版块
- `created_utc` - 创建时间
- `title` - 标题/评论内容
- `score` - 热度分数
- `compound_sentiment` - 复合情感分数（-1到+1）
- `sentiment_label` - 情感标签（positive/neutral/negative）
- `has_keywords` - 是否包含关键词
- `matched_keywords` - 匹配的关键词列表

#### B. JSON文件（`sentiment_YYYYMMDD_HHMMSS.json`）
结构化数据：
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
    "keyword_mentions": 432
  },
  "data_summary": {...},
  "records": [...]
}
```

#### C. 分析报告（`report_YYYYMMDD_HHMMSS.txt`）
人类可读的文本报告，包含：
- OCI指数和解读
- 情感分布
- 子版块对比
- 关键词热度Top 10

#### D. 子版块分析（`subreddit_analysis_YYYYMMDD_HHMMSS.csv`）
每个子版块的汇总统计。

#### E. 关键词分析（`keyword_analysis_YYYYMMDD_HHMMSS.csv`）
每个关键词的提及次数和情感趋势。

---

## 关键词配置

默认追踪的关键词（在 `sentiment_config.json` 中配置）：

```json
"keywords": [
  "FSD",                # 全自动驾驶
  "autopilot",          # 自动辅助驾驶
  "service",            # 服务
  "delivery",           # 交付
  "quality",            # 质量
  "reliability",        # 可靠性
  "customer service",   # 客户服务
  "build quality",      # 制造质量
  "recall",             # 召回
  "battery",            # 电池
  "range",              # 续航
  "charging",           # 充电
  "supercharger"        # 超级充电站
]
```

**自定义关键词**：
编辑配置文件或在代码中修改 `SentimentTracker.KEYWORDS`。

---

## 高级功能

### 1. 历史趋势分析

```python
import pandas as pd
import glob

# 加载所有历史CSV文件
data_dir = '../data/sentiment'
all_files = glob.glob(f'{data_dir}/sentiment_*.csv')

# 合并数据
df_list = [pd.read_csv(f) for f in all_files]
df_all = pd.concat(df_list, ignore_index=True)

# 按日期分组计算每日OCI
df_all['date'] = pd.to_datetime(df_all['created_utc']).dt.date
daily_oci = df_all.groupby('date').apply(
    lambda x: ((x['sentiment_label'] == 'positive').sum() -
               (x['sentiment_label'] == 'negative').sum()) / len(x) * 100
)

print(daily_oci)
```

### 2. 与股价相关性分析（示例框架）

```python
import yfinance as yf

# 获取Tesla股价
tsla = yf.download('TSLA', start='2026-01-01', end='2026-01-25')

# 合并OCI数据和股价数据
# （需要将OCI数据按日期聚合）
merged_df = pd.merge(daily_oci, tsla['Close'], left_index=True, right_index=True)

# 计算相关性
correlation = merged_df['oci'].corr(merged_df['Close'])
print(f"OCI与股价相关性: {correlation:.3f}")
```

### 3. 情绪异动检测

```python
# 检测OCI异常波动
def detect_anomalies(df, threshold=2):
    """检测情感异动（超过2个标准差）"""
    df['date'] = pd.to_datetime(df['created_utc']).dt.date
    daily_sentiment = df.groupby('date')['compound_sentiment'].mean()

    mean = daily_sentiment.mean()
    std = daily_sentiment.std()

    anomalies = daily_sentiment[abs(daily_sentiment - mean) > threshold * std]
    return anomalies

# 运行检测
anomalies = detect_anomalies(df)
print("情绪异动日期：")
print(anomalies)
```

---

## 数据质量保障

### 1. API限流处理
- 每个子版块抓取后自动延迟1秒
- 避免触发Reddit的速率限制（60次/分钟）

### 2. 错误处理
- 网络异常自动跳过
- 已删除帖子/评论标记为 `[deleted]`
- 空文本返回中性情感分数

### 3. 数据验证
- 自动过滤无效记录
- 时间戳格式标准化
- 情感分数范围检查（-1到+1）

---

## 常见问题

### Q1: API返回403错误
**原因**：Reddit密钥配置错误或user_agent格式不正确。
**解决**：
1. 确认 `client_id` 和 `client_secret` 正确
2. 确保 `user_agent` 包含你的Reddit用户名
3. 检查Reddit账号是否被限制

### Q2: 抓取数据为空
**原因**：时间范围内没有符合条件的帖子，或子版块名称错误。
**解决**：
1. 检查子版块名称拼写（不需要前缀 `r/`）
2. 扩大时间范围（`time_filter='month'`）
3. 增加抓取数量（`limit_per_sub=200`）

### Q3: VADER情感分析不准确
**说明**：VADER是为社交媒体设计的启发式模型，准确率约80%。
**改进方向**：
- 添加领域特定词典（如 "recall" → 负面）
- 使用深度学习模型（BERT、RoBERTa）
- 人工标注样本进行微调

### Q4: OCI分数波动大
**原因**：样本量不足或时间窗口太短。
**解决**：
1. 增加抓取数量（`limit_per_sub=200+`）
2. 使用30天移动平均平滑波动
3. 对热门帖子加权（使用 `weighted_oci`）

### Q5: 如何增加更多数据源？
**扩展方向**：
- Twitter API（需要申请）
- StockTwits
- Seeking Alpha评论
- YouTube评论（Tesla官方频道）

参考扩展代码框架：
```python
class TwitterSentimentTracker(SentimentTracker):
    def scrape_twitter(self, query, limit):
        # 实现Twitter抓取逻辑
        pass
```

---

## 性能优化

### 1. 并发抓取（多线程）

```python
from concurrent.futures import ThreadPoolExecutor

def parallel_scrape(tracker, subreddits, limit=100):
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = [executor.submit(tracker.scrape_reddit, sub, limit)
                   for sub in subreddits]
        results = [f.result() for f in futures]
    return [post for sublist in results for post in sublist]

# 使用
all_posts = parallel_scrape(tracker, ['teslamotors', 'TeslaFSD', 'RealTesla'])
```

### 2. 数据缓存

```python
import pickle
from datetime import datetime, timedelta

def load_cached_data(cache_file, max_age_hours=1):
    """加载缓存数据（1小时内有效）"""
    if not os.path.exists(cache_file):
        return None

    mod_time = datetime.fromtimestamp(os.path.getmtime(cache_file))
    if datetime.now() - mod_time > timedelta(hours=max_age_hours):
        return None

    with open(cache_file, 'rb') as f:
        return pickle.load(f)
```

---

## 示例数据

如果没有Reddit API密钥，可以使用以下示例数据进行测试：

```python
# 创建示例数据
sample_posts = [
    {
        'id': 'sample1',
        'subreddit': 'teslamotors',
        'title': 'FSD v12 is incredible! Smoothest drive ever',
        'selftext': 'Just completed a 200 mile trip with zero interventions.',
        'score': 450,
        'upvote_ratio': 0.95,
        'num_comments': 87,
        'created_utc': datetime.now() - timedelta(hours=2),
        'url': 'https://reddit.com/sample1',
        'author': 'tesla_fan',
        'comments': [
            {
                'id': 'c1',
                'body': 'Totally agree! Game changer for road trips',
                'score': 35,
                'created_utc': datetime.now() - timedelta(hours=1),
                'author': 'user2'
            }
        ]
    },
    # ... 更多示例数据
]

# 处理示例数据
df = tracker.process_posts(sample_posts)
oci = tracker.calculate_oci(df)
```

---

## 路线图

### v1.1（计划中）
- [ ] Twitter API集成
- [ ] 情绪时间序列可视化（Plotly图表）
- [ ] 实时警报（OCI突破阈值时发送通知）

### v1.2（计划中）
- [ ] 深度学习模型（BERT微调）
- [ ] 多语言支持（中文社交媒体）
- [ ] 股价相关性自动化回测

### v2.0（计划中）
- [ ] Web仪表板（Flask/Dash）
- [ ] 数据库存储（PostgreSQL）
- [ ] 定时任务调度（每小时更新）

---

## 技术栈

| 组件 | 技术 | 用途 |
|-----|------|-----|
| Reddit API | PRAW | 数据抓取 |
| 情感分析 | VADER | NLP情感分类 |
| 数据处理 | Pandas | 数据清洗和聚合 |
| 数值计算 | NumPy | 统计计算 |
| 存储格式 | JSON + CSV | 结构化存储 |

---

## 许可与免责声明

**许可**：本工具仅供个人投资研究使用。

**免责声明**：
1. 情感分析结果仅供参考，不构成投资建议
2. OCI指数不能预测股价走势
3. 社交媒体情绪可能存在操纵和偏差
4. 使用Reddit API需遵守其服务条款

**Reddit API使用条款**：
- 不得用于垃圾邮件或自动化发帖
- 不得超过速率限制
- 不得出售数据
- 详见：https://www.redditinc.com/policies/data-api-terms

---

## 联系与支持

**问题报告**：在项目GitHub Issues中提交

**贡献指南**：欢迎提交Pull Request

**文档更新**：2026-01-25

---

## 附录：VADER情感分析说明

**VADER（Valence Aware Dictionary and sEntiment Reasoner）**是专为社交媒体文本设计的情感分析工具。

### 优势
1. **针对社交媒体优化** - 理解俚语、表情符号、大写强调
2. **无需训练** - 基于词典的启发式方法
3. **速度快** - 实时分析大量文本

### 输出解释
```python
{
    'neg': 0.1,      # 负面情感比例
    'neu': 0.5,      # 中性情感比例
    'pos': 0.4,      # 正面情感比例
    'compound': 0.6  # 复合分数（-1到+1，综合判断）
}
```

**Compound分数判断标准**：
- `>= 0.05` - 正面
- `<= -0.05` - 负面
- `-0.05 ~ 0.05` - 中性

### 示例
```python
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

# 正面示例
print(analyzer.polarity_scores("FSD is AMAZING!!! 🚀"))
# {'neg': 0.0, 'neu': 0.36, 'pos': 0.64, 'compound': 0.8268}

# 负面示例
print(analyzer.polarity_scores("Service is terrible. Worst experience ever."))
# {'neg': 0.52, 'neu': 0.48, 'pos': 0.0, 'compound': -0.8074}

# 中性示例
print(analyzer.polarity_scores("I received my car today."))
# {'neg': 0.0, 'neu': 1.0, 'pos': 0.0, 'compound': 0.0}
```

---

**祝您投资研究顺利！**
