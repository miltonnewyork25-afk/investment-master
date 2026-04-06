# Handoff Note — WWD Phase 1 → Phase 2

## 1. 主要请求与意图
完成WWD Tier 3深度分析,目标240-375K,围绕H1主线"质量溢价错配+标签坍塌风险"组织。

## 2. 关键技术概念
- **主线 H1**: 市场把WWD贴上接近Tier 1质量桶的标签(47x PE),但经营身份在Tier 2中位(GM 26.8% / EBITDA Margin 19% / ROIC 11% / AM ~40%)。任一信号松动→质量桶下移→-15~30%
- **反方 H2**: GE JV承重墙穿透价值$2.5-3B(占EV 10-13%) + 数据中心备电期权未被定价 → +10~20%
- **核心变量**: Aero margin持续性(24.4%结构性占比?) / Industrial Q1 +30%可持续性 / GE JV穿透真实数字 / AM占比精确披露

## 3. 已完成的文件与产出
- `staging/phase1_business_understanding.md` (31.3K, 8 DM锚点)
  - §1-2 公司速写+历史基因
  - §3 Aero商业模式(4子产品+客户+经济学+久期)
  - §4 Industrial商业模式(4子产品+Q1+30%结构+数据中心)
  - §5 P0原型: 双引擎控制系统niche独立寡头
  - §6 P1定价公式: WWD公允46-52x ≈ 现价合理
  - §7 P2资产身份: 经营vs市场距离=H1全部逻辑空间
  - §8 P3时间框架: 4层时间+$372信念分解
  - §11 Wood-GE JV深挖(三种估值方法→$2.5-3B穿透价值)
  - §12 三大壁垒机制(FAA认证+工程根植+AM转换成本)
  - §13 资本配置史+管理层质量
  - §14 FY18-FY25完整分部基线
  - §15 风险清单 8+5+4

## 4. 已解决的问题
- P1定价公式发现: WWD 47x PE几乎完全合理,H1需修正为"估值依赖质量桶不下移",而非"已经贵了"
- H1置信度从~70%略降到~60%(因JV承重墙存在真实价值)
- Kill Switch量化为质量桶移动表(Tier 2上沿→Tier 3,$220-420区间)

## 5. 用户反馈
- 用户在本Phase无新指令,只要求"恢复Phase 1并注意目标产出"

## 6. 待办任务 (Phase 2核心)
**R-1 财务归因 (必)**:
1. Aero margin +520bp拆分(产能/价格/Mix/效率/一次性) — 结构性占比是?
2. AM/OE收入精确拆分 — 验证或证伪40%估算
3. GE JV穿透到WWD的财务量化(三角校验:对JV销售+equity earnings+distributions)
4. 三PE并列(GAAP/Owner/Core) — 检查SBC扭曲

**R-2 剪刀差 (必,至少3个)**:
1. Industrial Q1 +30% sell-in vs sell-out + 客户backlog比对
2. 价值链利润转移: 上游(HWM/ATI)毛利变化 vs WWD毛利
3. CapEx vs FCF剪刀差(扩产对FCF的压制)

**铁律Q 供应链交叉验证**:
- WWD aero增速 vs 上游HWM/HXL/ATI增速
- WWD industrial增速 vs CAT/CMI披露的backlog
- 偏差>10%必须解释

## 7. 当前精确状态
- Phase 1 staging完成(31.3K),未提交commit
- checkpoint.yaml仍是pre_launch状态(需要更新)
- Phase 2尚未启动

## 8. 下一步唯一优先
**Phase 2启动**: 先用MCP工具拉WWD最新FY25 10-K + 季度数据 → 写R-1财务归因(Aero margin +520bp拆解为第一节) → 再写R-2剪刀差(3个) → 三PE并列。目标Phase 2字符 50-65K。

## 不要重复
- 不要再讨论P0-P3识别,Phase 1已完成
- 不要再描述商业模式概览,Phase 2聚焦数字归因
- GE JV的"机制"已讲,Phase 2只做"数字穿透"
