# Supply Chain Intelligence Network - Engine 3

**版本**: v1.0
**日期**: 2026-01-25
**用途**: 自动监控Tesla 15家核心供应商财报，提取关键数据，生成交易信号

---

## 核心功能

### 1. 自动化财报监控
- 监控15家关键供应商（CATL、台积电、IDRA、Panasonic等）
- 自动下载季度/年度财报（PDF/HTML）
- 支持多市场：美股(SEC)、A股、港股、台股、日股

### 2. 智能数据提取
- NLP提取关键财务指标（收入、毛利率、产能、地区分布）
- 自动识别管理层评论中的Tesla相关信息
- 置信度评分系统（0-1）

### 3. 交叉验证
- 多来源数据自动对比
- 方差检测（tolerance: 15%）
- 数据质量分级（Tier 1-3）

### 4. 影响评估
- 四维度评估：成本/产能/质量/创新
- 综合影响评分（0-10）
- 风险与机会识别

### 5. 交易信号
- 5级信号：STRONG_BUY / BUY / HOLD / SELL / STRONG_SELL
- 基于影响评分和行业权重
- 时间序列趋势分析

---

## 快速开始

### 安装依赖

```bash
pip install PyPDF2 beautifulsoup4 requests pyyaml pandas numpy nltk
```

### 下载NLTK数据（首次运行）

```python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
```

### 基础使用

#### 1. 分析单个供应商

```bash
python engines/supply_chain_intel.py --supplier CATL
```

#### 2. 分析所有供应商

```bash
python engines/supply_chain_intel.py --all
```

#### 3. 强制重新下载报告

```bash
python engines/supply_chain_intel.py --all --force
```

#### 4. 使用自定义配置

```bash
python engines/supply_chain_intel.py --all --config /path/to/config.yaml
```

---

## Python API

### 初始化引擎

```python
from engines.supply_chain_intel import SupplyChainIntelligence

# 使用默认配置
engine = SupplyChainIntelligence()

# 使用自定义配置
engine = SupplyChainIntelligence(config_path='/path/to/config.yaml')
```

### 分析单个供应商

```python
# 分析CATL
report = engine.analyze_supplier('CATL', force_download=False)

# 查看影响评分
print(f"Impact Score: {report.impact_score}/10")
print(f"Signal: {report.signal}")

# 查看提取的指标
for metric in report.metrics:
    print(f"{metric.metric_name}: {metric.value} {metric.unit} (confidence: {metric.confidence:.0%})")
```

### 分析所有供应商

```python
# 批量分析
results = engine.analyze_all_suppliers(force_download=False)

# 遍历结果
for supplier_name, report in results.items():
    print(f"{supplier_name}: {report.signal} ({report.impact_score}/10)")
```

### 自定义指标提取

```python
# 提取PDF文本
text = engine.extract_text_from_pdf('/path/to/report.pdf')

# 提取指标
supplier_config = engine.config['suppliers'][0]  # CATL
metrics = engine.extract_metrics(text, supplier_config)

# 交叉验证
validated = engine.cross_validate_metrics(metrics)
```

---

## 配置文件详解

### suppliers_config.yaml 结构

```yaml
suppliers:
  - name: CATL
    ticker: 300750.SZ
    exchange: 深交所
    segment: battery           # 细分市场
    importance: critical       # 重要性级别
    revenue_share: 0.35        # 占Tesla采购份额
    ir_url: http://...         # IR主页
    financial_reports_url: ... # 财报页面
    keywords: [...]            # 搜索关键词
    extraction_fields: [...]   # 要提取的字段
    impact_score: 10           # 基础影响分

analysis_config:
  download_frequency: quarterly
  lookback_periods: 8
  confidence_threshold: 0.7

  impact_weights:
    revenue_change: 0.25
    margin_change: 0.20
    capacity_expansion: 0.20
    pricing_trend: 0.15
    contract_news: 0.10
    management_commentary: 0.10

  signal_thresholds:
    strong_buy: 8.0
    buy: 6.0
    hold: 4.0
    sell: 2.0
    strong_sell: 0.0
```

### 添加新供应商

在`suppliers_config.yaml`中添加：

