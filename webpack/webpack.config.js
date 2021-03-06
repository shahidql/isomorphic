import webpack from 'webpack';
//import SassPlugin from 'sass-webpack-plugin';
//import ExtractTextPlugin from 'extract-text-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import constants from '../constants';
const isDevelopment = process.env.NODE_ENV !== 'production'


export default {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        shahid0: [ 
            path.join(constants.SRC_Dir,'h.1.js'), 
            path.join(constants.SRC_Dir,'h.2.js'), 
            `webpack-hot-middleware/client?path=http://localhost:${constants.HOT_PORT}/__webpack_hmr&reload=true`
        ],
        css0:[
            path.join(constants.SRC_Dir,'views/h.scss'),
            path.join(constants.SRC_Dir,'views/l.scss')
        ]
    },
    module:{
        rules: [
            {
                test: /\.(sc|c)ss$/,
                use: [
                  {
                    loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    options: {
                      // by default it use publicPath in webpackOptions.output
                      //publicPath: '../shahid'
                    }
                },
                'css-loader',
                'sass-loader',
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:{
                    loader: 'babel-loader' 
                }
            }
        ]
    },
    plugins: (() => {
        const plugins = [
            new webpack.DefinePlugin({
                isDevelopment:true
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ];
        if(isDevelopment){
            plugins.push(new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            }));
        }
        return plugins;
    })(),
    output:{
        path: path.resolve(__dirname, 'dist'), 
        filename: function(name){
            return '[name].js';
        },
        publicPath: 'http://localhost:'+constants.HOT_PORT+'/dist/'
    }
}