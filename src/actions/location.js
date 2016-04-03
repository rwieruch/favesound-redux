import { routeActions } from 'react-router-redux'
import { fave } from '../constants/pathnames';

export const changeLocation = (path) => (dispatch, getState) => {
  if (path === fave) {
    dispatch(initFave());
  }

  dispatch(routeActions.push(path));
}

export const initFave = () => (dispatch) => {

}