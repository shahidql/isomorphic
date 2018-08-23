import express from 'express';
import engine from 'consolidate';
import constants from '../../constants';
import cache from './lib/cache';
import path from 'path';
import layout from '../app';
//import { INSPECT_MAX_BYTES } from 'buffer';


const app = express();
app.engine('hbl', engine.handlebars);
app.set('view engine', 'hbl');
app.set('views', constants.ABSPATH+'src/views');

app.server = {a:100};


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
app.disable('x-powered-by');
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
    })
});
router.get('/react/*',(req,res)=>{
    res.setHeader('Cache-Control','assets, max-age=644800, shahid');
    //let htmlx = renderPage(req,res);
    layout(req,res);
});
router.get('/css/*.(css|min.css)',(req,res) => {
    res.sendFile(path.join(__dirname,'../../src/views/h.scss'));
    //res.sendFile(constants.ABSPATH+'/src/views/h.scss');
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

app.listen(constants.PORT, (req,res) => {
    console.log(`=== Web Server started at http://localhost:${constants.PORT} ===`);// eslint-disable-line no-console
});