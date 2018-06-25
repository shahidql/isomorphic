import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from  'webpack-hot-middleware';
import path from 'path';
import constants from '../../constants';
import configs from '../webpack.config';
//import getconfig from 'getconfig';

const app = express();
const compiler = webpack(configs);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: configs.output.publicPath
  }));
app.use(webpackHotMiddleware(compiler));
// app.use(express.static('src'))
// app.get('/', (req,res) => {
//     /////res.send('Express server response! ====');
//     res.sendFile(constants.ABSPATH+'/src/index.html');
// });
app.listen(constants.PORT, (req,res) => {
    console.log('======= Webpack server started at port %s =======',constants.PORT); // eslint-disable-line no-console
  });
