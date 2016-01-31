import {Map, List, fromJS} from 'immutable';

const initialState = Map({
  followings: List(),
  activities: List()
});

export default function(state = initialState, action) {
  switch (action.type) {
  case 'MERGE_FOLLOWINGS':
    return mergeFollowings(state, fromJS(action.followings));
  case 'MERGE_ACTIVITIES':
    return mergeActivities(state, fromJS(action.activities));
  }
  return state;
}

function mergeFollowings(state, followings) {
  return state.updateIn(['followings'], (list) => list.concat(followings));
}

function mergeActivities(state, activities) {
  return state.updateIn(['activities'], (list) => list.concat(activities));
}