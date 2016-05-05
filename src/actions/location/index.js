import { routeActions } from 'react-router-redux';
import { fave } from '../../constants/pathnames';
import { fetchAllFollowingsWithFavorites } from '../../actions/user';

export const changeLocation = (path) => (dispatch) => {
  if (path === fave) {
    dispatch(fetchAllFollowingsWithFavorites());
  }

  dispatch(routeActions.push(path));
};