```yaml
suppliers:
  - name: NewSupplier
    ticker: XXXX.XX
    exchange: NYSE
    segment: sensor
    importance: medium
    revenue_share: 0.05
    ir_url: https://...
    keywords: ["autonomous", "lidar"]
    extraction_fields:
      - revenue
      - gross_margin
    impact_score: 6
```

---

## 输出文件

### 1. 供应商分析报告

**路径**: `data/supply_chain/analysis/{supplier}_{period}.json`

```json
{
  "report": {
    "supplier_name": "CATL",
    "ticker": "300750.SZ",
    "report_period": "2024Q4",
    "metrics": [
      {
        "metric_name": "revenue",
        "value": 5000.0,
        "unit": "million_usd",
        "confidence": 0.85
      }
    ],
    "key_findings": [...],
    "impact_score": 8.5,
    "signal": "BUY"
  },
  "tesla_impact": {
    "cost_impact": -2.3,
    "capacity_impact": 7.5,
    "quality_impact": 5.0,
    "innovation_impact": 6.0,
    "overall_impact": 8.5,
    "recommendation": "POSITIVE - 供应商健康发展，利好Tesla",
    "key_risks": [...],
    "key_opportunities": [...]
  }
}
```

### 2. 汇总报告

**路径**: `data/supply_chain/analysis/supply_chain_summary_{date}.md`

Markdown格式，包含：
- 所有供应商信号概览表
- 关键发现汇总
- 强烈买入/卖出建议
- 风险警示

### 3. 下载的财报

**路径**: `data/supply_chain/reports/{supplier}/`

每个供应商独立目录，存储PDF/HTML原文件。

---

## 数据提取逻辑

### 收入指标

**正则模式**:
- `revenue: $XX billion`
- `automotive revenue: $XX million`
- `北美收入：XX亿元`

**提取字段**:
- `revenue` - 总收入
- `{keyword}_revenue` - 特定业务收入（如automotive_revenue）
- `{region}_revenue` - 地区收入（如North_America_revenue）
- `{region}_revenue_pct` - 地区收入占比

### 利润率

**正则模式**:
- `gross margin: XX%`
- `operating margin: XX%`

**提取字段**:
- `gross_margin`
- `operating_margin`
- `net_margin`

### 产能/订单

**正则模式**:
- `capacity expansion: XX GWh`
- `新增产能：XX GWh`
- `order backlog: $XX million`

**提取字段**:
- `capacity_expansion`
- `order_backlog`
- `new_contracts`

### 管理层评论

**提取逻辑**:
1. 句子分割（nltk.sent_tokenize）
2. 关键词匹配（如"Tesla", "electric vehicles", "automotive"）
3. 长度过滤（50-500字符）
4. 去重，保留前10条

---

## 影响评估算法

### 四维度评分

#### 1. 成本影响 (cost_impact: -10 to +10)

- **高毛利率（>30%）** → 负面（供应商向Tesla转嫁成本）
- **低毛利率（<15%）** → 正面（Tesla议价能力强）
- **原材料价格上涨** → 负面

```python
if gross_margin > 30:
    cost_impact -= 2 * revenue_share * 10
```

#### 2. 产能影响 (capacity_impact: -10 to +10)

- **产能扩张** → 正面（保障供应）
- **订单积压** → 正面（需求强劲）
- **产能利用率下降** → 负面

```python
if capacity_expansion > 0:
    capacity_impact += 5 * revenue_share * 10
```

#### 3. 质量影响 (quality_impact: 0-10)

- **芯片供应商** → 默认5分（质量关键）
- **原材料供应商** → 默认3分（质量稳定）

#### 4. 创新影响 (innovation_impact: 0-10)

- **芯片/计算** → 默认6分（创新驱动）
- **原材料** → 默认2分（创新较少）

### 综合评分公式

```python
overall_impact = (
    (cost_impact + 10) * 0.25 +      # 归一化到0-10，权重25%
    (capacity_impact + 10) * 0.25 +  # 权重25%
    quality_impact * 0.20 +          # 权重20%
    innovation_impact * 0.15 +       # 权重15%
    5.0 * 0.15                       # 基准分，权重15%
)
```

### 信号映射

