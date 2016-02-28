import _ from 'lodash';
import { arrayOf, normalize } from 'normalizr';
import { trackSchema, userSchema } from '../constants/schemas';
import * as actionTypes from '../constants/actionTypes';
import * as requestTypes from '../constants/requestTypes';
import * as paginateLinkTypes from '../constants/paginateLinkTypes';
import { setRequestInProcess } from '../actions/request';
import { setPaginateLink } from '../actions/paginate';
import { mergeEntities } from '../actions/entities';
import { isTrack } from '../utils/track';
import { apiUrl, addAccessTokenWith, getLazyLoadingUrl } from '../utils/soundcloudApi';

export function setFollowings(followings) {
  return {
    type: actionTypes.SET_FOLLOWINGS,
    followings
  };
}

export function mergeFollowings(followings) {
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
        const normalized = normalize(data.collection, arrayOf(userSchema));
        dispatch(mergeEntities(normalized.entities));
        dispatch(mergeFollowings(normalized.result));
        dispatch(setPaginateLink(data.next_href, paginateLinkTypes.FOLLOWINGS));
        dispatch(setRequestInProcess(false, requestType));
      });
  };
}

export function setActivities(activities) {
  return {
    type: actionTypes.SET_ACTIVITES,
    activities
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
        const mapAndFiltered = _.chain(data.collection).filter(isTrack).map('origin').value();
        const normalized = normalize(mapAndFiltered, arrayOf(trackSchema));
        dispatch(mergeEntities(normalized.entities));
        dispatch(mergeActivities(normalized.result));
        dispatch(setPaginateLink(data.next_href, paginateLinkTypes.ACTIVITIES));
        dispatch(setRequestInProcess(false, requestType));
      });
  };
}

export function setFollowers(followers) {
  return {
    type: actionTypes.SET_FOLLOWERS,
    followers
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
        const normalized = normalize(data.collection, arrayOf(userSchema));
        dispatch(mergeEntities(normalized.entities));
        dispatch(mergeFollowers(normalized.result));
        dispatch(setPaginateLink(data.next_href, paginateLinkTypes.FOLLOWERS));
        dispatch(setRequestInProcess(false, requestType));
      });
  };
}

export function setFavorites(favorites) {
  return {
    type: actionTypes.SET_FAVORITES,
    favorites
  };
}

export function mergeFavorites(favorites) {
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
        const normalized = normalize(data.collection, arrayOf(trackSchema));
        dispatch(mergeEntities(normalized.entities));
        dispatch(mergeFavorites(normalized.result));
        dispatch(setPaginateLink(data.next_href, paginateLinkTypes.FAVORITES));
        dispatch(setRequestInProcess(false, requestType));
      });
  };
}
