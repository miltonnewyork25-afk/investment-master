# Agent 7 快速入门指南

## 10分钟快速启动

### 前置条件
- [ ] Python 3.x已安装
- [ ] 网络连接正常
- [ ] Financial Modeling Prep API Key (免费或付费)

### 步骤1: 安装依赖 (1分钟)
```bash
pip install pandas numpy requests
```

### 步骤2: 获取API Key (2分钟)
1. 访问: https://financialmodelingprep.com/developer/docs/
2. 注册账户
3. 获取API Key
4. 配置环境变量:
```bash
export FMP_API_KEY='your_api_key_here'
```

### 步骤3: 测试运行 (2分钟)
```bash
cd /Users/milton/投资大师/Top20_Screener/scripts
python3 test_agent7.py
```

这将创建一个包含9只股票的测试池。

### 步骤4: 执行排除规则 (5分钟)
```bash
python3 agent7_exclusion_executor.py
```

**注意**: 免费API限制250 requests/day，测试池(9只股票)约需27个请求。

### 步骤5: 查看结果 (<1分钟)
```bash
# 查看通过筛选的公司
cat ../data/passed_companies.csv

# 查看被排除的公司
cat ../exclusions/excluded_companies.csv

# 查看详细报告
cat ../exclusions/exclusion_summary.md
```

---

## 使用真实股票池

### 方法1: 从文件导入

准备CSV文件 `initial_stock_pool.csv`:
```csv
Ticker,Company
AAPL,Apple Inc
MSFT,Microsoft Corp
GOOGL,Alphabet Inc
...
```

放置在:
```
Top20_Screener/data/initial_stock_pool.csv
```

然后运行:
```bash
python3 agent7_exclusion_executor.py
```

### 方法2: 从其他Agent获取

如果你有Agent 1的输出:
```bash
# 复制Agent 1的输出到initial_stock_pool.csv
cp /path/to/agent1/output.csv ../data/initial_stock_pool.csv

# 运行排除规则
python3 agent7_exclusion_executor.py
```

### 方法3: 程序化生成

```python
import pandas as pd

# 定义股票池
stocks = pd.DataFrame({
    'Ticker': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'],
    'Company': ['Apple Inc', 'Microsoft Corp', 'Alphabet Inc', 'Amazon.com Inc', 'Meta Platforms Inc']
})

# 保存
stocks.to_csv('/Users/milton/投资大师/Top20_Screener/data/initial_stock_pool.csv', index=False)

# 然后运行主脚本
```

---

## 预期输出

### 测试池期望结果

| Ticker | Company | 预期结果 | 原因 |
|--------|---------|---------|------|
| AAPL | Apple Inc | ✓ PASS | 优质蓝筹股 |
| MSFT | Microsoft Corp | ✓ PASS | 优质蓝筹股 |
| JNJ | Johnson & Johnson | ✓ PASS | 成熟药企 |
| JPM | JPMorgan Chase | ✓ PASS | 优质金融股 |
| MRNA | Moderna Inc | ✗ EXCLUDE | 生物制药/临床主导 |
| COIN | Coinbase | ✗ EXCLUDE | 近期IPO或加密 |
| BKKT | Bakkt Holdings | ✗ EXCLUDE | 加密/SPAC |
| TSLA | Tesla Inc | ? BORDERLINE | 高估值但大盘股 |
| GME | GameStop Corp | ? BORDERLINE | Meme股但有收入 |

### 实际运行示例

```
正在加载股票池: /Users/milton/投资大师/Top20_Screener/data/initial_stock_pool.csv
股票池总数: 9

[1/9] 检查 AAPL - Apple Inc
[2/9] 检查 MSFT - Microsoft Corp
[3/9] 检查 JNJ - Johnson & Johnson
[4/9] 检查 JPM - JPMorgan Chase
[5/9] 检查 MRNA - Moderna Inc
[6/9] 检查 COIN - Coinbase
[7/9] 检查 BKKT - Bakkt Holdings
[8/9] 检查 TSLA - Tesla Inc
[9/9] 检查 GME - GameStop Corp

排除规则执行完成！
起始池: 9家公司
排除: 3家
通过: 6家
排除率: 33.3%
```

---

## 常见问题

### Q1: API Key在哪里配置？

**方法1 (推荐): 环境变量**
```bash
export FMP_API_KEY='your_key'
```

