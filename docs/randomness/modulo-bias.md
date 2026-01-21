---
title: "Modulo Bias: Why Most Random Numbers in Games Are Slightly Wrong"
description: "Learn what modulo bias is, why it makes many game and casino random numbers unfair, and how Blockrand eliminates it using mathematically correct methods."
---


# Modulo Bias: Why Most Random Numbers in Games Are Slightly Wrong

This document explains a subtle but critical flaw in many game, casino, and simulation systems: **modulo bias**. It explains why it happens, how it breaks fairness, and how to eliminate it correctly.

## The Problem Developers Think They’ve Solved

A very common pattern in game and backend code looks like this:

1. Generate a random number
2. Take modulo `max`
3. Use the result
-  n := randomUint64() % max]
-  const n = cryptoRandom() % max;

The mental model is simple:

* The random number generator is uniform
* Modulo maps it into the desired range
* Therefore the result must be uniform

Unfortunately, this assumption is **mathematically incorrect** unless the range size is a power of two.

## What Is Modulo Bias?

Modulo bias occurs when the total number of possible random values is not evenly divisible by the target range.

**Example:**

Assume a random source produces values from `0` to `9` (10 total values). You want a random number in the range `0` to `2` (3 values).

Mapping via modulo produces:

- 0 maps to 0
- 1 maps to 1
- 2 maps to 2
- 3 maps to 0
- 4 maps to 1
- 5 maps to 2
- 6 maps to 0
- 7 maps to 1
- 8 maps to 2
- 9 maps to 0


**Final counts:**
* `0` appears 4 times
* `1` appears 3 times
* `2` appears 3 times

The distribution is **biased**. This bias never disappears, no matter how good the random source is.

## Why This Matters in Games and Gambling

Modulo bias:
* Slightly favors some outcomes
* Accumulates over millions of rolls
* Is detectable via statistical tests
* Breaks provable-fair claims

In casinos, even tiny statistical edges matter.

In games, this can affect:
* Loot drops
* Dice rolls
* Card shuffling
* Matchmaking randomness
* Replay determinism

If your system can be audited or replayed, even small bias is unacceptable.

## Why “The Bias Is Small” Is the Wrong Argument

Developers often argue that the bias is negligible. This is false in systems that are:
* High frequency
* Auditable
* Adversarial
* Financially sensitive

If users can verify outcomes or replay them, **any bias is a correctness bug, not an optimization tradeoff.**

## The Correct Solution: Rejection Sampling

The correct approach to mapping random numbers into ranges is **rejection sampling**.

**Core idea:**
1. Generate a fixed-width random number (for example, 64 bits)
2. Accept only values that fit evenly into the target range
3. Reject and retry values that would introduce bias

## How Rejection Sampling Works

Let:
* The random space be `2^64` values
* The target range be `max`

**Compute:**
The largest multiple of `max` that fits inside `2^64`. Only accept random values below that threshold.

If a value falls outside it:
1. Discard it
2. Generate another

The accepted value modulo `max` is **perfectly uniform**.

## Why This Works

Because every possible output value is backed by the **exact same number of input values**.
* No value is favored.
* No value is penalized.
* No bias exists.

## Performance Concerns (Addressed)

Rejection sampling sounds expensive but is **not**.

In practice:
* Rejection probability is less than `1 / max`
* For dice, cards, and percentages, rejection is extremely rare
* Most real-world calls experience **zero** rejections

This is safe even in high-throughput systems.

## Why a Cryptographic RNG Alone Is Not Enough

Even if you use:
* Operating system entropy
* Hardware RNGs
* Cryptographically secure generators

**Modulo bias still occurs after the random number is generated.** Uniform input does not imply uniform output. Correct mapping matters as much as entropy quality.

## What a Fair Random Integer System Must Do

A correct implementation must:
1. Never use modulo directly on raw random output
2. Use rejection sampling
3. Use fixed-width entropy
4. Be deterministic if replay is required
5. Be auditable after the fact

## Key Takeaway

**Fair randomness is not about better entropy. It is about correct mathematics.** Most systems get this wrong. Correct systems are precise, boring, and provable. That is exactly what fairness should look like.

[BlockRand](https://github.com/blockrand-api/blockrand-js) always uses the correct mathematics to generate all its random numbers.
