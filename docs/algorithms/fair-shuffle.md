# Why Shuffling Is Hard: Hidden Bias in Card and Loot Systems

**Description:** How naive shuffle algorithms introduce measurable bias, and how to implement a provably fair, auditable shuffle using cryptographic randomness.

## Why Shuffling Is Hard

Shuffling looks solved.

Take a list.  
Randomize it.  
Done.

In reality, most shuffles in production systems are biased — sometimes badly.

This document explains:

* Why common shuffle implementations fail
* Where bias creeps in silently
* How to build a provably fair shuffle
* How deterministic randomness enables full audits

## The Myth of “Random Sort”

One of the most common mistakes:

Sort items by random value.

**Example pattern:**

1. Assign `random()` to each card
2. Sort by that value

This feels random.  
It is not.

### Why Random Sort Is Biased

Sorting assumes:

* Comparisons are transitive
* Random values are independent
* Equal values are rare

None of these guarantees hold in practice.

**Consequences:**

* Some permutations occur more often
* Others are unreachable
* Bias increases with list size

This method is mathematically incorrect for shuffling.

## The Only Correct Shuffle

The **Fisher–Yates shuffle** is the only proven method for uniform permutation.

**Core idea:**

* Iterate from end to start
* Swap current item with a random earlier item
* Never reuse positions

If implemented correctly, **every permutation has equal probability**.

## Where Fisher–Yates Still Fails

Even Fisher–Yates can be biased if:

* The RNG is weak
* Random indices are generated with modulo bias
* Entropy is reused
* Floating-point math is involved

The algorithm is correct.  
The implementation often is not.

## Modulo Bias in Shuffling

Typical index selection:


index = random() % (i + 1)

If `random()` does not produce a range divisible by `(i + 1)`:

* Some indices are slightly favored.

Across thousands of shuffles:

* Certain cards appear earlier more often
* Rare patterns become measurable
* Skilled users notice

## Deterministic Shuffle Model

A provably fair shuffle must:

* Use a deterministic seed
* Derive independent entropy per swap
* Avoid modulo bias
* Be replayable step-by-step

**Given the same seed:**  
The shuffle must always produce the same deck.

## Entropy Derivation Per Step

Instead of calling `random()`:

Use:

hash(seed : step)

Each step produces:

* Independent entropy
* No shared state
* Full auditability

Anyone can recompute the shuffle offline.

## Rejection Sampling for Index Selection

Correct index selection:

1. Generate large entropy
2. Define `maxMultiple = (M / (i + 1)) * (i + 1)`
3. Reject values above it
4. Modulo the rest

This guarantees uniform distribution.

Yes, it is slower.  
Yes, it is correct.

## Why Deterministic Shuffles Matter

In card games, loot drops, and raffles:

* Players care about fairness
* Operators face dispute risk
* Regulators demand transparency

A deterministic shuffle allows:

* Full replay
* Public verification
* Zero hidden manipulation

## Real-World Shuffle Failures

Observed in production:

* “Random” loot patterns repeating
* High-value items clustering
* Early-card advantage across games
* Players reverse-engineering bias

Most were caused by:

* Bad randomness, not bad intent.

## Shuffling as a Verifiable Protocol

A fair shuffle is not:

* “Looks random to humans”

It is:

* Uniform across all permutations
* Mathematically provable
* Deterministic from public inputs
* Independently verifiable

Anything less is trust-based.

## Key Takeaway

Shuffling is a cryptographic problem.

If:

* The entropy is biased
* The mapping is incorrect
* The process is opaque

Then the shuffle is unfair — even if it looks random.

[BlockRand](https://github.com/blockrand-api/blockrand-js) shuffle is fair.
