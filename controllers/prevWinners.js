const { web3, lotteryContract } = require('../utils/contracts');

const prevWinners = async () => {
    const winners = await lotteryContract.getPastEvents('WinnerPrized', {
        fromBlock: 0, 
        toBlock: 'latest'
    });
    const data = winners.map((event) => {
        const ethBalance = web3.utils.fromWei(event?.returnValues?.ethReceived);
        return {
            ethReceived: ethBalance,
            winner: event?.returnValues?.winner,
            transHash: event?.transactionHash
        }
    })
    return data;
}

module.exports = prevWinners;