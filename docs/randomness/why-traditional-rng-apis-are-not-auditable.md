---
title: "Why Traditional RNG APIs Are Not Auditable"
description: "A deep dive into why most randomness APIs cannot be independently verified, even when they claim to be cryptographically secure."
---

# Why Traditional RNG APIs Are Not Auditable

Random Number Generators (RNGs) are foundational to games, lotteries, casinos, simulations, and distributed systems. Most modern RNG APIs claim to be "secure," "cryptographic," or "industry-grade."

**Yet very few are auditable.**

This document explains why traditional RNG APIs fundamentally cannot be audited, even when they use strong cryptography.

---

## What Developers Usually Mean by "Secure RNG"

When an API advertises a secure RNG, it usually means one of the following:
- Uses a cryptographically secure pseudorandom number generator (CSPRNG)
- Seeds entropy from the operating system
- Periodically reseeds from hardware entropy
- Passes statistical randomness tests

**All of this is valuable — but none of it makes the output verifiable after the fact.**

---

## The Core Problem: Trust Without Proof

**Traditional RNG APIs follow this model:**
1. User requests a random number
2. Server generates randomness internally
3. Server returns the result
4. User must trust the server acted honestly

**At no point does the user receive:**
- The seed used
- The entropy source
- The generation order
- Proof that the server could not influence the result

> **The randomness may be strong — but the trust is absolute.**

---

## Why Logging the Seed Is Not Enough

**A common misconception is that logging or exposing the seed solves auditability.**

**It does not.**

**Reasons:**
- The seed can be generated after seeing the outcome
- The server controls when and how the seed is derived
- Seeds can be selectively revealed or withheld
- There is no proof the seed existed before the request

> **Without a prior commitment, a revealed seed proves nothing.**

---

## Why "Open Source RNG" Still Isn't Auditable

**Even if the RNG algorithm is open source:**
- You cannot see which branch of code ran
- You cannot verify the exact timing
- You cannot prove which entropy bytes were consumed
- You cannot verify the order of random calls

> **Open source improves confidence, not verifiability. Auditability requires cryptographic guarantees, not transparency alone.**

---

## The Hidden Issue: Adaptive Randomness

**In centralized systems, the RNG can adapt its behavior based on context:**
- User identity
- Bet size
- Game state
- Previous outcomes
- System load

**Even subtle adaptations break fairness.**

> **Because traditional RNGs are opaque, adaptive manipulation is undetectable.**

---

## Statistical Tests Do Not Prove Fairness

**Many systems rely on statistical randomness tests to "prove" fairness.**

**This is misleading.**

**Statistical tests can show:**
- Outputs look random on average

**They cannot show:**
- A specific outcome was not manipulated
- A specific user was treated fairly
- A specific round followed the same rules as others

> **Fairness is per-event, not per-distribution.**

---

## Auditing Requires Determinism After Commitment

**For an RNG to be auditable, the following must be true:**
1. The server commits to entropy before the outcome
2. The generation algorithm is deterministic given that entropy
3. The order of random usage is fixed and public
4. Anyone can recompute the exact result independently

**Traditional RNG APIs fail at the first step.** [BlockRand](https://github.com/blockrand-api/blockrand-js) does this.

---

## Why This Matters in Real Systems

**Lack of auditability creates real risks:**
- Disputes cannot be resolved objectively
- Regulators cannot independently verify fairness
- Players cannot validate outcomes
- Developers bear trust liability they cannot prove away

> **This is why many systems rely on reputation rather than proof.**

---

## Summary

**Traditional RNG APIs are:**
- Cryptographically strong
- Operationally convenient
- Statistically sound

**But they are not auditable.**

Auditability requires prior commitment, deterministic replay, and public verification — properties absent from standard RNG designs.

**Understanding this distinction is the first step toward building truly fair systems.**
