# Tesla投资情报引擎 v10.0 - 系统架构设计

## 🏗️ 总体架构

```
┌─────────────────────────────────────────────────────────────┐
│                        用户界面层                             │
│  命令行CLI │ Web Dashboard │ API服务 │ Jupyter Notebook     │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      主控系统 (main.py)                       │
│  • 配置加载           • 任务调度          • 错误处理         │
│  • 引擎编排           • 日志管理          • 性能监控         │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                     6大数据引擎层                             │
├─────────────┬───────────┬───────────┬─────────────┬─────────┤
│ Engine 1    │ Engine 2  │ Engine 3  │ Engine 4    │ Eng 5+6 │
│ SEC Monitor │ Sentiment │ Supply Ch.│ Options     │ Comp &  │
│             │ Tracker   │ Intel     │ Decoder     │ Predictor│
└─────┬───────┴─────┬─────┴─────┬─────┴──────┬──────┴────┬────┘
      │             │           │            │           │
┌─────▼─────────────▼───────────▼────────────▼───────────▼────┐
│                    数据层                                     │
│  ┌────────────┐ ┌─────────┐ ┌──────────┐ ┌──────────────┐  │
│  │ SQLite DB  │ │ Cache   │ │ Raw Data │ │ ML Models    │  │
│  │ (结构化)   │ │ (Redis) │ │ (JSON)   │ │ (Pickle)     │  │
│  └────────────┘ └─────────┘ └──────────┘ └──────────────┘  │
└────────────────────────────┬──────────────────────────────┘
                             │
┌────────────────────────────▼──────────────────────────────┐
│                     自动化系统层                            │
│  • 任务调度器      • 报告生成器      • 告警系统           │
│  • 数据验证器      • 性能优化器      • 备份恢复           │
└────────────────────────────┬──────────────────────────────┘
                             │
┌────────────────────────────▼──────────────────────────────┐
│                     外部数据源                              │
│  SEC EDGAR │ Reddit │ Yahoo Finance │ 供应商财报 │ ...    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 引擎详细设计

### Engine 1: SEC Filing Monitor

**职责**: 监控SEC文件，抓取内部人交易和机构持仓

**数据流**:
```
SEC EDGAR RSS Feed
    ↓
解析新提交的Form 4/13F
    ↓
下载XML/HTML文件
    ↓
提取结构化数据
    ↓
存入database.insider_trading表
    ↓
触发告警（如大额交易）
```

**核心算法**:
```python
def detect_significant_trading(transactions):
    """检测重大交易"""
    for tx in transactions:
        if abs(tx.value) > 10_000_000:  # $10M阈值
            return {
                'alert': True,
                'insider': tx.insider,
                'value': tx.value,
                'interpretation': interpret_motivation(tx)
            }
```

**数据表结构**:
```sql
CREATE TABLE insider_trading (
    id INTEGER PRIMARY KEY,
    filing_date DATE,
    transaction_date DATE,
    insider_name VARCHAR(255),
    insider_title VARCHAR(100),
    transaction_type VARCHAR(10),  -- BUY/SELL
    shares INTEGER,
    price_per_share FLOAT,
    total_value FLOAT,
    remaining_shares INTEGER,
    sec_file_url VARCHAR(500),
    created_at TIMESTAMP
);

CREATE INDEX idx_filing_date ON insider_trading(filing_date);
CREATE INDEX idx_insider_name ON insider_trading(insider_name);
```

---

### Engine 2: Social Sentiment Tracker

**职责**: 实时追踪Reddit/Twitter情绪，计算OCI指数

**数据流**:
```
Reddit API (PRAW)
    ↓
抓取热门帖子（r/teslamotors, r/TeslaFSD, r/RealTesla）
    ↓
过滤相关帖子（关键词匹配）
    ↓
NLP情感分析（VADER）
    ↓
计算OCI指数（-100 to +100）
    ↓
存入database.sentiment_history表
    ↓
与股价相关性分析
```

**OCI计算公式**:
```python
def calculate_OCI(posts):
    """
    OCI (Owner Confidence Index) = 加权情感分数
    权重因子：upvotes、comments、作者karma
    """
    weighted_scores = []

    for post in posts:
        # 基础情感分数（-1 to +1）
        sentiment = VADER(post.title + post.text).compound

        # 权重计算
        engagement_weight = log(post.upvotes + 1) * log(post.comments + 1)
        credibility_weight = min(log(post.author_karma + 1), 5)

        # 加权分数
        weighted_score = sentiment * engagement_weight * credibility_weight
        weighted_scores.append(weighted_score)

    # 归一化到-100至+100
    OCI = (sum(weighted_scores) / len(weighted_scores)) * 100
    return round(OCI, 2)
