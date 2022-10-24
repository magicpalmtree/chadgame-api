require('dotenv').config()
const express = require('express')
const cors = require('cors');

const request = require("./utils/request");
const lotteryTimeLeft = require('./controllers/lotteryTimeLeft');
const lotteryPrize = require('./controllers/lotteryPrize');
const prevWinners = require('./controllers/prevWinners');
const { initApp } = require('./src/app');
const terminate = require('./utils/terminate');

const app = express();
const port = 80;

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get('/', (req, res)=> {
  res.send("Api Running")
});

app.get('/time-left', (req, res) => request(lotteryTimeLeft, req, res));
app.get('/lottery-prize', (req, res) => request(lotteryPrize, req, res));
app.get('/prev-winners', (req, res) => request(prevWinners, req, res));

app.listen(port, () => {
  console.log(`Node app listening on port ${port}`);
});

// initApp();


const exitHandler = terminate(app, {
  coredump: false,
  timeout: 500
})  

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
process.on('SIGINT', exitHandler(0, 'SIGINT'))

module.exports = app;