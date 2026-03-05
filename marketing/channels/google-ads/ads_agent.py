#!/usr/bin/env python3
"""Google Ads 投放优化 Agent — 100baggers.club 专用

支持多 Campaign 管理，每个 campaign 有独立的上下文和策略文件。
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path

from anthropic import Anthropic

# ── 路径 ────────────────────────────────────────────────────
BASE_DIR = Path(__file__).parent
PRODUCT_CONTEXT_PATH = BASE_DIR / "product_context.md"
CAMPAIGNS_DIR = BASE_DIR / "campaigns"


# ── 上下文加载 ──────────────────────────────────────────────
def load_product_context() -> str:
    if PRODUCT_CONTEXT_PATH.exists():
        return PRODUCT_CONTEXT_PATH.read_text(encoding="utf-8")
    return "(product_context.md missing)"


def load_campaign_context(name: str) -> str:
    """Load a campaign plan file if it exists."""
    for ext in (".md", ".yaml", ".txt"):
        path = CAMPAIGNS_DIR / f"{name}{ext}"
        if path.exists():
            return path.read_text(encoding="utf-8")
    return ""


def list_campaigns() -> list[str]:
    """List available campaign plan files."""
    if not CAMPAIGNS_DIR.exists():
        return []
    return sorted(
        p.stem for p in CAMPAIGNS_DIR.iterdir()
        if p.suffix in (".md", ".yaml", ".txt") and not p.name.startswith(".")
    )


def save_session(messages: list[dict], campaign: str | None):
    """Save conversation to sessions/ for later reference."""
    sessions_dir = BASE_DIR / "sessions"
    sessions_dir.mkdir(exist_ok=True)
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    tag = campaign or "general"
    path = sessions_dir / f"{tag}_{ts}.json"
    path.write_text(json.dumps(messages, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"  会话已保存: {path.name}")


# ── System Prompt ───────────────────────────────────────────
SYSTEM_PROMPT = """\
You are a senior Google Ads optimization specialist for 100baggers.club — \
a premium AI-powered investment research platform targeting US stock investors.

## Your Capabilities
1. **Keyword Research** — Generate high-conversion keyword matrices (intent × match type × bid range)
2. **Landing Page Optimization** — Design landing page structure and copy for each ad group
3. **Ad Copy Creation** — Write RSA headlines (≤30 chars) and descriptions (≤90 chars) that are Google policy-safe for financial services
4. **A/B Testing** — Design statistically sound test plans with hypotheses, variables, sample sizes, and success metrics
5. **Budget Allocation** — Recommend budget splits by campaign, device, daypart, and scaling phase
6. **Campaign Audit** — Analyze existing ad structure, identify waste, and recommend optimizations
7. **ROAS Modeling** — Build LTV/CAC sensitivity models and break-even analysis

## Platform & Product Context
{product_context}

## Active Campaign Context
{campaign_context}

## Critical Constraints
- **Target**: US-based stock investors, English language, Desktop only
- **Conversion goal**: Subscription (Annual $999 > Monthly $99 > Weekly $29)
- **Financial compliance**: No return promises, no "guaranteed" outcomes, no "beat the market"
- **Google policy**: Financial services ads require transparency, clear billing, no misleading claims
- **Mandatory disclaimers**: "For informational purposes only. Not investment advice. All investing involves risk."
- **No refund policy**: Must be displayed near pricing, before checkout

## Output Rules
- Reply in Chinese (中文) for strategy discussion
- Keep keywords, ad copy, and landing page text in English (target market is US)
- Every keyword must include: term, match type, estimated CPC range, priority tier
- Every ad copy must fit Google RSA limits: Headlines ≤30 chars, Descriptions ≤90 chars
- Budget recommendations must include daily budget, CPA targets, and stop-loss thresholds

