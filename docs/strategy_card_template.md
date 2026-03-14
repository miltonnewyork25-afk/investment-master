# 入场纪律卡模板 v1.0

> **用途**: Phase 5 Complete后生成内部策略参考文档
> **命名**: `{TICKER}_Strategy_Card_INTERNAL.md`
> **存放**: `reports/{TICKER}/`
> **数据来源**: Complete报告 + Moat Data Card v2.0 + 计算补充

---

## 模板结构 (9个模块)

```markdown
# {TICKER} ({公司名}) — 入场纪律卡 v1.0

> ⚠️ 内部文档 — 不对外发布
> 配套报告: `{TICKER}_Complete_v{X}.md`
> 生成日期: {DATE} | 数据截止: {REPORT_DATE}

## 1. 估值快照
- 当前股价 / 概率加权公允价值 / 安全边际价 / 高估触发价
- 期望回报 / 评级
- 估值方法明细表 (方法/结果/权重/加权贡献)
→ 来源: Complete Ch16/Ch29

## 2. 入场纪律
- PE三档框架 (深度价值/合理区间/高估警报)
- 仓位结构 (核心/弹性, 进入条件/退出条件)
- 当前入场判断 (PE位置/vs安全边际/E-Score/结论)
→ 来源: Complete Ch34 + Moat Data Card

## 3. 等待期收益分析
- 收益分解: 股息率 + 回购yield + 盈利增速
- 最坏情景年化 (扣PE压缩)
- vs 国债利差 / vs SPY利差
- 5年路径概率分布 (4条路径×概率×回报×vs SPY)
→ 来源: Complete Ch34 + 计算补充

## 4. 组合角色定位
- CQI / E-Score / Beta / Downside Beta
- COVID回撤 + 2022回撤 + 恢复天数
- 相关性警告 (与哪些已覆盖公司高相关)
- 组合角色标签 (进攻/防守/对冲/现金流)
→ 来源: Moat Data Card v2.0

## 5. Kill Switch速查
- 表格: KS# / 触发条件 / 当前距离 / 紧迫度 / 评级影响
- 协同触发矩阵 (最危险组合)
→ 来源: Complete Ch31

## 6. 催化剂日历 + 验证事件
- 表格: 时间 / 事件 / 影响方向 / 动作触发
- 年度SPY相对表现审计
→ 来源: Complete Ch37

## 7. 温水煮青蛙防御协议
- 4道防线 (PE天花板/ESG监控/回购监控/年度审计)
- 年度审计规则 (跑输阈值→动作)
→ 来源: Complete Ch34

## 8. 隐含赌注清单
- 表格: 赌注 / 置信度 / 验证方法
- 核心赌注联合概率
→ 来源: Complete Ch16

## 9. Moat Data Card v2.0 (机器可读YAML)
- 含v3.1新字段: c1_embedding_nature / d1_category / c3_lock_in_carrier
- 含入场纪律字段: safety_price / fair_value / pe_ranges
- 含等待期收益字段: holding_return各项
- 含组合角色字段: portfolio_role / correlation_warning
→ 来源: moat_datacard.yaml + 策略数据合并
```

---

## 数据填充指南

### 必须从Complete报告提取的数据

| 数据 | Complete章节 | Strategy Card模块 |
|------|:----------:|:----------------:|
| 概率加权公允价值 | Ch16/Ch29 | §1 |
| 估值方法明细 | Ch16 | §1 |
| 评级+期望回报 | Ch29.4 | §1 |
| PE三档框架 | Ch34.3 | §2 |
| 仓位结构 | Ch34.2 | §2 |
| 5年路径概率 | Ch34.9 | §3 |
| Kill Switch全表 | Ch31 | §5 |
| 催化剂日历 | Ch37 | §6 |
| 温水煮青蛙防御 | Ch34.5 | §7 |
| 隐含赌注 | Ch16.5 | §8 |

### 需要计算补充的数据

| 数据 | 计算方法 | 工具 |
|------|---------|------|
| 安全边际价 | 公允价值 × (1 - CQI折扣率) | CQI≥70→15%, 50-69→20%, 30-49→30% |
| 等待期总回报 | 股息率 + 回购yield + 盈利增速 | 从Complete财务数据 |
| 最坏年化 | 等待期收益 - PE压缩(5年摊销) | PE从当前→深度价值PE |
| vs国债利差 | 最坏年化 - 当前10Y Treasury | 当前~4.5% |
| vs SPY利差 | 期望年化 - SPY历史10% | 固定基准 |
| 组合相关性 | 与已覆盖公司的行业/beta相似度 | 定性判断 |

### 自动填充的数据 (Moat Data Card v2.0)

| 数据 | 来源 |
|------|------|
| E-Score | trading_datacard.py |
| Drawdown DNA | trading_datacard.py |
| Downside Beta | trading_datacard.py |
| 流动性 | trading_datacard.py |
| CQI / 护城河趋势 | Complete报告 |

---

## 质量标准

Strategy Card必须满足:
1. **完整性**: 9个模块全部填写, 无空白
2. **一致性**: 所有数值与Complete报告和Moat Data Card一致
3. **可执行性**: 每个入场/退出条件都基于公开可观测数据
4. **诚实性**: 期望回报 vs SPY的比较必须诚实(如MSCI期望7.6% < SPY 10%)

---

## 版本记录

| 版本 | 日期 | 变化 |
|------|------|------|
| v1.0 | 2026-03-14 | 首版: MSCI Strategy Card为第一个实例 |
