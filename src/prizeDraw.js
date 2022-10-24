const { chadContract } = require('../utils/contracts');

const prizeDraw = () => {
  try {
    console.log("Starting the draw to select the winner...");
    chadContract.methods.draw().send({
      from: process.env.OWNER_ADDRESS
    }).on('receipt', function(){
      console.log('transaction for draw lottery is done.');
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = prizeDraw;