const { PRIZE_TIME } = require('../utils/config');

const lotteryTimeLeft = (req, res) => {
    let now = new Date();
    let hours  = PRIZE_TIME > now.getHours() ? PRIZE_TIME - now.getHours() - 1 : 0;
    let mins = 59 - now.getMinutes();
    let secs = 59 - now.getSeconds();
    let terminated = PRIZE_TIME <= now.getHours() ? true : false;
    
    return {
      left: hours * 3600 + mins * 60 + secs,
      terminated: terminated
    }
}

module.exports = lotteryTimeLeft;