# Weighted Random Selection Without Bias

**Description:** How to implement rarity systems, loot tables, and weighted outcomes without introducing hidden probability errors.

## The Problem

Many real-world systems require outcomes that are not equally likely.

**Example:**
- Common item: 70%
- Rare item: 25%
- Legendary item: 5%

Developers often implement this using quick heuristics that silently distort probabilities. This leads to:

- Players distrusting loot systems
- Regulatory issues in gambling environments
- Long-term economic imbalance in games

Weighted randomness must be implemented precisely, or the distribution drifts over time.

## What Is Weighted Randomness?

Instead of selecting uniformly from N outcomes, each outcome has a **weight**.

**Example:**
- Common = 70
- Rare = 25
- Legendary = 5

**Total weight:**
`70 + 25 + 5 = 100`

**Probability of each:**
- Common = 70 / 100
- Rare = 25 / 100
- Legendary = 5 / 100

The goal is to select an outcome proportional to its weight.

## The Most Common Incorrect Implementation

**Typical mistake:**
1. Generate random integer 0–100
2. Map ranges manually

**Problems:**
- Off-by-one errors
- Gaps or overlaps
- Future edits break distribution
- Hard to audit

Even small mistakes produce measurable bias over thousands of draws.

## Correct Method: Cumulative Distribution

**Step 1 — Define weights**

Common = 70
Rare = 25
Legendary = 5

This guarantees perfect proportionality.

## Why This Matters in Production Systems

### Loot Economies
A 1–2% drift:
- Inflates rare item supply
- Breaks marketplace pricing
- Causes long-term economy collapse

### Gambling & Compliance
Weighted outcomes must be:
- Reproducible
- Auditable
- Verifiable

Incorrect implementations can:
- Fail certification
- Trigger legal issues

### Live Service Games
Small bias × millions of events =
- Player suspicion
- Reddit investigations
- Reputation damage

Most “rigged RNG” accusations come from bad weighted selection.

## Common Engineering Mistakes

### Using Floating Point
Float rounding causes:
- Probability drift
- Platform-dependent results

**Use integers only.**

### Renormalizing Every Draw
Changing total weight dynamically:
- Breaks expected distribution
- Makes audits impossible

### Editing Tables Without Versioning
Changing weights without:
- Version IDs
- Seed domain separation
Makes past results unverifiable.

## Deterministic Auditability Pattern

**Inputs:**
- Player seed
- Server seed
- Public entropy
- Counter

**Process:**
1. Hash inputs
2. Derive 64-bit integer
3. Map via rejection sampling
4. Select from cumulative weights

**Result:**
Anyone can recompute the exact selection.

## Key Takeaway

Weighted randomness is **not** just picking from ranges. [Correct implementation](https://github.com/blockrand-api/blockrand-js) requires:

- Uniform source entropy
- Bias-free range mapping
- Integer arithmetic
- Deterministic replay

If any step is wrong, the distribution becomes statistically provable as unfair.

## Where This Is Used

- Loot boxes
- Card rarity
- Prize wheels
- Ad allocation
- Match rewards
- Raffles with tiered prizes
- On-chain games
- Provably fair casinos

**Weighted selection is one of the most economically sensitive parts of any randomness system.**
