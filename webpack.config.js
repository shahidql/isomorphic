import path from 'path';
import constants from './webpack/server/constants';

export default {
    mode: 'production',
    devtool: 'inline-source-map',
    entry: {
        shahid0: [ path.join(constants.SRC_Dir,'h.1.js'), path.join(constants.SRC_Dir,'h.2.js') ]
      },
    output:{
        path: path.resolve(__dirname, 'dist'), 
        filename: '[name].js',
        publicPath: '/dist'
    } 
}