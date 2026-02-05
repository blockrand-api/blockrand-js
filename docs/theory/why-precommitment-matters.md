# Why Precommitment Matters in Randomness Systems

**How precommitment prevents post-hoc manipulation in randomness, games, lotteries, and provably fair systems.**

Randomness systems don't usually fail because the math is wrong.  
They fail because **someone gets to see the outcome before locking their input.**

This document explains why precommitment is a non-negotiable requirement for any system that claims to be fair, auditable, or provably random.

## The Core Problem: Post-Hoc Cheating

**Post-hoc cheating** happens when a party can adjust their input *after* observing something they shouldn't have seen yet.

In randomness systems, this usually looks like:

*   A server waits to see player input, then tweaks its RNG seed
*   A player waits for public entropy, then chooses a favorable secret
*   A casino generates outcomes, then selectively publishes them

Even if the random function itself is cryptographically strong, **the timing of inputs** breaks fairness.

## What Is Precommitment?

**Precommitment** means:  
A party locks their input **before** the randomness outcome is known — in a way that can't be changed later.

This is usually done with a cryptographic hash.

**Example:**
Player secret: S
Commitment: H(S)

*   The hash is published first
*   The secret is revealed later
*   Anyone can verify that H(S) matches

**The key property:**  
Once the hash is published, the input is frozen.

## Why Hashes Work for Commitment

Cryptographic hashes give us two critical guarantees:

1.  **Preimage resistance**  
    You can't guess the secret from the hash.

2.  **Binding**  
    You can't change the secret without changing the hash.

This makes hashes ideal for commitment without revealing information early.

## Systems Without Precommitment Are Not Fair

Let's look at common failures.

### Server-Only RNG
*   Server generates randomness
*   Server shows result
*   Players are asked to "trust" the server

**Problem:**  
Nothing stops the server from retrying internally until it likes the outcome.

### Player-Only RNG
*   Player submits randomness seed
*   Server uses it directly

**Problem:**  
Player can brute-force seeds until they find a winning one.

### Public Entropy Without Commitment
*   Public entropy is known in advance
*   Parties choose inputs afterward

**Problem:**  
Inputs can be optimized after seeing the entropy.

## Precommitment Fixes These Failures

**With precommitment:**

*   Inputs are locked before entropy is known
*   No party can adapt based on outcomes
*   Cheating becomes detectable

This turns "trust me" systems into **verifiable systems**.

## Commit–Reveal Is the Minimum Acceptable Standard

Any system claiming to be:

*   Provably fair
*   Auditable
*   Trust-minimized

**Must include:**

1.  **Commit phase** (hash published)
2.  **Reveal phase** (secret disclosed)
3.  **Verification step** (anyone can recompute)

If any of these steps are missing, fairness collapses under adversarial conditions.

## Precommitment Is About Timing, Not Just Math

A common misconception is:  
*"Our RNG algorithm is secure, so we're safe."*

This ignores the fact that **who commits when** matters more than the algorithm itself.
[BlockRand](https://github.com/blockrand-api/blockrand-js) makes sure that committment happens for both before future drand is fixed.

**Perfect randomness with bad timing is still unfair.**

## Real-World Impact

Precommitment is essential in:

*   Online casinos
*   Lotteries and raffles
*   Loot boxes and drops
*   Competitive multiplayer games
*   Any system where money or advantage is at stake

Without it, disputes are unresolvable — because there is **nothing to audit.**

## Summary

*   Randomness fails when inputs can be changed after outcomes are known
*   Precommitment locks inputs in advance
*   Hashes provide binding and secrecy
*   Commit–reveal is not optional — it's foundational
*   Fairness is a timing problem before it's a math problem

In the next document, we'll explore how precommitment combines with future public entropy to prevent even more subtle attacks.
