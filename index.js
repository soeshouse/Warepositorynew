const { makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode-terminal");

async function connect() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth_info");
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false, // Matikan output QR dalam bentuk teks acak
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", async (update) => {
        const { connection, qr } = update;
        if (qr) {
            console.log("Scan QR Code ini di WhatsApp:");
            qrcode.generate(qr, { small: true }); // Menampilkan QR di terminal
        }
        if (connection === "open") {
            console.log("✅ Connected to WhatsApp!");
        } else if (connection === "close") {
            console.log("❌ Disconnected!");
        }
    });
}

connect();
