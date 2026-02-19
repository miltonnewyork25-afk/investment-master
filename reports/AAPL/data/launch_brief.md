# Launch Brief: AAPL
> 自动生成 by tier3_launch.sh v1.0 | 2026-02-19 10:59
> **AI必须在Phase 0开始前完整阅读本文件**

## 复杂度评估
- **行业**: 科技平台
- **同行业报告数**: 4 份
- **同行业参考**: AMZN(236K) GOOGL(528K) META(317K) MSFT(316K) 
- **同行业平均**: 349K chars
- **★ 目标字符范围**: 279K - 437K chars
- **硬底线**: 200K chars (低于此为质量失败)

## 参考报告 (按行业)
  - AMAT: 304K chars / 520KB (半导体)
  - AMD: 341K chars / 556KB (半导体)
  - AMZN: 236K chars / 391KB (科技平台)
  - APP: 525K chars / 889KB (其他)
  - ASML: 422K chars / 809KB (半导体)
  - COST: 281K chars / 464KB (消费品)
  - GOOGL: 528K chars / 844KB (科技平台)
  - INTC: 209K chars / 372KB (半导体)
  - KLAC: 254K chars / 442KB (半导体)
  - LRCX: 470K chars / 717KB (半导体)
  - META: 317K chars / 534KB (科技平台)
  - MSFT: 316K chars / 517KB (科技平台)
  - MU: 178K chars / 295KB (半导体)
  - ORCL: 259K chars / 418KB (其他)
  - PG: 250K chars / 462KB (消费品)
  - PLTR: 457K chars / 724KB (其他)
  - RBLX: 383K chars / 641KB (其他)
  - RDDT: 244K chars / 397KB (其他)
  - SOFI: 294K chars / 468KB (金融)
  - TSLA: 534K chars / 910KB (汽车科技)
  - TSM: 451K chars / 715KB (半导体)

## 进化教训 (最近3份报告)
  - WACC±100bps跨3评级区间=假精度+LLM不能做算术
  - 密度>体量+v1.0无补丁>v1.x多轮修正
  - 外部输入变化(用户直接指令)导致全部准备跳过=Phase -1/-0.5零执行

## Phase -1 知识检索
- knowledge_context.md: 1373 chars
- 状态: ✓ 完成

## AI待完成清单 (Phase 0之前)
1. [x] Phase -1 知识检索 (≥500 chars)
2. [ ] Phase -0.5 文献侦察 — 5路WebSearch → data/lit_recon_memo.md (≥1000 chars)
3. [ ] 运行 preflight_gate.sh 验证 → 必须CLEARED
4. [ ] checkpoint.yaml 设定 target_chars: 349694

## 防御提醒
- 每个Phase完成后运行 phase_sentinel.sh — 自动重新验证所有前序产出
- 如果累计产出<目标的15%/Phase → sentinel会发出WARN
- 如果前序产出缺失 → sentinel会发出BLOCK，必须回补
