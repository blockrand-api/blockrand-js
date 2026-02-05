# Timing and Delay in Verifiable Randomness

**Why future entropy and enforced delays are critical to prevent manipulation in random number generation systems.**

Randomness systems often fail not because of weak math, but because of **bad timing**.

If an actor can see the entropy before committing their input, the randomness is already compromised. This document explains why future entropy and enforced delays are essential for fairness in adversarial systems like games, lotteries, and casinos.

## The Core Problem: Knowing the Outcome Too Early

Any randomness system has three components:

1.  Inputs (seeds, secrets, parameters)
2.  Entropy source
3.  Output derivation

If any party can observe the entropy **before** locking their input, they can adapt their behavior to influence the outcome.

This includes:

*   Servers choosing when to roll
*   Players deciding when to reveal
*   Operators aborting unfavorable outcomes

Randomness becomes conditional, not fair.

## Why Immediate Entropy Is Dangerous

Many systems use entropy that is available **instantly**:

*   Current block hash
*   Current timestamp
*   Current server RNG output

This allows:

*   Retrying until favorable results appear
*   Selective reveal
*   Silent discard of bad outcomes

**Even cryptographically strong entropy is useless if it is predictable or observable before commitment.**

## Future Entropy Solves This

**Future entropy** is entropy that does not yet exist at the time of commitment.

**Examples:**
*   A future Drand round
*   A future blockchain block
*   A scheduled public randomness beacon

Because no one can know this value in advance, it enforces fairness by time.

## Why Delay Is Not Optional

**Without delay:**
1.  Commit and reveal collapse into one step
2.  Inputs can be chosen after seeing entropy
3.  Verification becomes meaningless

**A delay creates a causal separation:**
1.  **First:** inputs are committed
2.  **Later:** entropy is revealed
3.  **Finally:** results are derived

This ordering is what makes audits possible.

## Attack Timeline Without Delay

1.  Server generates entropy
2.  Server checks outcome
3.  Server decides whether to publish or retry

*This attack leaves no cryptographic trace.*

## Attack Timeline With Delay

1.  Player commits hash
2.  Server commits secret
3.  Target future entropy is fixed
4.  Entropy is revealed publicly
5.  Result is derived deterministically

*At no point can any party change inputs without detection.*

## Why Delays Must Be Enforced, Not Optional

Optional delays fail because:

*   Honest users wait
*   Dishonest users don't

A protocol must **force** the delay, not suggest it.

This is why randomness protocols specify:

*   Minimum delay duration
*   Fixed future entropy rounds
*   Immutable commit timestamps

## Drand as a Timing Anchor

Drand provides:

*   Unpredictable future entropy
*   Public auditability
*   Cryptographic signatures
*   Fixed round schedules

This makes it ideal for enforcing temporal fairness without trusting any single party.

## Key Insight

**Randomness is not just about numbers.**

**It is about *when* decisions become irreversible.** 

[BlockRand](https://github.com/blockrand-api/blockrand-js) usese future drand entropy to fix this.

A system without enforced delay is not verifiable — it is merely optimistic.
