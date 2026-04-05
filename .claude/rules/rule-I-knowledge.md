## 铁律 I: 知识前置 + 纵深防御门控

**Tier 3分析启动的第一步，永远是** `bash scripts/tier3_launch.sh {TICKER} {INDUSTRY}`。

**单一入口流程**:
1. **tier3_launch.sh** — 自动完成: 创建目录 + 复杂度估计(扫描同行业报告) + Phase -1知识检索 + 进化教训 + launch_brief生成
2. **AI阅读 launch_brief.md** — 确认目标字符范围 + 参考报告 + 进化教训
3. **Phase -0.5 文献侦察** — 5路WebSearch → `lit_recon_memo.md` (≥1000字符)
4. **preflight_gate.sh** → **必须返回CLEARED**
5. Phase 0 数据预取 + Phase 0.5 CQ路由
6. **Phase 0.75 核心矛盾结晶** — 异常狩猎→约束碰撞→非共识假说登记 → `thesis_crystallization.md` (≥1500字符)
7. Phase 1 开始(**围绕核心矛盾组织**)

**纵深防御** (4层,每层重新验证前序):
- Layer 0: tier3_launch.sh (Phase -1自动化)
- Layer 1: preflight_gate.sh (Phase 0前硬阻断)
- Layer 2: phase_sentinel.sh (每Phase后自动重检全部前序) ← **嵌入phase_complete.sh**
- Layer 3: quality_gate_complete.sh (最终门控)

**即使用户只说"分析XX"**: AI也必须先运行tier3_launch.sh。这不是文本规则,是代码强制——sentinel在Phase 1后会检测到缺失的知识文件并发出BLOCK。

**禁止**: 跳过tier3_launch.sh直接开始Phase 0 | 忽略launch_brief中的参考范围 | 以"密度优先"为由输出极少字数(v19.1: 广度下限+密度门控双保险)
