import {Map, List, fromJS} from 'immutable';

const initialState = Map({
  followings: List()
});

export default function(state = initialState, action) {
  switch (action.type) {
  case 'MERGE_FOLLOWINGS':
    return mergeFollowings(state, fromJS(action.followings));
  }
  return state;
}

function mergeFollowings(state, followings) {
  return state.updateIn(['followings'], (list) => list.concat(followings));
}