```

**历史回测验证**:
```python
def backtest_OCI_vs_stock_price(start_date, end_date):
    """
    回测OCI与股价相关性
    返回：相关系数、领先滞后关系、胜率
    """
    oci_data = get_oci_history(start_date, end_date)
    price_data = get_stock_price(start_date, end_date)

    # 计算相关系数（滞后0-30天）
    correlations = []
    for lag in range(31):
        corr = pearson_correlation(
            oci_data,
            price_data.shift(lag)
        )
        correlations.append({'lag': lag, 'corr': corr})

    best_lag = max(correlations, key=lambda x: abs(x['corr']))

    # 计算交易信号胜率
    signals = generate_trading_signals(oci_data, threshold=20)
    wins, total = evaluate_signals(signals, price_data)
    win_rate = wins / total

    return {
        'best_lag_days': best_lag['lag'],
        'correlation': best_lag['corr'],
        'win_rate': win_rate,
        'total_signals': total
    }
```

---

### Engine 3: Supply Chain Intelligence

**职责**: 监控供应商财报，推断对Tesla影响

**数据流**:
```
供应商列表（CATL, TSMC, IDRA等）
    ↓
定期下载财报PDF/HTML
    ↓
NLP提取关键数据
    ↓
推断Tesla订单变化
    ↓
生成交易信号
    ↓
存入database.supply_chain_signals表
```

**推断逻辑**:
```python
def infer_tesla_impact(supplier_data, supplier_config):
    """
    从供应商数据推断Tesla影响
    """
    # 1. 提取相关数据
    overseas_revenue = extract_keyword(
        supplier_data,
        keywords=['overseas', 'North America', '海外', '北美']
    )
    auto_segment = extract_keyword(
        supplier_data,
        keywords=['automotive', 'EV', '汽车', '电动车']
    )

    # 2. 计算增速
    yoy_growth = (overseas_revenue / last_year_revenue) - 1

    # 3. 估算Tesla占比（基于历史模式）
    tesla_share = estimate_tesla_share(
        supplier=supplier_config.name,
        segment=supplier_config.segment,
        market='US'
    )

    # 4. 推断Tesla订单变化
    tesla_order_change = yoy_growth * tesla_share

    # 5. 生成信号
    if tesla_order_change > 0.30:  # +30%
        signal = {
            'type': 'BULLISH',
            'strength': min(tesla_order_change * 10, 10),
            'confidence': calculate_confidence(supplier_data),
            'rationale': f'{supplier_config.name} {supplier_config.segment} segment +{tesla_order_change:.0%} YoY implies strong Tesla demand'
        }

    return signal
```

**供应商配置示例**:
```yaml
# suppliers_config.yaml
suppliers:
  - name: CATL
    ticker: 300750.SZ
    exchange: SZSE
    segment: battery
    ir_url: http://www.catl.com/ir/
    tesla_revenue_share: 0.10  # Tesla占其收入10%
    earnings_schedule: quarterly
    key_metrics:
      - overseas_energy_storage_revenue
      - gross_margin
      - capacity_utilization

  - name: TSMC
    ticker: 2330.TW
    exchange: TWSE
    segment: chip
    ir_url: https://investor.tsmc.com/
    tesla_revenue_share: 0.02
    key_metrics:
      - automotive_revenue
      - N5_N7_advanced_node_revenue
      - capacity_booked_percentage
```

---

### Engine 4: Options Market Decoder

**职责**: 解码期权市场，识别异常交易和隐含概率

**数据流**:
```
期权链数据（实时）
    ↓
计算Put/Call Ratio
    ↓
计算隐含波动率
    ↓
检测异常交易
    ↓
反推市场隐含概率
    ↓
存入database.options_signals表
```

**异常交易检测算法**:
```python
def detect_unusual_options_activity(options_data):
    """
    检测异常期权活动（Unusual Options Activity）
    """
    unusual_trades = []

    for option in options_data:
        # 条件1：成交量异常
        volume_anomaly = option.volume > (option.open_interest * 2)

        # 条件2：单笔大单
        large_trade = option.volume > 1000 and option.volume == option.volume_spike

        # 条件3：价格异常
        price_spike = (option.last_price / option.prev_close) > 1.5

        # 条件4：隐含波动率突变
        iv_spike = (option.implied_volatility - option.historical_iv) > 0.20

        if any([volume_anomaly, large_trade, price_spike, iv_spike]):
            unusual_trades.append({
                'option': option,
                'alert_reasons': {
                    'volume': volume_anomaly,
                    'size': large_trade,
                    'price': price_spike,
                    'iv': iv_spike
                },
                'interpretation': interpret_unusual_trade(option)
            })

    return unusual_trades

