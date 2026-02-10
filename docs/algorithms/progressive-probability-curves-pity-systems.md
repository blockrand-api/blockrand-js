# Progressive Probability Curves (Pity Systems)

## The Real Problem

Many games promise:
> “You are guaranteed a rare item after enough attempts.”

This is commonly called a **pity system** or **progressive probability curve**.

But most implementations:
- Are opaque
- Cannot be verified
- Can be silently adjusted
- Reset incorrectly

Players cannot prove whether the guarantee was actually honored.

## What Is a Progressive Probability Curve?

A progressive probability system increases the chance of success after each failure.

**Example:**
- Attempt 1–9 → 1% chance
- Attempt 10–19 → 3%
- Attempt 20–29 → 8%
- Attempt 30+ → Guaranteed

This reduces long losing streaks.

**Used in:**
- Gacha games
- Loot boxes
- Card packs
- Skin drops
- Upgrade systems

## Why Fixed Probability Is Often Not Enough

Pure fixed probability causes extreme variance.

**Example:** 1% drop rate.

**Possible outcomes:**
- Player A gets item in 3 tries
- Player B gets item in 500 tries

Even if mathematically fair, this *feels* unfair.

Pity systems reduce perceived unfairness.

## The Hidden Trust Problem

In most systems:
- The curve is not published
- Internal counters are hidden
- Reset logic is unclear

This allows silent manipulation:
- Changing drop rates dynamically
- Resetting pity without notice
- Increasing difficulty for certain users

Players have no audit capability.

## What Must Be Verifiable

A fair progressive probability system must expose:

- Current attempt counter
- Exact probability at that step
- Random input used for the decision
- Whether reset conditions were triggered

Without these, the guarantee cannot be proven.

## Deterministic Implementation Model

A verifiable pity system uses:
- A deterministic seed
- A counter representing attempt number
- A published probability curve

At each attempt:
1. Derive a uniform random value
2. Compare against probability for that step
3. Decide success or failure
4. Reset or increment counter deterministically

Anyone can replay the sequence.

## Example Curve Table

| Attempt | Probability |
|---------|-------------|
| 1–9     | 0.01        |
| 10–19   | 0.03        |
| 20–29   | 0.08        |
| 30      | 1.00        |

The curve must be:
- Public
- Versioned
- Immutable once deployed

## Common Implementation Mistakes

### Hidden Dynamic Difficulty
Changing probability per user segment:
- High spenders
- New users
- Returning users

This creates undisclosed manipulation risk.

### Incorrect Counter Handling
Bugs often:
- Reset counter on login
- Reset after partial success
- Desync client vs server counters

This breaks guarantees.

### Using Non-Uniform Random Inputs
If the random value is biased:
- The effective probability curve becomes incorrect.

**Example:** Modulo bias increases or decreases real drop rates.

## Attack Surface Without Transparency

If pity logic is server-only, operators can:
- Grant rare items selectively
- Suppress drops
- Adjust economy silently

These changes are almost impossible to detect afterward.

## Verifiable Pity System Requirements

A provably fair system should publish:
- Probability curve definition
- Attempt counter value
- Deterministic randomness source
- Outcome decision logic

With these: Any third party can recompute whether the item should have dropped.

## UX Benefit

Transparent pity systems:
- Increase player trust
- Reduce support disputes
- Improve retention
- Prevent “rigged game” accusations

Some modern games now display:
> “Current drop chance: 12%”

But still do not provide verification.

## Deterministic Replay Example

**Given:**
- Seed
- Attempt number
- Probability table

**Anyone can:**
1. Recompute random value
2. Compare with probability
3. Confirm result

This converts:
> “Trust the game”
into
> “Verify the math”.

## Regulatory Direction

Several regions are moving toward:
- Loot box transparency
- Published odds
- Audit requirements

Future systems will likely require:
- Provable enforcement of pity guarantees.

## Design Recommendation

Separate:
1. Probability definition
2. Randomness generation
3. Outcome evaluation

Each must be independently auditable.

Never mix economy logic with RNG logic.

## Key Takeaway

Pity systems are designed to improve fairness perception.  
But without [verifiability](https://github.com/blockrand-api/blockrand-js), they introduce **more** power to manipulate outcomes than fixed probability systems.

A trustworthy implementation must make:
- The curve
- The counter
- The randomness
- The decision

**All reproducible by anyone.**
