const moment = require('moment');

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

function formatLongMessage(id, username, text) {
    return {
        id,
        username,
        text,
        time: moment().format('h:mm a')
    }
}

function formatUserDetails(user) {
    return {
        user,
        time: moment().format('h:mm a')
    }
}

module.exports = {
    formatMessage,
    formatLongMessage,
    formatUserDetails
};
