# 附录A: DM锚点注册表

> **报告**: Chipotle Mexican Grill (CMG) Tier 3 深度研究
> **生成日期**: 2026-03-04
> **框架版本**: v18.0

---

## A.1 总览

| 指标 | 值 |
|------|:--:|
| **DM锚点总数** | **659** |
| Phase 0 (数据预取) | 85 |
| Phase 1 (定性深潜) | 206 |
| Phase 2 (财务分析) | 173 |
| Phase 3 (估值综合) | 88 |
| Phase 4 (红队校准) | 74 |
| Phase 5 (综合监控) | 33 |

### 信度分布

| 信度 | 含义 | 数量(估) | 占比 |
|:----:|------|:--------:|:----:|
| **H** | 硬数据(FMP/SEC/IR) | ~248 | 38% |
| **C** | 计算推导值 | ~215 | 33% |
| **M** | 中等可信(多源推算) | ~98 | 15% |
| **S** | 软数据(定性判断) | ~28 | 4% |
| **L** | 低可信(单源/估算) | ~22 | 3% |
| 未标注 | 内嵌式锚点(Ch07/08/12/20等) | ~48 | 7% |

**密度**: 659 DM / ~278K字符 = **2.37 DM/千字符** (消费品系列: IHG 2.19, SBUX 2.06, RCL 1.89)

---

## A.2 Phase 0: 数据预取 (85 DM)

**来源**: `data/shared_context.md` | **信度**: H=75(88%), M=5(6%), C=2(2%), S=1(1%), L=1(1%), 未标注=1

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P0-A01 | 股价 $36.93 | FMP Quote | H |
| DM-P0-A02 | 市值 $49.5B | FMP Quote | H |
| DM-P0-A03 | 稀释股数 1.343B | FMP Income | H |
| DM-P0-A04 | 52周高/低 $36.11/$69.26 | FMP Quote | H |
| DM-P0-A05 | P/E 32.19x (5年低) | FMP Ratios | H |
| DM-P0-A06 | EV/EBITDA 24.93x | FMP Ratios | H |
| DM-P0-A07~A15 | 利润表5年趋势 | FMP Income | H |
| DM-P0-A16 | FY2025收入 $11.93B | FMP Income | H |
| DM-P0-A17 | 收入增长 +14.6% | FMP Income | H |
| DM-P0-A18 | OPM 16.8% | FMP Income | H |
| DM-P0-A19 | 净利率 12.9% | FMP Income | H |
| DM-P0-A20 | EPS $1.15 | FMP Income | H |
| DM-P0-A21 | SBC $120M | FMP Income | H |
| DM-P0-A22 | FY2025 Comp -1.7% | IR Press Release | H |
| DM-P0-A23 | 加权股数 1.334B | FMP Income | H |
| DM-P0-A24 | 季度OPM趋势 Q1-Q4 | FMP Quarterly | H |
| DM-P0-A25 | FY2026指引 comp ~flat | Earnings Call | M |
| DM-P0-A26~A31 | 资产负债表关键项 | FMP Balance | H |
| DM-P0-A27 | 零金融负债 | FMP Balance | H |
| DM-P0-A28 | 总负债 $6.16B(含租赁) | FMP Balance | H |
| DM-P0-A29 | 股东权益 $2.83B | FMP Balance | H |
| DM-P0-A30 | 总资产 $8.99B | FMP Balance | H |
| DM-P0-A31 | 净现金 $1.05B | FMP Balance | H |
| DM-P0-A32 | OCF $2.11B | FMP CashFlow | H |
| DM-P0-A33 | CapEx $667M | FMP CashFlow | H |
| DM-P0-A34 | FCF $1.45B | FMP CashFlow | H |
| DM-P0-A35 | 回购 $2.43B | FMP CashFlow | H |
| DM-P0-A36 | ROE 54.3% | FMP Key Metrics | H |
| DM-P0-A37 | ROIC 18.9% | FMP Key Metrics | H |
| DM-P0-A38 | ROCE 22.5% | FMP Key Metrics | H |
| DM-P0-A39 | 资产周转 1.33x | FMP Key Metrics | H |
| DM-P0-A40 | CCC +1.1天 | FMP Key Metrics | H |
| DM-P0-A41 | SGA/Rev 5.5% | FMP Key Metrics | H |
| DM-P0-A42 | 历史P/E区间 29-75x | FMP Ratios | H |
| DM-P0-A43 | DCF估值 $71.73 | FMP DCF | M |
| DM-P0-A44 | 分析师评级 3.98/5 | FMP Rating | M |
| DM-P0-A45~A53 | 9同业可比数据 | FMP多公司 | H |
| DM-P0-A54~A56 | 共识预估 FY2026-28E | FMP Estimates | M |
| DM-P0-A57 | 首次全年负comp(2016来) | IR/历史 | H |
| DM-P0-A58 | 客流 -2.9% | IR Press Release | H |
| DM-P0-A59 | FY2026指引 comp约flat | Earnings Call | M |
| DM-P0-A60 | FY2026新店指引 350-370家 | Earnings Call | H |
| DM-P0-A61~A62 | 宏观指标 | FMP/Baggers | H |
| DM-P0-A63 | HEEP 350店→2,000店计划 | Earnings Call | H |
| DM-P0-A64 | HEEP comp增量"数百bps" | 管理层声明 | S |
| DM-P0-A65~A70 | 关税/成本/竞争数据 | WebSearch | M/H |
| DM-P0-A66 | 牛油果关税+60bps | WebSearch | H |
| DM-P0-A71~A79 | 技术指标 | FMP Technical | H |
| DM-P0-A75 | RSI 43.05 | FMP Technical | H |
| DM-P0-A80 | 内部人Q1'26买卖比1.31x | FMP Insider | H |
| DM-P0-A81~A85 | Polymarket/宏观 | Polymarket/Baggers | H/C |

