import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/index';
import SC from 'soundcloud';
import configureStore from './stores/configureStore';
import {DashboardContainer} from './containers/Dashboard';
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