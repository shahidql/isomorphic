import express from 'express';
import engine from 'consolidate';
import constants from '../../constants';
import cache from './lib/cache';
//import { INSPECT_MAX_BYTES } from 'buffer';

const app = express();
app.engine('hbl', engine.handlebars);
app.set('view engine', 'hbl');
app.set('views', constants.ABSPATH+'src/views');

let router = express.Router();
app.use(function(req,res,next){
    if(req.url == '/events/hello-test'){
        res.send( 'cacheContent' );
        return;
    } else
     next();
});
app.use(router);
app.use(express.static('src'));

let ttl = {
    // 3 minutes
    short: 1000 * 60 * 3,
    // 8 hours
    medium: 1000 * 60 * 60 * 8,
    // 1 year
    perm: 1000 * 60 * 60 * 24 * 365,
  };

const _cache = new cache({
    memcached: `localhost:${constants.CACHEPORT}`
});



router.get('/' ,(req,res) => {
    res.render('index',{
        title: 'Home',
        name: 'Shahid',
        experience: '-',
        language: '-'
    });
    //res.sendFile(constants.ABSPATH+'/src/index.html');
});
router.get('/events/:tag([A-Za-z-]+)', (req,res) => {
    //events/hello-test
    res.render('index',{
        title: `${req.params.tag}`,
        name: 'Shahid Iqbal',
        experience: '7+',
        language: 'Javascript'
    });
    //res.sendFile(constants.ABSPATH+'/src/index.html');
})
router.get('/marketing', (req, res) => {
    res.sendFile(constants.ABSPATH+'/src/views/index.html');
});

app.listen(constants.HOT_PORT, (req,res) => {
    console.log('======= Server started at port %s =======',constants.HOT_PORT); // eslint-disable-line no-console
  });