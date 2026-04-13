# Handoff Note — COHR Phase 0 → Phase 1
> 2026-04-13

---

## 1. 主要请求与意图
用户要求对Coherent Corp (COHR)进行Tier 3深度分析, 目标4.4分/200K+。参考LITE报告(3.8分)和进化教训。Phase完成后确认再进入下一Phase。

## 2. 关键技术概念
- **核心矛盾**: COHR是$48B "AI光通信成长股", 但72% AI收入掩盖28%萎缩业务; 市场给混合体纯增长股估值(41x PE); 去杠杆+D&A递减释放$1-2 EPS/yr被归因于增长
- **主线thesis候选**: "不是AI光通信成长股, 而是后合并去杠杆+SOTP价值释放故事"
- **关键变量**: Networking增速(D1) × 去杠杆速度(D4) × SiC期权价值(CQ5)
- **最大张力**: CapEx加速(AI扩产)vs 去杠杆(减债) — 两者争同一笔现金流

## 3. 已完成的文件和产出
- `reports/COHR/data/launch_brief.md` — 复杂度评估+LITE教训+P0-P3识别
- `reports/COHR/staging/P0_foundation.md` — 50+ DM锚点(财务/资产负债表/现金流/估值/内部人/共识)
- `reports/COHR/data/agent_findings_summary.md` — 5路WebSearch汇总(财报/竞争/技术/债务/市场)
- `reports/COHR/staging/P0.75_thesis_crystallization.md` — 5异常+3约束碰撞+3假说+CQ1-8+驱动图
- `reports/COHR/staging/COHR_default_map_audit.md` — S-1对齐产物(4失灵事实)

### 关键数据点(必须保留):
- Price $307.50, Market Cap ~$48B, Forward PE 41x (FY2027 $7.47)
- FQ2'26: Rev $1,686M (+17.5%), Non-GAAP GM 39%, Net Income $147M
- Net Debt $2.68B (from $3.67B FY2023), Goodwill $4.46B (30% assets)
- FQ2'26 FCF = -$96M (CapEx $154M up sharply)
- Consensus: FY2027E Rev $8.76B, EPS $7.47; FY2028E $10.46B, $9.64
- NVIDIA $2B @ $256.80/share, CPO from 2027
- SiC: DENSO/三菱$1B, Wolfspeed Ch.11, 200mm ramp
- Preferred Stock $2.5B→$0 in Q2'26 (需验证)
- Insider: 0 purchases, consistent selling

## 4. 已解决的问题
- tier3_launch.sh Python模块不可用→手动执行等效流程
- LITE报告在半导体worktree确认: v1.0 181K, 3.8分
- 行业模块读取: semiconductor_modules.md v1.0

## 5. 用户反馈记录
- Phase完成后确认, Phase内不停
- 目标4.4分, 200K+
- 参考LITE报告和进化教训

## 6. 待办任务
- **CQ6**: Preferred Stock $2.5B消失→SEC 8-K验证
- **M0**: 三段SOTP建模(Networking/SiC/Industrial)
- **Debt maturity**: Term Loan B-2和Senior Notes 5% 具体到期日确认
- **SBC详细数据**: Q4'25和Q2'26的SBC异常值验证
- **SiC独立分析**: Revenue breakdown, 200mm timeline, Wolfspeed客户转移

## 7. 当前精确状态
- Phase 0 + Phase 0.75 **完成**
- 4个staging文件 + 2个data文件已创建
- 5路WebSearch Agent已完成并汇总
- MCP数据(income/balance/cashflow/estimates/insider)已获取并锚定

## 8. 下一步唯一优先
**Phase 1**: 业务理解+护城河分析
- 重点: M0混合体拆分(三段独立分析) → M4护城河六维 → M2技术壁垒(InP vs EML vs SiPh)
- 不要重复P0已经写过的财务数据, 直接引用DM锚点
- 必须覆盖: COHR vs LITE技术对比, SiC独立护城河评估, 垂直整合价值量化

## 触发的复杂度修正器 (Phase 1需执行)
- **M0**: 混合体先拆 — Networking/SiC/Industrial三段独立评估
- **M2**: 身份协同/冲突 — AI光通信身份 vs 工业混合体身份
- **M3**: 拖累源 — Industrial/Materials是否拉低整体倍数
- **M4**: 标签坍塌 — 如果AI增长放缓, "AI光通信"标签脱落风险
- **M5**: 转型溢价 — 市场为SiC转型付了多少钱
