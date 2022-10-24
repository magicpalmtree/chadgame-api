require('dotenv').config();
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
});

const push = async (channel, event, data = {}) => {
    try {
        pusher.trigger(channel, event, data);
    } catch (err){
        console.error(err)
    }
}

module.exports = push;