## Commands
- `/keywords [campaign]` — Generate keyword matrix for a campaign
- `/landing [campaign]` — Landing page structure and copy
- `/headlines [campaign]` — Generate RSA headlines + descriptions
- `/test [campaign]` — A/B test plan
- `/budget` — Budget allocation across all campaigns
- `/audit` — Audit existing ad performance (user provides data)
- `/roas` — LTV/CAC model and break-even analysis
- `/campaigns` — List available campaign plans
- `/new <name>` — Start planning a new campaign
- `/save` — Save current session
- `/help` — Show all commands
"""

# ── 命令 ────────────────────────────────────────────────────
COMMAND_PROMPTS = {
    "/keywords": (
        "Generate a complete Google Ads keyword matrix for the current campaign. Include:\n"
        "1. Keywords grouped by search intent (transactional / informational / navigational)\n"
        "2. Each keyword: match type (exact/phrase), estimated monthly volume range, CPC range, priority (P1/P2/P3)\n"
        "3. Negative keyword list\n"
        "4. Prioritized first-batch test recommendations\n"
        "Output as a structured table."
    ),
    "/landing": (
        "Design a landing page structure for the current campaign:\n"
        "1. Hero Section (headline + subheadline + primary CTA)\n"
        "2. Pain point resonance section\n"
        "3. Solution showcase (with proof points from the report)\n"
        "4. Social proof (data + authority badges)\n"
        "5. Feature highlights (3-4 cards)\n"
        "6. FAQ section\n"
        "7. Bottom CTA + pricing + no-refund disclosure\n"
        "Provide specific English copy for each section."
    ),
    "/headlines": (
        "Generate RSA ad assets for the current campaign:\n"
        "1. 15 Headlines (each ≤30 characters, mark which to pin to H1/H2)\n"
        "2. 4 Descriptions (each ≤90 characters)\n"
        "3. Sitelink extensions (4 sitelinks with titles and descriptions)\n"
        "4. Callout extensions (6 callouts)\n"
        "Ensure all copy is Google financial services policy-safe."
    ),
    "/test": (
        "Design a structured A/B test plan:\n"
        "1. Ad copy tests (≥3 headline variants + description variants)\n"
        "2. Landing page tests (hero, CTA, pricing display, trust modules)\n"
        "3. Audience tests (different targeting combinations)\n"
        "4. For each test: hypothesis, variable, success metric, guardrail metric, sample size estimate\n"
        "5. Priority ranking and timeline"
    ),
    "/budget": (
        "Create a budget allocation plan across all campaigns:\n"
        "1. Campaign-level split with rationale\n"
        "2. Daily budget per campaign\n"
        "3. Bidding strategy recommendation (Manual CPC → Target CPA transition)\n"
        "4. Scaling phases (Month 1 / Month 2-3 / Month 4-6)\n"
        "5. KPIs and stop-loss thresholds per campaign\n"
        "6. LTV/CAC sensitivity matrix"
    ),
    "/audit": (
        "I'll audit your Google Ads campaigns. Please provide:\n"
        "- Campaign names and objectives\n"
        "- Ad groups and keywords\n"
        "- Current bidding strategy\n"
        "- Recent performance data (impressions, clicks, conversions, CPA, ROAS)\n"
        "I'll analyze and recommend optimizations."
    ),
    "/roas": (
        "Build a ROAS model for 100baggers.club:\n"
        "1. Revenue per subscriber (Annual $999, Monthly $99, Weekly $29)\n"
        "2. Assumed subscriber mix and churn rates\n"
        "3. LTV calculation by tier\n"
        "4. CAC estimates by campaign type (based on CPC and CVR assumptions)\n"
        "5. LTV/CAC sensitivity matrix\n"
        "6. Break-even timeline per campaign\n"
        "7. Maximum allowable CPA for 3:1 and 5:1 ratios"
    ),
    "/help": None,
    "/campaigns": None,
    "/save": None,
    "/new": None,
}

HELP_TEXT = """
Commands:
  /keywords [campaign]  — Keyword matrix for a campaign
  /landing [campaign]   — Landing page structure + copy
  /headlines [campaign] — RSA headlines + descriptions
  /test [campaign]      — A/B test plan
  /budget               — Budget allocation across campaigns
  /audit                — Audit existing ad performance
  /roas                 — LTV/CAC model + break-even
  /campaigns            — List available campaign plans
  /new <name>           — Start planning a new campaign
  /save                 — Save current session
  /help                 — This help message
  /quit                 — Exit

Natural language works too:
  "What keywords should I target for semi equipment?"
  "Write me 3 hero variants for the landing page"
  "How do I lower CPA on the institutional campaign?"
