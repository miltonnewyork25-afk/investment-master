# DOJ Antitrust Legal Frameworks: Investment Moat Analysis Application

> **Purpose**: Research memo mapping U.S. antitrust legal standards to investment moat analysis. NOT legal advice.
> **Date**: 2026-03-10
> **Application**: Enhancing competitive moat assessment methodology for equity research

---

## 1. Sherman Act Section 2: Monopolization

### 1.1 The Two-Element Test (Grinnell Corp., 1966)

The Supreme Court in *United States v. Grinnell Corp.*, 384 U.S. 563 (1966), established the foundational two-part test for monopolization under Section 2:

**Element 1: Possession of monopoly power in the relevant market**
- Monopoly power = "the power to control prices or exclude competition" in the relevant market
- This is distinct from mere market power; monopoly power represents a *substantial* degree of market power
- Economists define it as the ability to profitably price significantly above marginal cost for a sustained period

**Element 2: Willful acquisition or maintenance of that power**
- As distinguished from "growth or development as a consequence of a superior product, business acumen, or historic accident"
- The law punishes the *act* of monopolizing, not the *condition* of being a monopoly
- A firm that achieves monopoly purely through superior products/efficiency is not liable

### 1.2 Market Share Thresholds

Courts have established rough thresholds through case law (not statute):

| Market Share | Legal Presumption | Key Cases |
|---|---|---|
| **>70%** | Strong presumption of monopoly power | *Grinnell* (87%), *Alcoa* (90%) |
| **50-70%** | May constitute monopoly power with additional evidence | Case-by-case; durability matters |
| **<50%** | Generally insufficient to establish monopoly power | Rarely successful Section 2 claims |
| **<30%** | Almost never monopoly power | Courts routinely dismiss |

**Critical nuance**: Market share alone is necessary but not sufficient. Courts also examine:
- **Durability**: Shares must be stable over time, not fleeting
- **Barriers to entry**: High shares in easily-entered markets may not constitute monopoly power
- **Ability to raise prices**: Actual pricing behavior matters
- **Competitor dynamics**: Whether fringe competitors constrain pricing

**Investment moat mapping**: A company with 70%+ market share AND durable barriers to entry is, by DOJ standards, in monopoly territory. This is the legal equivalent of a "wide moat" --- but it comes with legal risk. The sweet spot for investors may be 40-65% share with strong barriers: enough pricing power to generate excess returns, but below the threshold that invites aggressive Section 2 scrutiny.

### 1.3 "Relevant Market" Definition

This is often the most contested element in antitrust cases. The relevant market has two dimensions:

**Product Market**: The set of products reasonably interchangeable by consumers for the same purpose. Determined by:
- Cross-elasticity of demand (do customers switch when prices change?)
- Functional interchangeability
- Industry recognition and practical indicia

**Geographic Market**: The area where the firm competes and to which consumers can turn for alternatives.

**Why this matters for investors**: Market definition *determines* market share. A narrow market definition yields high share (monopoly risk); a broad definition yields low share (weaker moat claim). When assessing a company's moat, an investor should ask: "How would a court define this company's relevant market?" --- because that determines whether the moat is legally sustainable or legally vulnerable.

---

## 2. DOJ/FTC 2023 Merger Guidelines

Released December 18, 2023, these guidelines replaced the 2010 Horizontal Merger Guidelines. While primarily governing merger review, they articulate the agencies' current framework for assessing market power, concentration, and competitive dynamics --- all directly relevant to moat analysis.

### 2.1 HHI Thresholds (Revised Downward)

The Herfindahl-Hirschman Index (HHI) = sum of squared market shares of all firms in a market.

| HHI Level | Classification | Interpretation |
|---|---|---|
| **<1,500** | Unconcentrated | Competitive market |
| **1,500-2,500** | Moderately concentrated | Some competitive concerns |
| **>2,500** | Highly concentrated | Significant competitive concerns |

**2023 Merger Presumption Triggers** (lowered from 2010 levels):
- Post-merger HHI > 1,800 AND HHI increase > 100 = presumptively illegal
- OR: Merger creates firm with > 30% market share AND HHI increase > 100 = presumptively illegal

**Removed safe harbors**: The 2010 guidelines had safe harbors for mergers with HHI increase < 100 or resulting HHI < 1,500. The 2023 guidelines eliminated these safe harbors entirely.

**Investment moat mapping**: HHI is a direct quantitative measure of market concentration and, by extension, pricing power sustainability. An HHI > 2,500 in a company's market suggests durable competitive advantages --- but also regulatory risk. For moat analysis, calculate the HHI of each market a company operates in. Markets with HHI > 2,500 tend to produce higher ROICs but face acquisition constraints (the company cannot easily acquire competitors without triggering review).

### 2.2 The 11 Guidelines (Summary)

The final 2023 guidelines consolidated the originally proposed 13 into 11, organized as six frameworks for identifying concerns and five for specific situations:

**Frameworks for Identifying Concerns (Guidelines 1-6):**

**Guideline 1: Concentration Presumption.** Mergers that significantly increase concentration in already highly concentrated markets are presumptively illegal. Quantitative triggers: post-merger HHI > 1,800 with delta > 100, or > 30% combined share with delta > 100. This is the "structural presumption" from *Philadelphia National Bank* (1963), now codified with specific numerical thresholds.

**Guideline 2: Elimination of Substantial Head-to-Head Competition.** Even without meeting HHI thresholds, a merger can be illegal if it eliminates substantial direct competition between the merging parties. Evidence includes: diversion ratios, customer switching patterns, competitive monitoring, and head-to-head bidding data.