def interpret_unusual_trade(option):
    """解释异常交易含义"""
    if option.type == 'CALL' and option.strike > current_price * 1.1:
        return 'Bullish bet on significant upside (>10%)'
    elif option.type == 'PUT' and option.strike < current_price * 0.9:
        return 'Hedging downside risk or bearish bet'
    elif option.volume > 10000:
        return 'Institutional-sized position, possible informed trading'
    # ...更多规则
```

**隐含概率倒推**:
```python
def reverse_engineer_market_probabilities(stock_price, options_chain):
    """
    从期权价格反推市场对各场景的隐含概率
    基于Black-Scholes期权定价模型
    """
    # 1. 定义场景
    scenarios = {
        'bull': {'price_target': stock_price * 1.30, 'prob': None},
        'base': {'price_target': stock_price * 1.05, 'prob': None},
        'bear': {'price_target': stock_price * 0.70, 'prob': None}
    }

    # 2. 选择关键期权
    bull_option = find_option(options_chain, strike=scenarios['bull']['price_target'])
    bear_option = find_option(options_chain, strike=scenarios['bear']['price_target'])

    # 3. 使用Black-Scholes反推隐含概率
    # 简化：期权价格 ≈ 概率 × 内在价值
    scenarios['bull']['prob'] = bull_option.price / (
        max(scenarios['bull']['price_target'] - stock_price, 0)
    )

    scenarios['bear']['prob'] = bear_option.price / (
        max(stock_price - scenarios['bear']['price_target'], 0)
    )

    scenarios['base']['prob'] = 1 - scenarios['bull']['prob'] - scenarios['bear']['prob']

    return scenarios
```

---

### Engine 5: Competitor Tracker

**职责**: 追踪竞品数据，计算市场份额和技术差距

**数据流**:
```
竞品列表（BYD, XPEV, NIO, RIVN, LCID）
    ↓
抓取月度销量（公司公告/行业协会）
    ↓
抓取技术参数（官网/评测）
    ↓
计算市场份额
    ↓
计算技术差距指数
    ↓
存入database.competitor_data表
```

**技术差距量化**:
```python
def calculate_tech_gap_index(tesla_specs, competitor_specs):
    """
    计算技术差距指数（0-100）
    100 = Tesla完全领先
    0 = 竞品完全领先
    """
    dimensions = {
        'range': 0.30,      # 续航权重30%
        'charging': 0.25,   # 充电速度25%
        'autonomous': 0.30, # 自动驾驶30%
        'performance': 0.10,# 性能10%
        'price': 0.05       # 价格5%
    }

    scores = {}

    # 续航对比
    scores['range'] = (tesla_specs.range / competitor_specs.range) * 100

    # 充电速度（10%-80%时间，越短越好）
    scores['charging'] = (competitor_specs.charging_time / tesla_specs.charging_time) * 100

    # 自动驾驶（干预率，越低越好）
    scores['autonomous'] = (competitor_specs.intervention_rate / tesla_specs.intervention_rate) * 100

    # 加权平均
    tech_gap_index = sum(
        scores[dim] * weight
        for dim, weight in dimensions.items()
    )

    return min(max(tech_gap_index, 0), 100)
```

---

### Engine 6: Earnings Predictor

**职责**: 整合5引擎信号，预测下季度财报

**数据流**:
```
5个引擎信号
    ↓
特征工程
    ↓
机器学习模型（XGBoost）
    ↓
预测EPS、收入、毛利率
    ↓
计算置信区间
    ↓
