import {Map, List, fromJS} from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = Map({
  followings: List(),
  activities: List(),
  activitiesNextHref: null,
  activitiesRequestInProcess: false,
  followers: List(),
  followersNextHref: null,
  followersRequestInProcess: false,
  favorites: List(),
  favoritesRequestInProcess: false
});

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.MERGE_FOLLOWINGS:
    return mergeFollowings(state, fromJS(action.followings));
  case actionTypes.MERGE_ACTIVITIES:
    return mergeActivities(state, fromJS(action.activities));
  case actionTypes.SET_ACTIVITIES_NEXT_HREF:
    return setActivitiesNextHref(state, action.nextHref);
  case actionTypes.SET_ACTIVITIES_REQUEST_IN_RPOCESS:
    return setActivitiesRequestInProcess(state, action.inProcess);
  case actionTypes.MERGE_FOLLOWERS:
    return mergeFollowers(state, fromJS(action.followers));
  case actionTypes.SET_FOLLOWERS_NEXT_HREF:
    return setFollowersNextHref(state, action.nextHref);
  case actionTypes.SET_FOLLOWERS_REQUEST_IN_RPOCESS:
    return setFollowersRequestInProcess(state, action.inProcess);
  case actionTypes.MERGE_FAVORITES:
    return mergeFavorites(state, fromJS(action.favorites));
  case actionTypes.SET_FAVORITES_REQUEST_IN_RPOCESS:
    return setFavoritesRequestInProcess(state, action.inProcess);
  }
  return state;
}

function mergeFollowings(state, followings) {
  return state.updateIn(['followings'], (list) => list.concat(followings));
}

function mergeActivities(state, activities) {
  return state.updateIn(['activities'], (list) => list.concat(activities));
}

function setActivitiesNextHref(state, nextHref) {
  return state.set('activitiesNextHref', nextHref);
}

function setActivitiesRequestInProcess(state, inProcess) {
  return state.set('activitiesRequestInProcess', inProcess);
}

function mergeFollowers(state, followers) {
  return state.updateIn(['followers'], (list) => list.concat(followers));
}

function setFollowersNextHref(state, nextHref) {
  return state.set('followersNextHref', nextHref);
}

function setFollowersRequestInProcess(state, inProcess) {
  return state.set('followersRequestInProcess', inProcess);
}

function mergeFavorites(state, favorites) {
  return state.updateIn(['favorites'], (list) => list.concat(favorites));
}

function setFavoritesRequestInProcess(state, inProcess) {
  return state.set('favoritesRequestInProcess', inProcess);
}