**Guideline 3: Increased Risk of Coordination.** Mergers that increase the risk of tacit or explicit coordination among remaining competitors violate the law. Three primary factors: (1) market already highly concentrated, (2) prior actual or attempted coordination in the industry, (3) elimination of a "maverick" --- a firm that disrupts coordinated pricing.

**Guideline 4: Elimination of Potential Entrant.** A merger can be illegal if it eliminates a firm that had a reasonable probability of entering the market independently. This applies even if the acquiring firm is not yet competing in the target market. Two theories: (1) the firm was a perceived potential entrant whose presence on the sidelines disciplined pricing, or (2) the firm would have actually entered.

**Guideline 5: Vertical Foreclosure.** Mergers creating vertically integrated firms that could foreclose rivals from necessary inputs or access to customers. The agencies assess whether the merged firm would have the ability and incentive to raise rivals' costs or cut off access.

**Guideline 6: Entrenchment or Extension of Dominant Position.** Mergers by already-dominant firms that entrench their existing dominance or extend it into adjacent markets. This guideline signals heightened scrutiny for acquisitions by firms with existing market power --- directly relevant to "platform monopoly" theories.

**Application to Specific Situations (Guidelines 7-11):**

**Guideline 7: Industry Consolidation Trends.** When an industry is trending toward consolidation, the agencies consider whether a merger accelerates that trend toward monopoly or oligopoly. Even a merger that individually meets no threshold may be challenged as part of a broader consolidation pattern.

**Guideline 8: Serial Acquisitions / Roll-Ups.** The agencies may examine a series of acquisitions as a whole, even if each individual deal appears small. This is particularly relevant to private equity roll-up strategies. Each acquisition in a series need not independently violate Section 7; the cumulative effect matters.

**Guideline 9: Multi-Sided Platforms.** When a merger involves a multi-sided platform, the agencies examine competition between platforms, on a platform, and to displace a platform. This reflects the *Ohio v. American Express* framework but with a more aggressive enforcement posture.

**Guideline 10: Buyer-Side Competition (Monopsony).** Mergers between competing buyers that may reduce competition for workers, suppliers, or other providers. This extends antitrust concern beyond consumer prices to labor markets and supplier markets.

**Guideline 11: Partial Ownership and Minority Interests.** Even partial acquisitions or minority stakes can trigger scrutiny if they give the acquirer influence over a competitor's competitive behavior, access to competitively sensitive information, or financial interest in a competitor's success.

