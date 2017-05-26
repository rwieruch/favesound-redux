import { find } from 'lodash';
import * as actionTypes from '../../constants/actionTypes';
import { apiUrl } from '../../services/api';
import { mergeFollowings } from '../../actions/user';

export function removeFromFollowings(userId) {
  return {
    type: actionTypes.REMOVE_FROM_FOLLOWINGS,
    userId
  };
}

export const follow = (user) => (dispatch, getState) => {
  const followings = getState().user.followings;
  const isFollowing = find(followings, (following) => following === user.id);

  fetch(apiUrl(`me/followings/${user.id}`, '?'), { method: isFollowing ? 'delete' : 'put' })
    .then(response => response.json())
    .then(() => {
      if (isFollowing) {
        dispatch(removeFromFollowings(user.id));
      } else {
        dispatch(mergeFollowings([user.id]));
      }
    });
};
