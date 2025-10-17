import axios from 'axios';
import fs from 'fs';
import express from 'express';

// Load user data from JSON file
const userData = JSON.parse(fs.readFileSync('storage/users.json', 'utf8'));

// create storage\history.json file if not exist
if (!fs.existsSync('storage/history.json')) {
    fs.writeFileSync('storage/history.json', '[]');
}

const saveHistory = (data) => {
    // Cari pengguna berdasarkan userId
    const user = historyData.find(u => u.userId === data.userId);
    if (user) {
        // Jika pengguna ditemukan, tambahkan data ke history
        user.history.push({
            timestamp: data.timestamp,
            status: data.status
        });
    } else {
        // Jika pengguna tidak ditemukan, buat entri baru
        historyData.push({
            userId: data.userId,
            username: data.username,
            history: [{
                timestamp: data.timestamp,
                status: data.status
            }]
        });
    }
    // Tulis data ke file JSON
    fs.writeFileSync('storage/history.json', JSON.stringify(historyData, null, 2));
};
const historyData = JSON.parse(fs.readFileSync('storage/history.json', 'utf8'));

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
const TIMEZONE = 'Asia/Jakarta';

const checkUserPresence = async () => {
    try {
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
                const user = userData.find(u => u.userId === userPresence.userId);
                const username = user ? user.username : 'Unknown';
                const date = new Date().toLocaleString('en-US', { timeZone: TIMEZONE });
                saveHistory({
                    userId: userPresence.userId,
                    username: username,
                    status: status,
                    timestamp: date
                });
            }
        });

    } catch (error) {
        console.error("Error saat memeriksa kehadiran pengguna:", error);
    }
}

console.log("Memeriksa kehadiran pengguna...");
// jalankan sekarang
checkUserPresence();
// Jalankan periksa kehadiran pengguna setiap CHECK_INTERVAL_MS
setInterval(checkUserPresence, CHECK_INTERVAL_MS);




const app = express();
const port = 3000;

// Route untuk mendapatkan riwayat kehadiran
app.get('/get-history', (req, res) => {
    res.json(historyData);
});

app.get('/', (req, res) => {
    res.sendFile('template/show-data.html', { root: import.meta.dirname });
});


// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
