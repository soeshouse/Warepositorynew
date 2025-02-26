function formatPhoneNumber(number) {
    return number.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
}

module.exports = { formatPhoneNumber };
