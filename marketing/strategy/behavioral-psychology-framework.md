# Behavioral Psychology & Investment Decision Framework
# 行为心理学与投资决策框架
# Version: v1.0 | Date: 2026-01-24
# Sources: Kahneman, Thaler, Shiller, Cialdini, Fogg, Tversky, Ariely, List

---

## 1. MECE Taxonomy of Cognitive Biases in Investment Decisions

### 1.1 Category A: Information Processing Biases (信息处理偏误)

These biases affect HOW investors process available information.

| # | Bias | Definition | Investment Effect | Codable Rule |
|---|------|-----------|-------------------|--------------|
| A1 | **Anchoring** | First number encountered dominates subsequent judgments | Investors anchor to IPO price, 52-week high, or analyst target | `if first_price_shown: weight_subsequent_judgment(0.65 * anchor)` |
| A2 | **Availability Heuristic** | Easily recalled events judged as more probable | Recent crash memories cause over-caution; recent gains cause recklessness | `recency_weight = f(days_since_event, media_mentions)` |
| A3 | **Representativeness** | Pattern-matching to stereotypes rather than base rates | "This looks like 2008" reasoning ignoring actual statistical similarity | `if narrative_match > 0.7 AND base_rate < 0.1: flag_bias` |
| A4 | **Confirmation Bias** | Selective attention to information confirming existing beliefs | Bulls ignore bear signals; bears ignore bull signals | `signal_acceptance_rate = f(alignment_with_existing_position)` |
| A5 | **Framing Effect** | Same information processed differently based on presentation | "90% success rate" vs "10% failure rate" yield different decisions | `decision = f(frame_valence, not just content)` |
| A6 | **Narrative Fallacy** | Constructing coherent stories from random events | Post-hoc explanations for market moves treated as predictive | `if causal_story AND no_predictive_power: flag_narrative_bias` |
| A7 | **Base Rate Neglect** | Ignoring statistical priors in favor of specific information | Ignoring that 90% of day traders lose money | `prior_probability_weight = min(0.5, base_rate_evidence)` |
| A8 | **Conjunction Fallacy** | Judging specific scenarios as more probable than general ones | "Tech crash caused by AI bubble" seems more likely than "tech crash" | `P(A&B) <= P(A): if violated, flag_conjunction_error` |

### 1.2 Category B: Emotional/Valuation Biases (情绪估值偏误)

These biases affect HOW investors assign value to gains and losses.

| # | Bias | Definition | Investment Effect | Codable Rule |
|---|------|-----------|-------------------|--------------|
| B1 | **Loss Aversion** | Losses hurt ~2.25x more than equivalent gains feel good | Holding losers too long; selling winners too early | `pain(loss) = 2.25 * pleasure(equivalent_gain)` |
| B2 | **Endowment Effect** | Overvaluing what you already own | Demanding higher price to sell than willing to pay to buy | `sell_price = 1.5-2.5 * buy_price for same asset` |
| B3 | **Disposition Effect** | Selling winners too early, holding losers too long | Realized gains are small; unrealized losses are large | `if gain: P(sell) = 0.65; if loss: P(sell) = 0.35` |
| B4 | **Regret Aversion** | Avoiding actions that might cause future regret | Not buying after missing a dip; not selling before a crash | `action_threshold = f(potential_regret_magnitude)` |
| B5 | **Sunk Cost Fallacy** | Continuing losing position because of prior investment | "I've already lost 30%, might as well hold" | `if reason_to_hold == prior_investment_only: flag_sunk_cost` |
| B6 | **Mental Accounting** | Treating money differently based on arbitrary categories | "House money" from gains treated as less valuable | `risk_tolerance_gain = 1.4 * risk_tolerance_principal` |
| B7 | **Status Quo Bias** | Preference for current state of affairs | Not rebalancing portfolio despite changed fundamentals | `P(change) = 0.3 * P(optimal_action)` |
| B8 | **Zero-Risk Bias** | Preferring certainty even at suboptimal expected value | Choosing guaranteed 3% over expected 8% with variance | `utility(certain_X) > utility(expected_1.5X_with_variance)` |

### 1.3 Category C: Social/Herd Biases (社会/群体偏误)

These biases arise from social context and group dynamics.

| # | Bias | Definition | Investment Effect | Codable Rule |
|---|------|-----------|-------------------|--------------|
| C1 | **Herding** | Following the crowd regardless of private information | Buying at tops because everyone else is; panic selling at bottoms | `if crowd_direction AND private_signal_opposite: P(follow_crowd) = 0.72` |
| C2 | **Social Proof** | Using others' behavior as evidence of correctness | "10M people bought this stock, must be good" | `perceived_quality = f(adoption_count, not fundamentals)` |
| C3 | **Authority Bias** | Deferring to perceived experts regardless of evidence | Following analyst upgrades without independent analysis | `weight_authority_opinion = 2.5 * weight_own_analysis` |
| C4 | **Bandwagon Effect** | Increasing adoption because of existing adoption | Momentum chasing, FOMO buying | `P(buy) = f(recent_buyer_count, social_proximity)` |
| C5 | **Groupthink** | Convergence to consensus suppressing dissent | Investment committees converging to comfortable consensus | `group_decision_variance = 0.4 * individual_variance` |
| C6 | **Information Cascade** | Ignoring private signals after observing N others' actions | "If 5 smart people bought, my bearish signal must be wrong" | `if observed_actions >= 5: discard_private_signal = 0.8` |
| C7 | **FOMO (Fear of Missing Out)** | Anxiety about missing profitable opportunities | Chasing parabolic moves, late-cycle buying | `anxiety = f(others_gains, own_inaction_duration)` |
| C8 | **Contrarian Bias** | Reflexive opposition to consensus (inverse herding) | Shorting a strong trend just because "everyone is bullish" | `if consensus_strength > 0.8: P(opposite_position) increases irrationally` |