```python
if overall_impact >= 8.0:  return 'STRONG_BUY'
if overall_impact >= 6.0:  return 'BUY'
if overall_impact >= 4.0:  return 'HOLD'
if overall_impact >= 2.0:  return 'SELL'
else:                      return 'STRONG_SELL'
```

---

## 数据验证机制

### 交叉验证流程

1. **按metric_name分组**
   ```python
   grouped = defaultdict(list)
   for metric in metrics:
       grouped[metric.metric_name].append(metric)
   ```

2. **单来源处理**
   - 降低置信度：`confidence *= 0.8`
   - 标记：`source = "single_source"`

3. **多来源处理**
   - 计算方差：`variance = std / mean`
   - 判断一致性：
     - 若`variance < 15%` → 数据一致，提高置信度
     - 若`variance >= 15%` → 数据冲突，保留最高置信度源

4. **置信度调整**
   ```python
   if variance < 0.15:
       confidence *= 1.2  # 提高20%
       source = f"cross_validated_{n}_sources"
   else:
       confidence *= 0.7  # 降低30%
       source = f"inconsistent_{n}_sources"
   ```

### 数据源分级

- **Tier 1** (直接引用)：财报、SEC文件、交易所公告
- **Tier 2** (交叉验证后可用)：Bloomberg、Reuters、公司演示
- **Tier 3** (仅作参考)：行业报告、媒体报道

---

## 高级用法

### 1. 自定义提取规则

```python
# 自定义正则模式
custom_patterns = {
    'battery_capacity': r'battery\s+capacity[:\s]+([\d,\.]+)\s*GWh',
    'ev_penetration': r'EV\s+penetration[:\s]+([\d\.]+)%'
}

# 手动提取
import re
matches = re.finditer(custom_patterns['battery_capacity'], text, re.IGNORECASE)
```

### 2. 时间序列分析

```python
# 加载历史数据
import json
from pathlib import Path

history = []
for file in Path('data/supply_chain/analysis').glob('CATL_*.json'):
    with open(file) as f:
        history.append(json.load(f))

# 趋势分析
import pandas as pd
df = pd.DataFrame([
    {
        'period': h['report']['report_period'],
        'impact_score': h['tesla_impact']['overall_impact']
    }
    for h in history
])

print(df.sort_values('period'))
```

### 3. 批量数据导出

```python
# 导出为CSV
import pandas as pd

results = engine.analyze_all_suppliers()

data = []
for name, report in results.items():
    data.append({
        'Supplier': name,
        'Ticker': report.ticker,
        'Impact_Score': report.impact_score,
        'Signal': report.signal,
        'Confidence': report.confidence
    })

df = pd.DataFrame(data)
df.to_csv('supply_chain_signals.csv', index=False)
```

---

## 故障排除

### 问题1: 无法下载PDF

**症状**: `Downloaded 0 reports`

**原因**:
- IR页面结构变化
- 需要登录/验证
- IP被限制

**解决**:
1. 检查`ir_url`是否正确
2. 手动访问IR页面，确认PDF链接格式
3. 添加自定义headers/cookies
4. 使用代理

```python
engine.session.headers.update({
    'Cookie': 'your_cookie_here'
})
```

### 问题2: NLP提取失败

**症状**: `metrics = []`

**原因**:
- PDF文本提取失败（扫描版PDF）
- 语言不匹配（中文报告用英文关键词）
- 报告格式特殊

**解决**:
1. 检查PDF是否可复制文本
2. 使用OCR工具（tesseract）
3. 调整关键词（添加中文/日文关键词）
4. 自定义正则模式

### 问题3: 数据方差过大

**症状**: `inconsistent_N_sources`

**原因**:
- 不同报告期数据混用
- 单位转换错误（billion vs million）
- 财报重述

**解决**:
1. 检查`report_period`一致性
2. 验证单位转换逻辑
3. 增加`variance_tolerance`
4. 手动核对原文

---

## 性能优化

### 1. 并行下载

```python
from concurrent.futures import ThreadPoolExecutor

def download_all_parallel():
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = [
            executor.submit(engine.download_supplier_reports, s)
            for s in engine.config['suppliers']
        ]

        results = [f.result() for f in futures]
```

### 2. 缓存机制

