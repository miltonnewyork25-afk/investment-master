# Amazon特异性数据预取精准计划 v1.0

**制定日期**: 2026-02-18
**基于**: Amazon商业模式六大特异性分析
**目标**: 支撑12+1个CQ的深度分析

---

## 🎯 **数据预取分层策略**

### **P0级数据** (必须获得, 影响分析成败)
**获取方式**: MCP工具 + 官方披露 + SEC Filing

#### **三引擎财务分离数据**
- [x] AWS季度收入、增长率、营业利润率 (已有部分)
- [x] 广告季度收入、ARPU、增长率 (已有部分)
- [ ] **电商业务净收入** (剔除广告后的纯电商收入)
- [ ] **各业务CAPEX分配** (AWS vs 履约中心 vs 技术研发)
- [ ] **跨业务成本分摊机制** (基础设施共享成本)

#### **Prime生态核心指标**
- [x] Prime全球会员总数 240M+ (已有)
- [ ] **Prime会员年留存率** (关键粘性指标)
- [ ] **Prime ARPU详细分解** (订阅+配送+视频+音乐)
- [ ] **Prime会员跨服务使用率** (多少比例使用2+服务)
- [ ] **Prime vs 非Prime用户购买行为对比**

#### **负现金周期详细数据**
- [x] 整体现金转换周期 -42天 (已有)
- [ ] **应付账款构成分析** (供应商类型+账期分布)
- [ ] **应付账款前10大供应商集中度**
- [ ] **不同商品品类的账期差异** (电子vs服装vs书籍)
- [ ] **历史账期变化趋势** (2020-2025年月度数据)

---

### **P1级数据** (重要, 显著影响分析质量)
**获取方式**: 第三方研究 + 行业报告 + 推算

#### **AWS竞争格局数据**
- [x] AWS/Azure/GCP市场份额 (已有)
- [ ] **企业多云策略采用率趋势** (按企业规模分层)
- [ ] **AWS客户流失率和获得率** (年度数据)
- [ ] **AI工作负载占AWS收入比例** (2023-2025增长)
- [ ] **AWS平均客户规模和增长率** (企业vs中小客户)

#### **平台生态健康度数据**
- [ ] **第三方卖家GMV占总GMV比例** (季度趋势)
- [ ] **卖家数量增长和留存率**
- [ ] **Take rate变化趋势** (按品类分析)
- [ ] **自营vs第三方品类重叠度分析**
- [ ] **卖家满意度NPS** (如有公开调研)

#### **全球市场差异化数据**
- [ ] **美国/欧洲/亚太市场收入占比**
- [ ] **各主要市场盈利性差异** (营业利润率)
- [ ] **Prime渗透率地区差异** (美国vs德国vs日本)
- [ ] **AWS在不同国家的市场份额**
- [ ] **监管环境严格程度评分** (美/欧/中/印度)

---

### **P2级数据** (有用, 但可用proxy替代)
**获取方式**: 公开估算 + 行业对比 + 合理假设

#### **协同效应间接指标**
- [ ] **Prime会员企业身份占比估算** (个人vs企业账户)
- [ ] **电商搜索数据对广告定向的价值** (vs Google对比)
- [ ] **AWS企业客户的电商采购行为** (如有案例研究)
- [ ] **Alexa商业化数据** (广告收入+电商转化)

#### **竞争对手对比数据**
- [ ] **Google Cloud企业客户重叠度** (vs AWS)
- [ ] **Apple/Google Pay vs Amazon Pay使用对比**
- [ ] **Netflix/Disney+ vs Prime Video订阅重叠**
- [ ] **阿里巴巴/腾讯云在亚洲vs AWS对比**

---

## 🔧 **MCP工具调用序列**

### **Phase 0.5: 数据预取执行** (预计2小时)

#### **序列1: 核心财务数据** (30分钟)
```bash
# 基础财务数据
mcp_investment_master.baggers_summary(symbol="AMZN")
mcp_investment_master.fmp_data(endpoint="income", symbol="AMZN", limit=8)
mcp_investment_master.fmp_data(endpoint="cashflow", symbol="AMZN", limit=8)
mcp_investment_master.fmp_data(endpoint="balance", symbol="AMZN", limit=8)
```

