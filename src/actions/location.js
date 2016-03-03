import { routeActions } from 'react-router-redux'

export const changeLocation = (path) => (dispatch) => {
  dispatch(routeActions.push(path));
}