引擎自动缓存提取结果到`extraction_cache.json`：

```python
# 检查缓存
cache_key = f"{supplier_name}_{report_period}"
if cache_key in engine.cache:
    return engine.cache[cache_key]

# 保存缓存
engine.cache[cache_key] = result
engine._save_cache()
```

### 3. 增量更新

```python
# 只分析新报告
def analyze_new_only():
    for supplier in engine.config['suppliers']:
        # 检查最新报告日期
        latest_file = max(
            Path(f'data/supply_chain/reports/{supplier["name"]}').glob('*.pdf'),
            key=lambda p: p.stat().st_mtime,
            default=None
        )

        if latest_file and (datetime.now() - datetime.fromtimestamp(latest_file.stat().st_mtime)).days < 7:
            print(f"Skipping {supplier['name']} - recent report exists")
            continue

        engine.analyze_supplier(supplier['name'])
```

---

## 扩展开发

### 添加新的提取器

```python
class SupplyChainIntelligence:

    def _extract_custom_metric(self, text: str) -> List[FinancialMetric]:
        """自定义指标提取器"""
        metrics = []

        # 示例：提取研发支出
        pattern = r'R&D\s+expense[:\s]+\$?([\d,\.]+)\s*(million|billion)'
        matches = re.finditer(pattern, text, re.IGNORECASE)

        for match in matches:
            value_str = match.group(1).replace(',', '')
            unit = match.group(2)

            value = float(value_str)
            if 'billion' in unit.lower():
                value *= 1000

            metrics.append(FinancialMetric(
                metric_name='rd_expense',
                value=value,
                unit='million_usd',
                period='unknown',
                confidence=0.8,
                source='custom_extractor',
                extracted_at=datetime.now().isoformat()
            ))

        return metrics
```

### 添加新的数据源

```python
def _download_from_new_source(self, supplier: Dict) -> List[str]:
    """从新数据源下载"""
    # 示例：从Bloomberg下载
    bloomberg_url = f"https://bloomberg.com/quote/{supplier['ticker']}/financials"

    response = self.session.get(bloomberg_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # 提取财务表格
    tables = soup.find_all('table', class_='financials')

    # 保存为CSV
    # ...

    return [csv_path]
```

---

## 最佳实践

### 1. 定期监控

建议每季度财报季后运行：

```bash
# 添加到crontab
0 9 * * 1 cd /path/to/project && python engines/supply_chain_intel.py --all >> logs/supply_chain.log 2>&1
```

### 2. 数据验证

关键数据必须手动验证：

```python
# 对于critical级别供应商，打印详细信息
for supplier in engine.config['suppliers']:
    if supplier['importance'] == 'critical':
        report = engine.analyze_supplier(supplier['name'])

        print(f"\n=== {supplier['name']} ===")
        for metric in report.metrics:
            if metric.confidence < 0.8:
                print(f"⚠️ Low confidence: {metric.metric_name} = {metric.value}")
```

### 3. 异常监控

```python
# 监控异常变化
def detect_anomalies(current, historical):
    for metric_name in current.keys():
        if metric_name in historical:
            change_pct = (current[metric_name] - historical[metric_name]) / historical[metric_name]

            if abs(change_pct) > 0.3:  # 30%变化
                print(f"🚨 Anomaly: {metric_name} changed {change_pct:.0%}")
```

---

## API参考

### SupplyChainIntelligence

#### 初始化

```python
__init__(config_path: str = None)
```

**参数**:
- `config_path`: 配置文件路径（可选，默认使用`config/suppliers_config.yaml`）

#### 方法

##### analyze_supplier

```python
analyze_supplier(supplier_name: str, force_download: bool = False) -> Optional[SupplierReport]
```

分析单个供应商。

**参数**:
- `supplier_name`: 供应商名称（如"CATL"）
- `force_download`: 是否强制重新下载报告

**返回**: `SupplierReport`对象或`None`

##### analyze_all_suppliers

```python
analyze_all_suppliers(force_download: bool = False) -> Dict[str, SupplierReport]
```

批量分析所有供应商。

**返回**: 供应商名称 → SupplierReport 字典

##### extract_metrics

```python
extract_metrics(text: str, supplier: Dict) -> List[FinancialMetric]
```

