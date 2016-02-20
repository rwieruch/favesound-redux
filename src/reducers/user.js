import * as actionTypes from '../constants/actionTypes';
import {isSameTrack} from '../utils/player';

const initialState = {
  followings: [],
  activities: [],
  activitiesNextHref: null,
  activitiesRequestInProcess: false,
  followers: [],
  followersNextHref: null,
  followersRequestInProcess: false,
  favorites: [],
  favoritesNextHref: null,
  favoritesRequestInProcess: false
};

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.SET_FOLLOWINGS:
    return setFollowings(state, action.followings);
  case actionTypes.MERGE_FOLLOWINGS:
    return mergeFollowings(state, action.followings);
  case actionTypes.SET_ACTIVITES:
    return setActivities(state, action.activities);
  case actionTypes.MERGE_ACTIVITIES:
    return mergeActivities(state, action.activities);
  case actionTypes.SET_ACTIVITIES_NEXT_HREF:
    return setActivitiesNextHref(state, action.nextHref);
  case actionTypes.SET_ACTIVITIES_REQUEST_IN_RPOCESS:
    return setActivitiesRequestInProcess(state, action.inProcess);
  case actionTypes.SET_FOLLOWERS:
    return setFollowers(state, action.followers);
  case actionTypes.MERGE_FOLLOWERS:
    return mergeFollowers(state, action.followers);
  case actionTypes.SET_FOLLOWERS_NEXT_HREF:
    return setFollowersNextHref(state, action.nextHref);
  case actionTypes.SET_FOLLOWERS_REQUEST_IN_RPOCESS:
    return setFollowersRequestInProcess(state, action.inProcess);
  case actionTypes.SET_FAVORITES:
    return setFavorites(state, action.favorites);
  case actionTypes.MERGE_FAVORITES:
    return mergeFavorites(state, action.favorites);
    case actionTypes.SET_FAVORITES_NEXT_HREF:
    return setFavoritesNextHref(state, action.nextHref);
  case actionTypes.SET_FAVORITES_REQUEST_IN_RPOCESS:
    return setFavoritesRequestInProcess(state, action.inProcess);
  case actionTypes.REMOVE_FROM_FAVORITES:
    return removeFromFavorites(state, action.track);
  case actionTypes.ADD_TO_FAVORITES:
    return addToFavorites(state, action.track)
  }
  return state;
}

function setFollowings(state, followings) {
  return Object.assign({}, state, { followings });
}

function mergeFollowings(state, list) {
  const followings = [
    ...state.followings,
    ...list
  ];
  return Object.assign({}, state, { followings });
}

function setActivities(state, activities) {
  return Object.assign({}, state, { activities });
}

function mergeActivities(state, list) {
    const activities = [
    ...state.activities,
    ...list
  ];
  return Object.assign({}, state, { activities });
}

function setActivitiesNextHref(state, activitiesNextHref) {
  return Object.assign({}, state, { activitiesNextHref });
}

function setActivitiesRequestInProcess(state, activitiesRequestInProcess) {
  return Object.assign({}, state, { activitiesRequestInProcess });
}

function setFollowers(state, followers) {
  return Object.assign({}, state, { followers });
}

function mergeFollowers(state, list) {
    const followers = [
    ...state.followers,
    ...list
  ];
  return Object.assign({}, state, { followers });
}

function setFollowersNextHref(state, followersNextHref) {
  return Object.assign({}, state, { followersNextHref });
}

function setFollowersRequestInProcess(state, followersRequestInProcess) {
  return Object.assign({}, state, { followersRequestInProcess });
}

function setFavorites(state, favorites) {
  return Object.assign({}, state, { favorites });
}

function mergeFavorites(state, list) {
  const favorites = [
    ...state.favorites,
    ...list
  ];
  return Object.assign({}, state, { favorites });
}

function setFavoritesNextHref(state, favoritesNextHref) {
  return Object.assign({}, state, { favoritesNextHref });
}

function setFavoritesRequestInProcess(state, favoritesRequestInProcess) {
  return Object.assign({}, state, { favoritesRequestInProcess });
}

function removeFromFavorites(state, track) {
  console.log(track, state.favorites);
  let index = _.findIndex(state.favorites, isSameTrack(track));
  const favorites = [
    ...state.favorites.slice(0, index),
    ...state.favorites.slice(index + 1)
  ];
  return Object.assign({}, state, { favorites });
}

function addToFavorites(state, track) {
  console.log(track, state.favorites);
  const favorites = [
    ...state.favorites,
    track
  ];
  return Object.assign({}, state, { favorites });
}