import json

# === MRVL DCF Model ===
# Base parameters
base_fcf = 1396  # FY2026 FCF $M
normalized_fcf = 1900  # Normalized for WC
wacc_base = 0.105
terminal_growth = 0.03
shares = 862  # M diluted
net_debt = 1831  # $M

# Growth rates (7-year high growth)
growth_rates_base = [0.25, 0.25, 0.25, 0.15, 0.15, 0.15, 0.15]

def dcf_calc(starting_fcf, growth_rates, wacc, g_terminal, net_debt, shares):
    fcfs = []
    pvs = []
    fcf = starting_fcf
    for i, gr in enumerate(growth_rates):
        fcf = fcf * (1 + gr)
        pv_factor = 1 / (1 + wacc) ** (i + 1)
        pv = fcf * pv_factor
        fcfs.append(round(fcf))
        pvs.append(round(pv))
    
    pv_fcfs = sum(pvs)
    terminal_fcf = fcfs[-1] * (1 + g_terminal)
    tv = terminal_fcf / (wacc - g_terminal)
    pv_tv = tv / (1 + wacc) ** len(growth_rates)
    ev = pv_fcfs + pv_tv
    equity = ev - net_debt
    per_share = equity / shares
    return {
        'fcfs': fcfs, 'pvs': pvs, 'pv_fcfs': round(pv_fcfs),
        'terminal_value': round(tv), 'pv_tv': round(pv_tv),
        'ev': round(ev), 'equity': round(equity),
        'per_share': round(per_share, 1)
    }

# Sensitivity matrix
print("=== MRVL DCF Sensitivity Matrix ===\n")
print("Starting FCF: Conservative $1,396M / Normalized $1,900M\n")

for label, start_fcf in [("Conservative ($1,396M)", base_fcf), ("Normalized ($1,900M)", normalized_fcf)]:
    print(f"\n--- {label} ---")
    print(f"{'WACC':<8}", end="")
    for g in [0.025, 0.030, 0.035]:
        print(f"  g={g:.1%}", end="")
    print()
    
    for wacc in [0.090, 0.095, 0.100, 0.105, 0.110, 0.115, 0.120]:
        print(f"{wacc:.1%}    ", end="")
        for g in [0.025, 0.030, 0.035]:
            result = dcf_calc(start_fcf, growth_rates_base, wacc, g, net_debt, shares)
            print(f"  ${result['per_share']:>6.0f}", end="")
        print()

# Base case detail
print("\n=== Base Case Detail (Normalized, WACC=10.5%, g=3.0%) ===")
r = dcf_calc(normalized_fcf, growth_rates_base, 0.105, 0.03, net_debt, shares)
print(f"Year FCFs: {r['fcfs']}")
print(f"Year PVs:  {r['pvs']}")
print(f"Sum PV FCFs: ${r['pv_fcfs']}M")
print(f"Terminal Value: ${r['terminal_value']}M")
print(f"PV of TV: ${r['pv_tv']}M")
print(f"Enterprise Value: ${r['ev']}M")
print(f"Equity Value: ${r['equity']}M")
print(f"Per Share: ${r['per_share']}")
print(f"vs Current $94.88: {(r['per_share']/94.88-1)*100:+.1f}%")

# Scenario analysis
print("\n=== Scenario DCFs ===")
scenarios = {
    'Bull (30%/20% growth)': ([0.30,0.30,0.30,0.20,0.20,0.20,0.15], normalized_fcf, 0.095),
    'Base (25%/15% growth)': ([0.25,0.25,0.25,0.15,0.15,0.15,0.15], normalized_fcf, 0.105),
    'Bear (15%/8% growth)':  ([0.15,0.15,0.15,0.08,0.08,0.08,0.08], base_fcf, 0.110),
    'Tail (5%/3% growth)':   ([0.05,0.05,0.05,0.03,0.03,0.03,0.03], base_fcf, 0.120),
}
for name, (grs, fcf, wacc) in scenarios.items():
    r = dcf_calc(fcf, grs, wacc, 0.03, net_debt, shares)
    print(f"{name}: ${r['per_share']}/share (EV ${r['ev']/1000:.1f}B)")