---

## A.3 Phase 1: 定性深潜 (206 DM)

### Ch02 行业格局 (14 DM: A01-A14)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P1-A01 | 美国快休闲TAM ~$48.5B | IBISWorld/Technomic | M |
| DM-P1-A02 | CMG品类份额 ~24.6% | Technomic推算 | M |
| DM-P1-A03 | CMG均价 $10.31 | SEC 10-K | H |
| DM-P1-A04 | QSR攻击: 8.1%增速 | Euromonitor | M |
| DM-P1-A05 | 数字化渗透 36.7% | IR Press Release | H |
| DM-P1-A06 | 行业集中度CR5 ~35% | 推算 | M |
| DM-P1-A07~A14 | 行业趋势/竞争格局数据 | 多源 | H/M/C |

### Ch03 商业模式 (27 DM: B01-B27)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P1-B01 | 100%直营模式 | SEC 10-K | H |
| DM-P1-B02 | 新店成本 ~$1.5-1.8M | 10-K/IR | H |
| DM-P1-B03 | 餐厅层面利润率 25.4% | IR Press Release | H |
| DM-P1-B04 | 劳动力成本 ~25.2% | 10-K推算 | M |
| DM-P1-B05 | Chipotlane >1,000店 | Earnings Call | H |
| DM-P1-B06 | Rewards会员 21M+ | IR | H |
| DM-P1-B07~B27 | 运营模型/成本结构/数字化 | 多源 | H/M/S |

### Ch04 HEEP深潜 (32 DM: C01-C32)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P1-C01 | 鸡肉烹饪时间 -75% | Earnings Call | H |
| DM-P1-C02 | HEEP comp增量"数百bps" | 管理层声明 | S |
| DM-P1-C03 | 选择偏差修正: 150-200bps | 分析推导 | C |
| DM-P1-C04 | 劳动力节省 $68.3M/yr全覆盖 | 计算 | C |
| DM-P1-C05~C32 | 设备详情/试点数据/ROI | 多源 | H/M/S/L |

### Ch05 Niccol/Boatwright (62 DM: D01-D62)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P1-D01 | Niccol CEO评分 8.4/10 | A-Score框架 | C |
| DM-P1-D02 | Boatwright CEO评分 6.1/10 | A-Score框架 | C |
| DM-P1-D03 | P/E折价 ~16点 | FMP历史P/E | H |
| DM-P1-D04 | Niccol离任日CMG -7.5% | 市场数据 | H |
| DM-P1-D05 | 同日SBUX +24.5% | 市场数据 | H |
| DM-P1-D06~D62 | 管理层评估/薪酬/过渡期/Taco Bell对标 | 多源 | H/M |