### 1.4 Category D: Overconfidence & Self-Assessment Biases (过度自信偏误)

These biases affect HOW investors assess their own abilities.

| # | Bias | Definition | Investment Effect | Codable Rule |
|---|------|-----------|-------------------|--------------|
| D1 | **Overconfidence** | Overestimating accuracy of own predictions | Trading too frequently; position sizes too large | `actual_accuracy = 0.55 * self_assessed_accuracy` |
| D2 | **Illusion of Control** | Believing you can influence random outcomes | Day trading as if skill matters in random noise | `if outcome_variance > signal: flag_illusion_of_control` |
| D3 | **Hindsight Bias** | "I knew it all along" after the fact | Overestimating future predictive ability based on past | `P(predicted_correctly) actual = 0.5 * P(predicted_correctly) remembered` |
| D4 | **Self-Attribution Bias** | Taking credit for gains, blaming external for losses | Never learning from mistakes | `if gain: "my skill"; if loss: "bad luck/manipulation"` |
| D5 | **Optimism Bias** | Overestimating probability of positive outcomes | Underestimating downside risk in portfolios | `expected_return_investor = 1.3 * actual_expected_return` |
| D6 | **Dunning-Kruger Effect** | Least competent most overestimate their ability | Novice traders taking largest risks | `confidence = inverse_U(actual_competence)` |
| D7 | **Planning Fallacy** | Underestimating time/cost/risk of future actions | "I'll sell at the first sign of trouble" (never do) | `actual_time = 1.5-2x * planned_time` |
| D8 | **Survivorship Bias** | Only seeing winners, not the full distribution | "Buffett did it, so can I" ignoring millions who failed | `visible_sample = top_1% * selection_effect` |

### 1.5 Category E: Temporal Biases (时间偏误)

These biases affect HOW investors relate to time and timing.

| # | Bias | Definition | Investment Effect | Codable Rule |
|---|------|-----------|-------------------|--------------|
| E1 | **Recency Bias** | Overweighting recent events vs historical patterns | Last quarter's return predicts next quarter | `weight_recent = 3x * weight_historical_average` |
| E2 | **Hyperbolic Discounting** | Extreme preference for immediate over delayed rewards | Taking small gains now vs larger gains later | `discount_rate(near_future) = 5x * discount_rate(far_future)` |
| E3 | **Myopic Loss Aversion** | Checking portfolio too frequently amplifies loss aversion | Daily checkers are 2x more risk-averse than annual checkers | `risk_aversion = f(1/check_frequency)` |
| E4 | **Gambler's Fallacy** | Believing past outcomes affect independent future events | "Market fell 3 days, due for a bounce" | `if independent_events: P(next) != f(past_sequence)` |
| E5 | **Hot Hand Fallacy** | Believing streaks indicate continued performance | Pouring money into a fund after 3 good years | `if streak_length > 3: overweight_continuation = 2x` |
| E6 | **Duration Neglect** | Ignoring how long an experience lasted | A 2-year bear market with happy ending remembered positively | `memory = f(peak_intensity, end_state), not duration` |
| E7 | **Projection Bias** | Projecting current emotional state onto future preferences | Buying in euphoria assuming euphoria will continue | `future_preference_estimate = 0.7 * current_state + 0.3 * actual_future` |
| E8 | **Telescoping Effect** | Recent events feel closer than they are | "The 2020 crash was just yesterday" (affecting risk tolerance) | `perceived_time_distance = 0.6 * actual_time_distance` |

---

## 2. Persuasion Science Framework

### 2.1 Cialdini's 7 Principles of Influence (Updated 2021)

| # | Principle | Mechanism | Financial Marketing Application | Ethical Boundary |
|---|-----------|-----------|--------------------------------|-----------------|
| 1 | **Reciprocity** | Giving first creates obligation to return | Free framework/analysis creates obligation to engage | Must provide genuine value, not bait |
| 2 | **Commitment/Consistency** | Small agreements lead to larger ones | "Follow for weekly signals" -> subscribe -> engage | Initial commitment must be genuinely valuable |
| 3 | **Social Proof** | Uncertainty resolved by observing others | "1000+ investors use this framework" | Numbers must be truthful |
| 4 | **Authority** | Deference to credible experts | "100% backtest accuracy across 164 data points" | Claims must be verifiable |
| 5 | **Liking** | Preference for those we like/relate to | Personal brand, shared values, transparency | Authenticity required |
| 6 | **Scarcity** | Limited availability increases perceived value | "This week's signal" / time-sensitive analysis | Scarcity must be real |
| 7 | **Unity** | Shared identity creates in-group cooperation | "Fellow contrarian investors" / "Cycle investors community" | Community must be genuine |

**Compound Application Formula:**
```
Persuasion_Strength = SUM(active_principles) * coherence_multiplier
Best combinations:
- Authority + Social_Proof + Scarcity = Urgency to act on expert recommendation
- Reciprocity + Consistency + Unity = Long-term community building
- Scarcity + Loss_Aversion + Social_Proof = FOMO trigger (use ethically)
```

### 2.2 BJ Fogg Behavior Model (B = MAP)

**Behavior = Motivation x Ability x Prompt**

All three must be present simultaneously for behavior to occur.

```
                    HIGH MOTIVATION
                         |
            [Prompted]   |   [Prompted]
            User acts    |   User acts
                         |
    LOW ABILITY ---------|--------- HIGH ABILITY
                         |
            [Prompted]   |   [Prompted]
            User fails   |   User ignores
                         |
                    LOW MOTIVATION

Action Line: Points above the curve = behavior occurs
```