存入database.earnings_predictions表
```

**特征工程**:
```python
def engineer_features(signals_dict, quarter):
    """
    将5引擎信号转换为ML模型特征
    """
    features = {}

    # Engine 1: 内部人交易特征
    features['insider_net_buy_value'] = sum(
        tx.value for tx in signals_dict['sec']
        if tx.transaction == 'BUY'
    ) - sum(
        tx.value for tx in signals_dict['sec']
        if tx.transaction == 'SELL'
    )
    features['insider_transaction_count'] = len(signals_dict['sec'])

    # Engine 2: 情绪特征
    features['oci_avg'] = mean([s.oci for s in signals_dict['sentiment']])
    features['oci_trend'] = linear_regression_slope(
        [s.oci for s in signals_dict['sentiment']]
    )

    # Engine 3: 供应链特征
    features['supplier_signals_bullish'] = sum(
        1 for s in signals_dict['supply_chain']
        if s.type == 'BULLISH'
    )
    features['catl_energy_growth'] = get_specific_signal(
        signals_dict['supply_chain'],
        supplier='CATL',
        metric='energy_storage_growth'
    )

    # Engine 4: 期权特征
    features['put_call_ratio'] = signals_dict['options']['put_call_ratio']
    features['implied_volatility'] = signals_dict['options']['iv_avg']
    features['unusual_activity_count'] = len(signals_dict['options']['unusual'])

    # Engine 5: 竞品特征
    features['market_share_change'] = (
        signals_dict['competitor']['tesla_share'] -
        signals_dict['competitor']['tesla_share_last_quarter']
    )

    # 宏观特征
    features['sp500_return'] = get_sp500_return(quarter)
    features['vix_avg'] = get_vix_avg(quarter)

    return features
```

**ML模型训练**:
```python
def train_earnings_prediction_model(historical_data):
    """
    训练XGBoost模型预测财报
    训练数据：过去20个季度
    """
    from xgboost import XGBRegressor

    # 准备数据
    X = [engineer_features(q.signals, q.quarter) for q in historical_data]
    y_eps = [q.actual_eps for q in historical_data]
    y_revenue = [q.actual_revenue for q in historical_data]
    y_margin = [q.actual_margin for q in historical_data]

    # 训练3个模型
    model_eps = XGBRegressor(
        n_estimators=100,
        max_depth=5,
        learning_rate=0.05
    ).fit(X, y_eps)

    model_revenue = XGBRegressor(...).fit(X, y_revenue)
    model_margin = XGBRegressor(...).fit(X, y_margin)

    # 交叉验证
    cv_scores = cross_val_score(model_eps, X, y_eps, cv=5)
    print(f'EPS Prediction R²: {cv_scores.mean():.3f}')

    return {
        'eps': model_eps,
        'revenue': model_revenue,
        'margin': model_margin
    }

def predict_next_quarter(models, current_signals):
    """
    预测下季度财报
    """
    features = engineer_features(current_signals, quarter='next')

    predictions = {
        'eps': models['eps'].predict([features])[0],
        'revenue': models['revenue'].predict([features])[0],
        'margin': models['margin'].predict([features])[0]
    }

    # 置信区间（bootstrap）
    confidence_intervals = bootstrap_confidence_interval(
        models, features, n_iterations=1000
    )

    return {
        **predictions,
        'confidence_intervals': confidence_intervals,
        'probability_beat_consensus': calculate_beat_probability(
            predictions, consensus_estimates
        )
    }
```

---

## 🔄 自动化系统设计

### 任务调度器

```python
from apscheduler.schedulers.background import BackgroundScheduler

class IntelligenceScheduler:
    def __init__(self, config):
        self.scheduler = BackgroundScheduler()
        self.engines = initialize_engines(config)

    def start(self):
        # Engine 1: 每天18:00运行（SEC提交通常在收盘后）
        self.scheduler.add_job(
            self.engines['sec'].run,
            trigger='cron',
            hour=18,
            minute=0
        )

        # Engine 2: 每天09:00运行（抓取过夜Reddit讨论）
        self.scheduler.add_job(
            self.engines['sentiment'].run,
            trigger='cron',
            hour=9,
            minute=0
        )

        # Engine 3: 每周一09:00运行（财报季每天）
        self.scheduler.add_job(
            self.engines['supply_chain'].run,
            trigger='cron',
            day_of_week='mon',
            hour=9,
            minute=0
        )

        # Engine 4: 每小时运行（实时期权监控）
        self.scheduler.add_job(
            self.engines['options'].run,
            trigger='interval',
            hours=1
        )

        # 每日报告生成：每天19:00
        self.scheduler.add_job(
            self.generate_daily_report,
            trigger='cron',
            hour=19,
            minute=0
        )

        self.scheduler.start()
```

---

## 📊 数据库Schema完整设计

```sql
-- insider_trading表（已在Engine 1部分定义）

-- sentiment_history表
CREATE TABLE sentiment_history (
    id INTEGER PRIMARY KEY,
    date DATE,
    subreddit VARCHAR(50),
    oci_score FLOAT,
    sample_size INTEGER,
    positive_ratio FLOAT,
    negative_ratio FLOAT,
    top_keywords TEXT,  -- JSON array
    created_at TIMESTAMP
);

