# CME v3.0 Scout规划
> 2026-03-18 | v2.0失败后重启 | 本文件回答5个前置问题

---

## 一、质量标准：借鉴谁？

### 主参考报告

| 报告 | 评分 | 字符 | 章均字符 | DM密度 | 因果密度 | 借鉴什么 |
|------|------|------|---------|--------|---------|---------|
| **KLAC** | **4.5** | 254K | **9.4K** | 2.80 | **9.28/万字** | 章均深度标杆+因果链标杆+零填充 |
| **MCO v2.0** | ~4.0 | 295K | 10.5K | 2.66 | ~6.5 | **同行业金融基础设施+建仓时机框架+铁律K** |
| **IHG** | 4.3 | 315K | 11.7K | 3.02 | — | CI框架+A-Score评估+模块化结构 |
| **ETN** | 4.3 | 331K | 12.7K | — | — | 产业链纵深+身份溢价量化 |

### v3.0硬指标

| 指标 | 门控值 | 标杆值(KLAC) | v2.0失败值 |
|------|--------|-------------|-----------|
| **总字符** | **≥270K** | 254K | 66K ❌ |
| **章均字符** | **≥8K** | 9.4K | 2.5K ❌ |
| **DM密度** | ≥0.8/千字 | 2.80 | 4.29 ✓ |
| **DM总数** | ≥300 | 713 | 285 ❌ |
| **因果密度** | ≥5.0/万字 | 9.28 | 31.8 ✓(但体量不足) |
| **Mermaid** | ≥15 | — | 6 ❌ |
| **章节数** | 25-30 | 28 | 27(但16章空) |

### 逐章硬门控（v2.0失败的系统修复）

```
每章写完 → wc -m → ≥8,000字符?
  → 否: BLOCK, 不准写下一章
  → 是: 检查DM≥5个 + 因果≥3条 → 下一章

每Phase完 → 累计wc -m → ≥Phase目标70%?
  → 否: BLOCK, 不准进入下一Phase
  → 是: commit推进
```

---

## 二、需要用哪些Skill？

### Phase 0（数据预取）
- `/data-prefetch` — 自动调用MCP工具+7个并行WebSearch Agent，缓存15个数据文件

### Phase 0.75（核心矛盾）
- `/assumption-audit` M1信念反演 — Reverse DCF翻译"$313在赌什么"

### Phase 1-2（正文写作）
- `/investment-logic-toolkit` — 因果链构建工具（保证因果密度≥5.0）
- `/competitive-benchmarking` — CME vs ICE vs CBOE vs NDAQ深度对标
- `/consumer-brand-analysis-toolkit` — 不适用CME，跳过

### Phase 3（综合）
- `/investment-committee` — 投资大师圆桌（Buffett/Munger/Marks视角）
- `/risk-topology` — 风险协同/反协同矩阵+温水煮青蛙场景
- `/cq-lifecycle-tracker` — CQ置信度演化追踪

### Phase 4（红队）
- `/red-team-suite` — RT-1~RT-7 + 双向校准 + 有效性门控（独立会话执行）

### Phase 5（组装后）
- `/valuation-quality-gate` — 估值离散度诚实性检查
- `/omission-scanner` — 遗漏扫描（防止SPGI式国际化零覆盖重演）
- `/deep-reflection` — 3步深度反思（R1行业模块+R2审计+R3评分）

### 不使用的Skill（铁律M反膨胀）
- `/content-engine` — 报告阶段不需要
- `/scout-user-input` — 非内容创作
- `/brainstorming` — Phase 0.75 thesis_crystallization替代

---

## 三、借鉴哪些已有数据和分析框架？

### 可直接复用的v1.0/v2.0数据（不需要重新获取）