**Investment moat mapping**: Guidelines 4, 6, and 8 are most relevant to moat durability. Guideline 4 means a dominant firm cannot simply buy potential disruptors. Guideline 6 means dominant firms face extra scrutiny on any acquisition. Guideline 8 means roll-up strategies (common in fragmented industries) face cumulative scrutiny. For investors: a firm whose moat depends on serial acquisition (e.g., Danaher, Constellation Software, FICO's data partnerships) faces regulatory headwinds that may limit future M&A-driven growth.

### 2.3 Barriers to Entry in the Merger Guidelines

The 2023 guidelines assess whether entry or expansion by competitors would be "timely, likely, and sufficient" to counteract anticompetitive effects. Entry must be:
- **Timely**: Generally within two years
- **Likely**: Based on historical entry patterns and economic incentives
- **Sufficient**: Large enough in scale to restore competitive pricing

If barriers to entry are high, the market is considered less self-correcting, making antitrust intervention more likely. This directly maps to moat durability: barriers that keep out competitors also keep out regulatory "remedies" of new entry.

---

## 3. Market Power Assessment Methodology

### 3.1 SSNIP Test (Hypothetical Monopolist Test)

The Small but Significant Non-transitory Increase in Price test, introduced by DOJ in 1982, is the primary tool for defining relevant markets:

**Methodology**:
1. Start with the narrowest possible product market (the focal product)
2. Ask: Could a hypothetical monopolist of this product profitably impose a 5% price increase for at least one year?
3. If YES (enough customers stay) → this is a relevant market; the firm has market power
4. If NO (too many customers switch to substitutes) → expand the market definition to include the closest substitute; repeat

**Practical application**: A 5% price increase is the standard test level. If a company can raise prices 5% without losing enough customers to make the increase unprofitable, it has market power by DOJ standards.

**Investment moat mapping**: The SSNIP test is essentially a *pricing power test* --- the same concept investors use to assess moat quality. A company that passes the SSNIP test (can profitably raise prices 5%+ without significant customer loss) has what investors would call pricing power. Companies like FICO, Visa, and MSCI routinely pass this test in their core markets.

### 3.2 Critical Loss Analysis

Critical loss analysis operationalizes the SSNIP test:

**Critical Loss** = the maximum percentage of sales a firm can lose from a price increase before the increase becomes unprofitable.

**Formula**: Critical Loss = Price Increase / (Price Increase + Margin)

For a 5% price increase:
- At 50% gross margin: Critical Loss = 5% / (5% + 50%) = 9.1% --- the firm can lose up to 9.1% of unit sales and still profit
- At 80% gross margin: Critical Loss = 5% / (5% + 80%) = 5.9% --- the higher the margin, the *lower* the critical loss (smaller cushion)
- At 30% gross margin: Critical Loss = 5% / (5% + 30%) = 14.3% --- lower margins allow more room for customer loss

**The paradox**: High-margin businesses (like software/scoring companies) have lower critical loss thresholds, meaning they need to retain a higher percentage of customers to profit from price increases. However, high margins may themselves indicate that the firm *already has* substantial market power.

**Actual Loss** is then compared to Critical Loss:
- If Actual Loss < Critical Loss → price increase is profitable → firm has market power in this market
- If Actual Loss > Critical Loss → price increase is unprofitable → market must be defined more broadly

**Investment moat mapping**: Critical loss analysis is a rigorous framework for quantifying pricing power. For any company with gross margins > 60%, even modest customer retention (>94%) makes price increases profitable. This explains why software, data/analytics, and scoring companies (FICO, MSCI, S&P Global) can sustain aggressive price increases year after year.

### 3.3 The Cellophane Fallacy

Named after *United States v. E.I. du Pont de Nemours & Co.*, 351 U.S. 377 (1956):

**The problem**: DuPont argued cellophane was not a separate market because at current prices, customers could substitute to other flexible wrapping materials (wax paper, foil, polyethylene). The Supreme Court accepted this argument and found no monopoly.

**The fallacy**: The Court defined the market at monopoly prices rather than competitive prices. At monopoly prices, cross-elasticity with substitutes appears high (because the monopolist has already pushed prices to the point where marginal customers start switching). But at competitive prices, cellophane would have had far fewer substitutes.

**Why it matters**: If you define the market at *current* prices (which may already reflect monopoly pricing), you overstate the availability of substitutes and understate the firm's market power.

**Investment moat mapping**: The Cellophane Fallacy is directly applicable to moat analysis. When assessing "competitive alternatives," investors must ask: are these alternatives *actually* competitive at normal prices, or do they only appear competitive because the dominant firm has already raised prices to monopoly levels? This is particularly relevant for FICO --- VantageScore appears to be a "competitor," but FICO's entrenched position in mortgage underwriting (mandated by GSEs until recently) means that VantageScore only competes at the margins where FICO's pricing has pushed buyers to seek alternatives. At competitive prices, FICO might have even fewer substitutes.

### 3.4 Lerner Index

The Lerner Index measures market power as the markup of price over marginal cost:

**Formula**: L = (P - MC) / P

Where:
- L = 0 → perfect competition (price = marginal cost)
- L = 1 → maximum monopoly power (marginal cost = 0)
- Higher L → greater market power

**Practical interpretation**:
- L < 0.2 → competitive market, limited pricing power
- L = 0.2-0.5 → moderate market power, some moat
- L > 0.5 → substantial market power, strong moat indicator
- L > 0.7 → near-monopoly pricing power

**Relationship to elasticity**: L = 1 / |Ed| where Ed is the price elasticity of demand. Inelastic demand (|Ed| < 1) implies L > 1, which is theoretically impossible under profit-maximization --- suggesting that non-price barriers (switching costs, regulation, bundling) prevent customer departure.

**Investment moat mapping**: The Lerner Index maps directly to gross margin analysis. A software company with 85% gross margins has a Lerner Index of approximately 0.85 (assuming marginal cost is roughly COGS/unit). This is near-monopoly territory by antitrust standards. For moat scoring: compute L = 1 - (COGS/Revenue) as a rough proxy, then compare across competitors and industry.

---

## 4. Barriers to Entry: DOJ Classification

The DOJ and courts recognize three broad categories of barriers, with a critical distinction between "durable" and "temporary."

### 4.1 Structural Barriers (Inherent to Industry Economics)

These arise from fundamental industry conditions, not incumbent behavior:

**Economies of Scale**: When minimum efficient scale is a large fraction of market demand, new entrants must either enter at large scale (high risk) or operate at sub-scale (high costs). *Example*: Semiconductor fabrication (TSM), credit scoring algorithms (FICO).

**Network Effects**: The value of the product increases with the number of users. Direct network effects (social media, payment networks) and indirect network effects (platforms, ecosystems). Once established, network effects create a self-reinforcing moat. *Example*: Visa/Mastercard payment networks, FICO score ubiquity in lending decisions.

**Intellectual Property**: Patents, trade secrets, proprietary data, and algorithmic advantages that cannot be legally replicated. Duration matters --- patent-based barriers expire; data-based barriers can be perpetual. *Example*: FICO's proprietary scoring models, trained on decades of credit outcome data.

**Capital Requirements**: When entry requires massive upfront investment with long payback periods. Combines with sunk cost risk to deter entry. *Example*: Building a comprehensive credit bureau, semiconductor fabs.

**Sunk Costs**: Costs that cannot be recovered upon exit. Many commentators now view sunk costs as one of the two main sources of entry barriers (alongside regulatory barriers). High sunk costs increase the risk of entry and thus deter potential competitors.

**Switching Costs**: Costs customers incur when changing suppliers --- financial, procedural, and relational. In antitrust analysis, high switching costs mean that even a superior product may not attract customers. *Example*: FICO scores embedded in lending workflows, compliance systems, and regulatory requirements.

### 4.2 Strategic Barriers (Created by Incumbents)

These are intentionally created or enhanced by incumbent firms:

**Exclusive Dealing**: Contracts requiring customers or distributors to deal exclusively with the incumbent. Legal when they serve legitimate business purposes; illegal when they substantially foreclose competition. *Example*: Google's default search agreements (found illegal in 2024).

**Predatory Pricing**: Pricing below cost to drive out competitors, with intent to raise prices after competitors exit. Legal standard (*Brooke Group*, 1993): (1) prices below an appropriate measure of cost, AND (2) dangerous probability of recouping losses. Extremely difficult to prove.

**Tying and Bundling**: Conditioning the sale of one product on purchase of another. Illegal when the seller has market power in the tying product and the arrangement forecloses a substantial volume of commerce in the tied product. *Example*: Microsoft bundling IE with Windows.

**Raising Rivals' Costs**: Actions that increase competitors' costs without improving the incumbent's product. Can include lobbying for regulations, controlling critical inputs, or manipulating standards. *Example*: Controlling access to essential data inputs, manipulating industry standards bodies.

**Most-Favored-Nation (MFN) Clauses**: Contractual provisions requiring suppliers to offer the incumbent the best available terms. Can prevent competitors from offering lower prices.

### 4.3 Regulatory Barriers (Government-Created)

**Licensing and Certification**: Government requirements that limit market entry. *Example*: Banking charters, pharmaceutical FDA approval.

**Government Mandates**: When regulations effectively mandate use of a specific product or standard. *Example*: GSE (Fannie Mae/Freddie Mac) requirements that historically mandated FICO scores for mortgage qualification --- this was arguably FICO's single strongest moat element.

**Data Privacy and Security Regulations**: Compliance requirements that increase the cost and complexity of entry, especially in financial services.

**Standards and Interoperability**: Government-mandated standards can either reduce barriers (by enabling interoperability) or increase them (by favoring incumbents who shaped the standard).

### 4.4 Durable vs. Temporary Barriers

The DOJ distinguishes between barriers based on their expected persistence:

**Durable Barriers**:
- Network effects with strong lock-in (payment networks, scoring systems)
- Regulatory mandates (until regulations change)
- Data advantages that compound over time
- Ecosystem lock-in with high switching costs
- Patent portfolios with staggered expirations

**Temporary Barriers**:
- First-mover advantage without structural reinforcement
- Brand recognition without switching costs
- Price advantages from temporary cost structures
- Technology leads without IP protection

**Investment moat mapping**: The DOJ's "timely, likely, and sufficient" test for entry maps directly to moat durability analysis. For each barrier, ask: (1) Can a new entrant overcome this barrier within 2 years? (2) Is there economic incentive to do so? (3) Would entry at necessary scale be feasible? If all three answers are "no," the barrier is durable by DOJ standards --- and the moat is wide by investment standards. The key insight is that *combinations* of barriers are far more durable than individual barriers. FICO, for example, combines network effects + regulatory mandates + switching costs + data advantages + IP --- each barrier reinforces the others, creating what antitrust scholars call a "barrier stack."

---

## 5. Key Precedent Cases

### 5.1 United States v. AT&T (1982) --- Infrastructure Monopoly Breakup

**Facts**: AT&T's Bell System held a virtual monopoly over U.S. telephony infrastructure, consisting of AT&T (long-distance), 24 local Bell Operating Companies, Western Electric (manufacturing), and Bell Labs (R&D). The DOJ filed suit in 1974.

**Resolution**: The 1982 Consent Decree (Modification of Final Judgment) required AT&T to divest its local operating companies into seven independent Regional Bell Operating Companies ("Baby Bells"). In exchange, AT&T was freed to enter the computer market.

**Key principles established**:
- Vertical integration controlling essential infrastructure can constitute illegal monopolization
- Structural remedies (breakup) are appropriate when behavioral remedies are insufficient
- The divestiture must separate the competitive segments from the monopoly segments

**Moat relevance**: AT&T's moat was infrastructure-based (physical network) + regulatory (government-granted monopoly). The case shows that *government-granted* moats are revocable. Companies whose moat depends on regulatory favor (like FICO's GSE mandates) face the same risk: the government that granted the advantage can withdraw it.

