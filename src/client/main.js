import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';

import createRoutes from '../client/createRoutes';
import DataCall from '../server/lib/DataCall';

const app = document.getElementById('app');

const dataRequest = new DataCall();
dataRequest.preloadJson();

const routes = createRoutes(dataRequest);

ReactDOM.render(
  <Router history={browserHistory}>
    {routes}
  </Router>,
  app
);
