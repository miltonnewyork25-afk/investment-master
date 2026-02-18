# ORCL v1.0 Complete Assembly Config

**Company**: Oracle Corporation
**Ticker**: ORCL
**Version**: v1.0
**Date**: 2026-02-18
**Price**: $153.97
**Market Cap**: $442.5B
**Rating**: 审慎关注
**Possibility Width**: 6.6
**Framework**: v17.0

## Part Mapping

| Part | Chapters | File Path | Range |
|------|----------|-----------|-------|
| Part 0 | Data Context | reports/ORCL/data/phase_0_planning.md | all |
| Part I | Ch3-Ch4 | staging/ORCL_P1_AgentA.md | all |
| Part I | Ch5-Ch7 | staging/ORCL_P1_AgentB.md | all |
| Part I | Ch8-Ch10 | staging/ORCL_P1_AgentC.md | all |
| Part II | Ch11-Ch12 | staging/ORCL_P2_AgentA.md | all |
| Part II | Ch13 | staging/ORCL_P2_AgentB.md | all |
| Part II | Ch14-Ch15 | staging/ORCL_P2_AgentC.md | all |
| Part III | Ch16-Ch17 | staging/ORCL_P3_AgentA.md | all |
| Part III | Ch10.5+Ch18 | staging/ORCL_P3_AgentB.md | all |
| Part III | Ch19-Ch20 | staging/ORCL_P3_AgentC.md | all |
| Part IV | Red Team | staging/ORCL_P4_red_team_rt1_rt7.md | all |
| Part V | Valuation | staging/ORCL_P5_valuation_synthesis.md | all |
| Part VI | Customer Analysis | staging/ORCL_S1_customer_behavior_analysis.md | all |
| Part VII | Industry Verticals | staging/ORCL_S2_industry_vertical_analysis.md | all |

## Metadata Cleanup Rules

### Remove Lines Matching:
- `**Phase N字符统计**`
- `**DM锚点引用**`
- `**框架确认**`
- `**情景预设**`
- `写作时间:`
- `字符预算:`
- `覆盖章节:`
- `**Agent [ABC]分析重点**`
- `**Agent [ABC]职责**`
- `进入Phase N的分析重点`

### Agent References to Remove:
- `Agent A`
- `Agent B`
- `Agent C`
- `Phase N分析重点`
- `**Agent A任务**`
- `**Agent B任务**`
- `**Agent C任务**`

## Title Adjustments

### H1 Level Standardization:
- All chapter titles should be H1 (`# `)
- Remove any `## Phase N:` titles from individual files
- Standardize to `# Phase N: [Title]`
- Remove duplicate chapter numbering

## Company Info
- **Ticker**: ORCL
- **Company**: Oracle Corporation
- **Industry**: 企业软件与云计算
- **Market Cap**: $442.5B
- **Analysis Date**: 2026-02-18
- **Stock Price**: $153.97
- **Framework**: v17.0 混合模式
- **Rating**: 审慎关注
- **Expected Return**: -15.0%

## Quality Gates
- **Total Characters**: 260K+ (Target achieved)
- **DM Anchors**: 343 (High quality)
- **Mermaid Diagrams**: 47 (Visual richness)
- **Chapters**: 18+ (Comprehensive coverage)
- **CQ Confidence**: 40.8% (Post-red team calibrated)

## Special Handling
- Conditional valuation framework corrections applied
- Framework compliance verified (no investment advice)
- Red team double-calibration completed
- Customer behavior and industry vertical supplements included