### Ch06 品牌量化 (20 DM: E01-E20)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P1-E01 | 品牌力评分 6.7/10 | 多维评估 | C |
| DM-P1-E02 | BRR品牌风险率 13.6%/yr | 计算 | C |
| DM-P1-E03 | ACSI满意度 77/100 | ACSI官方 | H |
| DM-P1-E04 | 累计提价 ~20% | 10-K/IR | M |
| DM-P1-E05~E20 | NPS/定价弹性/品牌溢价分解 | 多源 | H/M/C |

### Ch07 国际扩张 (33 DM: F01-F33)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P1-F01 | 国际门店 ~112家(2.8%) | 10-K/IR | H |
| DM-P1-F02 | 国际化极端滞后(同业对比) | 多公司数据 | H |
| DM-P1-F03 | 欧洲扩张15年仅~20店 | 10-K历史 | H |
| DM-P1-F04 | 3家特许伙伴(Alshaya/Alsea/SPC) | IR/10-K | H |
| DM-P1-F05~F26 | 区域分析/合作伙伴/AUV | 多源 | H/M |
| DM-P1-F27 | 加拿大77店成功案例 | 10-K/IR | H |
| DM-P1-F28~F33 | 期权价值$1.6-2.9B/敏感性 | 计算 | C/M |

### Ch08 CEO沉默分析 (18 DM: G01-G18)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P1-G01 | 6个沉默域识别 | Earnings Call分析 | M |
| DM-P1-G02 | SDI 0.50 (行业0.20-0.35) | 沉默密度计算 | C |
| DM-P1-G03 | 透明度评分 5.8/10 | 多维评估 | C |
| DM-P1-G04~G18 | 各沉默域详情/信号解读 | Earnings Call | M/C |

---

## A.4 Phase 2: 财务分析 (173 DM)

### Ch09 利润表 (32 DM: A01-A32)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P2-A01 | 收入5年CAGR 19.2% | FMP Income | H |
| DM-P2-A02 | 门店增长贡献 vs Comp | 计算 | M |
| DM-P2-A03 | OPM季度趋势恶化 | FMP Quarterly | H |
| DM-P2-A04 | Q4'25 OPM 14.8% | FMP Quarterly | H |
| DM-P2-A05 | EPS增长96%回购/4%有机 | 计算 | M |
| DM-P2-A06 | Q4'25 vs Q4'24 OPM仅+20bps | FMP Quarterly | H |
| DM-P2-A07~A32 | CQ-1判定(55%周期/30%混合/15%结构)/P/E不对称分析 | 多源 | H/M |

### Ch10 资产负债表 (34 DM: B01-B34)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P2-B01 | 总资产 $8.99B | FMP Balance | H |
| DM-P2-B02 | 现金 $351M | FMP Balance | H |
| DM-P2-B07 | PP&E净值 $7.14B | FMP Balance | H |
| DM-P2-B10 | 行业唯一正权益+零债 | FMP多公司 | H |
| DM-P2-B11 | FMP totalDebt $9.85B=全部租赁 | FMP Balance | H |
| DM-P2-B14 | WACC=Ke=9.0% | CAPM计算 | C |
| DM-P2-B19 | 回购6年趋势$0.05B→$2.43B | FMP CashFlow | H |
| DM-P2-B22 | 回购跑道~18个月 | 计算推导 | C |
| DM-P2-B31 | 税盾损失~$420M(~0.85%市值) | 简化模型 | L |
| DM-P2-B32 | 零负债P/E溢价+5-8% | 期权分析 | M |
| DM-P2-B33 | 举债概率3年15-20% | 主观判断 | L |
| DM-P2-B34 | 综合评分7.0/10 | 多维加权 | C |

