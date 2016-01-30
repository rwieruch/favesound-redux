import {combineReducers} from 'redux';
import session from './session';
import user from './user';

export default combineReducers({
    session,
    user
});