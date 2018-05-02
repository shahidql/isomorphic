import express from 'express';
import http from 'http';
const app = express();
let _port = 8000;

app.get('/', (req,res) => {
    res.send('Express server response!');
});
app.listen(_port, (req,res) => {
    console.log('Server started at port %s',_port); // eslint-disable-line no-console
  });
