# 快速开始指南 - Social Sentiment Tracker

## 5分钟快速体验（无需API密钥）

### 步骤1：安装依赖

```bash
cd /Users/milton/投资大师/IntelligenceEngine_v10
pip install praw vaderSentiment pandas numpy
```

### 步骤2：生成示例数据

```bash
cd engines
python generate_sample_data.py
```

预期输出：
```
============================================================
            示例Reddit数据生成器
============================================================

[场景1] 生成乐观情绪数据...
✓ 生成 100 篇帖子，1000 条评论
  子版块: teslamotors, TeslaFSD, RealTesla
  时间跨度: 7 天
  情感倾向: 0.30 (偏正面)
✓ 数据已保存: ../data/sentiment/sample_positive.json

[场景2] 生成悲观情绪数据...
✓ 生成 100 篇帖子，1000 条评论
...
```

### 步骤3：运行测试

```bash
python test_with_sample_data.py
```

预期输出：
```
============================================================
      Sentiment Tracker 测试程序（使用示例数据）
============================================================

==================================================================
                  测试场景: 乐观情绪
==================================================================

正在加载数据: ../data/sentiment/sample_positive.json
✓ 加载 100 篇帖子

正在分析情感...
✓ 处理完成：1100 条记录

正在计算OCI指数...
✓ OCI计算完成

==================================================================
              Tesla社交媒体情绪分析报告
==================================================================
生成时间: 2026-01-25 14:30:22

【OCI指数 - Owner Confidence Index】
  当前OCI分数: 25.34
  加权OCI分数: 28.12
  7天移动平均: 25.34
  30天移动平均: 25.34
  OCI解读: 乐观（Bullish）

【情感分布】
  正面: 52.3%
  中性: 28.1%
  负面: 19.6%
  总提及数: 1100
  关键词提及数: 658

...
```

### 步骤4：查看结果

生成的文件位于 `data/sentiment/` 目录：

```bash
ls -lh data/sentiment/

# 你会看到：
test_positive_20260125_143022.csv      # CSV数据
test_positive_20260125_143022.json     # JSON数据
test_report_positive_20260125_143022.txt  # 分析报告
test_subreddit_positive_20260125_143022.csv  # 子版块分析
test_keyword_positive_20260125_143022.csv    # 关键词分析
```

---

## 使用真实数据（需要Reddit API）

### 步骤1：申请Reddit API密钥

访问 https://www.reddit.com/prefs/apps

1. 点击 "create another app..."
2. 填写：
   - name: `TeslaSentimentTracker`
   - App type: 选择 `script`
   - redirect uri: `http://localhost:8080`
3. 点击 "create app"

记录你的密钥：
- **client_id**: 应用名称下方（14字符）
- **client_secret**: 标记为 "secret"（27字符）

### 步骤2：配置密钥

编辑 `config/sentiment_config.json`：

```json
{
  "reddit": {
    "client_id": "你的client_id",
    "client_secret": "你的client_secret",
    "user_agent": "TeslaSentimentTracker/1.0 by 你的Reddit用户名"
  }
}
```

### 步骤3：运行真实分析

```bash
cd engines
python sentiment_tracker.py
```

---

## 代码示例

### 基础用法

```python
from sentiment_tracker import SentimentTracker

# 初始化（自动读取配置文件）
tracker = SentimentTracker(config_path='../config/sentiment_config.json')

# 运行完整分析
df, oci_metrics = tracker.run_full_analysis(
    time_filter='week',      # day/week/month/year
    limit_per_sub=100       # 每个子版块抓取100篇帖子
)

# 查看结果
print(f"OCI分数: {oci_metrics['oci_score']:.2f}")
print(f"情感分布 - 正面: {oci_metrics['positive_ratio']:.1f}%")
```

### 自定义分析

```python
# 只分析特定子版块
df, oci = tracker.run_full_analysis(
    subreddits=['teslamotors'],  # 只看r/teslamotors
    time_filter='day',            # 只看今天
    limit_per_sub=50             # 减少数量加快速度
)

# 加载历史数据进行对比
import pandas as pd
df_old = pd.read_csv('../data/sentiment/sentiment_20260120_100000.csv')
df_new = pd.read_csv('../data/sentiment/sentiment_20260125_143000.csv')

# 计算OCI变化
oci_old = tracker.calculate_oci(df_old)
oci_new = tracker.calculate_oci(df_new)
oci_change = oci_new['oci_score'] - oci_old['oci_score']

print(f"OCI变化: {oci_change:+.2f} (从 {oci_old['oci_score']:.2f} 到 {oci_new['oci_score']:.2f})")
```

### 只抓取数据（不分析）

```python
# 只抓取r/teslamotors的数据
posts = tracker.scrape_reddit('teslamotors', limit=50, time_filter='day')

# 保存原始数据
import json
with open('raw_posts.json', 'w') as f:
    json.dump(posts, f, indent=2, default=str)
```

---

## 常见问题速查

### Q: 我没有Reddit账号怎么办？
**A**: 使用示例数据进行测试（步骤1-4），功能完全一样。

### Q: API返回403错误
**A**: 检查密钥是否正确，确保user_agent格式正确。

### Q: 抓取速度太慢
**A**: 减少 `limit_per_sub` 参数（默认100改为50）。

### Q: OCI分数含义是什么？
**A**:
- **+40以上** = 极度乐观
- **+20~+40** = 乐观
- **0~+20** = 轻微乐观
- **-20~0** = 轻微悲观
- **-40~-20** = 悲观
- **-40以下** = 极度悲观

### Q: 如何定时运行？
**A**: 使用cron（Linux/Mac）或Task Scheduler（Windows）：

```bash
# 每小时运行一次（crontab -e）
0 * * * * cd /Users/milton/投资大师/IntelligenceEngine_v10/engines && python sentiment_tracker.py
```

---

## 输出文件说明

| 文件类型 | 文件名 | 内容 |
|---------|--------|------|
| CSV数据 | `sentiment_YYYYMMDD_HHMMSS.csv` | 所有帖子/评论的详细数据 |
| JSON数据 | `sentiment_YYYYMMDD_HHMMSS.json` | 结构化数据+OCI指标 |
| 文本报告 | `report_YYYYMMDD_HHMMSS.txt` | 人类可读的分析报告 |
| 子版块分析 | `subreddit_analysis_YYYYMMDD_HHMMSS.csv` | 各子版块对比 |
| 关键词分析 | `keyword_analysis_YYYYMMDD_HHMMSS.csv` | 关键词热度排行 |

---

## 下一步

1. **可视化**：将OCI数据导入Excel/Google Sheets绘制趋势图
2. **告警**：OCI突破阈值时发送邮件/Slack通知
3. **整合**：将情绪数据合并到投资分析报告中
4. **回测**：分析OCI与股价的历史相关性

详细文档：`README_SENTIMENT.md`

---

**祝您使用愉快！**
