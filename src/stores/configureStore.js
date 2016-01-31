import createBrowserHistory from 'history/lib/createBrowserHistory'
import {createStore, applyMiddleware} from 'redux';
import { syncHistory, routeReducer } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk';
import {combineReducers} from 'redux';
import reducers from '../reducers/index';

const rootReducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

const reduxRouterMiddleware = syncHistory(createBrowserHistory());

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, reduxRouterMiddleware)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}