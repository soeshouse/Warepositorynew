const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const path = require('path');

(async () => {
    const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, '../auth'));
    const sock = makeWASocket({ auth: state });

    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', ({ qr, connection }) => {
        if (qr) console.log('Scan QR Code:', qr);
        if (connection === 'open') console.log('WhatsApp Connected!');
        if (connection === 'close') console.log('Disconnected, reconnecting...');
    });
})();