### Ch11 现金流质量 (37 DM: C01-C37)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P2-C01 | FY2025 OCF YoY +0.4% | FMP CashFlow | H |
| DM-P2-C06 | CMG CapEx/Rev 5.6% | 计算 | C |
| DM-P2-C08 | HEEP CapEx ~$35-75M | 行业推算 | L |
| DM-P2-C13 | 新店Year-1 ROIC ~50-60% | 计算 | M |
| DM-P2-C16 | SBC/FCF 8.3% | 计算 | C |
| DM-P2-C19 | CMG FCF Yield 2.93% | 计算 | C |
| DM-P2-C25 | Q4'25回购均价$34.14 | IR Press Release | H |
| DM-P2-C27 | 5年加权回购成本~$53.2/股 | 计算 | M |
| DM-P2-C30 | 新增回购授权$1.8B(+$1.7B=$3.5B) | IR | H |
| DM-P2-C36 | FY2026 FCF基准$1.37B(-5.5%) | 计算 | M |
| DM-P2-C37 | FY2026最大回购(不举债)~$2.12B | 计算 | C |

### Ch12 效率/ROIC (28 DM: D01-D28)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P2-D01 | 权益乘数3.18x | FMP/计算 | H |
| DM-P2-D02 | 杜邦验证54.3%一致 | 计算 | C |
| DM-P2-D03 | ROE增量89%来自权益乘数 | 杜邦分解 | C |
| DM-P2-D07 | 调整ROE 41.9% | 计算 | C |
| DM-P2-D10 | ROIC(计算)20.6% | 计算 | C |
| DM-P2-D14 | ROIC-WACC spread 9.9pp | 计算 | C |
| DM-P2-D16 | SGA/Rev 5年降250bps至5.5% | FMP | H |
| DM-P2-D17 | CCC恶化至+1.1天 | FMP Key Metrics | H |
| DM-P2-D19 | CapEx/D&A 1.84x扩张型 | 计算 | C |
| DM-P2-D21 | OCF/SBC 17.6x | 计算 | C |
| DM-P2-D23~D28 | ROIC/P/E性价比矩阵(6同业) | FMP多公司 | H |

### Ch13 逆向DCF (19 DM: E01-E19)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P2-E01 | 分析师目标价$35-$53 | WebSearch | M |
| DM-P2-E02 | 共识目标价~$47(27位) | WebSearch | M |
| DM-P2-E03~E06 | 三情景隐含假设矩阵 | 计算 | C |
| DM-P2-E07 | 信念集B1-B7定义 | 综合分析 | C |
| DM-P2-E08 | OPM→价格敏感性 | 计算 | C |
| DM-P2-E10 | 7,000店北美目标 | WebSearch | H |
| DM-P2-E16 | $47逆向P/E表 | 计算 | C |
| DM-P2-E19 | CQ-4双重解读 | 综合分析 | C |

### Ch14 SBUX镜像 (23 DM: F01-F23)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P2-F01 | Niccol个人隐含价值~$200亿 | 计算(SBUX日内) | C |
| DM-P2-F03 | P/E迁移净效应~40点 | 跨公司计算 | C |
| DM-P2-F05 | CMG vs SBUX资本结构全对比 | FMP多维 | H |
| DM-P2-F06 | 估值维度分类(1D vs 3D) | 分析 | C |
| DM-P2-F13 | A-Score七维度交叉对照 | A-Score框架 | C |
| DM-P2-F16 | ROIC-WACC spread对比 | 计算 | C |
| DM-P2-F18 | 价值创造vs杠杆依赖 | 分析 | C |
| DM-P2-F22 | 跨报告一致性审计 | 审计 | C |
| DM-P2-F23 | Ch14核心发现注册表 | 综合 | C |

---

## A.5 Phase 3: 估值综合 (88 DM)

