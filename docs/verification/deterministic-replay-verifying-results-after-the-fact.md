# Deterministic Replay: Verifying Results After the Fact

## Why Verification Always Happens Too Late

In real systems, verification rarely happens before an outcome.  
It happens when:
- A player loses
- A rare item doesn't drop
- A jackpot goes elsewhere
- A raffle winner is disputed

At that moment, explanations are useless.  
What matters is whether the outcome can be reproduced exactly.  
This is where deterministic replay becomes essential.

## What Is Deterministic Replay?

Deterministic replay means:
> Given the same inputs, the system will always produce the same output.

No matter:
- When it is run
- Where it is run
- Who runs it

If replay produces a different result, fairness is broken.

## Why Random Systems Must Be Deterministic

This sounds contradictory:  
"How can randomness be deterministic?"

The answer:  
**Randomness is generated, but outcomes are derived deterministically from it.**

Once inputs are fixed:
> There must be exactly one possible result.

## The Replay Question That Matters

A provably fair system must answer:
> "Could the operator have produced a different result using the same committed inputs?"

If the answer is **yes**, the system is not fair.  
Deterministic replay ensures the answer is always **no**.

## What Must Be Replayable

For verification to work, the following must be reproducible:
1. Entropy derivation
2. Random number generation
3. Range mapping
4. Ordering logic
5. Outcome selection

If even one step is opaque or stateful, replay fails.

## Inputs vs Hidden State

Deterministic replay requires **zero hidden state**.

**Bad examples of hidden state:**
- System time
- Internal counters not disclosed
- Server-side RNG state
- Database order
- Thread scheduling

Hidden state creates alternate timelines.  
Alternate timelines destroy verifiability.

## The Canonical Replay Model

A replayable system looks like this:

Inputs → Hash → Entropy → Algorithm → Result


- All arrows are deterministic
- All inputs are known
- No branching decisions exist

## Why Logs Are Not Enough

Many operators say:  
"We logged everything."

**Logs are not proofs.**

**Problems with logs:**
- They can be edited
- They can be incomplete
- They reflect intent, not inevitability

Deterministic replay proves that **no alternative outcome was possible**.

## Deterministic Replay vs Audits

**Audits verify:**
- Code correctness at a moment in time

**Replay verifies:**
- Outcome correctness forever

A system may pass an audit and still fail replay.  
**Replay is stronger.**

## Cross-Platform Consistency

A correct replay must produce identical results across:
- Languages
- Operating systems
- Hardware
- Time

This requires:
- Integer-only arithmetic
- Defined byte encoding
- Explicit ordering rules

**Floating point breaks replay.**

## Common Replay Breakers

### Floating-Point Math
Different platforms produce slightly different results.  
Even tiny drift invalidates replay.

### Non-Canonical Sorting
Sorting without explicit rules:
- Locale-dependent
- Language-dependent
Produces different orders.

### Partial Entropy Use
Using only part of a hash:
- Reduces determinism
- Allows ambiguity

## Replay in Practice

A verifier should be able to:
1. Collect published inputs
2. Run reference code
3. Obtain identical outputs

**If verification requires contacting the operator:**
> The system is not provably fair.

## Why Replay Changes Dispute Resolution

**Without replay:**
- Disputes become arguments
- Support becomes negotiation

**With replay:**
- Disputes become math
- Resolution is immediate

**There is nothing to argue about.**

## Deterministic Replay Is Binary

Replay does not degrade gracefully.

**Either:**
- The result reproduces exactly

**or:**
- The system is unverifiable

> "Almost the same" is failure.

## Real-World Failure Pattern

Most systems fail replay because:
- RNG calls are scattered
- Business logic mutates state
- Random calls are conditional

**Replay requires discipline.**

## Design Rule of Thumb

> If you cannot write a pure function that produces the result, your system is not replayable.

**Pure in → pure out.**

## Key Takeaway

[Deterministic replay](https://github.com/blockrand-api/blockrand-js) is the backbone of provable fairness.  
It transforms randomness from:
> "Trust us, it was fair"

into:
> "Here is the only result that could exist."

**If an outcome cannot be replayed exactly, it cannot be proven fair — no matter how good the RNG looks.**
