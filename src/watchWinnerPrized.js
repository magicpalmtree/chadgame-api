require('dotenv').config();
const { web3, lotteryContract } = require('../utils/contracts');
const push = require('../utils/pusher');

const watchWinnerPrized = () => {
  try {
    lotteryContract.events.WinnerPrized({
      filter: {
        value: [],
      },
    })
      .on('data', function(event) {
        console.log('winner prized');
        const ethBalance = web3.utils.fromWei(event?.returnValues?.ethReceived);
        const data = {
            ethReceived: ethBalance,
            winner: event?.returnValues?.winner,
            transHash: event?.transactionHash
        }
        push(process.env.PUSHER_CHANNEL, "winner-prized", data);
        if(ethBalance > 0) {
          push(process.env.PUSHER_CHANNEL, "prize-added", {
            value: 0
          });
        }
      })
      .on('changed', function(event) {
        console.log(event);
      })
      .on('error', console.error);

  } catch(err) {
    console.error(err);
  }
}

module.exports = watchWinnerPrized;