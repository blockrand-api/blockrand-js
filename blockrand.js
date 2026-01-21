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
(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        // Node.js
        module.exports = factory(require("crypto"));
    } else {
        // Browser
        root.Blockrand = factory(null);
    }
}(typeof self !== "undefined" ? self : this, function (nodeCrypto) {

    const isNode = typeof window === "undefined";

    /* ------------------ Crypto helpers ------------------ */

    async function randomHex(bytes) {
        if (isNode) {
            return nodeCrypto.randomBytes(bytes).toString("hex");
        }
        const arr = new Uint8Array(bytes);
        crypto.getRandomValues(arr);
        return Array.from(arr).map(b => b.toString(16).padStart(2, "0")).join("");
    }

    async function sha256Hex(input) {
        if (isNode) {
            return nodeCrypto.createHash("sha256").update(input).digest("hex");
        }
        const enc = new TextEncoder().encode(input);
        const hash = await crypto.subtle.digest("SHA-256", enc);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
    }

    /* ------------------ SDK ------------------ */

    class Blockrand {
        constructor(apiKey) {
            this.apiKey = apiKey;
            this.baseUrl = "https://api.blockrand.net/api/v1";
        }

        async getRandom(playerId, delaySec, callback) {
            try {
                // 1. Player secret (never sent until reveal)
                const playerSecret = await randomHex(16);

                // 2. Commitment hash
                const playerHash = await sha256Hex(playerSecret);

                // 3. Commit
                const commitRes = await fetch(`${this.baseUrl}/commit`, {
                    method: "POST",
                    headers: {
                        "X-API-KEY": this.apiKey,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        player_id: playerId,
                        player_hash: playerHash,
                        delay_sec: Math.max(delaySec, 6)
                    })
                });

                const commitData = await commitRes.json();
                if (!commitRes.ok) {
                    throw new Error(commitData.error || "Commit failed");
                }

                const waitMs = (commitData.reveal_at * 1000) - Date.now() + 1500;
                console.log(`[Blockrand] Waiting ${(waitMs / 1000).toFixed(1)}s for reveal…`);

                setTimeout(() => {
                    this._pollForReveal(playerId, playerSecret, callback);
                }, Math.max(waitMs, 0));

            } catch (err) {
                callback({ error: err.message });
            }
        }

        async _pollForReveal(playerId, playerSecret, callback) {
            try {
                const res = await fetch(`${this.baseUrl}/reveal`, {
                    method: "POST",
                    headers: {
                        "X-API-KEY": this.apiKey,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        player_id: playerId,
                        player_secret: playerSecret
                    })
                });

                const data = await res.json();

                if (res.ok && data.status === "ready") {
                    callback({
                        player_secret: playerSecret,
                        fullResult: data,
                        verified: data.verified || false,
                        error: null
                    });
                } else if (res.status === 425 || data.status !== "ready") {
                    setTimeout(() => this._pollForReveal(playerId, playerSecret, callback), 1500);
                } else {
                    throw new Error(data.error || "Reveal failed");
                }
            } catch (err) {
                callback({ error: err.message });
            }
        }
    }

    return Blockrand;
}));