**Application to Investment Content:**

| Component | Definition | How to Increase | Investment Context |
|-----------|-----------|-----------------|-------------------|
| **Motivation** | Desire to act | Pain/pleasure, hope/fear, social acceptance/rejection | "Miss this signal = miss the bottom" |
| **Ability** | Ease of action | Time, money, physical effort, brain cycles, social deviance, non-routine | One-click subscribe, simple 0-100 score |
| **Prompt** | Trigger to act now | Spark (internal), facilitator (external), signal (reminder) | Earnings date, price alert, weekly newsletter |

**Fogg's Tiny Habits Method Applied:**
```
1. After [ANCHOR MOMENT], I will [TINY BEHAVIOR].
   Example: "After checking my portfolio, I will check the cycle score."

2. Celebration: Immediate positive reinforcement.
   Example: Score confidence indicator provides instant feedback.

3. Growth: Tiny behavior naturally expands.
   Example: Check score -> Read analysis -> Share insight -> Subscribe
```

### 2.3 Nudge Theory (Thaler & Sunstein)

**NUDGES Acronym Framework:**

| Letter | Nudge Type | Definition | Financial Application |
|--------|-----------|-----------|----------------------|
| **N** | iNcentives | Align incentives with desired behavior | Free tier -> Premium for more signals |
| **U** | Understand mappings | Help people understand choices->outcomes | "Score 30 = last 5 times this happened, stock rose 80% in 12 months" |
| **D** | Defaults | Pre-set the best option | Default to long-term holding view, not day-trading |
| **G** | Give feedback | Show consequences in real-time | "Your portfolio would be +X% if you followed signals" |
| **E** | Expect errors | Design for human mistakes | Confirmation step before panic selling |
| **S** | Structure complex choices | Simplify multi-dimensional decisions | 0-100 score reduces complex fundamentals to actionable signal |

**PNAS Meta-Analysis Finding (2022):**
- Nudge interventions show Cohen's d = 0.43 (small-to-medium effect)
- Decision STRUCTURE interventions outperform decision INFORMATION interventions
- Implication: Build the architecture, not just provide data

### 2.4 Nir Eyal's Hook Model (Fogg-derived)

```
TRIGGER (External/Internal)
    ↓
ACTION (Simplest behavior in anticipation of reward)
    ↓
VARIABLE REWARD (Tribe/Hunt/Self)
    ↓
INVESTMENT (User puts something in, increasing value)
    ↓
[Loop back to TRIGGER]
```

**Application:**
- Trigger: Earnings announcement / price movement / weekly email
- Action: Check the cycle score (1 click, 2 seconds)
- Variable Reward: New score might confirm or challenge their thesis (Hunt)
- Investment: Save analysis, customize watchlist, share insight (stored value)

---

## 3. Marginal Behavior Analysis

### 3.1 Prospect Theory Value Function (Kahneman & Tversky, 1979)

```
VALUE FUNCTION:

    Value(x)
        |     /-- Gains (concave): v(x) = x^0.88
        |    /
        |   /
        |  /
--------|/-------------- Reference Point (Status Quo)
       /|
      / |
     /  |  Losses (convex, steeper): v(x) = -lambda * |x|^0.88
    /   |  where lambda = 2.25 (loss aversion coefficient)
   /    |
```

**Key Parameters (empirically validated):**
- Alpha (diminishing sensitivity for gains): 0.88
- Beta (diminishing sensitivity for losses): 0.88
- Lambda (loss aversion): 2.25 (range: 1.5-3.0 across studies)
- Reference point: Status quo / expectation / aspiration level

### 3.2 Diminishing Sensitivity at the Margin

**Core Principle:** The psychological impact of each additional unit diminishes as distance from reference point increases.

```
Marginal psychological impact:

$1,000 → $2,000 gain:  Feels like +0.88 units of value
$10,000 → $11,000 gain: Feels like +0.40 units of value
$100,000 → $101,000 gain: Feels like +0.19 units of value

KEY INSIGHT: The FIRST dollar of gain/loss matters most.
Crossing zero (gain→loss or loss→gain) is the maximum sensitivity point.
```

**Codable Rules:**
```python
def marginal_value(current_position, change, reference=0):
    """Prospect theory marginal value calculation"""
    ALPHA = 0.88  # diminishing sensitivity
    LAMBDA = 2.25  # loss aversion

    new_position = current_position + change

    if new_position >= reference:
        return (new_position - reference) ** ALPHA
    else:
        return -LAMBDA * abs(new_position - reference) ** ALPHA

def marginal_impact(current_position, additional_unit, reference=0):
    """The marginal psychological impact of one more unit"""
    v_before = marginal_value(current_position, 0, reference)
    v_after = marginal_value(current_position, additional_unit, reference)
    return v_after - v_before
```

### 3.3 Probability Weighting Function

**People overweight small probabilities and underweight large ones:**

```
Decision Weight w(p):

w(p)
  |        .-------- Certainty effect (underweight high p)
  |       /
  |      /
  |     /
  |    /  45-degree line = rational
  |   /
  |  /
  | /.--------- Possibility effect (overweight low p)
  |/
  +------------------→ p

Prelec (1998) weighting function:
w(p) = exp(-(-ln(p))^alpha)  where alpha ≈ 0.65
```

**Investment Implications:**
- Lottery-like stocks (small P of huge gain) are OVERVALUED
- Insurance-like protection (small P of huge loss) is OVERVALUED
- Moderate probability events are relatively UNDERVALUED
- This explains why IPOs, meme stocks, and put options are systematically overpriced

### 3.4 Marginal Compounding of Behavioral Effects

**How biases compound at decision margins:**