"""


# ── 对话引擎 ────────────────────────────────────────────────
def main():
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("Error: set ANTHROPIC_API_KEY environment variable")
        print("  export ANTHROPIC_API_KEY=sk-ant-xxxxx")
        sys.exit(1)

    client = Anthropic(api_key=api_key)
    product_context = load_product_context()
    messages: list[dict] = []
    active_campaign: str | None = None

    # Auto-load first campaign if only one exists
    campaigns = list_campaigns()
    if len(campaigns) == 1:
        active_campaign = campaigns[0]

    print("=" * 60)
    print("  Google Ads Agent — 100baggers.club")
    print("=" * 60)

    if campaigns:
        print(f"  Available campaigns: {', '.join(campaigns)}")
    if active_campaign:
        print(f"  Active campaign: {active_campaign}")

    print("  Type /help for commands, or ask anything.\n")

    while True:
        try:
            prompt_tag = f"[{active_campaign}]" if active_campaign else ""
            user_input = input(f"you{prompt_tag}> ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nBye!")
            break

        if not user_input:
            continue

        if user_input.lower() in ("/quit", "/exit", "quit", "exit"):
            if messages:
                save_session(messages, active_campaign)
            print("Bye!")
            break

        # ── Local commands (no API call) ──
        if user_input == "/help":
            print(HELP_TEXT)
            continue

        if user_input == "/campaigns":
            clist = list_campaigns()
            if clist:
                print("\nAvailable campaigns:")
                for c in clist:
                    marker = " ← active" if c == active_campaign else ""
                    print(f"  - {c}{marker}")
            else:
                print("\nNo campaigns yet. Use /new <name> to create one.")
            print()
            continue

        if user_input == "/save":
            save_session(messages, active_campaign)
            print()
            continue

        if user_input.startswith("/new "):
            name = user_input[5:].strip().replace(" ", "_")
            if name:
                CAMPAIGNS_DIR.mkdir(parents=True, exist_ok=True)
                path = CAMPAIGNS_DIR / f"{name}.md"
                path.write_text(f"# Campaign: {name}\n\n> Created {datetime.now().strftime('%Y-%m-%d')}\n\n(Plan your campaign here)\n", encoding="utf-8")
                active_campaign = name
                print(f"\n  Created campaign: {name}")
                print(f"  Plan file: {path}")
                print(f"  Now active. Start describing your campaign goals.\n")
            continue

        # Switch campaign context via /use
        if user_input.startswith("/use "):
            name = user_input[5:].strip()
            if name in list_campaigns():
                active_campaign = name
                print(f"\n  Switched to campaign: {name}\n")
            else:
                print(f"\n  Campaign '{name}' not found. Available: {', '.join(list_campaigns())}\n")
            continue

        # ── Command expansion ──
        parts = user_input.split(maxsplit=1)
        cmd = parts[0].lower()

        # Handle /command [campaign_name] pattern
        if cmd in COMMAND_PROMPTS and COMMAND_PROMPTS[cmd] is not None:
            extra = parts[1] if len(parts) > 1 else ""
            # Check if extra is a campaign name
            if extra and extra in list_campaigns():
                active_campaign = extra
                extra = ""
            prompt = COMMAND_PROMPTS[cmd]
            if extra:
                prompt += f"\n\nUser note: {extra}"
            user_input = prompt

        # ── Build system prompt with campaign context ──
        campaign_context = ""
        if active_campaign:
            cc = load_campaign_context(active_campaign)
            if cc:
                campaign_context = f"### Active Campaign: {active_campaign}\n\n{cc}"
            else:
                campaign_context = f"### Active Campaign: {active_campaign}\n\n(No plan file yet — user is building this campaign)"
        else:
            campaign_context = "(No campaign selected — general advice mode)"

        system = SYSTEM_PROMPT.format(
            product_context=product_context,
            campaign_context=campaign_context,
        )

        messages.append({"role": "user", "content": user_input})

        try:
            print("\nAgent> ", end="", flush=True)
            with client.messages.stream(
                model="claude-sonnet-4-20250514",
                max_tokens=8192,
                system=system,
                messages=messages,
            ) as stream:
                full_response = ""
                for text in stream.text_stream:
                    print(text, end="", flush=True)
                    full_response += text
            print("\n")

            messages.append({"role": "assistant", "content": full_response})

        except Exception as e:
            print(f"\nAPI error: {e}\n")
            messages.pop()


if __name__ == "__main__":
    main()