### 5.2 United States v. Microsoft (2001) --- Platform Monopoly and Tying

**Facts**: DOJ alleged Microsoft monopolized the market for Intel-compatible PC operating systems through anticompetitive conduct, including tying Internet Explorer to Windows and exclusive dealing arrangements with OEMs.

**District Court findings**:
- Microsoft held monopoly power in Intel-compatible PC operating systems (95%+ share)
- Microsoft illegally maintained this monopoly through anticompetitive conduct
- Microsoft illegally tied IE to Windows (separate products under "separate demand" test)
- Microsoft attempted to monopolize the browser market

**D.C. Circuit outcome (2001)**: Upheld the finding of monopoly maintenance but reversed the breakup remedy. Found that traditional antitrust analysis needed adaptation for software markets with network effects. The tying claim was remanded for analysis under a rule of reason (rather than per se illegality) given the unique characteristics of software integration.

**Key principles established**:
- Network effects can create and sustain monopoly power in technology markets
- The "applications barrier to entry" --- developers write for the dominant platform, reinforcing its dominance --- is a cognizable entry barrier
- Integration of features into a dominant product can be anticompetitive tying, but courts will apply rule of reason in dynamic technology markets
- Behavioral remedies (API access, licensing terms) may be preferred over structural remedies in tech

**Moat relevance**: Microsoft's moat was network effects (developers + users feedback loop) + switching costs + bundling. The case established that platform network effects are legally recognized barriers to entry. For investors analyzing platform businesses (Visa, FICO, app stores), the Microsoft precedent confirms that these moats are real and durable --- but also that leveraging a platform monopoly into adjacent markets invites antitrust action.

### 5.3 United States v. Google (2024-2025) --- Search Monopoly and Default Agreements

**Facts**: DOJ alleged Google illegally maintained monopolies in general search services and general text advertising through exclusive default search agreements with Apple (Safari), Mozilla (Firefox), Android OEMs, and wireless carriers.

