---
title: "How Randomness Audits Actually Work: What Verifiers, Regulators, and Players Check"
description: "Explains how randomness systems are audited in practice, covering the 8 key questions auditors ask, why most systems fail audits despite correct math, and what it takes to build a truly verifiable system."
---

# How Randomness Audits Actually Work: What Verifiers, Regulators, and Players Check

> **Most developers think audits are about code.**  
> **They are not.**  
> **Audits are about evidence.**  
> This document explains how randomness systems are actually audited in practice, what third parties look for, and why many systems fail audits even when the math is correct.

---

## THE GOAL OF AN AUDIT

An audit does not ask:
> **"Is this random?"**

It asks:
> **"Can anyone influence outcomes without being detected?"**

**Randomness quality is secondary. Influence resistance is primary.**

---

## WHO AUDITS RANDOMNESS SYSTEMS

Auditors typically fall into four groups:
1. **Internal security teams**
2. **External consultants**
3. **Regulators or compliance bodies**
4. **End users investigating disputes**

Each group has different skills, but they all ask the same core questions.

---

## QUESTION 1: CAN RESULTS BE REPLAYED EXACTLY?

**First audit step:**
- Take a historical result
- Recompute it independently
- Confirm an exact match

**If replay fails:**
- The system is not auditable
- The discussion ends immediately

> **Determinism is mandatory.**

---

## QUESTION 2: ARE ALL INPUTS PUBLIC OR PROVABLE?

**Auditors enumerate inputs:**
- Player commitment
- Server commitment
- Public entropy
- Timing parameters
- Version identifiers

**If any input is:**
- Hidden
- Mutable
- Implicit
- Derived from private state

**Then trust is required. Auditors reject trust.**

---

## QUESTION 3: WHEN DID EACH INPUT BECOME KNOWN?

**This is the most important step.**

**Auditors reconstruct a timeline:**
- When the player committed
- When the server committed
- When public entropy was selected
- When entropy became known
- When secrets were revealed

> **If any party knew the final outcome early, fairness is compromised.**

---

## QUESTION 4: CAN INPUTS BE SELECTED OR ABORTED?

**Auditors look for:**
- Retry mechanisms
- Conditional reveals
- Silent abort paths
- Optional participation

> **If outcomes can be discarded quietly, bias is possible. Fair systems force outcomes to complete.**

---

## QUESTION 5: IS RANDOMNESS DERIVATION CANONICAL?

**Auditors check:**
- Fixed counter mappings
- Deterministic derivation rules
- No dependency on execution order
- No hidden state

**They verify that:**
- Coin flips
- Dice rolls
- Shuffles
- Percent checks

**All map to fixed indices.**

> **If meaning can change, verification breaks.**

---

## QUESTION 6: IS BIAS MATHEMATICALLY ELIMINATED?

**Auditors do not accept:**
- "Bias is negligible"

**They expect:**
- Rejection sampling
- Exact uniformity
- Formal reasoning
- Edge-case handling

> **Especially in gambling systems, theoretical bias matters.**

---

## QUESTION 7: CAN THIRD PARTIES VERIFY WITHOUT SDKS?

**A strong audit requirement:**
- Verification must work with raw inputs
- No proprietary tooling required
- Hashes, signatures, and formulas must suffice

> **If verification requires "trusting the SDK", the system fails.**

---

## QUESTION 8: ARE VERSIONS IMMUTABLE?

**Auditors ask:**
- Which version produced this result?
- Is that version frozen?
- Can it be reproduced years later?

> **Randomness systems must be versioned like protocols. Mutable logic destroys historical trust.**

---

## WHY MOST SYSTEMS FAIL AUDITS

**They fail because:**
- Inputs are implicit
- Timing is unclear
- State is hidden
- Logic evolved silently
- Convenience trumped structure

> **Not because developers were dishonest. Because fairness was added late.**

---

## WHAT PASSES AUDITS CONSISTENTLY

**Systems that pass:**
- Publish full inputs
- Enforce timelines mechanically
- Use public future entropy
- Derive results canonically
- Make verification boring

> [BlockRand](https://github.com/blockrand-api/blockrand-js) passes all these.

---

## THE FINAL AUDIT QUESTION

**Every audit ends with one question:**
> **"Could the operator have influenced this outcome without leaving evidence?"**

**If the answer is no, the system passes. If the answer is "probably not", it fails.**

---

## KEY TAKEAWAY

**Audits do not reward cleverness. They reward constraint.**  
**The best randomness systems are not impressive. They are inevitable.**
