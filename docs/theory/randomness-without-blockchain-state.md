# Randomness Without Blockchain State

**How to build verifiable randomness systems without smart contracts, on-chain storage, or gas fees.**

A common assumption in provably fair systems is that blockchain state is required to make randomness trustworthy.

This leads developers toward smart contracts, on-chain VRFs, and persistent blockchain storage.

In reality, **verifiable randomness does not require on-chain state at all.**

This document explains how randomness can be:

*   Publicly auditable
*   Deterministic and replayable
*   Resistant to manipulation

**without smart contracts or blockchain execution.**

## Why Developers Reach for Blockchain State

Blockchains offer three properties developers want for randomness:

1.  **Public visibility** – everyone sees the same data
2.  **Immutability** – results cannot be altered after the fact
3.  **Time ordering** – events occur in a fixed sequence

Smart contracts seem like the natural place to anchor randomness because they inherit all three.

But they also introduce:

*   Latency
*   Gas costs
*   Chain-specific lock-in
*   Limited throughput
*   UX friction

**The key question is:**  
Which of these properties actually require on-chain execution?

## What Randomness Systems Actually Need

For a random outcome to be verifiable, the system must guarantee:

1.  Inputs are fixed **before** the outcome is known
2.  Entropy is unpredictable at commit time
3.  The derivation function is deterministic
4.  Anyone can recompute the result independently

**None of these require:**

*   On-chain storage
*   Smart contract execution
*   Persistent blockchain state

They require **cryptography**, not consensus.

## Commit–Reveal Works Off-Chain

Commit–reveal protocols are purely cryptographic:

Commit = hash(secret)
Reveal = secret
Verification = hash(reveal) == commit


This mechanism does **not** depend on where it runs.

As long as:

*   Commits are timestamped
*   Reveals are bound to prior commits
*   Late reveals are rejected

The protocol remains sound whether executed:

*   On-chain
*   On a server
*   In a distributed service
*   In client-side verification code

## Public Entropy Does Not Require Contracts

Public entropy is often conflated with "blockchain randomness."

In practice, what matters is:

*   The entropy source is public
*   It is unpredictable at commit time
*   It is independently verifiable

**Examples include:**

*   Distributed randomness beacons (e.g. drand)
*   Future block hashes
*   Threshold-signed randomness feeds

The entropy itself can be referenced by ID, round number, or timestamp — **no contract required**.

## Deterministic Math Replaces On-Chain Logic

Once inputs are fixed, outcome derivation is deterministic math:

*   Hashing
*   Counter-based derivation
*   Rejection sampling
*   Canonical shuffles

If the algorithm is public and deterministic:

*   Everyone computes the same result
*   Disputes become trivial
*   Verification can happen offline

Smart contracts do **not** add security here — they merely execute math publicly, which is unnecessary if the math is reproducible.

## Verification Is Stronger Without State

Stateless verification has a key advantage:  
It can be performed by **anyone, anywhere, at any time**.

No need to:

*   Query a chain
*   Sync a node
*   Trust RPC endpoints
*   Pay gas

A verifier only needs:

1.  The final seed
2.  The protocol specification
3.  The public entropy reference

This enables:

*   Browser-based verification
*   Mobile verification
*   Offline audits
*   Third-party replays

## When Blockchain State Is Needed

There are cases where on-chain state is appropriate:

*   Escrowed funds
*   Automated payouts
*   Trustless settlement
*   Permissionless enforcement

But **randomness generation itself is not one of them.**

Randomness answers the question:  
*"Was this outcome generated fairly?"*

Settlement answers a different question:  
*"What happens after the outcome?"*

**Conflating the two leads to over-engineered systems.**

## Separation of Concerns

A clean architecture separates:

1.  **Randomness generation** (cryptographic, deterministic, verifiable)
2.  **Game logic** (rules, probabilities, outcomes)
3.  **Settlement** (payments, rewards, enforcement)

Randomness can be:

*   Off-chain
*   Stateless
*   Fast
*   Cheap

While settlement can remain:

*   On-chain
*   Auditable
*   Enforceable

## Takeaway

Blockchain state is **optional, not fundamental**, for verifiable randomness.

In [BlockRand](https://github.com/blockrand-api/blockrand-js), we use drand public entropy with 3 second granularity. 

What matters is:

*   Precommitment
*   Public entropy
*   Deterministic derivation
*   Open verification

Once these are satisfied, the randomness protocol stands on its own —  
independent of chains, contracts, or gas.
