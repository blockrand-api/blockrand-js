# Commit–Reveal Schemes Explained Simply

## The Core Problem Commit–Reveal Solves

Randomness systems fail most often because of **timing**.

Specifically:
> **Who knew what — and when?**

If an operator can see an outcome before locking their input, they can influence the result.

**Commit–reveal exists to eliminate this advantage.**

## The Basic Idea

Commit–reveal is a two-step protocol:
1. **Commit** to a secret value
2. **Reveal** that value later

The commitment is **binding but hiding**.  
That means:
- You cannot change the value later
- Others cannot see it until you reveal it

This prevents outcome-dependent manipulation.

## A Simple Analogy

Imagine writing a number on paper.
1. You seal it in an envelope
2. Everyone signs the envelope
3. Later, you open it

If the number matches what's inside:
> You could not have changed it after seeing the result.

**That's commit–reveal.**

## Cryptographic Commitment

In software, commitments are usually **hashes**.

**Example:**

Secret: server_seed
Commitment: hash(server_seed)


The hash is published **before** the outcome.  
Later, the secret is revealed.

Anyone can verify:

hash(revealed_secret) == published_commitment


If it matches, the commitment was honest.

## Why Commit–Reveal Is Necessary

Without commit–reveal, an operator can:
1. Generate outcomes privately
2. Pick a favorable one
3. Publish only that result

Even with a good RNG, this is manipulation.

**Commit–reveal locks the operator before the outcome is known.**

## What Commit–Reveal Guarantees

A correct commit–reveal scheme guarantees:
1. The committed value existed before the outcome
2. The value was not changed afterward
3. The reveal matches the original commitment

**It does not guarantee that the value was chosen fairly.**  
That's a critical distinction.

## Commit–Reveal Alone Is Not Enough

A system can use commit–reveal and still be unfair.

**Why?**
Because fairness also requires:
- Deterministic outcome derivation
- Unbiased range mapping
- No hidden inputs
- No post-reveal discretion

Commit–reveal prevents changing inputs, not choosing bad inputs.

## Common Commit–Reveal Pattern

Typical provably fair setup:

1. Server commits to server_seed_hash
2. Client provides client_seed
3. Public entropy (block hash, round number, etc.)
4. Outcome = deterministic function of all inputs
5. Server reveals server_seed

Verification recomputes everything.

## Timing Is the Real Security Property

The most important rule:
> All commitments must be made **before** any outcome-influencing data is known.

**Violations include:**
- Committing after client input
- Committing after public entropy is known
- Re-committing silently

Any of these break fairness.

## Reveal Must Be Mandatory

A commitment that is never revealed is useless.

**Bad pattern:**

Commit published → Outcome unfavorable → Reveal "delayed" or skipped

This allows selective disclosure.

A fair system must enforce:
- Guaranteed reveal
- Time-bounded reveal
- Penalty for non-reveal

## Multi-Party Commit–Reveal

In stronger systems:
1. Multiple parties commit
2. All reveals are combined
3. This reduces trust even further

**As long as one party is honest, the outcome remains fair.**

**Used in:**
- Decentralized lotteries
- On-chain games
- Consensus protocols

## Where Commit–Reveal Commonly Fails

### Reusing Commitments
Using the same committed seed for multiple rounds:
- Allows outcome prediction
- Enables selective stopping

**Each round must have a fresh commitment.**

### Weak Secrets
Low-entropy secrets:
- Can be brute-forced
- Reveal outcome early

Commitments must hide the value completely.

### Mixing Commit and Business Logic
Conditionally committing based on user behavior:
- Breaks neutrality
- Introduces manipulation vectors

Commitment must be unconditional.

## Commit–Reveal and Deterministic Replay

**Commit–reveal answers:**
> "Could the input have been changed?"

**Deterministic replay answers:**
> "Could the outcome have been different?"

**You need both for provable fairness.**  
One without the other is insufficient.

## Verification Checklist

A verifier should be able to confirm:
1. Commitment was published first
2. Reveal matches commitment
3. All inputs were known at the right time
4. Outcome derivation is deterministic

**If any step fails, fairness is broken.**

## What Users Should Be Able to Do

A user should be able to:
1. See the commitment
2. See the revealed value
3. Recompute the hash
4. Recompute the outcome

**Without contacting support.**

That is the standard.

## Key Takeaway

Commit–reveal is about **locking intent in time**.  
It prevents:
- Selective outcome generation
- After-the-fact manipulation
- Input tampering

But it only works when combined with:
- Deterministic algorithms
- Public inputs
- Mandatory reveals

**Provable fairness begins with [commitment](https://github.com/blockrand-api/blockrand-js) — but it is proven through replay.**
