# ADBE 文献侦察备忘录 (Phase -0.5)

> 日期: 2026-03-17 | 5路并行WebSearch + MCP数据 + 框架分析
> 状态: COMPLETE

---

## 一、公司概况与商业模式

### 收入结构 (FY2025, 合并前最后一年)
- **Digital Media**: $17.6B (74%) — Creative Cloud + Document Cloud
  - Creative Cloud: ~$13.4B (订阅为主)
  - Document Cloud: ~$3.5B (Acrobat + Sign)
- **Digital Experience**: $5.4B (23%) — AEP + Analytics + GenStudio
- **Publishing & Advertising**: $0.8B (3%)

### FY2026重大变化
- **单一分部合并**: 三个分部→一个经营和报告分部
- 管理层解释: "改变了评估资源配置和战略机会的方式"
- 补充披露: 仍按客户群体(Creative & Marketing Professionals / Business Professionals & Consumers)报告订阅收入
- **分析含义**: 使隔离DM vs DX利润率趋势更困难; 怀疑论者认为在掩盖DX低增长

### 订阅模式经济学
- 订阅收入占比: ~93% (FY2025)
- 总ARR: $26.06B (Q1 FY2026)
- RPO: $22.22B
- 净留存率: 未公开披露(行业估计110-115%)
- ARPU趋势: 通过Creative Cloud Pro等高价tier驱动提升

### TAM估计
- 创意软件: ~$63B (Adobe估计, 含AI扩展后)
- 文档管理: ~$32B
- 营销技术/CXM: ~$110B
- 合计可寻址市场: ~$205B → Adobe $24B = ~12%渗透率

---

## 二、AI战略深拆

### Firefly
- **累计生成量**: 24B+ (截至2025.5); Q1 FY26 QoQ 3x增长
- **ending ARR**: >$250M (跨Firefly app/credit packs/Firefly Enterprise)
- **定价体系**: Generative credits模型
  - Standard $9.99/月 (2K premium credits)
  - Pro $19.99/月 (4K credits)
  - Premium $199.99/月 (50K credits)
  - 标准生成在付费计划中无限制; premium功能消耗credits
- **Unlimited Promo**: 2026.1.23-3.18, 所有AI图像模型无限生成
- **合作模型**: Google Nano Banana Pro, GPT Image Generation, Runway Gen-4 Image, Black Forest Labs等25+家
- **商业安全**: 仅使用Adobe Stock/授权/公共领域数据训练; 提供IP赔偿承诺
- **竞争策略**: 不追求"最强模型", 而是"可商用+品牌安全+工作流集成"

### Firefly Foundry
- 企业定制生成模型平台: 使用企业自有品牌资产(图像/视频/音频/矢量/3D)训练私有模型
- 目标: 品牌一致性+权限控制+自定义输出
- 已有早期企业客户采用

### GenStudio
- 跨堆栈集成: 创意+营销+激活
- ending ARR增长: >30% YoY
- 直接输出到: Amazon Ads, Google, LinkedIn, Meta等广告平台
- 功能: 品牌模板+审批工作流+A/B测试+渠道编排

### Express AI
- 定位: 对话式设计界面, 面向非专业用户
- MAU: 快速增长(具体数字未单独披露, 包含在8000万creative freemium MAU中)
- 企业渗透: 已进入多数美国Fortune 500
- 企业功能: 锁定模板+批量创建+审批工作流

### Acrobat AI Assistant
- 功能: 从"读文档"到"与文档对话、提取洞察、生成邮件/报告/演示"
- Business Professionals & Consumers订阅收入: $1.78B Q1 FY26 (+16% YoY)
- 2026.3公开测试: Photoshop AI Assistant

### Project Moonlight
- 跨应用AI助手: 用户描述需求→AI跨应用编排
- 状态: 预览阶段

### 模型策略
- **双轨**: 自研模型(Firefly系列) + 第三方聚合(25+模型)
- 定位: "模型是可替换的, 工作流才是核心"
- Adobe + OpenAI合作: 预览Firefly AI co-pilot功能进入ChatGPT (2026)
- Adobe + Nvidia: 17家首批采用Nvidia企业AI agent平台

---

## 三、SaaSpocalypse与行业变局

