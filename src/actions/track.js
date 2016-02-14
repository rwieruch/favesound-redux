import * as actionTypes from '../constants/actionTypes';
import { apiUrl } from '../utils/soundcloudApi';
import { setActiveTrack } from '../actions/player';

function addToFavorites(track) {
  return {
    type: actionTypes.ADD_TO_FAVORITES,
    track
  };
}

function removeFromFavorites(track) {
  return {
    type: actionTypes.REMOVE_FROM_FAVORITES,
    track
  };
}

export function like(track) {
  return dispatch => {
    fetch(apiUrl(`me/favorites/${track.origin.id}`, '?'), {method: track.origin.user_favorite ? 'delete' : 'put'})
      .then(response => response.json())
      .then(() => {
        const { user_favorite } = track.origin;
        const origin = Object.assign({}, track.origin, { user_favorite: !user_favorite });
        const updatedTrack = Object.assign({}, track, { origin });

        if (updatedTrack.origin.user_favorite) {
          dispatch(addToFavorites(updatedTrack));
        } else {
          dispatch(removeFromFavorites(updatedTrack));
        }

        dispatch(setActiveTrack(updatedTrack));
      });
  };
}
