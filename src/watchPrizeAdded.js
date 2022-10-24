require('dotenv').config();
const { web3, lotteryContract } = require('../utils/contracts');
const push = require('../utils/pusherHelper');

const watchPrizeAdded = () => {
    try {
        lotteryContract.events.PrizeAdded({
            filter: {
              value: [],
            },
        })
            .on('data', function(event) {
                const balance = event?.returnValues?.ethAdded;
                const ethAdded = web3.utils.fromWei(balance);
                push(process.env.PUSHER_CHANNEL, "prize-added", {
                    value: ethAdded
                });
            })
            .on('changed', function(event) {
                console.log(event);
            })
            .on('error', console.error);

    } catch (err) {
        console.error(err);
    }
}

module.exports = watchPrizeAdded;