-- supply_chain_signals表
CREATE TABLE supply_chain_signals (
    id INTEGER PRIMARY KEY,
    date DATE,
    supplier_name VARCHAR(100),
    quarter VARCHAR(10),
    key_metric VARCHAR(50),
    value FLOAT,
    yoy_growth FLOAT,
    tesla_impact_estimate FLOAT,
    signal_type VARCHAR(20),  -- BULLISH/BEARISH/NEUTRAL
    signal_strength FLOAT,    -- 0-10
    confidence FLOAT,         -- 0-1
    rationale TEXT,
    created_at TIMESTAMP
);

-- options_signals表
CREATE TABLE options_signals (
    id INTEGER PRIMARY KEY,
    date DATE,
    put_call_ratio FLOAT,
    implied_volatility_avg FLOAT,
    max_pain FLOAT,
    unusual_activity_count INTEGER,
    largest_unusual_trade TEXT,  -- JSON
    market_sentiment VARCHAR(20),
    created_at TIMESTAMP
);

-- competitor_data表
CREATE TABLE competitor_data (
    id INTEGER PRIMARY KEY,
    month DATE,
    company VARCHAR(50),
    sales_volume INTEGER,
    market_share FLOAT,
    tech_gap_index FLOAT,
    price_competitiveness FLOAT,
    created_at TIMESTAMP
);

-- earnings_predictions表
CREATE TABLE earnings_predictions (
    id INTEGER PRIMARY KEY,
    prediction_date DATE,
    quarter VARCHAR(10),
    predicted_eps FLOAT,
    predicted_revenue FLOAT,
    predicted_margin FLOAT,
    confidence_interval_lower FLOAT,
    confidence_interval_upper FLOAT,
    beat_probability FLOAT,
    feature_importance TEXT,  -- JSON
    created_at TIMESTAMP
);

-- daily_reports表（存储生成的报告）
CREATE TABLE daily_reports (
    id INTEGER PRIMARY KEY,
    report_date DATE,
    综合评分 FLOAT,
    建议仓位 VARCHAR(20),
    关键信号 TEXT,  -- JSON array
    report_markdown TEXT,
    report_html TEXT,
    created_at TIMESTAMP
);
```

---

## 🎯 性能优化策略

### 缓存机制
```python
from functools import lru_cache
import redis

# 内存缓存（LRU）
@lru_cache(maxsize=128)
def get_stock_price(ticker, date):
    """缓存股价数据，避免重复API调用"""
    return api.fetch_price(ticker, date)

# Redis分布式缓存
cache = redis.Redis(host='localhost', port=6379)

def get_options_chain_cached(ticker):
    key = f'options:{ticker}:{datetime.now().date()}'
    cached = cache.get(key)

    if cached:
        return json.loads(cached)

    fresh_data = api.fetch_options(ticker)
    cache.setex(key, 3600, json.dumps(fresh_data))  # 1小时过期
    return fresh_data
```

### 并行处理
```python
from concurrent.futures import ThreadPoolExecutor

def run_all_engines_parallel(engines):
    """并行运行所有引擎，减少总时间"""
    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = {
            executor.submit(engine.run): name
            for name, engine in engines.items()
        }

        results = {}
        for future in as_completed(futures):
            engine_name = futures[future]
            try:
                results[engine_name] = future.result()
            except Exception as e:
                logger.error(f'{engine_name} failed: {e}')
                results[engine_name] = None

        return results
```

---

## 📡 API设计（可选模块）

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/v1/daily_report', methods=['GET'])
def get_daily_report():
    """获取最新每日简报"""
    report = db.query('SELECT * FROM daily_reports ORDER BY report_date DESC LIMIT 1')
    return jsonify(report)

@app.route('/api/v1/signals/<engine_name>', methods=['GET'])
def get_engine_signals(engine_name):
    """获取特定引擎的最新信号"""
    signals = db.query(f'SELECT * FROM {engine_name}_signals ORDER BY date DESC LIMIT 10')
    return jsonify(signals)

@app.route('/api/v1/predict/<quarter>', methods=['GET'])
def get_earnings_prediction(quarter):
    """获取财报预测"""
    prediction = db.query(f"SELECT * FROM earnings_predictions WHERE quarter='{quarter}'")
    return jsonify(prediction)
```

---

**系统复杂度**：🔴🔴🔴🔴⚪ (4/5)
**可维护性**：🟢🟢🟢🟢🟢 (5/5)
**可扩展性**：🟢🟢🟢🟢🟢 (5/5)

