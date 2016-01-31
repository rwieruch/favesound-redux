import {Map, List, fromJS} from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = Map({
  followings: List(),
  activities: List(),
  activitiesNextHref: null,
  activitiesRequestInProcess: false
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