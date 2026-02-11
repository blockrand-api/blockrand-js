# Common Verification Failures and How Systems Get Caught

## Most Cheating Is Subtle — and That’s Why It Fails

Very few systems cheat blatantly.  
Instead, they rely on:
- Complexity
- User ignorance
- Vague documentation
- The assumption that no one will actually verify

But provably fair systems **fail loudly** when they fail — because **math leaves fingerprints**.

This article covers the most common verification failures and how they are eventually exposed.

## Failure #1: Post-Commit Seed Manipulation

**What happens**  
The server:
1. Publishes a commitment
2. Later reveals a different seed
3. Hopes no one checks the hash

**How it gets caught**  
Verification is trivial:

SHA256(revealed_seed) ≠ published_commitment


This is the fastest and most embarrassing failure.

## Failure #2: Abort-and-Retry Attacks

**What happens**  
The server:
1. Sees an unfavorable outcome
2. Silently discards the round
3. Reruns with a new seed

Users never see the losing rounds.

**How it gets caught**  
- Missing rounds in public logs
- Non-monotonic round IDs
- Gaps in commitments
- Inconsistent timestamps

Abort attacks leave **absence patterns** — and those are measurable.

## Failure #3: Hidden Conditional Logic

**What happens**  
The algorithm claims to be deterministic, but includes:
- Retries
- Re-rolls
- Thresholds
- “Edge-case handling”

**Example:**  
“If result < X, regenerate”

**How it gets caught**  
- Verifiers re-run the algorithm and get different results
- Statistical distributions drift
- Edge cases cluster unnaturally

**Determinism is binary** — you either have it or you don’t.

## Failure #4: Biased Range Mapping

**What happens**  
Random numbers are mapped incorrectly into ranges.

**Common mistakes:**
- Modulo bias
- Truncation bias
- Floating-point rounding

The output **looks random** — but isn’t uniform.

**How it gets caught**  
- Chi-square tests
- Frequency analysis
- Long-tail imbalance
- Repeatable skew at boundaries

Math never forgives mapping errors.

## Failure #5: Fake or Weak Public Entropy

**What happens**  
The system claims to use “public entropy”, but:
- Chooses it after commitments
- Selects favorable block heights
- Pulls from manipulable sources

**How it gets caught**  
- Timestamp misalignment
- Selective block usage
- Entropy values changing retroactively
- Inconsistent source references

Public entropy **must be fixed before it exists**.

## Failure #6: Verification That Requires Trust

**What happens**  
Verification is only possible via:
- The platform’s website
- Proprietary tools
- Private APIs

Users cannot independently recompute results.

**How it gets caught**  
The moment someone tries to verify **offline** — and **can’t**.

> If verification requires permission, it isn’t verification.

## Failure #7: Selective Disclosure

**What happens**  
The platform:
- Reveals seeds only on request
- Hides losing rounds
- Provides partial data

**How it gets caught**  
- Incomplete datasets
- Inconsistent hashes
- Missing commitments
- Users comparing notes

Fairness requires **automatic disclosure** — not polite asking.

## Failure #8: Statistical Camouflage

**What happens**  
The system is biased — but lightly.  
It relies on:
- Small sample sizes
- Human intuition
- “Looks random enough”

**How it gets caught**  
- Large-scale aggregation
- Community analysis
- Independent audits
- Long-term drift

**Bias compounds. Time exposes it.**

## The Pattern Behind Every Failure

Almost all failures share one root cause:
> **Reintroducing trust where math was supposed to remove it**

Whether it’s:
- Hidden logic
- Secret retries
- Opaque entropy
- Unverifiable steps

The moment trust enters, failure becomes inevitable.

## Why Systems Always Get Caught Eventually

Because:
- Verification is cheap
- Recomputation is permanent
- Incentives exist to check
- Cheating must be perfect **forever**

**One mistake. One leak. One curious verifier.**  
That’s all it takes.

## The Only Sustainable Strategy

If you want a system that survives scrutiny:
1. Commit early
2. Reveal fully
3. Document everything
4. Make recomputation trivial
5. Assume adversarial verifiers

**Provable fairness is not about looking honest — it’s about being [unable to cheat](https://github.com/blockrand-api/blockrand-js).**
