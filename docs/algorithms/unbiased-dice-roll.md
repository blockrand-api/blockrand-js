# Unbiased Dice Rolls: Why Dice Are Almost Always Wrong

## The Problem

Rolling a dice sounds trivial.

Most developers assume that generating a random number between 1 and 6 is as simple as:

1. Generate a random number
2. Apply modulo
3. Add 1

This approach is wrong in most real systems — and the bias it introduces is subtle enough that it often goes unnoticed, yet significant enough to matter in games, betting systems, and simulations.

This document explains:

* Why dice rolls are commonly biased
* How that bias arises mathematically
* How to generate truly unbiased dice outcomes
* How to verify dice rolls after the fact

## The Naive Dice Roll

A very common implementation looks like this:

1. Generate a random integer `R`
2. Compute `R % 6`
3. Add `1` to shift into `[1, 6]`

At first glance, this seems reasonable.

**It is not.**

## Where the Bias Comes From

Most random number generators produce values in a fixed range, for example:

* `0` to `2^32 - 1`
* `0` to `2^64 - 1`

These ranges are **not divisible by 6**.

That means:

* Some dice faces occur slightly more often than others
* The bias is deterministic and accumulates over time

This is called **modulo bias**.

### A Concrete Example

Assume a generator produces numbers from `0` to `9` (10 total values).

If you compute `R % 6`, the mapping looks like this:

0 → 0

1 → 1

2 → 2

3 → 3

4 → 4

5 → 5

6 → 0

7 → 1

8 → 2

9 → 3


Outcome frequencies:

* `0, 1, 2, 3` → occur **twice**
* `4, 5` → occur **once**

This is not uniform.

The same problem exists with real RNG ranges — just harder to see.

## Why This Matters in Practice

Bias in dice rolls leads to:

* Exploitable betting strategies
* Skewed game balance
* Invalid simulations
* Failed audits in regulated systems

Even a tiny bias becomes meaningful when:

* Millions of rolls occur
* Money or rankings are involved
* Players can analyze outcomes statistically

## The Correct Solution: Rejection Sampling

To generate an unbiased dice roll:

1. Define a range that is **evenly divisible by 6**
2. Discard any random values **outside** that range
3. Apply modulo only to accepted values

This ensures:

* Each face has exactly the same probability
* No systematic advantage exists

### Conceptual Algorithm

Let the RNG produce values in `[0, M)`

1. Compute `maxMultiple = (M / 6) * 6`
2. If `R >= maxMultiple`, reject and retry
3. Otherwise, return `(R % 6) + 1`

This guarantees uniform distribution.

## Performance Concerns (and Why They Don’t Matter)

A common worry is that rejection sampling is “slow”.

In reality:

* Rejections are extremely rare for small ranges like dice
* Modern CPUs perform this in nanoseconds
* Deterministic systems can precompute or batch results

**Correctness matters far more than theoretical micro-optimizations.**

## Deterministic and Verifiable Dice Rolls

In verifiable systems, dice rolls should be:

* Derived from a public seed
* Deterministic
* Replayable
* Auditable

This means:

* Anyone can recompute the dice roll
* Anyone can verify that no bias exists
* Disputes can be resolved mathematically

## Dice Beyond D6

The same principles apply to:

* D20 (tabletop games)
* D100 (percentile systems)
* Custom-sided dice

The number of sides changes — the math does not.

## The Key Insight

A dice roll is only fair if **every outcome is equally reachable from the entropy source**.

Modulo alone does not guarantee this.

Rejection sampling does.

## Summary

* Dice rolls are commonly implemented incorrectly
* Modulo bias is real and measurable
* Rejection sampling eliminates bias completely
* Deterministic derivation enables verification
* [BlockRand](https://github.com/blockrand-api/blockrand-js) always generates **Fair dice**
* **Fair dice are a mathematical property, not a random one**