**Liability ruling (August 5, 2024)**: Judge Amit Mehta found Google guilty of illegally maintaining a monopoly in general search services (~88% domestic market share) and general text advertising. The default agreements were found to be exclusionary, foreclosing rival search engines from critical distribution channels.

**Remedies ruling (September 2, 2025)**: The court rejected DOJ's proposals for divestiture of Chrome and Android. Instead, it ordered behavioral remedies: Google is barred from entering or maintaining exclusive contracts for distribution of Google Search, Chrome, Google Assistant, and the Gemini AI app.

**Key principles established**:
- Default agreements, while seemingly innocuous, can constitute anticompetitive exclusionary conduct when they foreclose a dominant share of distribution channels
- Paying to be the default is legally distinct from competing on product quality
- Even if users can change defaults, the behavioral inertia of defaults creates a meaningful competitive barrier
- In digital markets, distribution channel control may be as important as product quality
- Courts increasingly prefer behavioral remedies over structural breakups in tech

**Moat relevance**: Google's moat was data network effects + default distribution agreements + search quality (which itself depended on scale). The ruling highlights a critical moat risk: moats built on *distribution agreements* rather than pure product superiority are legally vulnerable. For FICO analysis: if FICO's dominance rests partly on contractual arrangements (e.g., GSE mandates, exclusive data agreements with bureaus), these are the types of moat elements most vulnerable to antitrust challenge.

### 5.4 United States v. Apple (2024) --- Smartphone Ecosystem Lock-In

**Facts**: In March 2024, DOJ and 16 state AGs sued Apple under Section 2, alleging monopolization of "performance smartphones" through ecosystem lock-in tactics: degrading cross-platform messaging (green bubbles), blocking "super apps," limiting non-Apple smartwatch functionality, restricting cloud streaming game apps, and limiting third-party digital wallets.

**Procedural status**: In June 2025, the court denied Apple's Motion to Dismiss, finding that DOJ's allegations regarding market definition and exclusionary conduct were sufficient to proceed to trial.

**Key principles being tested**:
- Whether "performance smartphones" is a cognizable relevant market (narrower than "all smartphones")
- Whether ecosystem lock-in through interoperability restrictions constitutes anticompetitive conduct
- Whether degrading competitor functionality (rather than improving your own product) is exclusionary
- The boundary between product design choices and anticompetitive conduct

**Moat relevance**: Apple's alleged moat mechanism --- making its ecosystem so interconnected that switching costs become prohibitive --- is precisely the kind of moat investors prize. The case tests whether *ecosystem lock-in as a business strategy* can cross the line into illegal monopolization. If DOJ prevails, it would suggest that any company deliberately increasing switching costs (rather than organically delivering value) faces legal risk.

### 5.5 FTC v. Meta/Facebook (2020-2025) --- Network Effects and Killer Acquisitions

**Facts**: FTC alleged Meta maintained a monopoly in "personal social networking" through a "buy or bury" strategy, specifically the acquisitions of Instagram (2012) and WhatsApp (2014). The FTC sought divestiture (breakup of Instagram and WhatsApp from Facebook).

**Outcome (November 2025)**: Judge Boasberg ruled for Meta after a six-week bench trial. The court found that the FTC failed to prove Meta *currently* holds a monopoly in personal social networking. Key reasoning: the market had evolved since the acquisitions, with TikTok and YouTube now providing substantial competition. Under an expanded market definition that included these platforms, Meta did not hold monopoly power.

**Key principles established**:
- Market definition is assessed at the *time of trial*, not at the time of the allegedly anticompetitive conduct
- Markets can evolve rapidly, especially in technology, undermining historical monopoly claims
- The FTC's narrow market definition ("personal social networking" excluding video platforms) was rejected as outdated
- Retroactive merger challenges face a high burden: the agency must prove *current* monopoly power, not just historical power

**Moat relevance**: The Meta case is a cautionary tale for moat analysis. Markets evolve. What looked like an impregnable social networking monopoly in 2014 (Facebook + Instagram + WhatsApp) was substantially eroded by TikTok's emergence. For investors: even "wide moat" companies face disruption from adjacent markets and new platform paradigms. The legal standard --- current monopoly power, not historical --- aligns with the investment principle that moats must be *forward-looking*.

### 5.6 Ohio v. American Express (2018) --- Two-Sided Markets

**Facts**: DOJ and several states challenged American Express's anti-steering provisions, which prevented merchants from encouraging customers to use lower-fee cards. Amex argued that its two-sided platform (merchants + cardholders) must be analyzed as a single market.

**Supreme Court ruling (5-4)**: The Court agreed with Amex. For two-sided transaction platforms, both sides of the market must be considered together when assessing anticompetitive effects. The government had only shown harm on the merchant side (higher fees) without demonstrating net harm across both sides (merchants + cardholders, who received rewards funded by the higher fees).

**Key principles established**:
- Two-sided transaction platforms constitute a single relevant market for antitrust purposes
- Plaintiffs must show anticompetitive effects on *both* sides of the platform, not just one
- Higher prices on one side may be offset by benefits on the other side
- This creates a higher burden for antitrust enforcement against platform businesses

**Moat relevance**: The *Amex* decision provides strong legal protection for two-sided platform moats. Companies operating two-sided markets (Visa/Mastercard, app stores, marketplaces) can argue that higher fees on one side fund benefits on the other side --- and antitrust plaintiffs must disprove this across the entire platform. This makes two-sided platform moats *more legally durable* than single-sided moats. However, the decision was 5-4 and remains controversial; future courts may narrow its application.