**方法2: 修改脚本**
编辑 `agent7_exclusion_executor.py` 第12行:
```python
FMP_API_KEY = "your_key"
```

### Q2: 免费API够用吗？

**免费版:**
- 限制: 250 requests/day
- 每只股票约需3-4个请求
- 可处理约60-80只股票/天

**付费版 ($14/月):**
- 限制: 300 requests/minute
- 可处理约4,500只股票/小时

**建议:**
- 小规模测试(<100只) → 免费版够用
- 生产环境(>500只) → 建议付费版

### Q3: 如何处理大量股票池？

**分批处理:**
```python
# 修改 agent7_exclusion_executor.py 的 main() 函数
stocks = pd.read_csv(stock_pool_file)

# 只处理前100只
stocks_batch = stocks.iloc[0:100]
stocks_batch.to_csv('batch1.csv', index=False)

# 运行
executor.process_stock_pool('batch1.csv')
```

### Q4: 脚本运行很慢怎么办？

**正常速度:**
- 每只股票约1-2秒 (含0.3秒延迟)
- 100只股票约2-3分钟

**加速方法:**
1. 减少延迟 (但可能触发限流):
   ```python
   time.sleep(0.1)  # 从0.3改为0.1
   ```

2. 使用付费API (更高限额)

3. 并行处理 (需多个API Key)

### Q5: 排除率太高/太低怎么办？

**正常范围: 30-50%**

**排除率 < 20%:**
- 规则可能太宽松
- 股票池本身质量很高
- 检查规则是否正确执行

**排除率 > 60%:**
- 规则可能太严格
- 股票池包含大量低质量公司
- 考虑放宽阈值 (如Z-Score从1.8改为1.5)

---

## 检查清单

### 运行前检查
- [ ] Python 3已安装 (`python3 --version`)
- [ ] 依赖包已安装 (`pip list | grep pandas`)
- [ ] API Key已配置 (`echo $FMP_API_KEY`)
- [ ] 网络连接正常 (`ping financialmodelingprep.com`)
- [ ] 股票池文件存在且格式正确

### 运行中监控
- [ ] 每只股票处理进度正常显示
- [ ] 没有频繁的API错误
- [ ] 排除原因合理 (不全是"数据获取失败")

### 运行后验证
- [ ] 所有输出文件已生成
- [ ] `passed_companies.csv`有数据
- [ ] `exclusion_summary.md`内容完整
- [ ] 排除率在合理范围 (30-50%)
- [ ] 知名公司排除原因合理
- [ ] 边界案例已人工复核

---

## 下一步

完成Agent 7后:

1. **查看通过筛选的公司**
   ```bash
   cat /Users/milton/投资大师/Top20_Screener/data/passed_companies.csv
   ```

2. **进入后续Agent**
   - Agent 2: 宏观敏感度分析
   - Agent 3: 护城河评分
   - Agent 4: 价值vs质量分类
   - Agent 5: 风险调整收益
   - Agent 6: Top 20最终排序

3. **人工复核**
   - 检查边界案例
   - 验证知名公司排除原因
   - 必要时调整阈值重新运行

---

## 获取帮助

### 文档
- `AGENT7_README.md` - 完整文档
- `agent7_config.md` - 配置说明
- `test_agent7.py` - 测试脚本

### 调试
```bash
# 查看详细错误
python3 agent7_exclusion_executor.py 2>&1 | tee debug.log

# 测试单个ticker
python3 -c "
from agent7_exclusion_executor import ExclusionExecutor
executor = ExclusionExecutor('your_api_key')
excluded, reason, details = executor.execute_exclusion_rules('AAPL', 'Apple Inc')
print(f'Excluded: {excluded}, Reason: {reason}, Details: {details}')
"
```

### 常见错误
| 错误 | 原因 | 解决 |
|------|------|------|
| `command not found: python` | Python未安装或路径错误 | 使用`python3` |
| `No module named 'pandas'` | 依赖未安装 | `pip install pandas` |
| `API Key错误` | Key未配置或无效 | 检查环境变量 |
| `HTTPError` | API限额或网络问题 | 检查限额和网络 |
| `文件不存在` | 股票池文件缺失 | 运行`test_agent7.py` |

---

**版本**: v1.0
**更新日期**: 2026-01-25

祝投资顺利！ 📊💰