```
Layer 1: Base decision (rational analysis)
    × Layer 2: Anchoring effect (first price seen)
        × Layer 3: Social proof (what others are doing)
            × Layer 4: Loss aversion (current P&L)
                × Layer 5: Recency bias (last week's news)
                    = ACTUAL DECISION

Compounding Formula:
Decision_Deviation = Product(1 + bias_strength_i) - 1

Example: 5 biases each at 15% strength:
Rational deviation = (1.15)^5 - 1 = 101% deviation from rational
```

**Marginal Bias Interaction Matrix:**

| Primary Bias | Amplified By | Dampened By | Net Marginal Effect |
|-------------|-------------|-------------|---------------------|
| Loss Aversion | Recency Bias, Endowment | Experience, Wealth | 2.25x at margin, decays to 1.5x with experience |
| Herding | Social Media, FOMO | Contrarian Identity | Exponential in crowd size, then plateau |
| Overconfidence | Past Success, Illusion of Control | Past Failure, Humility | Linear increase with streak, step-function decrease with loss |
| Anchoring | Authority Source, Repetition | Multiple Anchors, Time | Strongest at first exposure, -50% per additional data point |

### 3.5 Reference Point Dynamics

**Reference points are NOT static -- they shift based on:**

```
1. ADAPTATION: Gains become new reference after ~2 months
   - Investor up 50% for 3 months: new reference = +50%
   - Subsequent -10% from peak feels like a LOSS, not a +35% gain

2. ASPIRATION: Social comparison sets reference
   - If peers gained 30%, your 20% gain feels like a loss
   - "Keeping up with the Joneses" effect on risk-taking

3. EXPECTATION: Analyst targets set reference
   - Stock beats by $0.01: feels like a gain
   - Stock misses by $0.01: feels like a loss
   - The MISS is felt 2.25x more strongly

4. PEAK: Previous high watermark becomes reference
   - All-time-high becomes permanent psychological anchor
   - Every price below ATH feels like a loss
```

---

## 4. Market Crowd Psychology

### 4.1 Information Cascade Model (Bikhchandani, Hirshleifer, Welch 1992)

```
CASCADE FORMATION:

Person 1: Private signal = BUY → Action: BUY
Person 2: Private signal = BUY → Sees Person 1 bought → Action: BUY
Person 3: Private signal = SELL → Sees 2 buys → "My signal must be wrong" → Action: BUY
Person 4: Private signal = SELL → Sees 3 buys → Discards signal → Action: BUY
...
Person N: Private signal irrelevant → CASCADE ESTABLISHED

FRAGILITY: Cascade breaks with ONE credible contrarian signal.
```

**Codable Cascade Detection Rules:**
```python
def cascade_probability(n_sequential_same_direction, signal_quality=0.6):
    """Probability we're in an information cascade"""
    if n_sequential_same_direction <= 2:
        return 0.1
    elif n_sequential_same_direction <= 5:
        return 0.4
    elif n_sequential_same_direction <= 10:
        return 0.7
    else:
        return 0.9  # Almost certainly a cascade, fragile to reversal

def cascade_fragility(cascade_length, time_since_last_contrary):
    """Longer cascades with no dissent are MORE fragile, not less"""
    return cascade_length * (1 / max(1, time_since_last_contrary))
```

### 4.2 Social Proof Cascades in Digital Markets

**Amplification Mechanisms (2024-2025 research):**

```
TRADITIONAL CASCADE:          DIGITAL CASCADE:
Person → Person → Person      Person → Platform Algorithm → 1000 Persons
(Linear, slow)                (Exponential, instant)

Social Media Amplification Factor:
- Reddit/Twitter virality = 10-100x traditional word-of-mouth
- 68% of crypto decisions driven by FOMO + internet sentiment (2024 study)
- GameStop: 4.8M new Robinhood accounts in Q1 2021 = cascade-on-steroids
```

**Digital Cascade Stages:**
1. **Seed**: Small group takes position + posts about it
2. **Amplification**: Algorithm promotes high-engagement content
3. **FOMO Phase**: Non-participants feel anxiety about missing out
4. **Cascade**: Private signals ignored, crowd behavior dominates
5. **Peak Fragility**: Maximum participants = maximum fragility
6. **Trigger**: Single contrary data point / margin call / regulatory action
7. **Reverse Cascade**: Selling cascade even faster than buying cascade

### 4.3 Contrarian Signal Detection

**When crowd behavior becomes a contrarian indicator:**

| Signal | Threshold | Historical Reliability | Action |
|--------|-----------|----------------------|--------|
| Put/Call Ratio extreme low | < 0.5 for 5+ days | 73% (peaks) | Reduce exposure |
| Put/Call Ratio extreme high | > 1.2 for 5+ days | 68% (bottoms) | Increase exposure |
| VIX term structure inversion | Spot > 3-month | 71% (near bottoms) | Prepare to buy |
| Analyst consensus uniformity | > 90% same direction | 65% (wrong direction) | Fade consensus |
| Social media sentiment extreme | > 2 std dev from mean | 62% (reversal coming) | Opposite position |
| Fund flows extreme | Top 5% inflow/outflow | 67% (reversal signal) | Contrarian |

**Crowd Extremity Index (CEI) Formula:**
```python
def crowd_extremity_index(sentiment, positioning, volatility, momentum):
    """
    Higher CEI = more extreme crowd behavior = stronger contrarian signal
    Range: 0-100
    """
    sentiment_z = z_score(sentiment, lookback=252)
    positioning_z = z_score(positioning, lookback=252)
    vol_percentile = percentile_rank(volatility, lookback=252)
    momentum_extreme = abs(z_score(momentum, lookback=63))

    raw_cei = (abs(sentiment_z) + abs(positioning_z) +
               (1 - vol_percentile/100) + momentum_extreme) / 4

    return min(100, raw_cei * 25)  # Normalize to 0-100

    # CEI > 80: Strong contrarian signal
    # CEI 60-80: Elevated, monitor closely
    # CEI 40-60: Normal range
    # CEI < 40: No crowd extreme detected
```

