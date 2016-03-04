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
  case actionTypes.MERGE_FOLLOWINGS:
    return mergeFollowings(state, action.followings);
  case actionTypes.REMOVE_FROM_FOLLOWINGS:
    return removeFromFollowings(state, action.userId);
  case actionTypes.MERGE_ACTIVITIES:
    return mergeActivities(state, action.activities);
  case actionTypes.MERGE_FOLLOWERS:
    return mergeFollowers(state, action.followers);
  case actionTypes.MERGE_FAVORITES:
    return mergeFavorites(state, action.favorites);
  case actionTypes.REMOVE_FROM_FAVORITES:
    return removeFromFavorites(state, action.trackId);
  case actionTypes.RESET_SESSION:
    return initialState;
  }
  return state;
}

function mergeFollowings(state, list) {
  return { ...state, followings: concatList(state.followings, list) };
}

function mergeActivities(state, list) {
  return { ...state, activities: concatList(state.activities, list) };
}

function mergeFollowers(state, list) {
  return { ...state, followers: concatList(state.followers, list) };
}

function mergeFavorites(state, list) {
  return { ...state, favorites: concatList(state.favorites, list) };
}

function removeFromFollowings(state, userId) {
  let index = state.followings.indexOf(userId);
  return { ...state, followings: removeWithIndex(state.followings, index) };
}

function removeFromFavorites(state, trackId) {
  let index = state.favorites.indexOf(trackId);
  return { ...state, favorites: removeWithIndex(state.favorites, index) };
}

function concatList(currentList, concatList) {
  return [...currentList, ...concatList];
}

function removeWithIndex(list, index) {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
}
