import express from 'express';

const app = express();

let _port = 8000;
app.use(express.static('src'))
app.get('/', (req,res) => {
    res.sendFile(constants.ABSPATH+'/src/index.html');
});
app.listen(_port, (req,res) => {
    console.log('======= Server started at port %s =======',_port); // eslint-disable-line no-console
  });