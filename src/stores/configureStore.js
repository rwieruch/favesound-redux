import mixpanel from './mixpanel';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';

const reduxRouterMiddleware = syncHistory(createBrowserHistory());
// const logger = createLogger();

// const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, reduxRouterMiddleware, logger)(createStore);
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, reduxRouterMiddleware, mixpanel)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
