import { routeActions } from 'react-router-redux'

export function changeLocation(path) {
    return dispatch => {
        dispatch(routeActions.push(path));
    }
}