const cron = require('node-cron');

function scheduleMessage(time, callback) {
    cron.schedule(time, callback, { timezone: 'Asia/Jakarta' });
}

module.exports = { scheduleMessage };
