# Commit–Reveal & Double-Blind Verification Explained

## Why Verification Needs More Than "Just a Random Number"

When platforms claim they are provably fair, they often stop at saying:
> "The server can't change the outcome after the fact."

That's necessary — but **not sufficient**.

True verification requires **three guarantees**:
1. The server cannot cheat
2. The user cannot cheat either
3. Anyone can independently verify the outcome later

This is where **commit–reveal** and **double-blind randomness** come in.

## The Core Problem: Trust Timing

Randomness failures usually come from **timing asymmetry**:
- If the **server** chooses randomness last, it can bias outcomes.
- If the **user** chooses randomness last, they can brute-force favorable results.
- If either party can see the other's input first, fairness collapses.

So the solution must ensure:
1. Inputs are fixed **before** outcomes are known
2. Inputs are hidden **until it's too late** to change them

## Step 1: Commit Phase (Locking Intent)

A **commitment** is a cryptographic promise.  
Instead of revealing a secret value, a party publishes its **hash**.

**Example:**

server_seed = "S3cr3tServerSeed"
commitment = SHA256(server_seed)


At this point:
- The value is **fixed**
- The value is **hidden**
- The value is **tamper-proof**

Once published, the server cannot change the seed without breaking the hash.

## Step 2: Reveal Phase (Proving Honesty)

Later, the original value is revealed.  
Anyone can verify:

SHA256(revealed_server_seed) == original_commitment


**If it matches:**
- The server kept its promise
- The value was not altered after commitment

**If it doesn't:**
- Cheating is mathematically proven
- No trust required

## Why Commit–Reveal Alone Isn't Enough

A basic commit–reveal scheme still has a **weakness**:
> Whoever reveals last can bias the outcome.

**Example:**

Server commits → User reveals seed → Server sees user seed and aborts if result is unfavorable


This is subtle — but real.

## Step 3: Double-Blind Randomness

To fully eliminate bias, **both sides must commit first**.

### Proper Flow
1. Server commits to its seed (hash only)
2. User commits to their seed (hash only)
3. Both reveal their seeds
4. Seeds are combined deterministically
5. Final randomness is derived

**No one gets the last move.**

## Deterministic Combination

A common, verifiable combination method:

combined_seed = SHA256(server_seed || user_seed)


**Key properties:**
- Order is fixed
- Output is deterministic
- Any change in either seed changes the result
- Anyone can recompute it independently

## Why This Is "Provably" Fair

Because every claim can be **checked**:
1. Commitments are public
2. Reveals are verifiable
3. Combination logic is deterministic
4. Final outputs are reproducible

**Fairness is no longer a promise — it's a math proof.**

## Common Anti-Patterns to Watch For

❌ **Server reveals seed before user commits**  
❌ **Server can cancel rounds silently**  
❌ **Randomness mixed with hidden server logic**  
❌ **"Provably fair" without public commitments**

If any step cannot be independently verified, the system is **not provably fair** — regardless of marketing claims.

## What Verification Actually Gives You

With commit–reveal + [double-blind](https://github.com/blockrand-api/blockrand-js) design:
- Operators cannot manipulate outcomes
- Users cannot game the system
- Auditors can reproduce results years later
- Trust shifts from **people → mathematics**

**That's the real point.**
