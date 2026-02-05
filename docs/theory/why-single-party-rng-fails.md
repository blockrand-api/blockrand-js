---
title: "Why Single-Party RNG Fails"
description: "Why server-only randomness is structurally unfair, even when using cryptographically secure RNGs."
---

# Why Single-Party RNG Fails

## Problem Statement

A common assumption in games, casinos, raffles, and applications is:

> **"If the server uses a cryptographically secure random number generator, the result is fair."**

**This assumption is false.**

Even when a server uses a high-quality CSPRNG, single-party control over randomness makes fairness impossible to verify. The issue is not randomness quality — it is who controls when and which random output is used.

This document explains why server-only RNGs fail **structurally**, not accidentally.

---

## Randomness Quality vs Fairness

There is an important distinction that is often missed:

**Randomness quality answers:**  
*"Is this number statistically random?"*

**Fairness answers:**  
*"Can any party influence or select outcomes without detection?"*

A server can generate perfectly random numbers and still cheat — silently and undetectably.

---

## The Fundamental Asymmetry

**In a server-only RNG system:**
- The server generates the random value
- The server decides when to generate it
- The server decides whether to keep or discard it
- The server publishes the final result

**The user or player:**
- Only sees the final output
- Has no insight into discarded attempts
- Cannot prove alternative outcomes existed

**This asymmetry alone is enough to break fairness.**

---

## Silent Outcome Selection

Consider a server generating a random number for a payout:

1. The server generates a value
2. If the value is unfavorable to the house, it generates another
3. This repeats until a desirable outcome appears
4. Only the final value is shown

**From the outside:**
- The output looks random
- Logs appear clean
- No rules are violated
- No audit trail exists for discarded values

> **This is not a bug. This is unavoidable in single-party RNG systems.**

---

## Post-Hoc Manipulation

Even if a server claims it generates randomness "once per request":
- The server controls the timing
- The server can delay generation
- The server can regenerate after seeing external state
- The server can adjust parameters silently

**Without precommitment, nothing binds the server to a specific random input before the result exists.**

---

## "We Log Everything" Is Not a Solution

Server logs do not solve the problem because:
- Logs are controlled by the same party generating randomness
- Logs can omit discarded attempts
- Logs are not immutable by default
- Logs do not prove non-existence of alternate outcomes

> **An audit that depends on trust is not a cryptographic audit.**

---

## "We Use a CSPRNG" Is Not Enough

Cryptographically secure RNGs guarantee unpredictability — not fairness.

**A CSPRNG ensures:**
- Outputs are hard to predict in advance

**A CSPRNG does not ensure:**
- Outputs were not regenerated
- Outputs were not selected conditionally
- Outputs were not delayed or reordered

> **Security does not imply impartiality.**

---

## Insider Threat Model

Even in honest organizations, insider threats exist:
- Engineers with access to RNG endpoints
- Operators with deployment privileges
- Emergency overrides
- Debug modes
- Hotfixes under pressure

Single-party RNGs assume permanent honesty across all internal actors — an unrealistic model.

---

## The Undetectability Problem

**The most critical issue is this:**
A single-party RNG can cheat without leaving cryptographic evidence.

**If cheating cannot be detected:**
- Users cannot verify fairness
- Disputes cannot be resolved objectively
- Trust becomes reputational, not mathematical

> **This is unacceptable in adversarial or value-bearing systems.**

---

## Why This Is a Structural Failure

**This is not solved by:**
- Better PRNGs
- Better audits
- Better logging
- Better intentions

**The failure exists because one party controls randomness generation and disclosure.**

> **As long as that remains true, fairness cannot be proven.**

---

## What Is Required Instead

To achieve verifiable fairness, a system must ensure:
1. No single party controls the final random outcome
2. Inputs are committed before outcomes are known
3. Randomness depends on future, uncontrollable entropy
4. Results can be independently recomputed

**These ideas lead directly to:**
- Commit–reveal schemes
- Multi-party entropy
- Public randomness
- Deterministic verification

These are explored starting in the next document.

---

## Summary

**Single-party RNG systems fail not because they are insecure, but because they are unverifiable.**

- Randomness can be perfect
- Outcomes can still be manipulated
- Cheating can remain invisible

> **Fairness requires removing unilateral control — not improving random number generators.**

This is how [BlockRand](https://github.com/blockrand-api/blockrand-js) achieves this.