| 数据文件 | 位置 | 内容 | 复用方式 |
|---------|------|------|---------|
| quality_scorecard.md | data/ | A-Score 68.4/70评分卡(21维度) | **直接复用**，v3.0只需更新市场数据 |
| sec_10k_extracts.md | research/ | FY2025 10-K关键摘录(21.7K) | **直接复用** |
| investment_income_collateral.md | research/ | 保证金利息5年趋势+利率敏感性 | **直接复用** |
| segment_revenue_rpc.md | research/ | 6资产类别ADV+RPC 5年趋势 | **直接复用** |
| counter_cyclicality_evidence.md | research/ | D1反脆弱4次危机数据 | **直接复用** |
| v2_financial_update.md | research/ | FY2025全年+Q1-Q4+竞对对比 | **直接复用** |
| v2_crypto_analysis.md | research/ | 加密ADV 280K/7资产/24-7交易 | **直接复用** |
| v2_cboe_comparison.md | research/ | CBOE vs CME 5Y回报分解 | **直接复用** |
| v2_latest_update.md | research/ | Q1 2026加速+FMX+Treasury Clearing | **直接复用** |
| thesis_crystallization.md | data/ | 9异常+5矛盾+5假说 | **直接复用作为outline** |
| cq_routing.md | data/ | PW=6混合模式+5个CQ | **直接复用** |
| moat_datacard.yaml | data/ | 护城河数据卡 | 需更新 |

### 可复用的v2.0骨架（作为outline，非扩写）

v2.0的66K骨架包含285个DM锚点和完整因果链。v3.0写作时：
- **读骨架确认每章要覆盖的论点清单**
- **从头重写每章到≥8K**（不是在2.5K上补6K）
- **保留DM编号体系**（DM-BIZ-001等），重写内容

### 需要参考的分析框架

| 框架 | 来源 | 用于 |
|------|------|------|
| 六种犯错模式 | MCO v2.0 Ch22 | Ch22-24建仓时机(CME适配) |
| 五区间买入/卖出 | MCO v2.0 Ch23 | PE Band三档入场 |
| Core P/E剥离法 | CME v1.0 CI-04 | 剥离利息后真实估值 |
| 影子银行利息留存 | CME v1.0 CI-01 | NCH-1验证 |
| D1反脆弱推导 | CME v1.0 Ch9 | 1.18系数+入场PE决定保护效力 |
| B2B平台模块 | b2b_platform_deep.md | M1-M10+E1-E8逐模块评估 |
| I×L框架 | docs/company_quality_scoring.md | CME I=25/L=24(最高分) |
| 铁律K估值统一性 | MCO v2.0教训 | 全文6种估值方向一致 |

---

## 四、需要从外部获取哪些信息？

### 已有（v2.0 Agent已获取，存在research/目录）
- ✅ FY2025全年财务 (FMP MCP)
- ✅ Q1-Q4 2025季度数据
- ✅ 竞对数据 (ICE/CBOE/NDAQ FY2025)
- ✅ 加密货币ADV/产品/监管
- ✅ CBOE vs CME股价分化
- ✅ FMX关税期崩溃数据
- ✅ Q1 2026 ADV加速(Jan 29.6M/Feb 37.6M)
- ✅ Treasury Clearing进展

### 需要新获取（v2.0未覆盖的缺口）

| 数据 | 获取方式 | 用于哪章 | 优先级 |
|------|---------|---------|--------|
| **OI/ADV比率5年趋势(SOFR/E-mini/WTI)** | WebSearch + CME OI报告 | Ch9 OI质量 | **S1** |
| **HHI计算(衍生品交易所市场)** | FIA年报+各交易所数据 | Ch4竞争 | S1 |
| **国际收入口径(vs ADV口径)** | CME 10-K地理分部 | Ch11国际化 | S1 |
| **R&D/Rev趋势** | CME 10-K费用分项 | Ch8技术/M8 | S2 |
| **法律费用/合规成本** | CME 10-K法律费用/SGA | Ch10 CEO沉默/M10 | S2 |
| **NEX/BrokerTec整合进度** | CME IR + earnings call | Ch5清算/E4 | S2 |
| **会员集中度(Top 5清算会员)** | CME PFMI披露 | Ch12会员/M6 | S1 |
| **Python DCF模型** | 自行构建+验证 | Ch19 DCF | S1 |
| **Q2 2026 ADV数据** | CME月度报告(如已发布) | NCH-4验证 | S2 |

---

## 五、Phase硬门控（不达标不进入下一阶段）

