const cron = require('node-cron');
const { PRIZE_TIME } = require('../utils/config');
const prizeDraw = require('./prizeDraw');
const watchWinnerPrized = require('./watchWinnerPrized');
const watchPrizeAdded = require('./watchPrizeAdded');

const initApp = () => { 
    const task = cron.schedule(`0 0 ${PRIZE_TIME} * * * *`, () =>  {
      prizeDraw();
    });
    watchWinnerPrized();
    watchPrizeAdded();
}

module.exports = {
    initApp
};