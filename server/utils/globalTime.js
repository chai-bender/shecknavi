const moment = require('moment-timezone');

function getGlobalEndTime() {
    // Use Moment to set the end time in Eastern Time and convert to GMT
    const endTimeET = moment.tz('2024-08-15 18:59:59', 'America/New_York');
    return endTimeET.utc().valueOf(); // Convert to GMT time
}

module.exports = { getGlobalEndTime };