#### **序列2: 分部数据和估值指标** (30分钟)
```bash
# 估值和分部数据
mcp_investment_master.fmp_data(endpoint="ratios", symbol="AMZN", limit=4)
mcp_investment_master.fmp_data(endpoint="key-metrics", symbol="AMZN", limit=4)
mcp_investment_master.analyze_stock(symbol="AMZN", data_types="full", period="2y")
```

#### **序列3: 竞争和市场数据** (30分钟)
```bash
# 竞争对比和市场情况
mcp_investment_master.compare_stocks(symbols=["AMZN","GOOGL","MSFT","META"],
                                    metrics=["market_cap","revenue_growth","profit_margin"])
mcp_investment_master.get_market_overview()
```

#### **序列4: 风险和事件数据** (30分钟)
```bash
# 监管风险和市场事件
mcp_investment_master.polymarket_events(query="Amazon antitrust FTC", limit=5)
mcp_investment_master.polymarket_events(query="AWS cloud competition", limit=5)
mcp_investment_master.polymarket_events(query="Amazon Prime membership", limit=3)
```

---

## 📊 **数据质量保障协议**

### **三源交叉验证规则**
每个关键数字必须至少有3个独立来源验证：
1. **MCP工具数据** (baggers/FMP)
2. **官方披露** (SEC Filing/IR presentation)
3. **第三方研究** (专业分析师报告)

### **数据新鲜度要求**
- **P0数据**: ≤3个月 (Q4 2025数据)
- **P1数据**: ≤6个月 (H2 2025数据)
- **P2数据**: ≤12个月 (2025年数据)

### **缺失数据处理协议**
1. **寻找Proxy指标**: 相关指标推算
2. **行业对标**: 同业公司数据参考
3. **合理区间估算**: 悲观/基准/乐观三点
4. **显式标注不确定性**: 在报告中明确标注

---

## 🎯 **特异性数据突破点**

### **突破点1: Prime生态价值量化**
**目标**: 首次量化Prime生态的跨业务价值传导
**关键数据**: Prime会员ARPU分解 + 跨服务使用率
**分析方法**: Prime会员 vs 非Prime用户的AWS采购倾向分析

### **突破点2: 负现金周期价值建模**
**目标**: 创建供应商融资价值的DCF模型
**关键数据**: 应付账款账期分布 + 无息融资成本节省
**分析方法**: 将负现金周期转化为隐含股东价值

### **突破点3: 三引擎协同失效风险**
**目标**: 首次建立协同失效的情景分析模型
**关键数据**: 各引擎独立运营的成本结构
**分析方法**: 协同效应消失时的估值影响测算

---

## 📋 **数据预取执行检查清单**

### **执行前准备** ✅
- [x] MCP工具连接测试
- [x] API调用限制确认
- [x] 数据存储目录创建

### **执行过程监控**
- [ ] P0数据获取完成率 ≥90%
- [ ] P1数据获取完成率 ≥70%
- [ ] P2数据获取完成率 ≥50%
- [ ] 三源验证数据占比 ≥60%

### **质量验证**
- [ ] 关键数字交叉验证完成
- [ ] 数据新鲜度符合要求
- [ ] 缺失数据处理方案确定
- [ ] DM锚点注册表更新

---

## 🚀 **预期数据基础提升**

### **分析深度预期提升**
- **Prime生态分析**: 从定性描述 → 定量价值建模
- **供应链金融**: 从忽视 → 核心价值组件
- **协同效应**: 从假设存在 → 精确量化+失效风险

### **估值准确性预期提升**
- **方法适用性**: 传统方法 → Amazon特异性调整
- **风险评估**: 通用风险 → Amazon独有风险量化
- **情景分析**: 简单三分法 → 基于特异性的五场景

---

**数据预取计划状态**: ✅ **制定完成**
**执行时间窗口**: Phase 0.5 (2小时)
**预期数据基础**: **Amazon特异性完全覆盖**
**质量目标**: **支撑4.5+/5.0报告质量** 🎯