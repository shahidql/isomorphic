import path from 'path';
const ABS = path.normalize(path.join(__dirname,'../../'));

export default Object.freeze({
    ABSPATH: ABS,
    SRC_Dir: path.join(ABS, 'src'),
    DIST_DIR: path.join(ABS, 'dist')
});