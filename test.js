/**
 * @file test.js
 * @description sample test file for javaScript SDK for Blockrand — Provably Fair Randomness as a Service.
 * @version 1.0.0
 * @author Rishi (rishi@blockrand.net)
 * @license MIT
 * * Blockrand provides cryptographically verifiable entropy using a Double-Blind model:
 * 1. Player commits a hash of a secret generated locally.
 * 2. Server provides a secret and anchors the round to a future Drand beacon.
 * 3. The final result is revealed only after the Drand beacon is published.
 * * @see {@link https://blockrand.net}
 * @see {@link https://github.com/blockrand-api/blockrand-js} For the quick start.
 */

const Blockrand = require('./blockrand.js');

// REPLACE WITH YOUR ACTUAL API KEY
const API_KEY = "YOUR_BR_API_KEY"; 
const client = new Blockrand(API_KEY);

const testPlayer = "node_player_123"

console.log(`🚀 Running Blockrand SDK v1: Double-Blind Entropy...`);

client.getRandom(testPlayer, 6, (res) => {
    if (res.error) {
        console.error("❌ Error:", res.error);
        return;
    }

    const full = res.fullResult;
    const out = full.results.outcomes;

    console.log("\n==================================================");
    console.log("             BLOCKRAND RESULTS TERMINAL             ");
    console.log("==================================================");
    
    console.log("\n1️⃣  THE TRUST WINDOW (Provably Fair)");
    console.log(`   Committed At : ${full.committed_at} (Player input locked)`);
    console.log(`   Settled At   : ${full.settled_at} (Randomness released)`);
    console.log(`   Verification : ${full.verified ? "✅ PASSED" : "❌ FAILED"}`);
    console.log(`   Note: Randomness was generated AFTER your commitment.`);

    console.log("\n🛡️  THE DOUBLE-BLIND ENTROPY (Anti-Cheating)");
    console.log(`   1. Player Blind: Player sent this Hash but kept the secret : ${full.player_hash}`);
    console.log(`   2. Server Blind: Server sent this Hash but kept the secret : ${full.server_hash}`);
    console.log(`   3. Drand Blind: The dRand Beacon was generated AFTER you committed.`);
    console.log(`\n   Result: Total Neutrality. Player cannot cheat. The Server cannot cheat.`);

    console.log("\n2️⃣  THE CRYPTOGRAPHIC MIX (The Formula)");
    console.log(`   Formula      : ${full.formula}`);
    console.log(`   Player Secret: ${full.player_secret} (Sent during Reveal)`); // Added here
    console.log(`   Server Secret: ${full.server_secret} (Released on Reveal)`);
    console.log(`   Drand Sig    : ${full.drand_signature} (External Entropy)`);
    console.log(`   Final Seed   : ${full.final_randomness}`);
    console.log(`   Explanation  : All secrets are now public. Any player can `);
    console.log(`                  independently re-run the hash math to verify `);
    console.log(`                  the seed matches the outcomes perfectly.`);

    console.log("\n3️⃣  UNIFORM DERIVATION (How numbers are born)");
    console.log(`   - D6 Result: ${out.d6}`);
    console.log(`   - Logic    : We use 'Rejection Sampling'. If the seed bits`);
    console.log(`                create a bias, they are discarded and re-hashed.`);
    console.log(`                This ensures a perfect 16.66% chance for every face.`);

    console.log("\n4️⃣  RESULTS SUMMARY");
    console.log(`   🪙  Coin  : ${out.coin === 0 ? "HEADS" : "TAILS"}`);
    console.log(`   🎯  D100  : ${out.d100}`);
    console.log(`   📈  Float : ${out.float_0_1.toFixed(8)}`);
    console.log(`   🃏  Cards : ${out.shuffle_52.slice(0, 5).join(', ')}...`);

    console.log("\n5️⃣  PUBLIC AUDIT");
    console.log(`   Verify the beacon here:`);
    console.log(`   🔗 ${full.audit_link}`);
    console.log("==================================================\n");

    process.exit(0);
});
