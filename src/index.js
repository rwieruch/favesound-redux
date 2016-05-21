/*eslint-disable */
import SC from 'soundcloud';
/*eslint-enable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// import useScrollToTop from 'scroll-behavior/lib/useScrollToTop';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import { Dashboard } from './components/Dashboard';
import { BrowseContainer } from './components/Browse';
import { Fave } from './components/Fave';
import Callback from './components/Callback';
import App from './components/App';
import { browse, dashboard, fave, callback } from './constants/pathnames';

require('../styles/index.scss');

const store = configureStore();

// const history = useScrollToTop(createBrowserHistory)();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to={browse} />
        <Route path={callback} component={Callback} />
        <Route path={dashboard} component={Dashboard} />
        <Route path={browse} component={BrowseContainer} />
        <Route path={fave} component={Fave} />
        <Route path="*" component={BrowseContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
