# Random Sampling Without Replacement

## The Problem

Many systems need to select multiple unique outcomes from a set.

**Examples:**
- Picking 10 winners from 10,000 users
- Drawing raffle tickets
- Selecting unique loot items
- Choosing tournament participants

A common mistake is repeatedly drawing random values and re-rolling duplicates.

This approach:
- Introduces hidden bias
- Becomes inefficient at scale
- Makes verification difficult
- Produces inconsistent results across platforms

When real value is involved, the selection must be:
- Fair
- Duplicate-free
- Deterministic
- Auditable

## What Is Sampling Without Replacement?

Sampling without replacement means:
- Once an item is selected, it cannot be selected again.

**If we pick 3 winners from:**

[A, B, C, D, E]

**Possible result:**

[B, E, A]

**Invalid result:**

[B, E, B]


## Why Naive Re-Rolling Is Dangerous

**Typical implementation:**
1. Pick random index
2. If already chosen → reroll

**Problems:**

### Hidden Bias
Earlier items have higher chance of being selected. Distribution becomes uneven as duplicates increase.

### Performance Degrades
If selecting many winners:
- Probability of duplicate rises sharply
- Worst case becomes extremely slow

### Hard to Verify
External auditors cannot reproduce:
- Which attempts were discarded
- How many retries occurred

This breaks provable fairness.

## Correct Approach: Fisher–Yates Based Selection

The standard unbiased method:
1. Start with full list
2. Shuffle deterministically
3. Take first K elements

This guarantees:
- No duplicates
- Uniform probability
- Deterministic replay

### Deterministic Shuffle Requirement

For verifiable systems, shuffle must be driven by:
- Player seed
- Server seed
- Public entropy
- Counter

Each swap decision is derived from a hash.

This ensures:
- Anyone can recompute the exact order

### Algorithm Outline

**Given:**
- List of N items
- Need K unique selections

**Steps:**
1. Generate deterministic random values
2. Perform Fisher–Yates shuffle
3. Output first K entries

**Time complexity:** O(N)  
No retries required.

## Alternative: Index Mapping Method

When N is very large (millions):
- Instead of shuffling full array
- Use a mapping table:
  - Swap selected index with last available index
  - Reduce selection range

This simulates Fisher–Yates without full memory cost.

**Used in:**
- Large raffles
- NFT allowlists
- Massive user pools

## Why Order Matters

In auditable systems, the entire shuffled order must be reproducible.

**Reasons:**
- Tie-breaking
- Secondary rewards
- Replacement logic
- Dispute resolution

Storing only final winners is insufficient.

## Common Engineering Mistakes

### Using Modulo on Indices
If range mapping is biased:
- Some users have higher chance of selection

Always use rejection sampling for index generation.

### Mixing Multiple Random Sources
Combining:
- System RNG
- External API
- Local randomness

Breaks deterministic replay. Use a single entropy pipeline.

### Mutating Lists Differently Across Platforms
Different languages may:
- Handle array swaps differently
- Coerce types
- Change iteration order

This causes verification mismatches. Use canonical ordering rules.

## Deterministic Audit Pattern

**Inputs:**
- Participant list (sorted deterministically)
- Seeds and entropy
- Counter per draw

**Process:**
1. Hash inputs
2. Generate unbiased indices
3. Execute Fisher–Yates swaps
4. Produce final ordered list

**Output:**
- Full shuffled list
- Selected winners

Anyone can independently verify.

## Real-World Use Cases

### Raffles & Giveaways
Selecting:
- 1 grand prize
- 10 secondary winners

Requires provable absence of duplicates.

### NFT & Token Launches
Allowlist selection must be:
- Transparent
- Replayable
- Dispute-resistant

### Tournament Seeding
Bracket fairness depends on unbiased ordering.

### Loot Systems With Unique Drops
Ensures:
- No duplicate rewards within a single event

## Why This Matters for Trust

Duplicate winners or biased draws lead to:
- Refund demands
- Legal exposure
- Community backlash

Most fairness disputes are caused by:
- Incorrect multi-winner selection

## Key Takeaway

Sampling without replacement is **not** repeated random picking.

The correct method is:
- Deterministic Fisher–Yates
- Bias-free index generation
- Canonical ordering
- Full replay capability

This guarantees:
- Every participant has exactly equal probability
- Results can be [independently verified](https://github.com/blockrand-api/blockrand-js)
