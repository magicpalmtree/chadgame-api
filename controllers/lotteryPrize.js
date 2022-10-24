require('dotenv').config();
const { web3 } = require('../utils/contracts');

const lotteryPrize = async () => {
    const balance = await web3.eth.getBalance(process.env.LOTTERY_CA);
    const ethBalance = web3.utils.fromWei(balance, 'ether');
    return ethBalance;
}

module.exports = lotteryPrize;