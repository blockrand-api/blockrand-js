# How to Verify Randomness Without Trusting the Server

## The Goal: Zero Trust, Full Verification

“Don’t trust — verify” isn’t a slogan here, it’s the **design requirement**.

A provably fair system is only meaningful if you can verify outcomes **without believing anything the server says**, including:
- That it ran the correct code
- That it didn’t bias the result
- That it didn’t secretly regenerate randomness

This article shows how verification works **even if you assume the server is hostile**.

## What You Are Allowed to Trust

In a proper provably fair system, the verifier trusts only:
1. Public cryptographic primitives (hash functions)
2. Published commitments
3. Deterministic algorithms
4. Their own recomputation

**That’s it.**

No APIs, no screenshots, no “trust us” dashboards.

## The Minimal Data Needed to Verify a Result

To independently verify any outcome, you should be able to obtain:
- Server seed (revealed)
- User seed (revealed)
- Server commitment hash
- User commitment hash
- Combination algorithm
- Outcome derivation algorithm

If any of these are missing, verification is **incomplete**.

## Step 1: Verify Commitments

First, confirm neither party changed their input.

SHA256(server_seed) == server_commitment
SHA256(user_seed) == user_commitment


**If either fails:**
- The round is invalid
- Cheating is provable
- No further steps matter

This alone eliminates post-hoc manipulation.

## Step 2: Recompute the Combined Seed

Using the documented combination rule, recompute the final entropy source.

**Example:**

combined_seed = SHA256(server_seed || user_seed)


**Important:**
- Order must be fixed and documented
- No hidden salts
- No conditional logic

If the platform can’t clearly explain this step, walk away.

## Step 3: Re-derive the Random Output

From the combined seed, derive randomness exactly as specified.

**Examples:**
- Dice roll
- Coin flip
- Shuffle
- Range mapping
- Sampling
- Multi-winner draws

This must be:
- Deterministic
- Pure
- Stateless

Running it twice must produce the same output every time.

## Step 4: Match the Published Result

Now compare:

recomputed_result == published_result


**If they match:**
- The outcome is verified
- No trust was required
- The server could not have cheated

**If they don’t:**
- The platform is mathematically caught
- No excuses apply

## Why the Server’s Code Does Not Need to Be Trusted

Even if:
- The server runs proprietary code
- The server is closed-source
- The operator is malicious

Verification still works because:
1. Inputs are committed in advance
2. Outputs are deterministic
3. Math does not lie
4. Anyone can recompute independently

**The server becomes irrelevant after publishing the data.**

## Common Tricks That Break Verifiability

Be alert for these red flags:

❌ **“Verification available via our API only”**  
❌ **Commitments not publicly logged**  
❌ **Seeds revealed only on request**  
❌ **Conditional re-rolls or retries**  
❌ **Extra entropy injected server-side**

Each of these reintroduces trust — and defeats the entire purpose.

## A Simple Mental Test

Ask one question:
> “Can I verify this result offline, with nothing but the data and the algorithm?”

If the answer is **no**, the system is **not provably fair**.

## Why This Matters Long-Term

True verification gives you:
- Auditability years later
- Resistance to silent manipulation
- Mathematical proof instead of reputation
- Trust that scales globally

**Once users can verify without [trusting](https://github.com/blockrand-api/blockrand-js) the server, fairness becomes enforceable.**
