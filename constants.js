import path from 'path';
import getconfig from 'getconfig';
const ABS = path.normalize(path.join(__dirname,'/'));

export default Object.freeze({
    ABSPATH: ABS,
    SRC_Dir: path.join(ABS, 'src'),
    DIST_DIR: path.join(ABS, 'dist'),
    HOT_PORT: getconfig.wpport,
    PORT: getconfig.port,
    CACHEPORT: getconfig.CACHEPORT
});