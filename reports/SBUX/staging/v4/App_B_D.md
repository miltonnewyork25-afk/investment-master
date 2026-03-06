# 附录

---

# Appendix B: 数据源与方法论

## B.1 数据源分层

本报告使用三层数据源体系，按可靠性降序排列:

### 第一层: 直接数据 (最高可信度)

| 来源 | 数据类型 | 锚点前缀 | 文件数 |
|------|---------|---------|:------:|
| MCP fmp_data | 财务报表(IS/BS/CF)、估值比率、共识估计 | DM-FIN/BAL/CF/VAL/EST | 1 |
| MCP analyze_stock | 实时股价、技术指标、基本面快照 | DM-MKT | 1 |
| MCP compare_stocks | 同行对比数据 | DM-PEER | 1 |
| SEC EDGAR | 10-K/10-Q/8-K/Proxy | — | 引用 |

### 第二层: 聚合数据 (中等可信度)

| 来源 | 数据类型 | Agent | 锚点前缀 |
|------|---------|-------|---------|
| WebSearch Agent-A | 分析师共识评级、目标价 | Agent-A | DM-CON |
| WebSearch Agent-C | 新闻、催化剂、内部交易 | Agent-C | DM-NEW |
| WebSearch Agent-D | 业务概况、竞争格局 | Agent-D | DM-BIZ |
| WebSearch Agent-E | 管理层团队、治理 | Agent-E | DM-MGT |
| WebSearch Agent-F | 13F机构持仓、Smart Money | Agent-F | DM-SMT |

### 第三层: 推断数据 (需验证)

| 来源 | 数据类型 | 锚点前缀 | 验证方式 |
|------|---------|---------|---------|
| 预测市场 (Polymarket/Kalshi) | 宏观概率 | DM-PMK | 多平台交叉 |
| 分析师推导 | CAGR、隐含假设 | DM-INF | 公式可复现 |
| 定性判断 | 护城河评估、管理层评分 | DM-SUB | 多维度交叉 |

## B.2 估值方法论

### 逆向DCF (Ch16)
- **目的**: 翻译"市场在赌什么"
- **参数**: WACC 9.5% (含稳健性溢价60bps), 终端增长率2.5%, 显式预测期5年
- **EV推导**: 市值$110B + 净债务$23.15B(口径2) = EV $133B

### Forward DCF四情景 (Ch18)
- **S1(牛市)**: Niccol完美执行, OPM 15%+, FY2030E EPS $4.5+
- **S2(基准)**: 部分成功, OPM 13-14%, FY2030E EPS $3.0-3.5
- **S3(熊市)**: 转型失败, OPM 10-11%, FY2030E EPS $2.0-2.3
- **S4(极端)**: 被迫行动, OPM <9%, 分红削减
- **概率权重**: S1:20% / S2:40% / S3:30% / S4:10%
- **FCFF计算**: EBIT × (1-Tax) + D&A - CapEx - ΔWC
- **终端价值**: 双重验证(永续增长法 + 退出倍数法)

### A-Score v2.0 (Ch17)
- 10维度 × 0-10分: 品牌/渠道/管理层/资本配置/创新/规模/定价权/生态/数字化/文化
- 加权方式: 等权(各10%)
- SBUX综合: 6.33/10

### CSSPD v3.0 (Ch14)
- 五维度: Price/Volume/Mix/Channel/Region
- 逐季分解: FY2024 Q1 至 Q1 FY2026 (9个季度)
- 纯度评分: 5.1-5.3/10

### 稳健比率Nomad框架 (Ch15)
- 六维度: 流动性/债务安全/分红可持续/经营弹性/战略储备/宏观韧性
- 加权方式: 差异化权重(分红25%, 债务20%, 其余各15%/10%)
- SBUX综合: 4.53/10

## B.3 净债务三口径定义 (Ch12)

| 口径 | 公式 | FY2025值 | 适用场景 |
|------|------|---------|---------|
| 口径1(金融) | LTD + STD - Cash | $12.6B | 债券投资者、信用评级 |
| 口径2(含租赁) | 口径1 + Capital Leases | $23.1B | v4.0默认、EV计算 |
| 口径3(含递延) | 口径2 + Deferred Revenue | $30.7B | 保守估值、压力测试 |

## B.4 数据新鲜度

