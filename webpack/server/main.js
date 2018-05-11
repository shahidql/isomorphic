import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import http from 'http';
import path from 'path';
import constants from './constants';
import configs from '../../webpack.config';

const app = express();
const compiler = webpack(configs);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: configs.output.publicPath
  }));
let _port = 8000;
app.use(express.static('src'))
app.get('/', (req,res) => {
    //res.send('Express server response! ====');
    res.sendFile(constants.ABSPATH+'/src/index.html');
});
app.listen(_port, (req,res) => {
    console.log('Server started at port %s',_port); // eslint-disable-line no-console
  });
