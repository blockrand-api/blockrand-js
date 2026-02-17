Randomness matters more than most people realize — especially in gaming, lotteries, simulations, and digital systems where fairness must be provable.

[BlockRand](https://blockrand.net) delivers provably fair, auditable random numbers that anyone can independently verify. By combining cryptographic commit-reveal schemes, deterministic hashing, and external entropy sources, BlockRand ensures outcomes are unbiased, tamper-resistant, and mathematically reproducible.

This documentation explains the theory, algorithms, and verification models behind verifiable randomness systems.


---

## Core Concepts

- [What Is Verifiable Randomness?](/randomness/what-is-verifiable-randomness.html)
- [What Is Modulo Bias?](/randomness/modulo-bias.html)
- [Why One Seed Is Not Enough?](/randomness/Deterministic_Counters_and_Canonica_Randomness.html)
- [Why Future Public Entropy Matters?](/randomness/why-future-public-entropy-matters.html)
- [How Provably Fair Systems Fail in Practice?](/randomness/how-provably-fair-systems-fail-in-practice.html)
- [How Randomness Audits Work?](/randomness/how-randomness-audits-work.html)
- [Why Traditional RNG APIs Are Not Auditable?](/randomness/why-traditional-rng-apis-are-not-auditable.html)
- [Why Determinism Is Not the Enemy of Fairness?](/randomness/determinism-is-not-the-enemy-of-fairness.html)


---

## Theory

- [Why Single-Party RNG Fails?](/theory/why-single-party-rng-fails.html)
- [What Is the Double-Blind Entropy Model?](/theory/double-blind-entropy-model.html)
- [Why Should There Be Delay in Randomness?](/theory/timing-and-delay-in-randomness.html)
- [Why Precommitment Matters?](/theory/why-precommitment-matters.html)
- [How to Build Verifiable Randomness Without Blockchain State?](/theory/randomness-without-blockchain-state.html)
- [Understanding Trade-offs: Verifiable Randomness vs Oracles](/theory/verifiable-randomness-vs-oracles.html)


---

## Algorithms

- [Fair Dice](/algorithms/unbiased-dice-roll.html)
- [Unbiased Coin Toss](/algorithms/unbiased-coin-toss.html)
- [Fair Shuffle](/algorithms/fair-shuffle.html)
- [Weighted Random Selection](/algorithms/weighted-random-selection.html)
- [Random Sampling Without Replacement](/algorithms/random-sampling-without-replacement.html)
- [Multi-Winner Draws with Deterministic Ordering](/algorithms/multi-winner-draws-with-deterministic-ordering.html)
- [Progressive Probability Curves (Pity Systems)](/algorithms/progressive-probability-curves-pity-systems.html)
- [Secure Range Mapping for Large Outcome Spaces](/algorithms/secure-range-mapping-large-outcome-spaces.html)


---

## Verification

- [What Provably Fair Actually Means](/verification/what-provably-fair-actually-means.html)
- [Deterministic Replay Verification](/verification/deterministic-replay-verifying-results-after-the-fact.html)
- [Commit–Reveal Schemes Explained Simply](/verification/commit-reveal-schemes-explained-simply.html)
- [Commit–Reveal and Double-Blind Verification](/verification/commit-reveal-and-double-blind-verification.html)
- [Verify Randomness Without Trusting the Server](/verification/verify-randomness-without-trusting-the-server.html)
- [Public Entropy Sources — What Counts and What Doesn’t](/verification/public-entropy-sources-what-counts-and-what-doesnt.html)
- [Common Verification Failures and How Systems Get Caught](/verification/common-verification-failures-and-how-systems-get-caught.html)
