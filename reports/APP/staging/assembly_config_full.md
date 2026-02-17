# APP v2.0 Full Assembly Config (Including All Staging Files)

**Company**: AppLovin Corporation
**Ticker**: APP
**Version**: v2.0
**Date**: 2026-02-17
**Price**: $390.67
**Market Cap**: $132.03B
**Rating**: 审慎关注
**Possibility Width**: 7
**Framework**: v16.0

## Part Mapping (Full Staging Version)

| Part | Description | File Path | Range |
|------|-------------|-----------|-------|
| Part 0 | Data Context | reports/APP/data/shared_context.md | all |
| Part I | Phase 1 Content | staging/APP_P1_AgentA.md | all |
| Part I | Phase 1 Content | staging/APP_P1_AgentB.md | all |
| Part I | Phase 1 Content | staging/APP_P1_AgentC.md | all |
| Part II | Phase 2 Content | staging/APP_P2_AgentA.md | all |
| Part II | Phase 2 Content | staging/APP_P2_AgentB.md | all |
| Part II | Phase 2 Content | staging/APP_P2_AgentC.md | all |
| Part III | Phase 3 Content | staging/APP_P3_AgentA.md | all |
| Part III | Phase 3 Content | staging/APP_P3_AgentB.md | all |
| Part III | Phase 3 Content | staging/APP_P3_AgentC.md | all |
| Part IV | Phase 4 Content | staging/APP_P4_AgentA.md | all |
| Part IV | Phase 4 Content | staging/APP_P4_AgentB.md | all |
| Part V | Phase 5 Content | staging/APP_P5_AgentA.md | all |
| Part V | Phase 5 Content | staging/APP_P5_AgentB.md | all |
| Part V | Phase 5 Content | staging/APP_P5_AgentC.md | all |
| Part VI | Supplements | staging/APP_P5.5_SA.md | all |
| Part VI | Supplements | staging/APP_P5.5_SD.md | all |

## Metadata Cleanup Rules

### Remove Lines Matching:
- `**Phase N字符统计**`
- `**框架确认**`
- `**情景预设**`
- `写作时间:`
- `字符预算:`
- `覆盖章节:`
- `**Agent [ABC] 分析重点**`
- `**进入Phase N的分析重点**`

### Agent References to Remove:
- `Agent A`
- `Agent B`
- `Agent C`
- `Phase N分析重点`
- `进入Phase N的分析重点`

## Title Adjustments

### H1 Level Standardization:
- All chapter titles should be H1 (`# `)
- Remove any `## Phase N:` titles from individual files
- Standardize to `# Phase N: [Title]`

## Company Info
- **Ticker**: APP
- **Company**: AppLovin Corporation
- **Industry**: 移动广告科技
- **Market Cap**: $132.03B
- **Analysis Date**: 2026-02-17