# blockrand.js

Open Source SDK to generate Provably fair, time-locked randomness using double-blind entropy and Drand.

---

## Overview

**Blockrand** is a provably fair randomness system based on **double-blind entropy** and **time-locked commitments**.

Randomness is generated using a strict **commit → settle → reveal** protocol where **neither the client nor the server can influence the outcome after commitment**, and the final entropy **does not exist at commit time**.

This JavaScript SDK provides a minimal, copy-paste interface for interacting with the Blockrand backend while preserving full cryptographic verifiability.

---

### Double-blind entropy

Each random result is derived from **three independent entropy sources**, none of which are known in full by any single party at commit time:

1. **Client secret** – generated locally and committed as a hash  
2. **Server secret** – generated server-side and committed as a hash  
3. **Drand beacon** – public, decentralized randomness revealed in a future round  

Because both the client and server commit *before* Drand is published, the system is **double-blind**:
- The client cannot bias the outcome
- The server cannot bias the outcome

---

### Time-locked randomness

Commitments are made against a **future Drand round**, allowing randomness to be time-locked **N seconds or minutes in advance**.

At commit time:
- The final random value is unknowable
- No party can precompute or discard outcomes
- All commitments are immutable

This prevents outcome fishing, retry abuse, and selective reveal attacks.

---

### Deterministic final seed

Once all inputs are revealed, the final seed is computed as:

SHA256(client_secret : server_secret : drand_signature)


Anyone can independently recompute this value and verify:
- Commit hashes
- Reveal integrity
- Drand round correctness
- Final outcome derivation

No trust in Blockrand is required.

---

## Quick Start
