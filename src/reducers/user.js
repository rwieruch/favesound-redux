import * as actionTypes from '../constants/actionTypes';
import {isSameTrack} from '../utils/player';

const initialState = {
  followings: [],
  activities: [],
  followers: [],
  favorites: [],
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
  case actionTypes.SET_FOLLOWERS:
    return setFollowers(state, action.followers);
  case actionTypes.MERGE_FOLLOWERS:
    return mergeFollowers(state, action.followers);
  case actionTypes.SET_FAVORITES:
    return setFavorites(state, action.favorites);
  case actionTypes.MERGE_FAVORITES:
    return mergeFavorites(state, action.favorites);
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