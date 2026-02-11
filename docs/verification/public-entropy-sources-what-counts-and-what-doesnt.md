# Public Entropy Sources: What Counts and What Doesn’t

## Why “Public” Entropy Exists at All

Even with commit–reveal and double-blind designs, one question keeps coming up:
> “What if both sides collude, or one side controls everything?”

Public entropy sources exist to answer that by adding **external, uncontrollable randomness** into the system.

But not all “public randomness” is actually trustworthy.  
Some sources **strengthen fairness**.  
Others only **appear to**.

## What a Public Entropy Source Must Guarantee

For an entropy source to be meaningful, it must be:
1. **Unpredictable in advance**
2. **Uncontrollable by the operator**
3. **Publicly observable**
4. **Time-anchored**
5. **Independently verifiable**

If any one of these is missing, the source is **cosmetic — not protective**.

## What Actually Counts as Public Entropy

### ✅ Decentralized Randomness Beacons
**Examples:**
- drand
- NIST randomness beacon (with caveats)

**Why they work:**
- Many independent contributors
- Threshold signatures
- Public, immutable rounds
- No single party controls output

These are strong sources when combined correctly.

### ✅ Blockchain Block Hashes (With Care)
Block hashes can be used — but **only under strict rules**.

They work only if:
1. The block height is fixed before the commitment
2. The chain is sufficiently decentralized
3. Reorg risk is understood
4. Miner influence is bounded

Used improperly, block hashes become manipulable.

### ✅ Verifiable Delay Functions (VDFs)
VDFs introduce **time as a security feature**.

**Properties:**
- Cannot be sped up
- Publicly verifiable
- Force sequential computation

They are excellent for:
- Lotteries
- Draws with delayed revelation
- Anti-abort guarantees

## What Does Not Count as Public Entropy

### ❌ Server-Provided “Random APIs”
If the server controls it, it’s **not public**.

**Examples:**
- `/random`
- `/seed`
- `/entropy`
- “Certified randomness” endpoints

These are just **trust wrapped in JSON**.

### ❌ Time-Based Values
**Examples:**
- Current timestamp
- Milliseconds
- System clock
- Request latency

These are:
- Predictable
- Biasable
- Easily brute-forced

Time is metadata — not entropy.

### ❌ User Interaction Noise
**Examples:**
- Mouse movement
- Click timing
- Typing cadence

**Problems:**
- Can be simulated
- Often quantized
- Not reproducible
- Impossible to verify later

If it can’t be replayed, it can’t be verified.

### ❌ Oracles Without Commitments
Even third-party providers fail if they:
- Don’t pre-commit
- Don’t publish hashes
- Don’t log outputs immutably

“External” does not automatically mean “trustless”.

## How Public Entropy Should Be Used

Public entropy should **never replace commit–reveal**.  
It should:
1. Be mixed in, not relied on alone
2. Act as a bias-breaker
3. Prevent collusion or aborts

**Typical combination:**

final_seed = SHA256(
server_seed ||
user_seed ||
public_entropy
)


Each component adds protection against a different failure mode.

## A Common Mistake: Overconfidence

Adding public entropy does **not** fix:
- Hidden logic
- Non-deterministic mapping
- Opaque retries
- Selective disclosure

Entropy strengthens fairness — it does **not** create it.

## The Gold Standard Test

Ask:
> “Could any single party have influenced this value after seeing partial information?”

If yes — it’s **not** a valid public entropy source.

## Why This Matters for Verification

Public entropy sources:
- Reduce trust assumptions
- Limit insider manipulation
- Increase long-term auditability
- Make fairness **resilient**, not just honest

Used correctly, they turn [provably fair systems](https://github.com/blockrand-api/blockrand-js) from **promises** into **structures**.
