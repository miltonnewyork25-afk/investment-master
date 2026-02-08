# 金融行业分析增强标准

> 仅在分析金融公司时加载。

---

## 行业系数

- Deep-Dive系数: ×1.4 | 目标字数: ≥112,000
- Standard系数: ×1.2 | 目标字数: ~48,000

## 公司映射

JPM, GS, BAC, WFC, V, MA, BRK → 金融worktree

### 子行业分类
- 银行: JPM, BAC, WFC, C
- 投行/券商: GS, MS
- 保险: BRK, AIG, MET
- 支付: V, MA, PYPL
- Fintech: SQ, SOFI, COIN

## 关键分析维度

### 风险建模
- 信用风险+市场风险+操作风险+流动性风险
- 压力测试情景分析
- 资本充足率评估

### 监管环境
- 全球监管矩阵（美国/欧洲/中国）
- 监管变化概率追踪
- 合规成本影响

### 子行业技能模块调用

```yaml
银行:
  - 资本充足率分析
  - 信用风险评估
  - 净息差趋势分析

保险:
  - 内含价值评估
  - 承保利润+偿付能力分析

Fintech:
  - 单位经济模型
  - 监管科技适配评估
```

### 预测市场关键事件
```yaml
搜索模板:
  - "site:polymarket.com federal reserve rate"
  - "site:polymarket.com bank regulation"
  - "site:kalshi.com interest rate"
  - "site:kalshi.com recession probability"
```

### Kill Switch补充
- 银行挤兑概率 > 20% → 立即清仓
- 监管重创概率 > 40% → 立即清仓
- 信贷损失概率 > 30% → 减仓50%
- 利率冲击概率 > 35% → 减仓50%