### 5.7 FICO Antitrust Litigation (2020-Present)

**Facts**: At least 10 antitrust class action lawsuits were filed against FICO between 2020-2023, alleging FICO maintains monopoly power in the B2B credit scoring market through anticompetitive agreements and practices that cause buyers to overpay for credit scores.

**Key allegations**:
- FICO holds approximately 90% of the B2B credit scoring market
- FICO engaged in "unlawful, interconnected, and mutually reinforcing anticompetitive and exclusionary acts and agreements"
- FICO has "only continued to increase prices" leveraging its monopoly position
- Violations of Section 2 of the Sherman Act

**Procedural status**: FICO's motion to dismiss the monopolization claims was denied, meaning the case proceeds to discovery and potentially trial. The court found the allegations sufficient to state a claim.

**Government scrutiny**: The DOJ opened and closed an antitrust investigation in 2020. Senator Josh Hawley called for renewed DOJ investigation in April 2025, citing FICO's "apparently anticompetitive practices" and "monopoly power."

**Specific claims relevant to moat analysis**:
- FICO's contractual arrangements with the three credit bureaus (Equifax, Experian, TransUnion) allegedly create exclusive or near-exclusive dealing
- FICO's pricing practices allegedly exploit its monopoly position (prices have consistently increased despite no proportional improvement in product)
- The GSE mandate (Fannie Mae/Freddie Mac requiring FICO scores for conventional mortgages) creates a government-enforced monopoly --- though this is now changing with FHFA's approval of VantageScore
- FICO's data relationships create a barrier: the scoring model is trained on bureau data, and its performance advantage may be self-reinforcing

**Moat risk assessment**: The FICO litigation identifies the precise mechanisms of FICO's moat and challenges them as anticompetitive. For investors, this litigation defines the moat risk frontier: (1) if FICO's exclusive arrangements with bureaus are struck down, competitors gain access to critical distribution; (2) if FICO's pricing practices are found anticompetitive, remedies could cap or roll back prices; (3) the ongoing shift from mandatory FICO-only to FICO-or-VantageScore in GSE underwriting is already eroding the regulatory barrier element of the moat.

---

## 6. "Competition on the Merits" Defense

### 6.1 What Makes Monopoly Power Legal

The Grinnell test explicitly carves out lawful monopoly acquisition:

> "The offense of monopoly under Section 2 of the Sherman Act has two elements: (1) the possession of monopoly power in the relevant market; and (2) the willful acquisition or maintenance of that power **as distinguished from growth or development as a consequence of a superior product, business acumen, or historic accident.**"

A firm can legally hold 90%+ market share if that share results from:

**Superior Product**: Building a genuinely better product that customers prefer. The key question is whether dominance stems from product quality or from exclusionary conduct. If customers choose your product because it is better, not because alternatives are blocked, the monopoly is lawful.

**Business Acumen**: Superior management, strategy, cost efficiency, or operational excellence. Being better at business is not a crime, even if it results in competitors failing.

**Historic Accident**: Being in the right place at the right time --- first-mover advantage, path dependency, or luck. If monopoly power arose from circumstances rather than predatory conduct, it is lawful.

### 6.2 When Aggressive Pricing Becomes "Predatory"

The legal standard for predatory pricing, established in *Brooke Group Ltd. v. Brown & Williamson Tobacco Corp.*, 509 U.S. 209 (1993), requires two elements:

**Element 1 --- Below-Cost Pricing**: The defendant's prices must be below an appropriate measure of cost. Courts debate which cost measure is appropriate:
- Average Variable Cost (AVC): Prices below AVC are presumptively predatory (*Areeda-Turner* test)
- Average Total Cost (ATC): Some courts use ATC, which includes fixed costs
- Long-Run Average Incremental Cost (LRAIC): Used in some jurisdictions for multi-product firms

**Element 2 --- Dangerous Probability of Recoupment**: The defendant must have a "dangerous probability" of recouping its investment in below-cost pricing through later monopoly profits. Without this element, below-cost pricing is pro-consumer (cheap prices benefit buyers).

**Why predatory pricing claims almost always fail**: Element 2 is extremely difficult to prove. Markets with low barriers to entry make recoupment unlikely (new competitors enter when prices rise). Courts are reluctant to condemn low prices, which are generally pro-consumer.

**Moat relevance**: The near-impossibility of proving predatory pricing means that companies can aggressively price to build market share without significant antitrust risk, *as long as prices remain above some measure of cost*. This is relevant for understanding competitive dynamics: an incumbent with scale advantages (lower unit costs) can legally price at levels that are above its own costs but below competitors' costs, creating a legitimate cost-based moat.

### 6.3 When Exclusive Dealing Becomes Anticompetitive

Exclusive dealing is analyzed under a rule of reason, balancing procompetitive justifications against anticompetitive effects:

**Procompetitive justifications for exclusive dealing**:
- Protects specific investments by the manufacturer in the dealer
- Prevents free-riding on promotional efforts
- Ensures supply reliability
- Aligns incentives in the distribution chain

**When exclusive dealing becomes anticompetitive**:
- When it forecloses a substantial share of the relevant market to competitors (typically >30-40% foreclosure raises concern)
- When the duration of exclusive contracts is long enough to deter entry
- When the exclusive arrangements are imposed by a firm with market power
- When alternatives for reaching customers are limited