| Phase | 产出 | 硬门控 | 校验方法 |
|-------|------|--------|---------|
| **-1** | knowledge_context.md | ≥500字符 | `wc -m` |
| **-0.5** | lit_recon_memo.md | ≥1,500字符 + 覆盖v2.0缺口数据 | `wc -m` + 目视 |
| **0** | research/目录≥15个文件 | 含OI/HHI/国际收入/R&D新数据 | `ls research/` |
| **0.5** | cq_routing.md | PW评分+≥5个CQ | 目视 |
| **0.75** | thesis_crystallization.md | ≥2,000字符 + ≥3 NCH | `wc -m` |
| **1** | staging/ Part I+II+III | **≥80K字符** + 每章≥8K + DM≥0.8/千字 | `wc -m每章` |
| **2** | staging/ Part IV+V | **≥60K字符** + 每章≥8K + Python DCF已运行 | `wc -m每章` |
| **3** | staging/ Part VI+VII+VIII | **≥50K字符** + 每章≥8K + 圆桌已执行 | `wc -m每章` |
| **4** | staging/ RedTeam | **独立会话** + ≥5偏差 + EV调整≠0 | 有效性门控 |
| **5** | Complete | **≥270K** + DM≥300 + Mermaid≥15 + 铁律K通过 | pre-commit hook |

### Phase 1逐章门控示例

| 章节 | 最低字符 | 必含内容 | 门控 |
|------|---------|---------|------|
| Ch1 公司身份 | ≥8K | 三次跃迁+影子银行+FY2025数据 | `wc -m ≥8000` |
| Ch2 基准合约 | ≥8K | 六引擎各≥1K+加密≥2K | `wc -m ≥8000` |
| Ch3 流动性网络 | ≥8K | 四层结构+跨保证金量化+Eurex案例 | `wc -m ≥8000` |
| Ch4 竞争格局 | ≥10K | CME/ICE/CBOE/FMX各≥2K+CBOE股价分化≥3K | `wc -m ≥10000` |
| Ch5 清算经济学 | ≥8K | 5问5答+ClearingCo估值+Treasury Clearing | `wc -m ≥8000` |
| Ch6 保证金利息 | ≥8K | NCH-1验证+利率敏感性矩阵+ZIRP情景 | `wc -m ≥8000` |
| Ch7 定价权 | ≥6K | RPC 6类趋势+Mix Effect分解+金属ANO-5 | `wc -m ≥6000` |
| Ch8 市场数据 | ≥6K | $803M飞轮+定价权+竞争(Bloomberg/eSpeed) | `wc -m ≥6000` |
| Ch9 OI/ADV | ≥6K | OI/ADV比率5年+客户构成+KS-13 | `wc -m ≥6000` |
| Ch10 CEO沉默 | ≥6K | 5沉默域+假说量化+行动项 | `wc -m ≥6000` |
| Ch11 国际化 | ≥6K | 收入vs ADV口径+OPM+天花板 | `wc -m ≥6000` |
| Ch12 会员集中度 | ≥6K | M6替代框架+Top 5量化+互锁论证 | `wc -m ≥6000` |
| **Phase 1合计** | **≥86K** | | |

---

## 六、执行时间表

| 会话 | Phase | 预计产出 | 核心任务 |
|------|-------|---------|---------|
| **会话1** | 0 | 数据预取 | `/data-prefetch` + S1缺口数据获取(OI/HHI/国际收入) |
| **会话2** | 0.75→1前半 | Ch1-6 | thesis_crystallization + Ch1-6连续写(每章≥8K) |
| **会话3** | 1后半 | Ch7-12 | Ch7-12连续写 + Phase 1累计校验≥86K |
| **会话4** | 2 | Ch13-20 | 护城河+估值+Python DCF + 累计校验≥60K |
| **会话5** | 3 | Ch21-28 | 红队(Ch21)+建仓时机(Ch22-25)+结论(Ch26-28) |
| **会话6** | 4 | 独立红队 | `/red-team-suite` 独立会话 + ≥5偏差 |
| **会话7** | 5 | Complete组装 | 读Phase产出→组装→铁律K→DM审计→≥270K |

---

## 七、v2.0失败防线

| 失败模式 | v2.0发生了什么 | v3.0如何防止 |
|---------|--------------|-------------|
| 章均字符不足 | 2.5K/章(目标8K) | **逐章wc -m硬门控** |
| 密度掩盖体量 | 因果31.8/万字但66K总量 | **双门控：密度AND体量** |
| Phase间无校验 | 3次机会错过 | **Phase完成前累计校验** |
| Phase 4非独立 | 嵌入Phase 3(表演性) | **独立会话+EV调整≠0** |
| 骨架扩写 | 没发生但差点 | **v3.0从头写非扩写** |
