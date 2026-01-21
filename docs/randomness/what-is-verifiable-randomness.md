---
title: "What Is Verifiable Randomness? | Blockrand-js"
description: "Learn what verifiable randomness is, why most random numbers are not auditable, and how systems like Blockrand provide unbiased, reproducible, and trustless random outcomes."
---
# What Is Verifiable Randomness?

Randomness is used everywhere: games, lotteries, simulations, load-balancers,
security protocols, and distributed systems.  
Yet in most systems, randomness is **not verifiable** — users must trust that it
was generated honestly.

This document explains what *verifiable randomness* means, why traditional
approaches fail, and what properties are required for a system to be auditable
by third parties.

---

## The Core Problem

Most applications generate randomness in one of three ways:

1. Language PRNGs (`Math.random()`, `rand()`)
2. Cryptographic RNGs (`/dev/urandom`, `crypto/rand`)
3. Server-side “secure” randomness APIs

All three can be *good randomness* — but **none are verifiable after the fact**.

If a server claims:
> “This number was random”

there is usually **no way to prove it**.

---

## What Does “Verifiable” Mean?

A random outcome is *verifiable* if **any independent party** can later prove that:

1. The inputs were fixed *before* the outcome was known
2. The entropy source was not controllable by any participant
3. The transformation from entropy → result was deterministic
4. The same inputs always reproduce the same result

In other words:

> Verification must not rely on trust.

---

## Why Traditional RNG Fails Verification

### 1. PRNGs
Pseudo-random number generators are deterministic and fast, but:
- the seed is usually hidden
- the algorithm may vary by runtime
- results cannot be reproduced externally

### 2. Cryptographic RNGs
CSPRNGs produce excellent entropy, but:
- entropy is consumed internally
- output cannot be replayed
- no proof exists that a different value wasn’t used

### 3. Server RNG APIs
Even if cryptographically secure:
- the server could reroll internally
- the server could bias outcomes
- users cannot audit past events

---

## The Trust Gap

This becomes critical in **adversarial systems**:
- gambling
- competitive games
- raffles and lotteries
- fairness-sensitive simulations

Any system where *someone benefits from a specific outcome* must assume:
> Someone will try to manipulate randomness.

---

## Properties of Verifiable Randomness

A verifiable randomness system must provide:

| Property | Description |
|--------|------------|
| Determinism | Same inputs → same outputs |
| Public entropy | Entropy no party controls |
| Precommitment | Inputs fixed before entropy |
| Replayability | Anyone can recompute results |
| Auditability | All steps are inspectable |

---

## A Practical Model

Modern verifiable systems combine:
- **Private commitments** (hashes of secrets)
- **Public future entropy** (e.g. Drand)
- **Deterministic derivation functions**

This allows results to be:
- unpredictable at commit time
- fixed at reveal time
- verifiable forever

[BlockRand](https://github.com/blockrand-api/blockrand-js) is one such implementation, but the model itself is generic and can be implemented independently.

---

## Summary

Randomness is easy to generate.
**Verifiable randomness is hard** — because it must survive audits, disputes,
and adversarial scrutiny.