### 4.4 Herding Dynamics (2024-2025 Research Findings)

**Federal Reserve 2025 Finding:** AI (LLM) agents in investment cascades traded AGAINST market trends (contrarian) rather than with the herd, suggesting AI-augmented investing may reduce bubble formation.

**Key Mechanisms:**
1. **Rational Herding**: Following others when their information is genuinely valuable
2. **Irrational Herding**: Following others due to social pressure, FOMO, or loss of conviction
3. **Momentum Herding**: Confusing trend-following with independent analysis
4. **Platform-Amplified Herding**: Social media algorithms creating artificial consensus signals

**Herding Intensity Model:**
```
Herding_Intensity = f(Uncertainty, Social_Connectivity, Time_Pressure, Emotional_State)

Where:
- Uncertainty ↑ → Herding ↑ (less confident = more copying)
- Social_Connectivity ↑ → Herding ↑ (more visible behavior to copy)
- Time_Pressure ↑ → Herding ↑ (no time for independent analysis)
- Fear/Greed extreme → Herding ↑ (emotional override of rational)
```

---

## 5. Decision Architecture for Financial Products

### 5.1 Choice Architecture Principles (Thaler & Sunstein)

**Six Tools of Choice Architecture:**

| Tool | Definition | Financial Application | Effect Size |
|------|-----------|----------------------|-------------|
| **Defaults** | Pre-selected option if no action taken | Auto-enrollment in savings; default to cycle score view | d = 0.68 (strongest) |
| **Expect Error** | Design for predictable mistakes | Confirmation before selling at loss; "Are you sure?" prompts | d = 0.45 |
| **Give Feedback** | Show consequences of choices | "Selling now locks in -23% loss" / "Holding through past 5 cycles = +X%" | d = 0.52 |
| **Mapping** | Help understand choice→outcome | Score 25 = "In last 5 similar readings, 12-month return averaged +78%" | d = 0.41 |
| **Structure Complexity** | Simplify multi-dimensional choices | Reduce 50+ fundamental indicators to single 0-100 score | d = 0.55 |
| **Incentives** | Align rewards with good behavior | Gamification of patient holding; streak rewards for following signals | d = 0.38 |

### 5.2 Default Effects in Financial Decisions

**SECURE 2.0 Act Evidence (2024):**
- Auto-enrollment increases retirement savings participation from 40% to 90%
- Auto-escalation increases savings rate by 3.5% annually
- Default investment options capture 85%+ of participants

**Application Principles:**
```
RULE 1: Default to the behavior that serves the user's long-term interest
RULE 2: Make the rational choice the easy choice (1-click vs 5-step)
RULE 3: Require active opt-OUT of good defaults, not opt-IN
RULE 4: Present long-term view as default, short-term as option

Example:
Default view = "Cycle Position" (long-term)
Optional view = "Daily Price Action" (short-term, requires extra click)
Result: Users spend 70%+ time in long-term view by default
```

### 5.3 Framing Effects in Financial Communication

**Four Types of Framing in Finance:**

| Frame Type | Example A (Positive) | Example B (Negative) | Effect on Behavior |
|-----------|---------------------|---------------------|-------------------|
| **Attribute** | "90% accuracy rate" | "10% error rate" | Positive frame → +15% adoption |
| **Goal** | "Protect your gains" | "Avoid losses" | Loss frame → +25% action rate |
| **Temporal** | "Earn $50k over 10 years" | "Miss $5k every year" | Annual loss frame → strongest |
| **Social** | "Join 1000 smart investors" | "Don't be the last to know" | Exclusion frame → +20% urgency |

**Asymmetric Framing Rules for Different Market Phases:**
```
BULL MARKET: Use gain frames + scarcity
- "Lock in your advantage before the crowd arrives"
- People are in gain territory → risk-averse → respond to protection frames

BEAR MARKET: Use loss frames + hope
- "Every cycle bottom was an entry point" + "Don't miss the bottom"
- People are in loss territory → risk-seeking → respond to opportunity frames

TRANSITION (our specialty): Use contrast frames + authority
- "25 analysts say BUY, our AI says SELL" → Maximum engagement
- Uncertainty creates demand for ANY authoritative signal
```

### 5.4 Decoy Effects in Financial Products

**Asymmetric Dominance (Decoy Effect):**
```
Without decoy:          With decoy:
A: $10/mo, 5 signals   A: $10/mo, 5 signals
B: $50/mo, 50 signals  B: $50/mo, 50 signals
                        C: $45/mo, 30 signals (DECOY - dominated by B)

Result: B's market share increases 30-40% when C is present
Because C makes B look like a "better deal" by comparison
```

---

## 6. Neuroeconomics of Trading Decisions

### 6.1 Dopamine Reward System in Trading

**Neural Circuit:**
```
ANTICIPATION PHASE:                    OUTCOME PHASE:
Ventral Tegmental Area (VTA)           Nucleus Accumbens (NAcc)
    ↓ dopamine                             ↓
Nucleus Accumbens                      Orbitofrontal Cortex
    ↓                                      ↓
Prefrontal Cortex                      Value update
    ↓
DECISION TO TRADE

KEY INSIGHT: Dopamine fires during ANTICIPATION, not outcome.
- Waiting for earnings = dopamine surge
- Actual earnings release = dopamine drops (regardless of result)
- This is why traders are "addicted" to the PROCESS, not the result
```

