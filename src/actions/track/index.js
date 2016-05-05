import * as actionTypes from '../../constants/actionTypes';
import { apiUrl } from '../../services/api';
import { mergeFavorites } from '../../actions/user';
import { syncEntities } from '../../actions/entities';

export function removeFromFavorites(trackId) {
  return {
    type: actionTypes.REMOVE_FROM_FAVORITES,
    trackId
  };
}

export const like = (track) => (dispatch) => {
  fetch(apiUrl(`me/favorites/${track.id}`, '?'), { method: track.user_favorite ? 'delete' : 'put' })
    .then(response => response.json())
    .then(() => {
      if (track.user_favorite) {
        dispatch(removeFromFavorites(track.id));
      } else {
        dispatch(mergeFavorites([track.id]));
      }

      const updateEntity = Object.assign({}, track, { user_favorite: !track.user_favorite });
      dispatch(syncEntities(updateEntity, 'tracks'));
    });
};
