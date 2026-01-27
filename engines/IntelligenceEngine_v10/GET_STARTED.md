# 🚀 从这里开始 - IntelligenceEngine v10

**欢迎使用 IntelligenceEngine v10！**

这是一个完全可复用的投资情报自动化系统，可监控任何公司的SEC文件、社交情绪、供应链、期权流、竞品动态和财报预测。

---

## ⚡ 3分钟快速开始

### 步骤1: 进入项目目录

```bash
cd /Users/milton/投资大师/IntelligenceEngine_v10
```

### 步骤2: 安装依赖

```bash
# 创建虚拟环境
python3 -m venv venv
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt
```

### 步骤3: 配置API密钥

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑.env文件，添加至少这2个密钥:
# SEC_API_KEY=你的密钥
# REDDIT_CLIENT_ID=你的客户端ID
# REDDIT_CLIENT_SECRET=你的客户端密钥
```

**快速申请API密钥**:
- SEC API: https://sec-api.io/ (30秒注册)
- Reddit: https://www.reddit.com/prefs/apps (1分钟创建App)

### 步骤4: 运行测试

```bash
# 查看系统状态
python main.py --status

# 运行单个引擎测试
python main.py --engine sentiment

# 生成今日报告
python main.py --report daily
```

### 步骤5: 启动守护进程

```bash
# 前台运行 (可以看到日志)
python main.py --daemon

# 或后台运行
nohup python main.py --daemon > logs/daemon.log 2>&1 &
```

**恭喜！系统已启动运行 🎉**

---

## 📚 文档导航

### ⭐ 必读文档 (推荐顺序)

1. **本文档** - 快速入门指南
2. **[QUICKSTART.md](QUICKSTART.md)** - 5分钟详细开始
3. **[README.md](README.md)** - 完整功能文档
4. **[DEPLOYMENT.md](DEPLOYMENT.md)** - 生产部署指南

### 📖 深入学习

5. **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - 项目架构
6. **[ARCHITECTURE.md](ARCHITECTURE.md)** - 系统架构详解
7. **[SUMMARY.md](SUMMARY.md)** - 项目总结
8. **[FINAL_DELIVERY_REPORT.md](FINAL_DELIVERY_REPORT.md)** - 验收报告

### 🔧 引擎专题

- [README_SEC.md](README_SEC.md) - SEC监控引擎
- [README_SENTIMENT.md](README_SENTIMENT.md) - 情绪追踪引擎
- [README_SUPPLY_CHAIN.md](README_SUPPLY_CHAIN.md) - 供应链引擎
- [engines/README_OPTIONS.md](engines/README_OPTIONS.md) - 期权引擎

---

## 🎯 常见场景

### 监控Tesla (默认配置)
```bash
python main.py --daemon
```

### 切换到Apple
```yaml
# 编辑 config.yaml
company:
  name: Apple
  ticker: AAPL
  cik: "0000320193"
```

### Docker部署
```bash
docker-compose up -d
```

---

## 📞 需要帮助？

- 📖 查看 [README.md](README.md) 的故障排查部分
- 🐛 提交GitHub Issue
- 💬 阅读其他.md文档

**项目路径**: `/Users/milton/投资大师/IntelligenceEngine_v10/`
**版本**: v10.0.0
**日期**: 2026-01-25

🚀 开始你的投资情报之旅！
