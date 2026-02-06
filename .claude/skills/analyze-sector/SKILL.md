# /analyze-sector - 行业分析启动技能

## 触发命令
`/analyze-sector [行业名称]` 或 `/analyze-sector [公司代码]`

## 功能描述
自动化行业分析流程的启动，包括：
- 识别行业类型
- 切换到正确的worktree
- 加载行业专用框架
- 生成阶段化执行计划
- 启动v10.0五引擎系统

## 执行流程

### Step 1: 行业识别与Worktree切换
```yaml
行业映射:
  半导体: [NVDA, AMD, TSM, ASML, LRCX, MU, INTC]
  消费品: [KO, PG, NKE, COST, WMT, MCD, SBUX]
  金融: [JPM, GS, BAC, WFC, V, MA, BRK]
  科技平台: [AAPL, MSFT, GOOG, META, AMZN]

执行动作:
  1. 识别公司/行业类型
  2. 检查当前worktree位置
  3. 提示是否切换到对应行业worktree
  4. 确认后执行切换
```

### Step 2: 框架加载
```yaml
必须加载:
  - docs/industry_frameworks.md (对应行业部分)
  - docs/depth_assurance.md
  - skills/core/research_startup_protocol_v1.yaml

行业特定加载:
  半导体: frameworks/v10.0-prediction-market/
  消费品: 品牌价值DCF估值框架
  金融: 40维度风险建模框架
  科技: 生态系统分析框架
```

### Step 3: 生成阶段化执行计划
```yaml
输出格式:
  🎯 分析项目：[公司名] ([代码])
  🏭 行业：[行业类型]
  📍 Worktree：[当前worktree]

  📌 阶段划分（每阶段=1次会话）：

  阶段1: Phase 1 定位与生态 (2-3小时)
    - [ ] 公司画像
    - [ ] 产业链分析
    - [ ] 预测市场概率矩阵
    完成标准: Phase 1检查点通过

  阶段2: Phase 2 数据雷达 (3-4小时)
    - [ ] 周期定位
    - [ ] 财报分析
    - [ ] 五引擎启动
    完成标准: Phase 2检查点通过

  阶段3: Phase 3 深度分析 (4-5小时)
    - [ ] 护城河分析
    - [ ] 估值建模
    - [ ] PMSI情绪指数
    完成标准: Phase 3检查点通过

  阶段4: Phase 4 决策输出 (2-3小时)
    - [ ] 投资评级
    - [ ] 12重Kill Switch
    - [ ] 可验证预测
    完成标准: Phase 4检查点通过

  ❓ 确认开始阶段1？
```

### Step 4: 启动分析
确认后自动执行：
- 创建 `reports/[公司代码]_Analysis_v10.0_[日期].md`
- 初始化 progress.md 跟踪文件
- 启动Phase 1分析

## 使用示例

```
用户: /analyze-sector NVDA
Claude:
🎯 分析项目：NVIDIA Corporation (NVDA)
🏭 行业：半导体
📍 建议Worktree：半导体worktree

检测到当前在主分支，建议切换到半导体worktree以使用v10.0专业框架。

❓ 1️⃣ 切换到半导体worktree开始分析
   2️⃣ 留在当前位置分析
   3️⃣ 取消
```

## 与其他技能的关系
- 依赖: `orchestrator` (行业识别逻辑)
- 依赖: `using-superpowers` (技能调用规范)
- 前置: 深度分析流程

## 版本
v1.0 - 2026-02-06
