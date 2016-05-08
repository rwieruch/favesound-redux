import reduce from 'lodash/fp/reduce';
import * as actionTypes from '../../constants/actionTypes';

const initialState = {
  followings: [],
  activities: [],
  typeReposts: {},
  typeTracks: {},
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
    case actionTypes.MERGE_TRACK_TYPES_TRACK:
      return mergeTrackTypesTrack(state, action.tracks);
    case actionTypes.MERGE_TRACK_TYPES_REPOST:
      return mergeTrackTypesRepost(state, action.reposts);
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
  return { ...state, followings: getConcatList(state.followings, list) };
}

function mergeActivities(state, list) {
  return { ...state, activities: getConcatList(state.activities, list) };
}

function mergeTrackTypesTrack(state, list) {
  const { typeTracks } = state;
  const mergeTypes = reduce(countByType, typeTracks);
  return { ...state, typeTracks: mergeTypes(list) };
}

function mergeTrackTypesRepost(state, list) {
  const { typeReposts } = state;
  const mergeTypes = reduce(countByType, typeReposts);
  return { ...state, typeReposts: mergeTypes(list) };
}

function countByType(result, value) {
  /* eslint-disable no-param-reassign */
  result[value.id] = result[value.id] ? result[value.id] + 1 : 1;
  /* eslint-enable no-param-reassign */
  return result;
}

function mergeFollowers(state, list) {
  return { ...state, followers: getConcatList(state.followers, list) };
}

function mergeFavorites(state, list) {
  return { ...state, favorites: getConcatList(state.favorites, list) };
}

function removeFromFollowings(state, userId) {
  const index = state.followings.indexOf(userId);
  return { ...state, followings: removeWithIndex(state.followings, index) };
}

function removeFromFavorites(state, trackId) {
  const index = state.favorites.indexOf(trackId);
  return { ...state, favorites: removeWithIndex(state.favorites, index) };
}

function removeWithIndex(list, index) {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
}

function getConcatList(currentList, concatList) {
  return [...currentList, ...concatList];
}
