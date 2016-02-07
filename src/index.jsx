/*eslint-disable */
import SC from 'soundcloud';
/*eslint-enable */
import React from 'react';
import ReactDOM from 'react-dom';
import Router, { Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import { DashboardContainer } from './containers/DashboardContainer';
import Callback from './containers/Callback';
import App from './containers/App';

require('../styles/index.scss');

const store = configureStore();

const routes = (
  <Route component={App}>
    <Route path="/callback" component={Callback} />
    <Route path="/dashboard" component={DashboardContainer} />
    <Route path="/" component={DashboardContainer}/>
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
