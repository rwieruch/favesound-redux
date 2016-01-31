import * as actionTypes from '../constants/actionTypes';
import {apiUrl} from '../utils/soundcloudApi';

function mergeFollowings(followings) {
  return {
    type: actionTypes.MERGE_FOLLOWINGS,
    followings
  };
}

export function fetchFollowings(user, nextHref) {

  const initHref = apiUrl(`users/${user.id}/followings?limit=200&offset=0`);
  const followingsUrl = nextHref || initHref;

  return dispatch => {
    return fetch(followingsUrl)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeFollowings(data.collection));

        if (data.next_href) {
          dispatch(fetchFollowings(user, data.next_href));
        }
      });
  };
}

function mergeActivities(activities) {
  return {
    type: actionTypes.MERGE_ACTIVITIES,
    activities
  };
}

export function fetchActivities() {
  return dispatch => {
    return fetch(apiUrl(`me/activities?limit=200&offset=0`))
      .then(response => response.json())
      .then(data => dispatch(mergeActivities(data.collection)));
  };

}
