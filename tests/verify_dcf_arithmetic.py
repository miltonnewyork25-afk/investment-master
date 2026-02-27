#!/usr/bin/env python3
"""ARM v2.0 DCF/情景 算术验证脚本
验证Phase 5情景P&L Build-out中的关键计算"""

import sys

WACC = 0.10
CURRENT_MCAP = 136.1  # $B
SHARES = 1.062  # B shares

errors = []
warnings = []

def check(name, calculated, expected, tolerance=0.05):
    """验证计算值与预期值的偏差"""
    if expected == 0:
        if abs(calculated) > 0.01:
            errors.append(f"FAIL {name}: calc={calculated:.3f} vs exp={expected:.3f}")
        return
    diff = abs(calculated - expected) / abs(expected)
    if diff > tolerance:
        errors.append(f"FAIL {name}: calc={calculated:.3f} vs exp={expected:.3f} (diff={diff:.1%})")
    else:
        print(f"  PASS {name}: {calculated:.3f} ≈ {expected:.3f} (diff={diff:.1%})")

print("=" * 60)
print("ARM v2.0 DCF 算术验证")
print("=" * 60)

# ---- S1: 芯片税帝国 ----
print("\n--- 情景1: 芯片税帝国 ---")
s1_ni = 4.56  # FY2030 NI $B
s1_pe = 33
s1_mcap_calc = s1_ni * s1_pe
check("S1 NI×P/E", s1_mcap_calc, 150.5, 0.02)  # 报告说$150B

s1_fcff = [0.3, 0.8, 1.5, 2.5, 3.8]
s1_pv_fcff = sum(f / (1 + WACC) ** i for i, f in enumerate(s1_fcff))
check("S1 PV(FCFF)", s1_pv_fcff, 6.75, 0.05)

s1_pv_tv = s1_ni * s1_pe / (1 + WACC) ** 4
check("S1 PV(TV)", s1_pv_tv, 102.8, 0.03)

# 收入CAGR
s1_rev_start = 4.9
s1_rev_end = 12.0
s1_cagr = (s1_rev_end / s1_rev_start) ** (1/4) - 1
check("S1 收入CAGR(4yr)", s1_cagr, 0.25, 0.10)  # ~25%

# 5年回报
s1_total_mcap = 160.0
s1_return = (s1_total_mcap / CURRENT_MCAP) ** (1/5) - 1
check("S1 年化回报", s1_return, 0.033, 0.10)

# ---- S2: 稳健增长 ----
print("\n--- 情景2: 稳健增长 ---")
s2_ni = 2.30
s2_pe = 28
s2_mcap_calc = s2_ni * s2_pe
check("S2 NI×P/E", s2_mcap_calc, 64.4, 0.02)

# P/E压缩效应
s2_earnings_growth = (s2_ni / 0.97)  # vs current NI $0.97B
s2_pe_compression = s2_pe / 141.6
s2_net = s2_earnings_growth * s2_pe_compression
check("S2 盈利增长倍数", s2_earnings_growth, 2.37, 0.05)
check("S2 P/E压缩倍数", s2_pe_compression, 0.198, 0.05)
print(f"  INFO S2 净效果: 盈利+{(s2_earnings_growth-1)*100:.0f}%, P/E {(s2_pe_compression-1)*100:.0f}%, net={s2_net:.3f}x")

# FY2030市值 vs 今天
s2_fy2030_mcap = 70.0  # 报告修正后
s2_return_5yr = s2_fy2030_mcap / CURRENT_MCAP - 1
check("S2 5年累计回报", s2_return_5yr, -0.49, 0.05)

# ---- S3: RISC-V侵蚀 ----
print("\n--- 情景3: RISC-V侵蚀 ---")
s3_ni = 1.43
s3_pe = 22
s3_mcap_calc = s3_ni * s3_pe
check("S3 NI×P/E", s3_mcap_calc, 31.5, 0.02)  # 报告说$31B

s3_fcff = [0.3, 0.5, 0.7, 0.9, 1.1]
s3_pv_fcff = sum(f / (1 + WACC) ** i for i, f in enumerate(s3_fcff))
check("S3 PV(FCFF)", s3_pv_fcff, 2.76, 0.05)

s3_pv_tv = s3_ni * s3_pe / (1 + WACC) ** 4
check("S3 PV(TV)", s3_pv_tv, 21.5, 0.03)

# ---- S4: SoftBank螺旋 ----
print("\n--- 情景4: SoftBank螺旋 ---")
s4_ni = 1.54
s4_pe = 16
s4_mcap_calc = s4_ni * s4_pe
check("S4 NI×P/E", s4_mcap_calc, 24.6, 0.02)

s4_pv_tv = s4_ni * s4_pe / (1 + WACC) ** 4
check("S4 PV(TV)", s4_pv_tv, 16.8, 0.05)