**The foreclosure test**: Courts examine what percentage of distribution channels or customer base is foreclosed by the exclusive arrangement. Foreclosure of <30% is generally permissible; 30-40% raises concern; >40% creates a strong inference of anticompetitive effect.

**Moat relevance**: Exclusive dealing arrangements are a common moat mechanism --- distribution agreements, preferred vendor status, long-term contracts. The 30-40% foreclosure threshold is useful for investors: if a company's exclusive arrangements foreclose less than 30% of the market, they are likely legally sustainable; above 40%, they face increasing legal risk. The Google case (88% of search distribution through defaults) illustrates the extreme end of this spectrum.

---

## 7. Synthesis: Antitrust Frameworks as Moat Analysis Tools

### 7.1 The Antitrust-Moat Paradox

There is a fundamental tension between antitrust law and moat investing:

- **Investors seek** companies with durable competitive advantages that enable above-market returns
- **Antitrust law targets** precisely these advantages when they cross the line into monopoly power
- **The sweet spot** is market power that is *strong enough* to generate excess returns but *not so dominant* that it invites enforcement

### 7.2 Quantitative Moat Indicators from Antitrust Frameworks

| Antitrust Metric | Threshold | Investment Interpretation |
|---|---|---|
| Market share (relevant market) | >70% = monopoly presumption | >50% = strong pricing power; >70% = wide moat + legal risk |
| HHI of market | >2,500 = highly concentrated | >2,500 = favorable competitive structure for incumbents |
| Lerner Index (P-MC)/P | >0.5 = substantial market power | >0.5 maps to gross margins >50%; strong pricing power |
| SSNIP test (5% price increase) | Profitable = market power | Can the company raise prices 5% without material churn? |
| Distribution foreclosure | >40% = likely anticompetitive | Exclusive distribution >40% = strong moat but legal risk |
| Entry timeline | >2 years = durable barrier | Can a well-funded competitor replicate in <2 years? |

### 7.3 Moat Risk Scoring Framework (Derived from Antitrust Analysis)

For each company, assess antitrust vulnerability on five dimensions:

1. **Market share concentration**: Is the company above the 70% monopoly presumption threshold?
2. **Pricing conduct**: Does pricing history suggest exploitation of market power (consistent above-inflation increases with no product improvement)?
3. **Exclusionary arrangements**: Do contractual arrangements foreclose >30% of distribution?
4. **Barrier type**: Are barriers structural (lower legal risk) or strategic (higher legal risk)?
5. **Political salience**: Is the company's pricing/conduct attracting political or regulatory attention?

**Scoring**:
- 0-1 flags: Low antitrust risk; moat is likely legally durable
- 2-3 flags: Moderate risk; monitor regulatory developments
- 4-5 flags: High risk; moat durability may depend on legal outcomes

**FICO preliminary assessment**: FICO triggers on at least 4 of 5 dimensions --- ~90% market share, consistent above-inflation pricing, contractual arrangements with credit bureaus, strategic barriers (data relationships), and active political scrutiny (Senator Hawley, class action litigation). This places FICO in the highest antitrust risk category, meaning its moat is legally contested territory.

### 7.4 Key Takeaways for Investment Analysis

1. **Moat strength and antitrust risk are correlated, not independent**. The strongest moats (highest market share, highest pricing power, deepest barriers) are precisely the ones most vulnerable to antitrust action. This is a risk that traditional moat analysis often ignores.

2. **Market definition is the battlefield**. In both antitrust and investment analysis, how you define the market determines whether a company looks like a monopolist or a competitor. Investors should always test multiple market definitions and assess which one a court would likely adopt.

3. **The Cellophane Fallacy applies to moat analysis**. When assessing competitive alternatives, ask whether those alternatives are only viable *because* the incumbent has already pushed prices to monopoly levels. If prices dropped to competitive levels, many "competitors" would disappear.

4. **Structural barriers > strategic barriers for moat durability**. Antitrust law is more tolerant of structural barriers (scale, IP, network effects that arise organically) than strategic barriers (exclusive dealing, tying, predatory conduct). Moats built on structural barriers are both more legally durable and more economically sustainable.

