# The Double-Blind Entropy Model

**Why neither the player nor the server should ever control randomness alone — and how combining secrets with public entropy fixes it.**

## The Problem

Most randomness systems fail for the same fundamental reason:  
**Someone controls the entropy.**

If a single party can influence, delay, or observe randomness before committing to an action, fairness collapses. This applies whether that party is:

*   The server (most common)
*   The player (client-side RNGs)
*   A trusted third party (oracles, APIs)

Even well-intentioned systems fail under incentives.

The core question is:  
**How do you design randomness so that no participant can bias the outcome?**

## Why Single-Source Entropy Always Fails

Let’s examine the usual approaches.

### Server-Only Randomness
The server generates a random number and returns it.

**Problems:**
*   Server can retry internally
*   Server can selectively reveal
*   Server can alter logic per user
*   Players cannot independently verify intent

Even if the math is correct, trust is required.

### Player-Only Randomness
The client generates randomness and submits it.

**Problems:**
*   Player can brute-force favorable outcomes
*   Player can abort unfavorable sessions
*   Player controls timing and retries

This is especially dangerous in adversarial games.

### Third-Party Randomness (Oracles)
Randomness comes from an external service.

**Problems:**
*   Oracle sees inputs
*   Oracle may collude or fail
*   Latency and availability risks
*   Still a single point of trust

Trust is simply outsourced, not eliminated.

## The Core Insight

**Fair randomness requires multiple independent entropy sources.**

Specifically:
1.  No single party should know the final randomness **in advance**
2.  No single party should be able to change it **after the fact**
3.  The final output must be **reproducible by anyone**

This leads to the **double-blind entropy model**.

## What “Double-Blind” Means Here

In a double-blind randomness system:
1.  The player contributes secret entropy
2.  The server contributes secret entropy
3.  A public, future entropy source finalizes the result

**Crucially:**
*   Each party commits **before** seeing the others’ inputs
*   No party can influence the final result unilaterally
*   The final randomness is deterministic and auditable

**Neither side is trusted. Both are constrained.**

## The Three Entropy Components

### 1. Player Secret
The player provides a secret value.

**Properties:**
*   Chosen freely by the player
*   Kept private until reveal
*   Can be hashed and committed in advance

This prevents the server from fully controlling outcomes.

### 2. Server Secret
The server provides its own secret.

**Properties:**
*   Generated independently
*   Committed before reveal
*   Hidden from the player initially

This prevents the player from brute-forcing outcomes.

### 3. Public Future Entropy
A publicly verifiable entropy source, revealed **later**.

**Examples:**
*   Drand rounds
*   Future blockchain randomness
*   Time-locked beacons

**Properties:**
*   Unknown at commit time
*   Unbiasable by either party
*   Verifiable by anyone

This locks the system in time.

## How They Combine

At reveal time, all three inputs are combined deterministically.

**Conceptually:**

final_randomness = hash(player_secret, server_secret, public_entropy)


**Important characteristics:**
*   **Deterministic:** same inputs always give same output
*   **Order-independent:** replayable anywhere
*   **Immutable:** cannot be changed after commit

The system becomes **self-auditing**.

## Why This Model Works

### No Advance Knowledge
*   Player doesn’t know server secret
*   Server doesn’t know player secret
*   Neither knows future public entropy

No one can predict outcomes in advance.

### No Post-Hoc Manipulation
*   Commitments are hashed
*   Inputs are fixed before entropy is revealed
*   Any deviation is detectable

Cheating leaves fingerprints.

### Independent Verification
Anyone can:
1.  Recompute the final randomness
2.  Verify all commitments
3.  Confirm the public entropy source

**Trust shifts from people to math.**

## Where This Matters

The double-blind entropy model is essential in:

*   Casinos and betting platforms
*   Loot boxes and rarity systems
*   On-chain and off-chain games
*   Raffles, lotteries, and giveaways
*   **Any adversarial environment**

If incentives exist, this model is mandatory.

## What This Model Does *Not* Solve

It does **not**:
*   Prevent collusion between parties
*   Protect leaked secrets
*   Fix bad game design
*   Guarantee fairness of payouts

It strictly guarantees **unbiased randomness generation**.  
Nothing more. Nothing less.

## The Takeaway

If one party controls randomness, the system is unfair.  
If multiple parties contribute entropy but can see each other’s inputs, the system is manipulable.

**Only a double-blind, multi-entropy design produces truly verifiable randomness.**

Everything else is a trust assumption in disguise.
This Double-Blind Entropy Model with public (drand) entropy is the backbone of [BlockRand](https://github.com/blockrand-api/blockrand-js)
