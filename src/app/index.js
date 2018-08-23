import React, {Component, PropTypes} from 'react';
import {RouterContext, match} from 'react-router';
import ReactDOMServer from 'react-dom/server';
import createRoutes from '../client/createRoutes';
import createHistory from 'history/lib/createHistory';
//import config from '../../src/server/config';
import constants from '../../constants';
import DataCall from '../server/lib/DataCall';

class Layout extends Component {
    static propTypes = {
        title : PropTypes.string.isRequired,
        contentHTML: PropTypes.string.isRequired,
        appJS: PropTypes.string.isRequired
    };
    render(){
        const {title, contentHTML, appJS} = this.props;
        return ( 
            <html lang="en">
                <head>
                    <title>{title}</title>
                    <meta charSet="utf-8"/>
                    <meta content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes" name="viewport"/>
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                    <link rel="icon" sizes="16x16 32x32 48x48 64x64" href="/favicon.ico"/>
                    <link rel="apple-touch-icon-precomposed" href="/favicon-152.png"/>
                    <meta name="msapplication-TileColor" content="#FFFFFF"/>
                    <meta name="msapplication-TileImage" content="/favicon-144.png"/>
                    <meta name="msapplication-square70x70logo" content="/favicon-70.png"/>
                    <meta name="msapplication-square150x150logo" content="/favicon-150.png"/>
                    <meta name="msapplication-square310x310logo" content="/favicon-310.png"/>
                    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/favicon-152.png"/>
                    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favicon-144.png"/>
                    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/favicon-120.png"/>
                    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/favicon-114.png"/>
                    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favicon-72.png"/>
                    <link href="assets/style.css" rel="stylesheet" />
                </head>
                <body>
                    <div dangerouslySetInnerHTML={{__html: contentHTML}} />
                    <strong>
                        This is being rendered on the Server
                    </strong>
                    <script async defer src={appJS}></script>
                    <script type="text/javascript">console.log(1000);</script>
                </body>
            </html>
            );
    }
}

export default function layout(req,res){
    const hostname = req.hostname;
//console.log('=====storage===',req);
    const scriptSrc = false
    ? '/bin/app0.js?*---hash---**'
    : `http://${hostname}:${constants.HOT_PORT}` + `/dist/app0.js`;
    //const scriptT = `<script src="${scriptSrc}" async defer></script>`;

    const creatR = createRoutes();
    const title = 'title.';

    const jsonStr = JSON.stringify(creatR);
    const jsonWrap = '<!--//--><![CDATA[//><!--\nwindow._STATE_=' + jsonStr + '\n//--><!]]>';
    //const preloadScript = (<script dangerouslySetInnerHTML={{__html: jsonWrap}}></script>);

    const Datacall = new DataCall();
    const routes = createRoutes(Datacall);
    const location = createHistory().createLocation(req.url);


        const getRenderProps = () => {
            let renderProps;
            match({routes, location}, (error, redirectLocation, innerRenderProps) => {
              renderProps = innerRenderProps;
              if (error) {
                throw new Error(error);
              }
            });
            return renderProps;
        };
         
        const renderProps = getRenderProps();
        
        if (renderProps == null) {
            res.send('The page was not found').code(404);
            return;
          }
    
        function getAppHtml(renderProps) {
            return ReactDOMServer.renderToString(
              <RouterContext {...renderProps} />
            );
        }  

        function getPageHtml(Html){
            const htmlx =  '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
                <Layout 
                    title=' POC '
                    appJS={scriptSrc}
                    contentHTML={`<div id="app">${Html}</div>`}
                />
            );
            res.send(htmlx);
        }
        let appHtml = getAppHtml(renderProps);

        Datacall.getMissingStates().then(function(isRenderRequired){
            if(isRenderRequired){
                let appHtml = getAppHtml(getRenderProps());
                console.log('isRenderRequired...',getRenderProps());
            } 
            
            getPageHtml(appHtml);
        });
    // send response to client....
    
}