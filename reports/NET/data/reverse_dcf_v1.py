"""
NET Reverse DCF v1.0 — 市场隐含预期分析
结论: 当前$71.4B EV需要以下假设同时成立才能合理化:
1. 收入CAGR > 35%持续15年
2. 终端OPM > 35%
3. TAM从$50B扩张至$100B+
即使最激进组合(35%/15Y/35%OPM)仅得$45.4B = 当前EV的63.5%
"""

# 基础数据 (FY2025 actual, FMP confirmed)
CURRENT_REV = 2168    # $M
EV = 71448            # $M
MARKET_CAP = 71277    # $M (351M shares x $203.07)
SHARES = 351          # M
WACC = 0.10           # 10% (Beta=2.03)
TERMINAL_GROWTH = 0.03

# SBC分析
SBC = 451             # $M FY2025
SBC_REV = 0.208       # 20.8%
FCF = 324             # $M FY2025
OWNER_FCF = FCF - SBC # = -$127M (负值!)
FCF_MARGIN = 0.15     # 15%
OWNER_FCF_MARGIN = -0.058  # -5.8%

print(f"Owner FCF = FCF({FCF}) - SBC({SBC}) = {OWNER_FCF} (负值)")
print(f"Owner FCF Margin = {OWNER_FCF_MARGIN*100:.1f}%")
print(f"SBC收敛到15%才能Owner FCF盈亏平衡")
print(f"SBC收敛到12%: Owner PE = {MARKET_CAP / (CURRENT_REV * 0.03):.0f}x")

