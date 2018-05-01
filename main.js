import express from 'express';
import http from 'http';
const app = express();

app.get('/', (req,res) => {
    res.send('Express server response!');
});
app.listen(8000, (req,res) => {
    console.log('Server started at port %s'); // eslint-disable-line no-console
    console.log('request:',req,' -response:',res);
  });
