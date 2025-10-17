import axios from 'axios';

import fs from 'fs';

// Load user data from JSON file
const userData = JSON.parse(fs.readFileSync('users.json', 'utf8'));



// --- Konfigurasi ---
const ROBLOX_API_URL = "https://presence.roblox.com/v1/presence/users";
const USER_ID_TO_MONITOR = userData.map(user => user.userId); // Ganti dengan User ID yang ingin kamu monitor
const CHECK_INTERVAL_MS = 60000; // Cek setiap 60 detik (1 menit)
const USER_PRESENCE_TYPE = {
    0: "Offline",
    1: "Online",
    2: "InGame",
    3: "InStudio",
    4: "InGameAndStudio"
}

const checkUserPresence = async () => {
    try {
        console.log("Memeriksa kehadiran pengguna...");
        const response = await axios.post(ROBLOX_API_URL, {
            userIds: USER_ID_TO_MONITOR
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // handle for multiple response
        const userPresences = response.data.userPresences;
        userPresences.forEach(userPresence => {
            if (USER_ID_TO_MONITOR.includes(userPresence.userId)) {
                let status = USER_PRESENCE_TYPE[userPresence.userPresenceType] || 'Unknown';
                console.log(`User ${userData.find(user => user.userId === userPresence.userId).username} sedang ${status}`);
            } else {
                console.log(`User ${userData.find(user => user.userId === userPresence.userId).username} tidak ditemukan dalam response`);
            }
        });

    } catch (error) {
        console.error("Error saat memeriksa kehadiran pengguna:", error);
    }
}

// jalankan sekarang
checkUserPresence();
// Jalankan periksa kehadiran pengguna setiap CHECK_INTERVAL_MS
setInterval(checkUserPresence, CHECK_INTERVAL_MS);




