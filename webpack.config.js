import webpack from 'webpack';
import path from 'path';
import constants from './webpack/server/constants';

export default {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        shahid0: [ 
            path.join(constants.SRC_Dir,'h.1.js'), 
            path.join(constants.SRC_Dir,'h.2.js'), 
            'webpack-hot-middleware/client?path=http://localhost:8000/__webpack_hmr&reload=true'    
        ]
    },
    output:{
        path: path.resolve(__dirname, 'dist'), 
        filename: '[name].js',
        publicPath: '/dist'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ]
}