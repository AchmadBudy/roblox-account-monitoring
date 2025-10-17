import axios from 'axios';

// --- Konfigurasi ---
const ROBLOX_API_URL = "https://presence.roblox.com/v1/presence/users";
const USER_ID_TO_MONITOR = [9559045119, 7953014316]; // Ganti dengan User ID yang ingin kamu monitor
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
                console.log(`User ${userPresence.userId} sedang ${status}`);
            } else {
                console.log(`User ${userPresence.userId} tidak ditemukan dalam response`);
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




