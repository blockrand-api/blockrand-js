# Secure Range Mapping for Large Outcome Spaces

## The Real Problem

Many systems need to select a value from a very large range:
- Lottery ticket winners
- NFT mint indices
- Raffle entries
- User ID selection
- Large prize pools

Developers often map randomness like this: `random % N`

This is incorrect when the random source does not divide evenly into the range. The result is distribution bias. In large outcome spaces, even tiny bias can affect real money outcomes.

## What Is Range Mapping?

Range mapping converts raw entropy into a number inside a desired interval.

**Example:**
- **Raw entropy:** 64-bit value
- **Target range:** 0–9,999,999
- **Goal:** Every outcome must have exactly equal probability.

## Why Modulo Mapping Fails

If the entropy space is not a multiple of the target range, some numbers appear more often.

**Example:**
2^64 possible values mapped to 10 outcomes. Since 2^64 is not divisible by 10, the first few outcomes occur more frequently. This is called **modulo bias**.

In small games this is minor, but in:
- Lotteries
- Jackpots
- Large raffles

It becomes financially significant.

## The Larger the Range, the Harder It Gets

When mapping into:
- Millions of entries
- Billions of IDs
- 128-bit spaces

Bias becomes harder to detect but still exists. Audits often miss this. Attackers can exploit predictable skew.

## Correct Solution: Rejection Sampling

The correct approach is:
1. Define the entropy limit
2. Compute the largest multiple of the target range
3. Reject values outside that boundary
4. Retry with fresh entropy

This guarantees perfect uniformity.

### Conceptual Example

**Entropy space:** 0 → 99  
**Target range:** 0 → 5  
**Largest multiple of 6 below 100 is 96.**

Accept only: 0 → 95  
Reject: 96 → 99

Then compute: `value mod 6`

Now each outcome is perfectly uniform.

## Why This Still Works for Huge Spaces

With 64-bit entropy:
- Rejection probability is extremely small
- Usually less than 1 in billions
- Often zero in practice

So performance impact is negligible while correctness is preserved.

## Deterministic Systems Need Counters

When rejection occurs, a new entropy draw is required. In deterministic RNG systems this is handled by:
- Sub-counters
- Additional hash derivations

This ensures:
- No entropy reuse
- Replayability
- Auditability

Without counters, reproducing the exact result becomes impossible.

## Common Implementation Mistakes

### Using Floating Point Scaling
**Example:** `int(random_float * N)`

**Problems:**
- Precision loss
- Uneven bucket sizes
- Platform differences

Floating point should not be used for large discrete ranges.

### Truncating Hash Bytes Incorrectly
Taking only a few bytes:
- Reduces entropy
- Increases collisions
- Introduces bias

Always use sufficient bit width.

### Mixing Signed and Unsigned Integers
Overflow or sign issues can:
- Distort distribution
- Produce negative values
- Break uniformity guarantees

## Security Implications

Biased large-range mapping can allow:
- Strategic entry timing
- Outcome prediction
- Exploiting skewed buckets

In financial systems this becomes a liability. Even tiny bias can be exploited at scale.

## Verifiable Mapping Requirements

A secure implementation should expose:
- Entropy bit width
- Mapping method
- Rejection threshold
- Retry count

This allows independent verification.

## Performance Reality

Rejection sampling is often avoided due to "performance concerns". In practice:
- Hashing is fast
- Rejection is rare
- Cost is negligible compared to network or database latency

Correctness should always win over micro-optimizations.

## Practical Use Cases

Secure large-range mapping is required for:
- Lottery winner selection
- NFT mint ordering
- Ticket draws
- Random shard assignment
- Leader election
- Anywhere one value must be chosen from a very large set

## Design Recommendation

**Always:**
- Use fixed-width entropy (64-bit or higher)
- Apply rejection sampling
- Log rejection counts
- Keep mapping deterministic

**Never rely on:**
- Modulo directly
- Floating scaling
- Partial entropy

## Key Takeaway

Mapping randomness into large ranges is deceptively dangerous. Even tiny bias:
- Breaks fairness
- Fails audits
- Can be exploited economically

Rejection sampling with sufficient entropy is the only [reliable](https://github.com/blockrand-api/blockrand-js) way to guarantee uniform outcomes across large spaces.