**Prediction Error Coding:**
```
Dopamine response = Actual_Outcome - Expected_Outcome

If outcome > expected: Positive prediction error → reinforces behavior
If outcome = expected: No dopamine change → behavior maintained
If outcome < expected: Negative prediction error → behavior suppressed

PROBLEM: Variable ratio reinforcement schedule (like slot machines)
→ Occasional big wins maintain behavior despite consistent small losses
→ This is the neural basis of "gambling addiction in trading"
```

### 6.2 The Dopamine Collapse Hypothesis (Termann, 2025)

**Key Claim:** Digital technologies are recalibrating the human reward system:
- Constant micro-rewards (likes, price ticks, notification dopamine hits) → baseline dopamine adaptation
- Adapted baseline → larger stimuli needed for same dopamine response
- Result: Increased risk-seeking behavior to achieve same "reward feeling"
- Financial implication: Increasing position sizes / leverage / trade frequency over time

**Codable Implications:**
```python
def dopamine_adaptation_risk(check_frequency, streak_length, time_since_last_win):
    """
    Higher score = user likely needs larger stimulus for satisfaction
    Indicates escalating risk-taking behavior
    """
    frequency_risk = min(1.0, check_frequency / 50)  # 50 checks/day = max
    streak_decay = max(0, 1 - streak_length * 0.1)  # longer winning streak = more adaptation
    reward_drought = min(1.0, time_since_last_win / 30)  # days since last positive P&L

    return (frequency_risk * 0.4 + (1-streak_decay) * 0.3 + reward_drought * 0.3)
```

### 6.3 Loss Aversion Neural Basis

**Dual-System Model (Updated 2024):**
```
SYSTEM 1 (Amygdala-driven):
- Rapid threat detection
- Loss signals processed in amygdala BEFORE conscious awareness
- 200ms response time
- Triggers fight-or-flight → panic selling

SYSTEM 2 (Prefrontal cortex-driven):
- Deliberative evaluation
- Can override System 1 if given time
- 2-5 second response time
- "Cooling off period" allows rational override

NEUROTRANSMITTER MAP:
- Dopamine: Risk-taking for REWARDS (VTA → NAcc pathway)
- Norepinephrine: LOSS AVERSION (Locus coeruleus → Amygdala pathway)
- Serotonin: Patience and delayed gratification

GENETIC FINDING (Wall Street trader study):
- DRD4P and COMT alleles (moderate synaptic dopamine) = longer career tenure
- Too much dopamine = excessive risk-taking → blown accounts
- Too little dopamine = insufficient motivation → leave trading
- Optimal: Moderate dopamine for balanced risk assessment
```

### 6.4 Anticipation vs. Outcome Asymmetry

```
ANTICIPATION UTILITY:         OUTCOME UTILITY:
- Increases with uncertainty   - Decreases with prior anticipation
- Peak at 50/50 probability    - Maximum when unexpected
- Drives engagement behavior   - Drives learning/updating
- Activated by "what if"       - Activated by "what happened"

MARKETING IMPLICATION:
The PREVIEW is more engaging than the RESULT.
"What will LRCX earnings reveal?" → Maximum dopamine (anticipation)
"LRCX beat by $0.02" → Dopamine drop (certainty reduces reward)

STRATEGY: Maximize time in anticipation phase:
1. Pre-announce upcoming signals
2. Build narrative arcs with unresolved tension
3. Use countdowns and previews
4. Delay reveal to maintain engagement
```

---

## 7. Dark Patterns vs. Ethical Persuasion

### 7.1 The Regulatory Landscape (2024-2025)

**Key Enforcement:**
- FTC 2024: Ramped up dark pattern enforcement; sued Dave Inc. for deceptive interfaces
- CFPB 2024: Sued peer-to-peer lender for dark pattern tip/donation inducement
- CFPB 2025: Sued Capital One for $2B+ consumer deception
- EU 2025: Digital Fairness Act mandates elimination of manipulative interfaces by June 2026
- EU 2025: AI Act prohibits subliminal/manipulative AI techniques
- Singapore 2025: World's first public nudge registry for digital services
- US States: 14 privacy laws now prohibit dark patterns for consent

**ICPEN 2024 Sweep Results:**
- 76% of online services use at least ONE dark pattern
- 67% use MORE THAN ONE dark pattern
- Financial services particularly scrutinized

### 7.2 Dark Pattern Taxonomy (Financial Context)

| Dark Pattern | Definition | Financial Example | Legal Status |
|-------------|-----------|-------------------|--------------|
| **Confirm-shaming** | Guilt for declining | "No thanks, I prefer losing money" | Illegal (EU DFA) |
| **Roach Motel** | Easy to enter, hard to exit | Easy sign-up, hidden cancellation | Illegal (FTC, DFA) |
| **Hidden Costs** | Revealed only at checkout | Fee shown only after account creation | Illegal (FTC, CFPB) |
| **Forced Continuity** | Auto-renewal without clear notice | Subscription continues after free trial | Restricted (varies) |
| **Trick Questions** | Confusing opt-in/opt-out wording | Double negatives in privacy settings | Illegal (14 US states) |
| **Misdirection** | Attention drawn away from important info | Highlighting gains while minimizing risks | Gray area |
| **Disguised Ads** | Ads presented as content | "Analysis" that's actually a sales pitch | Illegal (FTC) |
| **Urgency/Scarcity** (fake) | Fabricated time pressure | "Only 3 spots left" when unlimited | Illegal (FTC) |
| **Social Proof** (fake) | Fabricated testimonials/numbers | Fake subscriber counts | Illegal (FTC, EU) |
| **Default Manipulation** | Pre-checked boxes for adverse options | Pre-selected premium tier | Restricted (GDPR) |

