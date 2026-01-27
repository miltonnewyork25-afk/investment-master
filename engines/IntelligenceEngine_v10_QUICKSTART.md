# Tesla投资情报引擎 v10.0 - 5分钟快速启动指南

## 🚀 从零到运行：5分钟

### 步骤1: 安装Python环境（如果还没有）
```bash
# macOS
brew install python@3.10

# 验证
python3 --version  # 应显示 3.10+
```

### 步骤2: 克隆项目
```bash
cd /Users/milton/投资大师/
# 项目已在：IntelligenceEngine_v10/
```

### 步骤3: 安装依赖（1分钟）
```bash
cd IntelligenceEngine_v10
pip3 install -r requirements.txt
```

### 步骤4: 配置API密钥（3分钟）

#### 4.1 Reddit API（必需，免费）
1. 访问：https://www.reddit.com/prefs/apps
2. 点击"Create App"
3. 填写：
   - Name: Tesla Intelligence Engine
   - Type: Script
   - Redirect URI: http://localhost:8080
4. 获取`client_id`和`client_secret`

#### 4.2 复制配置模板
```bash
cp .env.example .env
nano .env  # 或用任何编辑器
```

#### 4.3 填入API密钥
```bash
# .env文件内容
REDDIT_CLIENT_ID=你的client_id
REDDIT_CLIENT_SECRET=你的client_secret
REDDIT_USER_AGENT=TeslaIntelligenceEngine/1.0

# 可选（付费）
POLYGON_API_KEY=  # 期权数据，$199/月
PLANET_LABS_API_KEY=  # 卫星图像，$1000/月
```

### 步骤5: 运行第一次分析（1分钟）
```bash
# 运行一次性分析
python3 main.py --mode once --company TSLA

# 查看生成的报告
cat data/reports/daily/$(date +%Y-%m-%d).md
```

**期待输出**：
```markdown
# Tesla投资日报 - 2026-01-25

## 🚨 关键信号
1. **内部人交易**: 最近7天无重大交易
   来源: SEC EDGAR Form 4

2. **社交情绪**: OCI = +8.3（样本1,247条）
   来源: Reddit r/teslamotors, r/TeslaFSD, r/RealTesla

3. **期权市场**: Put/Call = 0.68（偏乐观）
   来源: Yahoo Finance

## 💼 持仓建议
- 综合评分: 6.8/10（中性偏多）
- 建议仓位: 30-35%
```

---

## 🔧 常见问题

### Q1: Reddit API申请被拒怎么办？
A: 尝试以下方法：
1. 确保Reddit账号>30天
2. 在账号设置中验证邮箱
3. 重新申请，填写更详细的说明
4. 备选：使用公开的Pushshift API（限制更多）

### Q2: 报告显示数据为空？
A: 检查：
```bash
# 查看日志
tail -f logs/intelligence_engine.log

# 常见原因：
# 1. API密钥配置错误 → 检查.env文件
# 2. 网络连接问题 → 测试: curl https://www.reddit.com
# 3. 首次运行无历史数据 → 等待24小时积累数据
```

### Q3: 如何切换到其他公司？
A: 修改`config.yaml`：
```yaml
company:
  name: NVIDIA
  ticker: NVDA
  cik: "0001045810"  # 从SEC查询

engines:
  sentiment_tracker:
    subreddits: [nvidia, hardware]  # 相关社区
```

---

## 📅 自动化运行（推荐）

### 方式1: macOS后台运行
```bash
# 启动守护进程
python3 main.py --mode daemon &

# 查看进程
ps aux | grep main.py

# 停止
pkill -f main.py
```

### 方式2: Cron定时任务
```bash
# 编辑crontab
crontab -e

# 添加（每天上午9点运行）
0 9 * * * cd /Users/milton/投资大师/IntelligenceEngine_v10 && python3 main.py --mode once >> logs/cron.log 2>&1
```

