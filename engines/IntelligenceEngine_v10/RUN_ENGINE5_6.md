# Engine 5 & 6 - 快速运行指南

**5分钟内开始使用竞品追踪和财报预测引擎**

---

## 1️⃣ 安装依赖（仅需一次）

```bash
cd /Users/milton/投资大师/IntelligenceEngine_v10

# 安装核心依赖
pip3 install pandas numpy scikit-learn scipy yfinance requests schedule --user
```

**预计耗时**: 1-2分钟

---

## 2️⃣ 运行测试（验证安装）

```bash
# 运行完整测试
python3 test_engines_simple.py
```

**预期输出**:
```
✅ TEST 1: Competitor Tracker - PASSED
✅ TEST 2: ML Model Training - PASSED
✅ TEST 3: Earnings Predictor - PASSED

ALL TESTS PASSED ✓
```

**预计耗时**: 10-15秒

---

## 3️⃣ 运行演示（完整体验）

```bash
# 交互式演示
python3 demo_engine5_6.py
```

**演示内容**:
1. 竞品追踪分析
2. 技术参数对比
3. 竞争压力评分
4. 财报预测
5. 交易建议
6. 完整报告

**预计耗时**: 2-3分钟（含交互）

---

## 4️⃣ 单独使用引擎

### Engine 5: 竞品追踪

```python
python3 -c "
import sys
sys.path.insert(0, 'engines')
from competitor_tracker import CompetitorTracker

tracker = CompetitorTracker('TSLA')
signal = tracker.generate_signal()

print(f'竞争压力: {signal[\"signal_strength\"]}/100')
print(f'方向: {signal[\"direction\"]}')
print(f'最大威胁: {signal[\"metrics\"][\"biggest_threat\"]}')
"
```

### Engine 6: 财报预测

```python
python3 -c "
import sys
sys.path.insert(0, 'engines')
from competitor_tracker import CompetitorTracker
from earnings_predictor import EarningsPredictorEngine

# 收集信号
tracker = CompetitorTracker('TSLA')
signal = tracker.generate_signal()

# 预测
predictor = EarningsPredictorEngine('TSLA')
outputs = {'competitor': signal}
prediction = predictor.generate_earnings_prediction(outputs)

print(f'季度: {prediction[\"quarter\"]}')
print(f'EPS预测: ${prediction[\"predictions\"][\"eps\"][\"predicted\"]:.2f}')
print(f'Beat概率: {prediction[\"predictions\"][\"eps\"][\"surprise_probability\"]*100:.0f}%')
"
```

---

## 5️⃣ 自动化运行

### 立即运行一次

```bash
python3 automation/daily_update.py --mode once --job all
```

### 定时调度（每天9点）

```bash
# 后台运行
nohup python3 automation/daily_update.py --mode schedule &
```

**报告位置**: `/Users/milton/投资大师/IntelligenceEngine_v10/reports/`

---

## 📊 快速查看结果

### 查看最新竞品信号

```bash
ls -lt reports/competitor_signal_*.txt | head -1 | awk '{print $NF}' | xargs cat
```

### 查看最新财报预测

```bash
ls -lt reports/earnings_prediction_*.txt | head -1 | awk '{print $NF}' | xargs cat
```

---

## 🔧 常见问题

### Q: 提示"No module named 'pandas'"

**A**: 运行步骤1安装依赖：
```bash
pip3 install pandas numpy scikit-learn scipy yfinance requests schedule --user
```

### Q: 提示"XGBoost Library could not be loaded"

**A**: 系统已自动使用Random Forest替代XGBoost，无需额外操作。

### Q: 如何更新竞品数据？

**A**: 编辑`engines/competitor_tracker.py`的数据字典（第107、137行）

### Q: 如何更新市场共识？

**A**: 编辑`engines/earnings_predictor.py`的`market_consensus`字典

---

## 📚 详细文档

- **完整文档**: `README_COMPETITOR_PREDICTOR.md`（20,000字）
- **快速开始**: `QUICKSTART.md`
- **交付总结**: `ENGINE5_6_DELIVERY_SUMMARY.md`

---

## ✅ 验证清单

运行以下命令，确保所有功能正常：

```bash
# 1. 测试Engine 5
python3 -c "from engines.competitor_tracker import CompetitorTracker; print('✓ Engine 5 OK')"

# 2. 测试Engine 6
python3 -c "from engines.earnings_predictor import EarningsPredictorEngine; print('✓ Engine 6 OK')"

# 3. 测试ML模型
python3 -c "from engines.ml_model_simple import EarningsPredictor; print('✓ ML Model OK')"

# 4. 运行完整测试
python3 test_engines_simple.py
```

全部通过即可正常使用！

---

**需要帮助？** 查看完整文档 `README_COMPETITOR_PREDICTOR.md`
