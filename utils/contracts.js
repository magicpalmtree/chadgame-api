require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const chadContractAbi = require('../abis/ChadABI.json');
const lotteryContractAbi = require('../abis/LotteryABI.json');

const web3 = createAlchemyWeb3(process.env.WS_RPC_URL);

const chadContract = new web3.eth.Contract(chadContractAbi, process.env.CHAD_CA);
const lotteryContract = new web3.eth.Contract(lotteryContractAbi, process.env.LOTTERY_CA);

const hdProvider = new HDWalletProvider(process.env.PRIVATE_KEY, process.env.WS_RPC_URL);
chadContract.setProvider(hdProvider);

module.exports = {
    web3,
    chadContract,
    lotteryContract,
}