### Ch15 正向DCF (30 DM: A01-A30)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P3-A01 | Python模型全量验算声明 | cmg_dcf_model.py | C |
| DM-P3-A02 | Rf 4.3% | FMP MRP | H |
| DM-P3-A03 | ERP 5.5% | Damodaran/Baggers | H |
| DM-P3-A04 | Beta 1.05 | FMP Profile | H |
| DM-P3-A05 | CMG vs SBUX WACC对比 | 跨报告 | C |
| DM-P3-A06 | 有效税率24.5% | FMP计算 | C |
| DM-P3-A09 | FCF推导交叉验证 | 计算 | C |
| DM-P3-A10 | S1终态OPM 19.0% | HEEP分析 | M |
| DM-P3-A11~A17 | S1-S4情景FCF(Python) | Python模型 | C |
| DM-P3-A18 | 四情景完整输出 | Python DCF | C |
| DM-P3-A19 | PW Price $20.06(-45.7%) | 概率加权 | C |
| DM-P3-A20 | 终值占比 | 计算 | C |
| DM-P3-A21 | 敏感性矩阵(WACC/g) | Python | C |
| DM-P3-A25 | 三种解释权重 | 分析 | C |
| DM-P3-A28 | 跨方法估值汇总 | 综合 | C |
| DM-P3-A29 | 悲观偏差检测触发 | 检测(100%>40%门槛) | C |
| DM-P3-A30 | CQ-4综合解答 | 综合 | C |

### Ch16 可比估值 (28 DM: B01-B28)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P3-B01 | 9公司可比估值全量数据 | FMP Ratios/KM | H |
| DM-P3-B03 | CMG EV/EBITDA 24.9x vs特许17.9x | FMP计算 | C |
| DM-P3-B04 | ROIC/P/E四象限图 | FMP构建 | C |
| DM-P3-B06 | P/E历史序列FY2021-25 | FMP Historical | H |
| DM-P3-B07 | P/E压缩100%由预期驱动 | 归因分析 | C |
| DM-P3-B09 | CEO离任折价8.0x | 残差法 | C |
| DM-P3-B13 | CMG vs CAVA全维度 | FMP Profile | H |
| DM-P3-B18 | CQ-6品类扩张判定70% | 综合 | C |
| DM-P3-B19 | A-Score 6.875/10 | A-Score v2.0 | C |
| DM-P3-B22 | 同业P/E调整法 | 回归+经验 | C |
| DM-P3-B24 | EBITDA $2.37B | FMP Key Metrics | H |
| DM-P3-B27 | 四方法汇总$32.4-$42.1 | 综合 | C |
| DM-P3-B28 | 可比估值与逆向DCF交叉验证 | 综合 | C |

### Ch17 情景综合 (18 DM: C01-C18)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P3-C01 | 方法论权重设定理由 | 综合 | C |
| DM-P3-C05 | PWV $31.33 | 概率加权 | C |
| DM-P3-C07 | 期望回报-15.2%→审慎关注 | 计算 | C |
| DM-P3-C08 | 上行$44(+19%) 概率20% | 情景评估 | C |
| DM-P3-C10 | CQ-1~CQ-8裁决汇总 | 综合 | C |
| DM-P3-C11 | H1概率50%→30% | 假说验证 | C |
| DM-P3-C14 | 三假说期望贡献叠加 | 计算 | C |
| DM-P3-C15 | Phase 3核心估值参数 | 综合 | C |
| DM-P3-C17 | 悲观偏差源-7~-12pp | 识别 | C |
| DM-P3-C18 | 条件评级矩阵 | 综合 | C |

### Ch18 温度计/评级 (12 DM: D01-D12)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P3-D01 | 宏观温度(CAPE 39.66/Buffett 217%) | Baggers | H |
| DM-P3-D04 | SGI评分 | 5维加权 | C |
| DM-P3-D05 | A-Score 6.875/10 | 7维×权重 | C |
| DM-P3-D07 | 多方法加权价格 | 综合 | C |
| DM-P3-D08 | WACC修正后期望回报-10.7% | 计算 | C |
| DM-P3-D09 | 跨报告评级校准 | 4份对比 | C |
| DM-P3-D10 | 置信度60% | 评估 | C |
| DM-P3-D12 | 评级条件矩阵 | 综合 | C |

---

## A.6 Phase 4: 红队校准 (74 DM)

