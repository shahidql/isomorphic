//client
import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from '../app/app';

export default function createRoutes(Datacall){
    return (
            <Route path="/react/child.html"  component={(props) => { return <App name='shahid' {...props} data={Datacall}/>}} />
    )
}