从文本提取财务指标。

**参数**:
- `text`: 财报文本
- `supplier`: 供应商配置字典

**返回**: `FinancialMetric`列表

##### assess_tesla_impact

```python
assess_tesla_impact(supplier: Dict, metrics: List[FinancialMetric]) -> TeslaImpactAssessment
```

评估对Tesla的影响。

**返回**: `TeslaImpactAssessment`对象

---

## 示例场景

### 场景1: 电池供应链风险预警

```python
engine = SupplyChainIntelligence()

# 分析三大电池供应商
battery_suppliers = ['CATL', 'Panasonic', 'LG Energy Solution']

alerts = []
for supplier_name in battery_suppliers:
    report = engine.analyze_supplier(supplier_name)

    # 检查产能指标
    for metric in report.metrics:
        if 'capacity' in metric.metric_name and metric.value < 50:  # <50 GWh
            alerts.append(f"{supplier_name} 产能不足: {metric.value} GWh")

    # 检查利润率下降
    for metric in report.metrics:
        if 'margin' in metric.metric_name and metric.value < 15:
            alerts.append(f"{supplier_name} 利润率过低: {metric.value}%，可能涨价")

if alerts:
    print("🚨 Battery Supply Chain Alerts:")
    for alert in alerts:
        print(f"  - {alert}")
```

### 场景2: 成本趋势分析

```python
# 追踪原材料价格趋势
materials_suppliers = ['Albemarle', 'Ganfeng Lithium']

for supplier_name in materials_suppliers:
    report = engine.analyze_supplier(supplier_name)

    # 提取价格数据
    for metric in report.metrics:
        if 'price' in metric.metric_name.lower():
            print(f"{supplier_name} - {metric.metric_name}: ${metric.value}/ton")

            # 与历史对比
            # TODO: 加载历史数据对比
```

### 场景3: 自动化日报

```python
import schedule
import time

def daily_check():
    """每日快速检查"""
    engine = SupplyChainIntelligence()

    # 只检查critical级别供应商
    critical = [s for s in engine.config['suppliers'] if s['importance'] == 'critical']

    for supplier in critical:
        report = engine.analyze_supplier(supplier['name'], force_download=False)

        if report.signal in ['SELL', 'STRONG_SELL']:
            # 发送告警（邮件/短信）
            send_alert(f"⚠️ {supplier['name']} signal: {report.signal}")

# 每天早上9点运行
schedule.every().day.at("09:00").do(daily_check)

while True:
    schedule.run_pending()
    time.sleep(60)
```

---

## 版本历史

### v1.0 (2026-01-25)
- ✅ 15家供应商配置
- ✅ 自动下载财报（SEC/IR页面）
- ✅ NLP提取核心指标
- ✅ 交叉验证机制
- ✅ 四维度影响评估
- ✅ 交易信号生成
- ✅ JSON/Markdown报告输出

### 未来计划 (v1.1+)
- [ ] 增加OCR支持（扫描版PDF）
- [ ] 机器学习模型预测
- [ ] 实时数据流（API集成）
- [ ] Web仪表盘
- [ ] 告警系统（邮件/Slack）
- [ ] 多语言支持优化
- [ ] 图表可视化

---

## 支持

**文档**: 本README
**配置**: `config/suppliers_config.yaml`
**示例**: `engines/supply_chain_intel.py` 主函数部分

**常见问题**:
1. 如何添加新供应商？→ 编辑`suppliers_config.yaml`
2. 数据不准确？→ 检查`confidence`分数，低于0.7需人工验证
3. 下载失败？→ 检查网络/IR URL/反爬机制

---

**结语**:

Supply Chain Intelligence Network 提供了一套完整的供应链监控体系。通过自动化数据采集、智能提取和多维度评估，帮助投资者及时发现供应链风险和机会，为Tesla投资决策提供数据支撑。

**核心优势**:
- 🤖 全自动化 - 无需手动下载报告
- 🧠 智能提取 - NLP识别关键信息
- ✅ 交叉验证 - 多来源确保准确性
- 📊 量化评估 - 四维度影响评分
- 📈 交易信号 - 直接指导操作

**立即开始**: `python engines/supply_chain_intel.py --all`