5. **Regulatory moats are revocable**. Government mandates create powerful moats (FICO's GSE requirement), but they can be withdrawn through regulatory change, legislation, or antitrust remedy. Investors should assign a probability to regulatory moat erosion and build it into valuation scenarios.

6. **Two-sided platform moats have extra legal protection** (post-*Amex*). Companies operating two-sided platforms benefit from a higher burden on antitrust plaintiffs, who must show harm across both sides. This makes Visa/Mastercard-style moats particularly legally durable.

7. **Serial acquisition moats face cumulative scrutiny** (Guideline 8). Companies whose moat strategy depends on continuous acquisition (buying competitors, buying adjacent capabilities) face increasing regulatory friction as they grow. The moat may be self-limiting.

---

## Sources

### Sherman Act & Monopolization
- [DOJ: Competition and Monopoly - Chapter 3 (Monopoly Power)](https://www.justice.gov/archives/atr/competition-and-monopoly-single-firm-conduct-under-section-2-sherman-act-chapter-3)
- [DOJ: Competition and Monopoly - Chapter 4 (Anticompetitive Conduct)](https://www.justice.gov/archives/atr/competition-and-monopoly-single-firm-conduct-under-section-2-sherman-act-chapter-4)
- [United States v. Grinnell Corp., 384 U.S. 563 (1966)](https://supreme.justia.com/cases/federal/us/384/563/)
- [FTC: Section 2 Monopoly Power Hearings](https://www.ftc.gov/system/files/documents/public_events/section-2-sherman-act-hearings-single-firm-conduct-related-competition/section2monopolypower.pdf)
- [Elements for a Monopolization Claim](https://www.theantitrustattorney.com/elements-monopolization-claim-federal-antitrust-laws/)

### 2023 Merger Guidelines
- [DOJ/FTC 2023 Merger Guidelines (Full Text)](https://www.ftc.gov/system/files/ftc_gov/pdf/2023_merger_guidelines_final_12.18.2023.pdf)
- [CRS Analysis: 2023 Merger Guidelines](https://www.congress.gov/crs-product/LSB11138)
- [Skadden: DOJ and FTC Release Final 2023 Merger Guidelines](https://www.skadden.com/insights/publications/2023/12/doj-and-ftc-release-final-2023-merger-guidelines)
- [Paul Weiss: DOJ and FTC Issue Final 2023 Merger Guidelines](https://www.paulweiss.com/insights/client-memos/doj-and-ftc-issue-final-2023-merger-guidelines)
- [Mercatus Center: Decoding the 2023 Merger Guidelines](https://www.mercatus.org/research/policy-briefs/decoding-2023-ftc-and-doj-merger-guidelines-insights-shifting-antitrust)
- [Stinson: FTC and DOJ Announce Final Merger Guidelines](https://www.stinson.com/newsroom-publications-ftc-and-doj-announce-final-merger-guidelines)

### Market Power Assessment
- [Wikipedia: SSNIP Test](https://en.wikipedia.org/wiki/Small_but_significant_and_non-transitory_increase_in_price)
- [Katz & Shapiro: Critical Loss - Let's Tell the Whole Story (2003)](https://www.law.berkeley.edu/wp-content/uploads/2015/04/Katz-Shapiro-Critical-Loss-Lets-Tell-the-Whole-Story-2003.pdf)
- [Econ One: The Economics Behind the Cellophane Fallacy](https://econone.com/resources/blogs/the-economics-behind-the-cellophane-fallacy/)

### Barriers to Entry
- [OECD: Barriers to Entry (2006)](https://www.oecd.org/content/dam/oecd/en/publications/reports/2006/03/barriers-to-entry_2ca9e70b/8bb30107-en.pdf)
- [Wikipedia: Barriers to Entry](https://en.wikipedia.org/wiki/Barriers_to_entry)
- [DOJ 2023 Merger Guidelines - Barriers to Entry Section](https://www.justice.gov/d9/2023-12/2023%20Merger%20Guidelines.pdf)

### Key Cases
- [United States v. AT&T (1982) - Wikipedia](https://en.wikipedia.org/wiki/United_States_v._AT&T_(1982))
- [Federal Judicial Center: Breakup of Ma Bell](https://www.fjc.gov/history/spotlight-judicial-history/breakup-ma-bell)
- [United States v. Microsoft Corp. - Wikipedia](https://en.wikipedia.org/wiki/United_States_v._Microsoft_Corp.)
- [Harvard Law Review: United States v. Google LLC](https://harvardlawreview.org/print/vol-138/united-states-v-google-llc/)
- [DOJ: Department of Justice Wins Significant Remedies Against Google](https://www.justice.gov/opa/pr/department-justice-wins-significant-remedies-against-google)
- [CRS: Federal Court Endorses Behavioral Remedies in Google Search](https://www.congress.gov/crs-product/LSB11362)
- [United States v. Apple (2024) - Wikipedia](https://en.wikipedia.org/wiki/United_States_v._Apple_(2024))
- [DOJ: Justice Department Sues Apple for Monopolizing Smartphone Markets](https://www.justice.gov/archives/opa/pr/justice-department-sues-apple-monopolizing-smartphone-markets)
- [CRS: The DOJ's Monopolization Case Against Apple](https://www.congress.gov/crs-product/LSB11154)
- [FTC v. Meta - Wikipedia](https://en.wikipedia.org/wiki/FTC_v._Meta)
- [Sullivan & Cromwell: Meta Prevails in FTC's Antitrust Case](https://www.sullcrom.com/insights/memo/2025/December/Meta-Prevails-FTC-Monopolization-Case)
- [Ohio v. American Express Co. - Wikipedia](https://en.wikipedia.org/wiki/Ohio_v._American_Express_Co.)
- [Supreme Court: Ohio v. American Express Co., 585 U.S. 529 (2018)](https://supreme.justia.com/cases/federal/us/585/16-1454/)
- [Wilson Sonsini: Supreme Court Tackles Two-Sided Markets](https://www.wsgr.com/en/insights/u-s-supreme-court-tackles-two-sided-markets-ohio-v-american-express.html)

### FICO-Specific
- [Bloomberg Law: FICO Loses Bid to Nix Monopolization Claims](https://news.bloomberglaw.com/antitrust/fico-loses-bid-to-nix-monopolization-claims-in-credit-scores-case)
- [Senator Hawley: Calls on DOJ to Investigate FICO](https://www.hawley.senate.gov/hawley-calls-doj-investigate-fico-anticompetitive-practices/)
- [Credit Union Times: Credit Unions Sue FICO for Alleged Antitrust Violations](https://www.cutimes.com/2020/05/12/credit-unions-sue-fico-for-alleged-antitrust-violations/)
- [In re FICO Antitrust Litigation Court Filing](https://www.govinfo.gov/content/pkg/USCOURTS-ilnd-1_20-cv-02559/pdf/USCOURTS-ilnd-1_20-cv-02559-0.pdf)