| 数据类型 | 最后更新 | 状态 |
|---------|---------|:----:|
| FMP财务数据 | 2026-03-06 | 新鲜 |
| 股价/技术指标 | 2026-03-05收盘 | 新鲜 |
| 分析师共识 | 2026-03-06 | 新鲜 |
| 预测市场 | 2026-03-06 | 新鲜 |
| 13F持仓 | 2025 Q3/Q4 | 中等 |
| 期权/做空 | 2025年中 | 陈旧(已标注) |

---

# Appendix C: Python估值模型代码

> 注: 完整DCF模型代码见 `reports/SBUX/data/sbux_dcf_model.py`。以下为核心逻辑摘要。

```python
# SBUX v4.0 DCF核心参数
DCF_PARAMS = {
    "ticker": "SBUX",
    "base_year": "FY2025",
    "base_revenue": 37.18e9,        # DM-FIN-001
    "base_opm": 0.0963,              # DM-FIN-004
    "base_eps": 1.63,                # DM-FIN-002
    "shares_diluted": 1.114e9,
    "net_debt_adj": 23.15e9,         # 口径2 DM-BAL-004
    "wacc": 0.095,                   # 含稳健性溢价
    "terminal_growth": 0.025,
    "tax_rate_normalized": 0.245,    # FY2025异常41.1%→正常化
    "beta": 0.928,                   # DM-MKT-004
    "risk_free": 0.043,
    "erp": 0.055,
}

# 四情景定义
SCENARIOS = {
    "S1_bull": {
        "prob": 0.20,
        "rev_cagr": 0.07,
        "terminal_opm": 0.155,
        "terminal_pe": 30,
        "label": "Niccol完美执行"
    },
    "S2_base": {
        "prob": 0.40,
        "rev_cagr": 0.05,
        "terminal_opm": 0.135,
        "terminal_pe": 25,
        "label": "部分成功"
    },
    "S3_bear": {
        "prob": 0.30,
        "rev_cagr": 0.03,
        "terminal_opm": 0.105,
        "terminal_pe": 20,
        "label": "转型失败"
    },
    "S4_extreme": {
        "prob": 0.10,
        "rev_cagr": 0.01,
        "terminal_opm": 0.085,
        "terminal_pe": 16,
        "label": "被迫行动"
    }
}

def calculate_fcff(revenue, opm, tax_rate, da_pct=0.07, capex_pct=0.062, dwc_pct=0.005):
    """计算Free Cash Flow to Firm"""
    ebit = revenue * opm
    nopat = ebit * (1 - tax_rate)
    da = revenue * da_pct
    capex = revenue * capex_pct
    dwc = revenue * dwc_pct
    return nopat + da - capex - dwc

def dcf_valuation(params, scenario):
    """单情景DCF估值"""
    revenues = []
    fcffs = []
    rev = params["base_revenue"]

    for year in range(1, 6):  # 5年显式预测
        rev *= (1 + scenario["rev_cagr"])
        # OPM线性恢复
        opm = params["base_opm"] + (scenario["terminal_opm"] - params["base_opm"]) * (year / 5)
        fcff = calculate_fcff(rev, opm, params["tax_rate_normalized"])
        revenues.append(rev)
        fcffs.append(fcff)

    # 终端价值 (永续增长法)
    terminal_fcff = fcffs[-1] * (1 + params["terminal_growth"])
    terminal_value = terminal_fcff / (params["wacc"] - params["terminal_growth"])

    # 折现
    pv_fcff = sum(f / (1 + params["wacc"])**i for i, f in enumerate(fcffs, 1))
    pv_terminal = terminal_value / (1 + params["wacc"])**5

    ev = pv_fcff + pv_terminal
    equity_value = ev - params["net_debt_adj"]
    per_share = equity_value / params["shares_diluted"]

    return {
        "ev": ev,
        "equity_value": equity_value,
        "per_share": per_share,
        "terminal_opm": scenario["terminal_opm"],
        "terminal_pe_check": equity_value / (revenues[-1] * scenario["terminal_opm"] * (1 - params["tax_rate_normalized"]) / params["shares_diluted"]) if revenues[-1] * scenario["terminal_opm"] > 0 else float('inf')
    }

# 概率加权EV计算
def probability_weighted_ev():
    results = {}
    weighted_price = 0
    for name, scenario in SCENARIOS.items():
        result = dcf_valuation(DCF_PARAMS, scenario)
        results[name] = result
        weighted_price += result["per_share"] * scenario["prob"]
    return results, weighted_price
```

