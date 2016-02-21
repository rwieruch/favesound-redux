import _ from 'lodash';
import * as actionTypes from '../constants/actionTypes';
import * as requestTypes from '../constants/requestTypes';
import * as paginateLinkTypes from '../constants/paginateLinkTypes';
import { setRequestInProcess } from '../actions/request';
import { setPaginateLink } from '../actions/paginate';
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
        dispatch(setPaginateLink(data.next_href, paginateLinkTypes.FOLLOWINGS));
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
        dispatch(setPaginateLink(data.next_href, paginateLinkTypes.ACTIVITIES));
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
        dispatch(setPaginateLink(data.next_href, paginateLinkTypes.FOLLOWERS));
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
        dispatch(setPaginateLink(data.next_href, paginateLinkTypes.FAVORITES));
        dispatch(setRequestInProcess(false, requestType));
      });
  };
}
