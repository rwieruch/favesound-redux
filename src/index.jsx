/*eslint-disable */
import SC from 'soundcloud';
/*eslint-enable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScrollToTop from 'scroll-behavior/lib/useScrollToTop';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import { DashboardContainer } from './containers/DashboardContainer';
import { BrowseContainer } from './containers/BrowseContainer';
import Callback from './containers/Callback';
import App from './containers/App';
import { browse, dashboard, callback } from './constants/pathnames';

require('../styles/index.scss');

const history = useScrollToTop(createBrowserHistory)();

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to={browse} />
        <Route path={callback} component={Callback} />
        <Route path={dashboard} component={DashboardContainer} />
        <Route path={browse} component={BrowseContainer}/>
        <Route path="*" component={BrowseContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