### Ch19 红队七问 (42 DM: A01-A42)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P4-A01 | $47B市值下持续错误假说不合理 | 分析 | C |
| DM-P4-A03 | 正常化Beta 0.85-0.95 | 剔除事件 | C |
| DM-P4-A06 | WACC 7.5%下S2 DCF每股$30.66 | 计算 | C |
| DM-P4-A08 | RT-1裁决: +2.0~3.0pp向上 | 综合 | C |
| DM-P4-A09 | 跨报告悲观偏差: 3份均正向 | 统计 | C |
| DM-P4-A13 | 概率重分配S3 25%→20% | 修正 | C |
| DM-P4-A15 | RT-2裁决: +4.0~5.0pp向上 | 综合 | C |
| DM-P4-A17 | MCD comp恢复先例 | MCD Earnings | M |
| DM-P4-A18 | RT-3裁决: -0.5~1.0pp | 综合 | C |
| DM-P4-A21 | HEEP年化节省$200M(+170bps) | 计算 | C |
| DM-P4-A23 | RT-4裁决: OPM 17%→16.5% | 综合 | C |
| DM-P4-A25 | FY2025回购~0.058-0.064B股 | 计算 | C |
| DM-P4-A28 | RT-5裁决: -1.0~1.5pp | 综合 | C |
| DM-P4-A32 | RT-6裁决: 期权$2.0-3.5B | 综合 | C |
| DM-P4-A35 | CAVA客群重叠度60-70% | 推算 | C |
| DM-P4-A36 | 快休闲份额5%→8%→12-15% | WebSearch | M |
| DM-P4-A37 | RT-7裁决: -0.5~1.0pp | 综合 | C |
| DM-P4-A38 | 七问净效应+3.75pp | 计算 | C |
| DM-P4-A40 | 红队后期望回报-7.0% | 计算 | C |
| DM-P4-A42 | 红队后评级: 中性关注偏审慎 | 综合 | C |

### Ch20 看空案例 (19 DM: B01-B19)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P4-B01 | E.coli危机: OPM 4%/comp -20.4% | CMG历史 | H |
| DM-P4-B02 | Niccol 6年: 收入+120%/市值+500% | CMG历史 | H |
| DM-P4-B06 | 客流-2.9% | IR | H |
| DM-P4-B08 | EPS增长100%回购/0%业务 | 计算 | C |
| DM-P4-B09 | 回购超FCF $0.98B消耗现金 | 计算 | C |
| DM-P4-B12 | HEEP真实增量150-200bps | 偏差修正 | C |
| DM-P4-B14 | 看空PWV $20.06(-45.7%) | 计算 | C |
| DM-P4-B16 | 24月内尾部风险发生概率>80% | 概率叠加 | C |
| DM-P4-B19 | B2翻转: $37→$29 | 信念分析 | C |

### Ch21 评级修订 (13 DM: C01-C13)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P4-C01 | 红队七问校准汇总 | 综合 | C |
| DM-P4-C04 | 红队后概率(S1+3%/S3-3%) | 修正 | C |
| DM-P4-C05 | 最终评级: 中性关注偏审慎, -7.0%, 55% | 综合 | C |
| DM-P4-C07 | CMG vs SBUX镜像7维度 | 对比 | C |
| DM-P4-C10 | Phase 5完整参数YAML | 综合 | C |
| DM-P4-C11 | 估值桥接: -15.2%→-7.0% | 计算 | C |
| DM-P4-C12 | 条件评级矩阵(微调) | 综合 | C |

---

## A.7 Phase 5: 综合监控 (33 DM)

### Ch01 执行摘要 (7 DM: A01-A07)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P5-A01 | 核心论点一句话 | 综合 | C |
| DM-P5-A02 | 红队净修正+3.75pp分解 | Ch19汇总 | C |
| DM-P5-A03 | WACC悖论→增长率纯化 | 分析 | C |
| DM-P5-A04 | P/E四因子归因(21.6x分解) | 归因 | C |
| DM-P5-A05 | 回购不可持续性分析 | 计算 | C |
| DM-P5-A06 | 条件评级标记 | 综合 | C |
| DM-P5-A07 | CMG-SBUX镜像投资逻辑 | 综合 | C |

### Ch22 风险拓扑 (15 DM: B01-B15)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P5-B01 | 8大即时风险注册表 | Phase 1-4证据 | C |
| DM-P5-B06 | 温水煮青蛙: 4因素5年-19% | 概率加权 | C |
| DM-P5-B07 | 共振A: comp负×回购骤降, -16%~-24% | 联合概率 | C |
| DM-P5-B10 | 四面承重墙定义+状态 | thesis CI | C |
| DM-P5-B12 | 至少一面开裂概率54.1% | 联合概率 | C |
| DM-P5-B15 | 风险预算~$11.0/股 | 期望损失 | C |

