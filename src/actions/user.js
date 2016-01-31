import * as actionTypes from '../constants/actionTypes';
import {apiUrl, addAccessToken} from '../utils/soundcloudApi';

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

function setActivitiesNextHref(nextHref) {
  return {
    type: actionTypes.SET_ACTIVITIES_NEXT_HREF,
    nextHref
  };
}

function setActivitiesRequestInProcess(inProcess) {
  return {
    type: actionTypes.SET_ACTIVITIES_REQUEST_IN_RPOCESS,
    inProcess
  };
}

export function fetchActivities(nextHref) {

  let activitiesUrl;
  if (nextHref) {
    activitiesUrl = addAccessToken(nextHref);
  } else {
    activitiesUrl = apiUrl(`me/activities?limit=200&offset=0`);
  }

  return (dispatch, getState) => {

    const activitiesRequestInProcess = getState().user.get('activitiesRequestInProcess');

    if (activitiesRequestInProcess) { return; }

    dispatch(setActivitiesRequestInProcess(true));

    return fetch(activitiesUrl)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeActivities(data.collection));
        dispatch(setActivitiesNextHref(data.next_href));
        dispatch(setActivitiesRequestInProcess(false));
      });
  };

}
