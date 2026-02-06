# /analyze-sector - 半导体分析启动技能

## 触发命令
`/analyze-sector [公司代码]` 或 `/analyze-sector 半导体`

## 功能描述
自动化半导体分析流程的启动，包括：
- 识别半导体子行业类型（代工/设计/设备/存储）
- 确认在半导体worktree
- 加载v20.0半导体专用框架
- 生成阶段化执行计划
- 启动v20.0五引擎系统

## 执行流程

### Step 1: 公司识别与环境确认
```yaml
半导体子行业映射:
  代工厂: [TSM, UMC, SMIC, GFS]
  设计公司: [NVDA, AMD, QCOM, AVGO, MRVL, MCHP]
  设备厂商: [ASML, LRCX, AMAT, KLA, TEL, ONTO]
  存储芯片: [MU, SK Hynix, Samsung]
  IDM: [INTC, TXN, ADI, ON, NXPI]
  IP/EDA: [ARM, SNPS, CDNS]

执行动作:
  1. 识别公司所属子行业
  2. 确认当前在半导体worktree
  3. 如不在，建议切换并等待确认
  4. 加载子行业特定配置
```

### Step 2: v20.0框架加载
```yaml
必须加载:
  - docs/industry_frameworks.md (半导体部分)
  - docs/depth_assurance.md
  - frameworks/v10.0-prediction-market/ (预测市场核心)

半导体特化加载:
  - 6层周期雷达配置
  - 半导体PMSI权重 (地缘40%+技术30%+需求20%+供应链10%)
  - Kill Switch阈值 (台海25%/制裁45%)
  - 子行业特定分析模板

TSM验证基准加载 (参考):
  - 120,847字符基准
  - 87.4/100评分基准
  - 91.3%背离发现基准
```

### Step 3: 生成阶段化执行计划
```yaml
输出格式:
  🎯 分析项目：[公司名] ([代码])
  🏭 行业：半导体 - [子行业]
  📍 Worktree：半导体worktree
  📊 复杂度系数：×2.0
  📝 目标字数：≥240,000字符

  📌 阶段划分（每阶段=1次会话）：

  阶段1: Phase 1 技术+生态定位 (2-3小时)
    - [ ] 公司画像 + 产业链
    - [ ] AI 7层架构定位
    - [ ] 技术代差量化
    - [ ] 预测市场概率矩阵 (≥12事件)
    完成标准: Phase 1检查点通过

  阶段2: Phase 2 周期+数据雷达 (3-4小时)
    - [ ] P1-P5周期定位 + 6层雷达
    - [ ] 财报分析
    - [ ] 五引擎并行启动 (使用/parallel-analysis)
    - [ ] PPDA背离预分析
    完成标准: Phase 2检查点通过

  阶段3: Phase 3 AI评估+深度分析 (4-5小时)
    - [ ] L+S双轴AI评估
    - [ ] 护城河分析
    - [ ] 估值建模
    - [ ] PMSI半导体情绪指数
    完成标准: Phase 3检查点通过

  阶段4: Phase 4 估值+风险决策 (2-3小时)
    - [ ] 投资评级 + 目标价
    - [ ] 12重Kill Switch设置
    - [ ] 可验证预测 (≥35个)
    - [ ] 七条铁律验证
    完成标准: Phase 4检查点通过

  阶段5: 质量审核 (1-2小时)
    - [ ] QG-01至QG-12门控验证
    - [ ] A+B级证据占比≥95%
    - [ ] 字数≥240,000检查
    完成标准: 全部门控通过

  ⏱️ 总预计时长: 12-17小时 (5次会话)
  ❓ 确认开始阶段1？
```

### Step 4: 启动分析
确认后自动执行：
- 创建 `reports/[公司代码]_Analysis_v20.0_[日期].md`
- 初始化 progress.md 跟踪文件
- 启动Phase 1分析

## 与其他技能的关系
- 依赖: `orchestrator` (模块组装)
- 配合: `parallel-framework-analysis` (Phase 2五引擎并行)
- 配合: `prediction-market-analyzer` (预测市场数据)
- 配合: `smart-money-tracking-system` (机构分析)
- 前置: 深度分析流程

## 版本
v1.0-半导体 - 2026-02-06