### Ch23 KS监控 (11 DM: C01-C11)

| 锚点 | 值 | 来源 | 信度 |
|------|:--:|------|:----:|
| DM-P5-C01 | KS注册表10信号(v18.0) | RT-1~7+Ch21 | C |
| DM-P5-C03 | 3组条件依赖逻辑 | v18.0 KS | C |
| DM-P5-C05 | 评级迁移5路径 | Ch21扩展 | C |
| DM-P5-C07 | FY2026-27监控日历8节点 | 综合 | C |
| DM-P5-C09 | 5个强制更新触发条件 | 综合 | C |
| DM-P5-C11 | CMG KS与KS-CONS映射 | 行业标准 | C |

---

## A.8 交叉引用统计

### Phase间引用热力图

| 被引Phase | P0 | P1 | P2 | P3 | P4 |
|-----------|:--:|:--:|:--:|:--:|:--:|
| **P1引用→** | 38 | - | - | - | - |
| **P2引用→** | 52 | 8 | - | - | - |
| **P3引用→** | 24 | 4 | 12 | - | - |
| **P4引用→** | 15 | 6 | 8 | 18 | - |
| **P5引用→** | 6 | 2 | 4 | 8 | 12 |

> P0锚点被后续Phase引用135次, 验证了数据预取层的基础性作用。

### 高频引用锚点 (Top 10)

| 锚点 | 引用次数 | 值 | 含义 |
|------|:--------:|:--:|------|
| DM-P0-A18 | 12+ | OPM 16.8% | 核心盈利指标 |
| DM-P0-A22 | 10+ | Comp -1.7% | 增长转折信号 |
| DM-P0-A37 | 8+ | ROIC 18.9% | 资本效率锚 |
| DM-P0-A27 | 8+ | 零金融负债 | 资本结构身份 |
| DM-P0-A35 | 7+ | 回购$2.43B | 资本配置核心 |
| DM-P0-A42 | 6+ | P/E区间29-75x | 估值历史锚 |
| DM-P0-A05 | 6+ | P/E 32.19x | 当前估值 |
| DM-P0-A34 | 5+ | FCF $1.45B | 现金生成能力 |
| DM-P0-A63 | 5+ | HEEP 350→2,000店 | 增长催化剂 |
| DM-P3-A04 | 5+ | Beta 1.05 | WACC争议核心 |

---

## A.9 数据质量审计

### 已知数据冲突/口径差异

| 冲突 | 涉及锚点 | 说明 | 处理方式 |
|------|---------|------|---------|
| FMP totalDebt含租赁 | DM-P0-A28, DM-P2-B11 | FMP报$9.85B vs 实际零金融负债 | Ch10详细分解, 以零金融负债为准 |
| ROIC双口径 | DM-P0-A37, DM-P2-D10 | FMP 18.9% vs 手算20.6% | 两者IC定义不同, 报告中标注差异 |
| CEO折价双估算 | DM-P3-B09, Ch14 | Ch16残差法8.0x vs Ch14估算~16x | 基年P/E不同(53.8x vs 48x), 均有效 |
| HEEP成本 | DM-P2-C08, DM-P2-D20 | $100-200K/店(Ch11) vs $50-100K(Ch12) | 未披露, 均为估算, 取区间$50-200K |

### DM覆盖质量评价

| 维度 | 评分 | 说明 |
|------|:----:|------|
| **覆盖密度** | 9/10 | 659 DM / 278K = 2.37/千字, 系列最高 |
| **信度分布** | 8/10 | H+C=71%, 硬数据+可复现计算占主导 |
| **交叉引用** | 8/10 | P0锚点被引135次, 数据基础扎实 |
| **口径一致** | 7/10 | 4处已知冲突均已标注, 但HEEP成本区间过宽 |
| **综合** | **8.0/10** | 消费品系列最高密度, 数据治理良好 |

---

*附录A完 | 659 DM锚点 | 6 Phases | 23章 | 框架v18.0*
