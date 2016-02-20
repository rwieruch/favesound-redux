import _ from 'lodash';
import * as actionTypes from '../constants/actionTypes';
import { apiUrl, addAccessTokenWith, getLazyLoadingUrl } from '../utils/soundcloudApi';

export function setFollowings(followings) {
  return {
    type: actionTypes.SET_FOLLOWINGS,
    followings
  };
}

export function setFollowers(followers) {
  return {
    type: actionTypes.SET_FOLLOWERS,
    followers
  };
}

export function setFavorites(favorites) {
  return {
    type: actionTypes.SET_FAVORITES,
    favorites
  };
}

export function setActivities(activities) {
  return {
    type: actionTypes.SET_ACTIVITES,
    activities
  };
}

function mergeFollowings(followings) {
  return {
    type: actionTypes.MERGE_FOLLOWINGS,
    followings
  };
}

export function fetchFollowings(user, nextHref) {

  const initHref = apiUrl(`users/${user.id}/followings?limit=200&offset=0`, '&');
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

export function fetchActivities(user, nextHref) {
  return (dispatch, getState) => {

    let url = getLazyLoadingUrl(user, nextHref, 'activities?limit=20&offset=0');
    let requestInProcess = getState().user.activitiesRequestInProcess;

    if (requestInProcess) { return; }

    dispatch(setActivitiesRequestInProcess(true));

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeActivities(data.collection));
        dispatch(setActivitiesNextHref(data.next_href));
        dispatch(setActivitiesRequestInProcess(false));
      });
  };
}

function mergeFollowers(followers) {
  return {
    type: actionTypes.MERGE_FOLLOWERS,
    followers
  };
}

function setFollowersNextHref(nextHref) {
  return {
    type: actionTypes.SET_FOLLOWERS_NEXT_HREF,
    nextHref
  };
}

function setFollowersRequestInProcess(inProcess) {
  return {
    type: actionTypes.SET_FOLLOWERS_REQUEST_IN_RPOCESS,
    inProcess
  };
}

export function fetchFollowers(user, nextHref) {
  return (dispatch, getState) => {

    let url = getLazyLoadingUrl(user, nextHref, 'followers?limit=20&offset=0');
    let requestInProcess = getState().user.followersRequestInProcess;

    if (requestInProcess) { return; }

    dispatch(setFollowersRequestInProcess(true));

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeFollowers(data.collection));
        dispatch(setFollowersNextHref(data.next_href));
        dispatch(setFollowersRequestInProcess(false));
      });
  };
}

function mergeFavorites(favorites) {
  return {
    type: actionTypes.MERGE_FAVORITES,
    favorites
  };
}

function setFavoritesNextHref(nextHref) {
  return {
    type: actionTypes.SET_FAVORITES_NEXT_HREF,
    nextHref
  };
}

function setFavoritesRequestInProcess(inProcess) {
  return {
    type: actionTypes.SET_FAVORITES_REQUEST_IN_RPOCESS,
    inProcess
  };
}

export function fetchFavorites(user, nextHref) {
  return (dispatch, getState) => {

    let url = getLazyLoadingUrl(user, nextHref, 'favorites?linked_partitioning=1&limit=20&offset=0');
    let requestInProcess = getState().user.favoritesRequestInProcess;

    if (requestInProcess) { return; }

    dispatch(setFavoritesRequestInProcess(true));

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeFavorites(_.map(data.collection, mapToOrigin)));
        dispatch(setFavoritesNextHref(data.next_href));
        dispatch(setFavoritesRequestInProcess(false));
      });
  };
}

function mapToOrigin(origin) {
  return { origin, type: 'favorite' };
}
