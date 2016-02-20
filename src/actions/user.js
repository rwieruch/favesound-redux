import _ from 'lodash';
import * as actionTypes from '../constants/actionTypes';
import * as requestTypes from '../constants/requestTypes';
import { setRequestInProcess } from '../actions/request';
import { mapInOrigin } from '../utils/track';
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

function setFollowingsNextHref(nextHref) {
  return {
    type: actionTypes.SET_FOLLOWINGS_NEXT_HREF,
    nextHref
  };
}

export function fetchFollowings(user, nextHref) {
  return (dispatch, getState) => {

    let requestType = requestTypes.FOLLOWINGS;
    let url = getLazyLoadingUrl(user, nextHref, 'followings?limit=20&offset=0');
    let requestInProcess = getState().request[requestType];

    if (requestInProcess) { return; }

    dispatch(setRequestInProcess(true, requestType));

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeFollowings(data.collection));
        dispatch(setFollowingsNextHref(data.next_href));
        dispatch(setRequestInProcess(false, requestType));
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

export function fetchActivities(user, nextHref) {
  return (dispatch, getState) => {

    let requestType = requestTypes.ACTIVITIES;
    let url = getLazyLoadingUrl(user, nextHref, 'activities?limit=20&offset=0');
    let requestInProcess = getState().request[requestType];

    if (requestInProcess) { return; }

    dispatch(setRequestInProcess(true, requestType));

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeActivities(data.collection));
        dispatch(setActivitiesNextHref(data.next_href));
        dispatch(setRequestInProcess(false, requestType));
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

export function fetchFollowers(user, nextHref) {
  return (dispatch, getState) => {

    let requestType = requestTypes.FOLLOWERS;
    let url = getLazyLoadingUrl(user, nextHref, 'followers?limit=20&offset=0');
    let requestInProcess = getState().request[requestType];

    if (requestInProcess) { return; }

    dispatch(setRequestInProcess(true, requestType));

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeFollowers(data.collection));
        dispatch(setFollowersNextHref(data.next_href));
        dispatch(setRequestInProcess(false, requestType));
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

export function fetchFavorites(user, nextHref) {
  return (dispatch, getState) => {

    let requestType = requestTypes.FAVORITES;
    let url = getLazyLoadingUrl(user, nextHref, 'favorites?linked_partitioning=1&limit=20&offset=0');
    let requestInProcess = getState().request[requestType];

    if (requestInProcess) { return; }

    dispatch(setRequestInProcess(true, requestType));

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeFavorites(_.map(data.collection, mapInOrigin('favorite'))));
        dispatch(setFavoritesNextHref(data.next_href));
        dispatch(setRequestInProcess(false, requestType));
      });
  };
}