### 方式3: Docker容器（隔离环境）
```bash
# 构建镜像
docker build -t tesla-intelligence .

# 运行
docker run -d \
  --name tesla-engine \
  --env-file .env \
  -v $(pwd)/data:/app/data \
  tesla-intelligence

# 查看日志
docker logs -f tesla-engine

# 进入容器
docker exec -it tesla-engine bash
```

---

## 📊 查看报告

### 每日简报
```bash
# 今日简报
cat data/reports/daily/$(date +%Y-%m-%d).md

# 最近7天趋势
ls -lt data/reports/daily/ | head -8
```

### 每周报告
```bash
# 最新周报
cat data/reports/weekly/$(date +%Y-W%V).md
```

### 历史数据查询
```bash
# 打开SQLite数据库
sqlite3 data/database.db

# 查询内部人交易
SELECT * FROM insider_trading
WHERE date >= date('now', '-30 days')
ORDER BY value DESC
LIMIT 10;

# 查询情绪历史
SELECT date, oci_score, sample_size
FROM sentiment_history
ORDER BY date DESC
LIMIT 30;
```

---

## 🎯 高级用法

### 回测模式（验证策略）
```bash
# 回测过去2年的预测准确率
python3 main.py --mode backtest --start 2024-01-01 --end 2026-01-25

# 输出示例：
# Earnings Prediction Accuracy: 68.2% (15/22 quarters)
# Sentiment Signal Win Rate: 71.4% (10/14 signals)
```

### 批量分析多家公司
```bash
# 创建公司列表
cat > companies.txt << EOF
TSLA
NVDA
AAPL
MSFT
EOF

# 批量运行
python3 main.py --mode batch --file companies.txt

# 生成对比报告
python3 tools/compare_companies.py --companies TSLA,NVDA,AAPL
```

### 自定义告警
编辑`config.yaml`：
```yaml
alerts:
  insider_trading:
    threshold: 10000000  # $10M以上交易
    action: email
  sentiment:
    threshold_high: 50   # OCI > 50
    threshold_low: -30   # OCI < -30
    action: slack
  options:
    unusual_volume_multiplier: 5  # 成交量>5倍均值
    action: telegram
```

---

## 💡 优化技巧

### 减少API调用（节省成本）
```yaml
# config.yaml
engines:
  sec_monitor:
    cache_hours: 6  # 6小时内使用缓存
  sentiment_tracker:
    sample_limit: 200  # 每次仅抓200条（默认500）
```

### 提升速度
```bash
# 使用多进程
python3 main.py --workers 4

# 仅运行关键引擎
python3 main.py --engines sec,sentiment,options
```

### 数据导出
```bash
# 导出为Excel
python3 tools/export_excel.py --output tesla_data.xlsx

# 导出为API
python3 tools/start_api.py  # 启动REST API服务
# 访问：http://localhost:5000/api/v1/daily_report
```

---

## 🆘 故障排查

### 问题：ModuleNotFoundError
```bash
# 解决：重新安装依赖
pip3 install -r requirements.txt --upgrade
```

### 问题：SSL Certificate Error
```bash
# macOS解决
/Applications/Python\ 3.10/Install\ Certificates.command
```

### 问题：Database Locked
```bash
# 杀死占用进程
pkill -f main.py
rm data/database.db-lock  # 删除锁文件
```

### 问题：内存不足
```bash
# 限制进程内存（2GB）
ulimit -v 2000000
python3 main.py --mode once
```

---

## 📚 下一步学习

1. **阅读完整文档**：`docs/ARCHITECTURE.md`
2. **自定义引擎**：`docs/CUSTOMIZATION.md`
3. **部署到云端**：`docs/DEPLOYMENT.md`
4. **API集成**：`docs/API_GUIDE.md`

---

## 🎁 示例数据（供测试）

如果首次运行无数据，可以加载示例：
```bash
# 加载过去30天模拟数据（仅用于测试界面）
python3 scripts/load_sample_data.py

# 注意：这是模拟数据，实际使用请删除
rm data/database.db
python3 main.py --mode once  # 重新采集真实数据
```

---

**准备好了吗？开始你的第一次运行：**
```bash
python3 main.py --mode once
```

祝投资顺利！🚀
