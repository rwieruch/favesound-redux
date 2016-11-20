/*eslint-disable */
import SC from 'soundcloud';
/*eslint-enable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import Dashboard from './components/Dashboard';
import Browse from './components/Browse';
import Callback from './components/Callback';
import App from './components/App';
import { browse, dashboard, callback } from './constants/pathnames';

require('../styles/index.scss');

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Browse} />
        <Route path={callback} component={Callback} />
        <Route path={dashboard} component={Dashboard} />
        <Route path={browse} component={Browse} />
        <Route path="*" component={Browse} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
