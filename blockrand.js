/**
 * @file blockrand.js
 * @description Official JavaScript SDK for Blockrand — Provably Fair Randomness as a Service.
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

const crypto = require('crypto');

class Blockrand {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://api.blockrand.net/api/v1";
    }

    async getRandom(playerId, delaySec, callback) {
        try {
            // 1. Generate local entropy (Double-Blind: Server never sees this until reveal)
            const playerSecret = crypto.randomBytes(16).toString('hex');
            
            // 2. Hash the secret for the commitment
            const playerHash = crypto.createHash('sha256').update(playerSecret).digest('hex');

            // 3. Commit the hash
            const commitRes = await fetch(`${this.baseUrl}/commit`, {
                method: 'POST',
                headers: { 
                    'X-API-KEY': this.apiKey,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    player_id: playerId,
                    player_hash: playerHash,
                    delay_sec: Math.max(delaySec, 6)
                })
            });

            const commitData = await commitRes.json();
            if (commitRes.status !== 200) throw new Error(commitData.error || "Commit failed");

            // 4. Calculate wait time based on the target Drand round
            const waitMs = (commitData.reveal_at * 1000) - Date.now() + 1500;
            console.log(`[SDK] Commitment successful. Waiting ${(waitMs/1000).toFixed(1)}s for reveal...`);

            setTimeout(() => {
                this._pollForReveal(playerId, playerSecret, callback);
            }, Math.max(waitMs, 0));

        } catch (err) {
            callback({ error: err.message });
        }
    }

    async getHistory(playerId, callback) {
        try {
            const res = await fetch(`${this.baseUrl}/history?player_id=${playerId}`, {
                method: 'GET',
                headers: { 'X-API-KEY': this.apiKey }
            });
            const data = await res.json();
            callback(data.history || []);
        } catch (err) {
            callback({ error: err.message });
        }
    }

    async _pollForReveal(playerId, playerSecret, callback) {
        try {
            const revealRes = await fetch(`${this.baseUrl}/reveal`, {
                method: 'POST',
                headers: { 
                    'X-API-KEY': this.apiKey,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    player_id: playerId,
                    player_secret: playerSecret 
                })
            });

            const data = await revealRes.json();

            if (revealRes.status === 200 && data.status === "ready") {
                callback({
                    player_secret: playerSecret,
                    fullResult: data,
                    verified: data.verified || false,
                    error: null
                });
            } else if (revealRes.status === 425 || (data && data.status !== "ready")) {
                // 425 is "Too Early" - Drand hasn't published yet
                console.log("[SDK] Result not ready yet, retrying...");
                setTimeout(() => this._pollForReveal(playerId, playerSecret, callback), 1500);
            } else {
                throw new Error(data.error || "Reveal failed");
            }
        } catch (err) {
            callback({ error: err.message });
        }
    }
}

module.exports = Blockrand;