---

# Appendix D: Mermaid图索引

## D.1 图索引表

| 编号 | 章节 | 图名 | 类型 |
|:----:|:----:|------|------|
| M-01 | Ch01 | 投资论点思维导图 | mindmap |
| M-02 | Ch02 | 三身份价值链 | flowchart |
| M-03 | Ch02 | 身份张力矩阵 | quadrant |
| M-04 | Ch03 | 单店P&L瀑布 | bar |
| M-05 | Ch03 | 吞吐约束三角 | triangle |
| M-06 | Ch03 | 坪效分解 | bar |
| M-07 | Ch04 | 飞轮六齿轮 | flowchart |
| M-08 | Ch04 | 因果性框架 | flowchart |
| M-09 | Ch05 | 品牌弹性半径四圈 | pie |
| M-10 | Ch05 | 护城河评分雷达 | radar |
| M-11 | Ch06 | 八品牌矩阵(中国) | quadrant |
| M-12 | Ch06 | 全球门店版图 | pie |
| M-13 | Ch07 | CEO评分卡雷达 | radar |
| M-14 | Ch07 | CMG vs SBUX对比 | bar |
| M-15 | Ch07 | 沉默域风险矩阵 | quadrant |
| M-16 | Ch08 | W×C四象限 | quadrant |
| M-17 | Ch09 | CMS雷达 | radar |
| M-18 | Ch09 | BER饼图 | pie |
| M-19 | Ch10 | 门店Sankey | sankey |
| M-20 | Ch10 | 特许化路径 + BME映射 | flowchart |
| M-21 | Ch11 | OPM崩溃瀑布 | bar |
| M-22 | Ch11 | OPM恢复路径 | line |
| M-23 | Ch12 | 分红决策树 | flowchart |
| M-24 | Ch12 | 三口径对比 | bar |
| M-25 | Ch13 | 资金流Sankey | sankey |
| M-26 | Ch13 | 分红覆盖决策树 | flowchart |
| M-27 | Ch13 | 资本配置评分 | bar |
| M-28 | Ch14 | Price vs Volume时序 | line |
| M-29 | Ch14 | CSSPD五维雷达 | radar |
| M-30 | Ch14 | 同业纯度对比 | bar |
| M-31 | Ch14 | 纯度→估值映射 | scatter |
| M-32 | Ch15 | 稳健性雷达图 | radar |
| M-33 | Ch16 | 隐含假设流程 | flowchart |
| M-34 | Ch16 | 估值象限定位 | quadrant |
| M-35 | Ch17 | 三公司A-Score对比 | radar |
| M-36 | Ch18 | 情景瀑布 | bar |
| M-37 | Ch18 | 敏感性热力图 | heatmap |
| M-38 | Ch18 | 概率分布 | bar |
| M-39 | Ch19 | BME路径决策树 | flowchart |
| M-40 | Ch19 | 联合概率矩阵 | table |
| M-41 | Ch20 | 温度计可视化 | gauge |
| M-42 | Ch20 | 催化剂时间线 | timeline |
| M-43 | Ch20 | 条件评级矩阵 | quadrant |
| M-44 | Ch21 | 红队裁决瀑布 | bar |
| M-45 | Ch22 | 偏差扫描前后对比 | bar |
| M-46 | Ch23 | 大师立场矩阵 | quadrant |
| M-47 | Ch23 | 投票结果 | pie |
| M-48 | Ch24 | CQ置信度演化 | line |
| M-49 | Ch24 | KS依赖网络 | flowchart |

> **总计**: 49+ Mermaid图 (目标60, Phase 4完成后更新)

## D.2 图类型分布

| 类型 | 数量 | 占比 |
|------|:----:|:----:|
| flowchart | 12 | 24% |
| bar/waterfall | 10 | 20% |
| radar | 7 | 14% |
| quadrant | 6 | 12% |
| pie | 4 | 8% |
| sankey | 3 | 6% |
| line/timeline | 4 | 8% |
| table/heatmap | 3 | 6% |

---

*附录完*
