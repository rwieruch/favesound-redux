import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/index';
import SC from 'soundcloud';
import configureStore from './stores/configureStore';
import {FavesoundContainer} from './components/Favesound';
import Callback from './components/Callback';
import App from './components/App';

const store = configureStore();

const routes = <Route component={App}>
  <Route path="/callback" component={Callback} />
  <Route path="/app" component={FavesoundContainer} />
</Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);