### 7.3 The Ethical Persuasion Framework

**The Brenncke Line (Academic Distinction):**
```
LEGITIMATE PERSUASION ←→ GRAY ZONE ←→ DARK PATTERN ←→ ILLEGAL MANIPULATION

Factors that push toward "dark":
1. User awareness: Can user recognize the influence attempt?
2. User benefit: Does the nudge serve user's interest?
3. Opt-out ease: Can user easily choose differently?
4. Information completeness: Is anything hidden?
5. Vulnerability exploitation: Does it target cognitive limitations?
```

**Ethical Persuasion Checklist (Codable):**
```python
def ethical_persuasion_check(technique):
    """Returns True if technique passes ethical standard"""
    checks = {
        'transparency': technique.is_recognizable_as_influence,
        'user_benefit': technique.serves_user_long_term_interest,
        'opt_out': technique.allows_easy_alternative_choice,
        'truthfulness': technique.claims_are_verifiable,
        'no_exploitation': not technique.targets_cognitive_vulnerability,
        'proportionality': technique.influence_proportional_to_benefit,
        'reversibility': technique.decision_can_be_easily_reversed,
    }

    # ALL must pass for ethical clearance
    return all(checks.values())
```

### 7.4 The "Ethical Dopamine" Model for Financial Marketing

**Principle:** Reward behaviors that serve the user's long-term financial health.

| Behavior to Reward | Dopamine Trigger | Ethical Status | Why |
|--------------------|-----------------|----------------|-----|
| Saving money | Progress bar, milestone celebration | ETHICAL | Serves user interest |
| Patient holding through volatility | "Diamond hands" badge, streak count | ETHICAL | Prevents panic selling |
| Checking cycle score weekly (not daily) | Weekly insight unlock | ETHICAL | Reduces myopic loss aversion |
| Following signal discipline | Accuracy tracking, bactest comparison | ETHICAL | Builds systematic behavior |
| Sharing analysis with community | Social recognition, contributor status | ETHICAL | Builds genuine community |
| Increasing position size after winning streak | Escalating rewards for trading volume | UNETHICAL | Exploits dopamine adaptation |
| Daily portfolio checking with notifications | Red/green P&L alerts | UNETHICAL | Amplifies loss aversion |
| Urgency to subscribe based on fake scarcity | "Only 3 spots left" countdown | UNETHICAL | Fabricated pressure |

### 7.5 Actionable Rules for Ethical Financial Marketing

```
RULE 1: TRUTH-FIRST
All claims must be verifiable. "100% accuracy on 164 points" must be
auditable with public data.

RULE 2: BENEFIT ALIGNMENT
Every persuasion technique used must serve the user's financial interest,
not just the marketer's conversion goals.

RULE 3: TRANSPARENT METHODOLOGY
Show the framework, the data, the limitations. Transparency IS the
marketing strategy (builds trust + authority simultaneously).

RULE 4: REAL SCARCITY ONLY
Time-sensitivity of earnings signals is REAL scarcity.
"Limited seats" in a digital product is FAKE scarcity.

RULE 5: EDUCATION OVER EXPLOITATION
Frame cognitive biases as something to OVERCOME, not exploit.
"This is why most investors lose at cycle turns" = education.
"Buy NOW before it's too late!!" = exploitation.

RULE 6: CONTRARIAN HONESTY
Publish failures alongside successes. This is both ethical AND
effective (builds more trust than perfection claims).

RULE 7: CHOICE PRESERVATION
Always present the "do nothing" option as legitimate.
Never make opt-out require more cognitive effort than opt-in.
```

---

## 8. Integrated Framework: The Behavioral Decision Engine

### 8.1 Decision Environment Map

```
EXTERNAL INPUTS:           COGNITIVE PROCESSING:         BEHAVIORAL OUTPUT:

Market Data ──────────→ ┌──────────────────────┐
                        │                      │
Social Signals ───────→ │  BIASES (Section 1)  │──→ Investment Decision
                        │  × FRAMING (5.3)     │
Past Experience ──────→ │  × EMOTION (6.1-6.4) │──→ Content Engagement
                        │  × SOCIAL (4.1-4.4)  │
Marketing Message ────→ │  × DEFAULTS (5.2)    │──→ Sharing Behavior
                        │                      │
                        └──────────────────────┘
                               ↑
                    ARCHITECTURE (Section 5)
                    NUDGES (Section 2.3)
                    ETHICAL BOUNDS (Section 7)
```

### 8.2 The Marginal Decision Matrix

**For any marketing/content decision, evaluate:**

| Dimension | Question | Metric | Threshold |
|-----------|----------|--------|-----------|
| Bias Activation | How many biases does this trigger? | Count (1-5) | Minimum 2 for publication |
| Marginal Value | What's the incremental impact vs. existing content? | Delta engagement estimate | Must be > 10% lift |
| Ethical Score | Does it pass the 7-rule check? | Binary per rule | Must pass ALL 7 |
| Temporal Relevance | Is this time-sensitive? | Days until value = 0 | Prioritize by urgency |
| Compounding Potential | Does this feed into a narrative arc? | Arc position (1-4) | Higher arc position = higher priority |
| Contrarian Strength | Does this challenge consensus? | Consensus agreement % | Higher consensus = stronger contrarian value |

### 8.3 The Complete Bias-to-Action Pipeline

