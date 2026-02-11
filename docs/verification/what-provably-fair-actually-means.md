# What "Provably Fair" Actually Means

## The Most Misused Term in Randomness

"Provably fair" is one of the most abused phrases in gaming, gambling, and Web3 systems.

Many platforms claim to be provably fair because they:
- Use cryptography
- Publish a hash
- Mention blockchain
- Use a reputable RNG library

None of these, by themselves, make a system provably fair.

**Provable fairness is not a technology choice.**  
**It is a verifiability property.**

## The Core Definition

A system is provably fair if:
- Any third party can independently verify that the outcome was produced correctly,
- Using only public information,
- Without trusting the operator.

If verification requires trust, explanations, screenshots, or "internal logs" — the system is **not** provably fair.

## What Provably Fair Is NOT

Let's eliminate common misconceptions.

### "We Use a Secure RNG"
**Irrelevant.**  
A secure RNG can still be:
- Misused
- Reseeded
- Overridden
- Selectively called

Security does not imply fairness.

### "We Publish the Result Hash"
A hash alone proves nothing unless:
- The inputs are known
- The mapping is defined
- The process is replayable

A hash without context is just a checksum.

### "It's On the Blockchain"
Blockchains provide immutability, not correctness.  
If bad randomness is committed on-chain:
- It is permanently bad
- It is permanently unfair

Provable fairness must exist before immutability.

### "Trust Us, We're Audited"
Audits are snapshots.  
Provable fairness is continuous.  
If fairness cannot be verified after every outcome, the system still relies on trust.

## The Minimum Requirements of a Provably Fair System

A provably fair system must satisfy **all** of the following:

### 1. Determinism
Given the same inputs, the system must always produce the same output.
- No hidden state.
- No time-based randomness.
- No environmental dependencies.

### 2. Public Inputs
All inputs that influence the outcome must be:
- Known
- Disclosed
- Immutable once committed

If an input is secret forever, it cannot be verified.

### 3. Defined Algorithm
The exact algorithm must be specified:
- Hash functions
- Encoding rules
- Range mapping
- Rejection rules
- Ordering logic

"Industry standard" is not a specification.

### 4. Replayability
Anyone must be able to:
- Recompute the entropy
- Re-run the algorithm
- Reach the same result

If two independent implementations disagree, fairness is broken.

### 5. No Operator Discretion After Commitment
Once inputs are committed:
- No rerolls
- No retries
- No reordering
- No conditional logic

Any post-commit choice is a manipulation vector.

## Trust-Based vs Provably Fair

### Trust-Based System

Operator runs RNG → User sees result → Operator claims fairness

Verification requires belief.

### Provably Fair System

Inputs are committed → Outcome is derived deterministically → User verifies independently

Trust is replaced by math.

## Why "After-the-Fact Proof" Matters

Fairness is often challenged after an unfavorable outcome.  
A provably fair system allows users to ask:

> "Given what was known at the time, could this result have been different?"

If the answer is **"no"**, the system is provably fair.  
If the answer is **"maybe"**, it isn't.

## The Commit–Reveal Foundation

Almost all provably fair systems rely on some form of:
- **Commitment** (hash of future secret)
- **Later reveal** (the secret itself)

This prevents:
- Selective disclosure
- Outcome-dependent manipulation

But commit–reveal alone is not enough without deterministic mapping.

## What Provable Fairness Does NOT Guarantee

**Important clarity:** Provably fair does not mean:
- You will win
- Outcomes are favorable
- Variance is reduced
- The system is generous

It only guarantees: **The outcome was not manipulated.**

A fair loss is still a loss.

## Why This Matters in Practice

Provable fairness:
- Eliminates most disputes instantly
- Reduces support and refund pressure
- Protects operators from false accusations
- Builds long-term user trust

In adversarial environments, this is not optional infrastructure.

## A Simple Litmus Test

Ask this question:
> Can a skeptical third party, with no special access, reproduce the outcome exactly?

- **If yes** → provably fair
- **If no** → trust-based

**There is no middle ground.**

## Key Takeaway

"Provably fair" is not a marketing term.  
It is a strict technical property that requires:
- Determinism
- Transparency
- Replayability
- Zero post-commit discretion

Anything less is trust wrapped in cryptography, not [fairness](https://github.com/blockrand-api/blockrand-js).