### SaaSpocalypse时间线
- **2026.2月**: Anthropic发布Claude Cowork → 市场恐慌AI agent替代SaaS seat
- **规模**: ~$2万亿软件市值30天蒸发
- **Adobe**: 跌26%, P/E从26x→16x
- **其他**: Atlassian -35%, Salesforce -28%
- **机制**: "如果10个AI agent做100个销售的活→不需要100个Salesforce seat"

### Vibe Coding现象
- 92%美国开发者每日使用AI编码工具
- Collins Dictionary 2025年度词
- $4.7B市场规模(2026)
- 关键工具: Cursor($29.3B估值), Claude Code(8个月→#1, 46%份额), GitHub Copilot(4.7M付费)
- **对Adobe含义**: 非设计师用自然语言→AI直接生成应用/网站→绕过设计工具

### AI Agent市场
- 2025: $7.29B → 2026: $9.14B → 2030: >$50B
- Forrester: 2026年AI agent改变商业模式和职场文化
- 最高ROI部署: 文档处理、数据核对、合规检查、发票处理
- **Adobe定位**: Firefly Services API + Experience Platform Agent Orchestrator

### 市场恢复信号
- Deutsche Bank (2026.3): SaaSpocalypse "已结束", 软件股处于巨大折价
- 1,971个AI-SaaS交易(2025, ~2x 2024)
- 100%受调SaaS公司增加AI投资
- 主要SaaS公司RPO双位数增长→企业客户未离开

---

## 四、竞争格局详拆

### Canva — 最重要的低端威胁
- **Affinity免费化**: 收购Affinity后将全套(Photo/Designer/Publisher)免费提供→直接攻击Adobe价格壁垒
- **自有设计模型(2025.10)**: 生成可编辑多层设计(非平面图像)→核心差异化
- **Magic Layers(2026)**: 将平面图像转为可编辑多层→直接挑战Photoshop核心价值
- **收购扩张**: Cavalry(2D动画→挑战After Effects) + MangoAI(视频广告→挑战Premiere)
- **企业级**: Canva for Teams/Enterprise, 品牌模板, 审批工作流
- **可能2026 IPO**
- **定价**: 免费基础+$12.99/月Pro vs Adobe $54.99/月全套

### Figma — 协作设计颠覆者
- UI/UX设计份额: 41-80%(不同来源)
- Adobe XD未能复制多人实时协作体验
- $20B收购被监管阻止→Figma独立发展更强
- Dev Mode + AI功能持续迭代

### AI-Native生成工具
- **Midjourney v6.1**: 被认为艺术质量最强; 但无企业工作流/品牌安全
- **OpenAI GPT-4o**: Ghibli风暴→GPU熔化→展示大众市场AI图像需求; 但质量/控制不稳定
- **Runway Gen-4**: 视频生成领先; 已被Adobe集成为合作模型
- **Stable Diffusion开源**: 免费使用; 但商业版权风险高

### 企业竞争
- **Salesforce**: Marketing Cloud + Einstein AI → 企业营销自动化
- **HubSpot**: 中小企业营销+AI → 轻量替代
- **Microsoft Designer**: Office集成+Copilot → 文档/演示内嵌设计

---

## 五、估值与分析师观点

### 当前估值
- 价格: $251.86 (52周低$244, 高$423)
- 市值: ~$107B
- TTM P/E: 15.7x | Forward P/E: 9.6x
- EV/EBITDA: 10.8x | EV/Sales: 4.3x
- FCF Yield: 9.3%

### 分析师分布
- 共识: Hold (22-24位分析师)
- 平均目标价: ~$354 (隐含+40%上行)
- **最悲观**: Goldman Sachs Sell, PT $220 (最悲观)
- **目标价下调**: Citi $315→$278, Mizuho $340→$315, TD Cowen $325→$310
- **维持**: Bernstein/UBS维持评级

### Goldman Sell核心论点
- AI功能增长更多是防御性而非新价值创造
- Firefly商业化进度不及预期
- CEO交接增加执行风险
- Creative Cloud可能面临长期seat压缩

### 估值对标
| 公司 | Forward P/E | EV/Sales | 增速 |
|------|-----------|----------|------|
| ADBE | 9.6x | 4.3x | +12% |
| CRM | ~22x | ~7x | +11% |
| NOW | ~45x | ~15x | +22% |
| ADSK | ~25x | ~8x | +12% |
| INTU | ~28x | ~10x | +15% |

**关键发现**: Adobe的估值倍数显著低于所有可比SaaS公司, 即使增速相当。这要么是严重低估, 要么是市场在定价一个其他公司不面临的结构性威胁(AI颠覆Creative Cloud)。

---

## 六、护城河与治理

### PDF标准
- PDF于2008年成为ISO 32000国际标准
- Adobe不再"拥有"PDF格式(开放标准), 但Acrobat仍是事实标准
- 在AI时代: PDF可能从静态文件→对话式知识载体(Acrobat AI Assistant)

### 文件格式锁定
- PSD/AI/INDD/PRPROJ: 行业标准文件格式
- 数十年累积的项目文件构成转换成本
- 但新一代用户可能不积累这些格式(直接用AI生成)

### Content Credentials / CAI
- 内容来源标识: 记录创作过程+AI使用情况
- 合作伙伴: Microsoft, Google, BBC, NYT等
- 在deepfake/AI伪造时代可能越来越重要
- 当前更多是防御性护城河, 非直接收入

### 企业渗透
- Fortune 500渗透: 极高(多数已使用Creative Cloud + Document Cloud)
- 多产品采用: 跨CC+DC+EC的客户粘性更强
- 平均企业合同: 多年期, 包含培训/集成/定制

### 开发者生态
- Creative Cloud插件/扩展市场
- 第三方集成: Slack, Microsoft Teams, Salesforce等
- API生态: Firefly Services API为新增长

---

## 七、关键异常与核心矛盾

### 异常清单
1. **Forward PE 9.6x vs ROIC 84%**: 极低估值×极高资本效率 = 市场认为ROIC不可持续
2. **FCF Yield 9.3%**: 正常成长股3-5%, 价值陷阱5-8%, Adobe超出价值陷阱区间
3. **回购$11.3B > OCF$10.0B**: 加杠杆回购→要么极度看好自己, 要么缺乏高回报再投资机会
4. **AI-first ARR >3x但占比<1%**: 增长速度快但绝对规模小→是信号还是噪声?
5. **毛利89%但市场给价值股倍数**: 科技行业最高毛利之一却被按低增长定价
6. **CEO在第100次季度电话会宣布交接**: 时机选择有深意(在最强季度宣布离开)

### 核心矛盾
**"Adobe拥有软件行业最好的财务特征(89%毛利/84%ROIC/42%FCF Margin), 但被定价为即将被颠覆的价值陷阱(Forward PE 9.6x)。市场要么严重错误, 要么看到了财务报表里看不到的结构性威胁。"**

### 5个非共识假说候选
1. **Adobe是AI分裂体**: Consumer CC受害+Enterprise受益→单一估值必然错误
2. **座位→API转型**: 如果Adobe成功从seat-based转向API计量, 当前估值是入场机会
3. **SaaSpocalypse过度反应**: 德银已宣布"结束"→均值回归潜力巨大
4. **CEO交接是利好**: Narayen的继任者如果是"AI-native"→可能加速转型
5. **Firefly不需要赢AI军备竞赛**: "可商用+品牌安全"已足够→信任溢价>模型质量

---

## 八、文献侦察总结

### 信息充分度评估
- 财务数据: ★★★★★ (FMP 5年+8季度, SEC 10-K可用)
- AI战略: ★★★★☆ (Firefly/GenStudio数据较全, Foundry/Express细节待补)
- 竞争格局: ★★★★☆ (Canva/Figma/Midjourney/OpenAI覆盖全, 定量数据部分缺失)
- 行业宏观: ★★★★★ (SaaSpocalypse/vibe coding/AI agent文献丰富)
- 治理/护城河: ★★★☆☆ (PDF标准/CAI已覆盖, 企业客户细节待SEC 10-K补充)
- 估值对标: ★★★★☆ (分析师观点丰富, 需补充SOTP细节)

### Phase 0优先级
1. SEC 10-K FY2025全文 — 尤其新分部结构、AI风险因子、RPO详细
2. Q1 FY2026 Earnings Call Transcript — AI-first ARR定义、CEO交接讨论
3. Canva定量数据 — MAU、收入、估值(如可获取)
4. SBC详细拆解 — 与FMP交叉验证
5. insider trading数据 — CEO交接前后高管行为