# ---- S5: 全面崩塌 ----
print("\n--- 情景5: 全面崩塌 ---")
s5_ni = 0.40
s5_pe = 10
s5_mcap_calc = s5_ni * s5_pe
check("S5 NI×P/E", s5_mcap_calc, 4.0, 0.02)

# ---- 概率加权期望值 ----
print("\n--- 概率加权期望值 ---")
probs = [0.12, 0.28, 0.33, 0.17, 0.10]
mcaps = [160.0, 70.0, 43.0, 35.0, 18.0]
check("概率和", sum(probs), 1.0, 0.001)

ev = sum(p * m for p, m in zip(probs, mcaps))
check("期望市值", ev, 60.7, 0.03)  # 修正: 报告原写$55.2B有误, 正确=$60.7B

ev_return = ev / CURRENT_MCAP - 1
check("期望回报", ev_return, -0.554, 0.05)  # 修正: -55.4%

# 最终估值锚
final_anchor = (100.0 + ev) / 2
check("最终估值锚", final_anchor, 80.4, 0.02)  # 修正: $80.4B
final_return = final_anchor / CURRENT_MCAP - 1
check("最终锚回报", final_return, -0.41, 0.05)  # 修正: -41%

# ---- 温度计 ----
print("\n--- 温度计验证 ---")
dims = [-1.8, -3.4, -2.9, 2.8, -2.4, 0.7, -0.2, 0.2, -1.0, 1.2]
weights = [0.10, 0.15, 0.15, 0.10, 0.10, 0.10, 0.05, 0.10, 0.05, 0.10]
check("权重和", sum(weights), 1.0, 0.001)

temp = sum(d * w for d, w in zip(dims, weights))
check("温度计综合", temp, -0.94, 0.05)

# ---- 6×6矩阵验证 ----
print("\n--- 6×6矩阵验证 ---")
rev_base = 8.0  # $B
nms = [0.40, 0.35, 0.28, 0.25, 0.20, 0.15]
pes = [15, 20, 25, 28, 33, 40]

# 抽查几个格
for nm in [0.40, 0.28]:
    for pe in [28, 40]:
        mcap = rev_base * nm * pe
        print(f"  CHECK NM={nm:.0%} P/E={pe}x → ${mcap:.0f}B")

# "审慎"判定: <$100B
count_cautious = sum(1 for nm in nms for pe in pes if rev_base * nm * pe < 100)
total = len(nms) * len(pes)
pct = count_cautious / total
check("审慎占比", pct, 0.93, 0.05)  # 报告说93%

# ---- CQ加权置信度 ----
print("\n--- CQ加权置信度 ---")
cq_conf = [57, 52, 58, 63, 65, 45]
cq_weight = [25, 20, 18, 15, 10, 12]
check("CQ权重和", sum(cq_weight), 100, 0.001)

weighted_conf = sum(c * w for c, w in zip(cq_conf, cq_weight)) / sum(cq_weight)
check("CQ加权置信度", weighted_conf, 57.1, 0.02)

# ---- CAPM验证 ----
print("\n--- CAPM验证 ---")
rf = 0.043  # 无风险利率
erp = 0.08 - rf  # 市场风险溢价
s1_beta = 1.5
s1_required = rf + s1_beta * erp
check("S1 CAPM要求回报", s1_required, 0.099, 0.05)

s1_annual = 0.033
s1_alpha = s1_annual - s1_required
check("S1 alpha", s1_alpha, -0.066, 0.15)

# ---- H1+H2协同概率 ----
print("\n--- 假说协同概率 ---")
h1_prob = 0.58
h2_prob = 0.50
synergy = 0.20  # 20%协同
h1h2_joint = h1_prob * h2_prob * (1 + synergy)
check("H1+H2协同概率", h1h2_joint, 0.35, 0.05)

# ---- 承重墙联合概率 ----
print("\n--- 承重墙联合概率(P4校准后) ---")
# B1-B6 各自成立概率 (从Phase 3/4)
b_probs = [0.55, 0.70, 0.30, 0.50, 0.65, 0.45]  # 估计值
joint = 1.0
for p in b_probs:
    joint *= p
print(f"  INFO 6墙联合(独立,估计概率)={joint:.3f} — 精确概率需从Phase 3/4报告读取")
# 校准后(含条件概率调整)
print(f"  INFO 独立假设联合={joint:.3f}, 校准后=0.020 (含条件概率)")

# ====== 汇总 ======
print("\n" + "=" * 60)
print(f"验证完成: {len(errors)} 个错误, {len(warnings)} 个警告")
if errors:
    print("\n错误列表:")
    for e in errors:
        print(f"  ❌ {e}")
    sys.exit(1)
else:
    print("✅ 所有算术验证通过")
    sys.exit(0)
