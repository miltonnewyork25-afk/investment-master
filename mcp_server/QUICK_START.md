# 快速开始指南

## 一、安装依赖

```bash
cd /Users/milton/投资大师/mcp_server
pip install -r requirements.txt
```

## 二、测试服务器

```bash
python3 test_mcp.py
```

预期输出：
```
============================================================
MCP Server 优化测试
============================================================

============================================================
测试1: 缓存功能
============================================================
第1次请求 AAPL: 2.156秒
第2次请求 AAPL: 0.001秒 ⚡缓存命中
✓ 缓存加速: 2156x

...

✓ 所有测试通过
============================================================
```

## 三、配置 Claude Desktop

### 方法1: 自动配置（推荐）

```bash
# 备份现有配置
cp ~/Library/Application\ Support/Claude/claude_desktop_config.json ~/Library/Application\ Support/Claude/claude_desktop_config.json.backup

# 复制示例配置
cp claude_desktop_config.json.example ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### 方法2: 手动配置

编辑 `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "investment-master": {
      "command": "python3",
      "args": ["/Users/milton/投资大师/mcp_server/main.py"]
    }
  }
}
```

### 方法3: 添加到现有配置

如果已有其他 MCP servers，在 `mcpServers` 中添加：

```json
{
  "mcpServers": {
    "existing-server": { ... },
    "investment-master": {
      "command": "python3",
      "args": ["/Users/milton/投资大师/mcp_server/main.py"]
    }
  }
}
```

## 四、重启 Claude Desktop

1. 完全退出 Claude Desktop（Cmd+Q）
2. 重新启动 Claude Desktop
3. 等待 MCP servers 连接（约5-10秒）

## 五、验证安装

在 Claude Desktop 中输入：

```
请列出可用的工具
```

应该看到：
- analyze_stock
- compare_stocks
- screen_stocks
- get_market_overview

## 六、使用示例

### 示例1: 分析单只股票（基础）

```
请分析 AAPL 的基础数据
```

MCP 调用：
```json
{
  "symbol": "AAPL",
  "data_types": "basic"
}
```

### 示例2: 完整分析

```
对 TSM 做完整分析，包括基本面和技术指标
```

MCP 调用：
```json
{
  "symbol": "TSM",
  "data_types": "full"
}
```

### 示例3: 技术分析

```
看看 NVDA 的技术指标和趋势
```

MCP 调用：
```json
{
  "symbol": "NVDA",
  "data_types": "technical"
}
```

### 示例4: 对比股票

```
对比 AAPL、MSFT 和 GOOGL 的核心指标
```

MCP 调用：
```json
{
  "symbols": ["AAPL", "MSFT", "GOOGL"]
}
```

### 示例5: 筛选价值股

```
从这些股票中筛选价值股：AAPL, MSFT, TSM, NVDA, AMD
```

MCP 调用：
```json
{
  "symbols": ["AAPL", "MSFT", "TSM", "NVDA", "AMD"],
  "preset": "value"
}
```

### 示例6: 筛选成长股

```
筛选成长股
```

MCP 调用：
```json
{
  "symbols": ["..."],
  "preset": "growth"
}
```

### 示例7: 市场概览

```
看看今天市场情况
```

MCP 调用：
```json
{}
```

## 七、常见问题

### Q1: 工具列表没有显示？

**A**: 检查 Claude Desktop 日志：

```bash
tail -f ~/Library/Logs/Claude/mcp*.log
```

查找错误信息。

### Q2: Python 版本问题？

**A**: 确保使用 Python 3.8+：

```bash
python3 --version
# 应该显示 Python 3.8.x 或更高
```

### Q3: 依赖安装失败？

**A**: 使用虚拟环境：

```bash
cd /Users/milton/投资大师/mcp_server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

然后更新配置：
```json
{
  "command": "/Users/milton/投资大师/mcp_server/venv/bin/python",
  "args": ["/Users/milton/投资大师/mcp_server/main.py"]
}
```

### Q4: yfinance 数据获取失败？

**A**: 可能是网络问题或股票代码错误。检查：

1. 股票代码是否正确（大写）
2. 网络连接是否正常
3. yfinance 是否需要更新：`pip install --upgrade yfinance`

### Q5: 缓存数据过期？

**A**: 缓存自动5分钟过期。强制刷新：

重启 MCP server 或等待5分钟。

### Q6: 如何查看缓存状态？

**A**: 在代码中添加调试输出：

```python
# 在 main.py 的 cache.get() 后添加
if cached:
    print(f"✓ 缓存命中: {cache_key}")
else:
    print(f"✗ 缓存未命中: {cache_key}")
```

## 八、优化效果总结

| 指标 | 优化前 | 优化后 | 改进 |
|------|--------|--------|------|
| list_tools() Token | ~8000 | ~2000 | **-75%** |
| 单次调用 Token | ~500-800 | ~150-200 | **-70%** |
| 首次请求时间 | 2.5秒 | 2.5秒 | 持平 |
| 缓存命中时间 | 2.5秒 | 0.001秒 | **-99.96%** |
| 参数复杂度 | 高（4-7个参数） | 低（1-2个参数） | **简化70%** |
| 使用难度 | 需要记住所有参数 | 自然语言即可 | **大幅降低** |

## 九、下一步

1. **阅读详细文档**:
   - `README.md`: 功能说明
   - `OPTIMIZATION_COMPARISON.md`: 优化对比
   - `main.py`: 源代码

2. **定制预设**:
   - 修改 `SCREEN_PRESETS` 添加自己的筛选策略

3. **调整缓存**:
   - 修改 `SimpleCache(ttl_seconds=300)` 调整过期时间

4. **扩展功能**:
   - 添加新的工具（如行业分析、财报下载等）

## 十、反馈与贡献

遇到问题或有建议？

- 查看日志: `~/Library/Logs/Claude/mcp*.log`
- 运行测试: `python3 test_mcp.py`
- 提交 issue 或 pull request

---

**祝使用愉快！** 🚀