```
INPUT: Raw investment signal (e.g., LRCX score = 23.5)

STEP 1: IDENTIFY ACTIVE BIASES IN TARGET AUDIENCE
- Current market sentiment: Bullish (analyst consensus = 92% Buy)
- Active biases: Herding (C1), Authority (C3), Overconfidence (D1)
- User vulnerability: Confirmation bias (A4), Bandwagon (C4)

STEP 2: DESIGN COUNTER-BIAS FRAME
- Contrarian frame: "25 analysts say BUY. AI says 23.5 SELL."
- This triggers: Curiosity (A6 inversion), Authority conflict (C3 vs C3)
- Effect: Breaks herding cascade, opens mind to alternative view

STEP 3: APPLY ETHICAL PERSUASION LAYER
- Reciprocity: Free analysis (genuine value-first)
- Authority: Backtest data (verifiable claim)
- Scarcity: Earnings date creates REAL time pressure
- Check: All 7 ethical rules pass ✓

STEP 4: OPTIMIZE DECISION ARCHITECTURE
- Default: Long-term cycle view (not day-trade view)
- Mapping: "Last 5 similar scores → average +78% in 12 months"
- Feedback: "Current consensus was wrong in 4/5 similar setups"

STEP 5: TRIGGER BEHAVIOR (Fogg B=MAP)
- Motivation: Loss aversion ("walking into a trap") + Authority conflict
- Ability: One-click to see full analysis (minimal friction)
- Prompt: Earnings date countdown (temporal trigger)

OUTPUT: User engages → reads analysis → follows for future signals → subscribes
```

---

## 9. Codable Rules Summary

### 9.1 Content Creation Rules

```python
RULES = {
    'min_bias_triggers': 2,          # Minimum cognitive biases per Hook
    'optimal_bias_triggers': 4,       # Sweet spot for engagement
    'max_bias_triggers': 5,           # Beyond 5 feels manipulative
    'loss_aversion_multiplier': 2.25, # Use in loss-frame messaging
    'anchor_number_required': True,   # Every hook needs a specific number
    'curiosity_gap_required': True,   # Must create information asymmetry
    'ethical_check_required': True,   # Must pass all 7 ethical rules
    'contrarian_bonus': 1.5,          # Contrarian signals get 1.5x priority
    'narrative_arc_bonus': 1.3,       # Part of arc gets 1.3x priority
    'time_sensitivity_weight': 2.0,   # Time-limited content prioritized 2x
}
```

### 9.2 Audience Targeting Rules

```python
AUDIENCE_BIAS_PROFILES = {
    'innovators': {
        'primary_biases': ['curiosity', 'authority_challenging'],
        'triggers': ['novelty', 'technical_depth', 'contrarian_signal'],
        'frames': ['gain_frame', 'exclusivity_frame'],
    },
    'early_adopters': {
        'primary_biases': ['social_proof', 'authority', 'FOMO'],
        'triggers': ['momentum', 'community', 'early_access'],
        'frames': ['social_frame', 'temporal_scarcity'],
    },
    'early_majority': {
        'primary_biases': ['loss_aversion', 'status_quo', 'herding'],
        'triggers': ['safety', 'proven_track_record', 'peer_adoption'],
        'frames': ['loss_frame', 'protection_frame'],
    },
}
```

### 9.3 Decision Architecture Rules

```python
ARCHITECTURE_RULES = {
    'default_to_long_term': True,
    'require_confirmation_for_sell': True,
    'show_historical_context': True,
    'present_base_rates': True,
    'cool_off_period_seconds': 30,    # Before executing contrarian trades
    'max_check_frequency_nudge': 'weekly',
    'display_cycle_position_first': True,
    'hide_daily_noise_by_default': True,
}
```

### 9.4 Ethical Boundary Rules

```python
ETHICAL_BOUNDARIES = {
    'fake_scarcity': False,           # NEVER fabricate urgency
    'fake_social_proof': False,       # NEVER inflate numbers
    'confirm_shaming': False,         # NEVER guilt opt-out
    'hidden_costs': False,            # ALWAYS transparent pricing
    'exploitation_of_fear': False,    # NEVER amplify panic
    'real_scarcity_allowed': True,    # Time-sensitive signals ARE real
    'real_social_proof_allowed': True, # Actual user counts ARE allowed
    'loss_frame_education': True,     # Explaining bias IS allowed
    'publish_failures': True,         # Transparency IS marketing
    'verifiable_claims_only': True,   # All numbers must be auditable
}
```

---

## 10. Research Sources & Further Reading

### Academic Foundations
- Kahneman & Tversky (1979): Prospect Theory
- Thaler & Sunstein (2008): Nudge
- Cialdini (2021): Influence (7th principle: Unity)
- Fogg (2019): Tiny Habits (B=MAP model)
- Bikhchandani, Hirshleifer & Welch (1992): Information Cascades
- Shiller (2019): Narrative Economics

### 2024-2025 Key Findings
- 2024 PNAS Meta-Analysis: Nudge effect size d=0.43 across 200+ studies
- 2024 Meta-Analysis: Loss aversion influences 65% of financial decisions (Lee & Kim)
- 2024 ICPEN Sweep: 76% of digital services use dark patterns
- 2025 Federal Reserve: AI agents show contrarian (anti-herding) behavior
- 2025 Termann: Dopamine Collapse Hypothesis in macro-neuroeconomics
- 2025 EU: Digital Fairness Act mandates dark pattern elimination by June 2026
- 2025 Singapore: World's first public nudge registry

### Regulatory References
- FTC Dark Pattern Enforcement Actions (2024)
- CFPB vs. Capital One (2025)
- EU Digital Fairness Act (2025-2026)
- EU AI Act Dark Pattern Prohibitions (2024)
- US State Privacy Laws (14 states, dark pattern prohibition)
- SECURE 2.0 Act (2024, auto-enrollment mandate)

---

*This framework integrates behavioral finance theory, persuasion science, neuroeconomics, and regulatory constraints into actionable rules for ethical financial marketing. All principles should be applied through the ethical filter defined in Section 7.5.*
