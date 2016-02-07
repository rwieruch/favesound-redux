import {Map, List} from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = Map({
  activitiesByGenre: List()
});

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.MERGE_GENRE_ACTIVITIES:
    return mergeActivities(state, action.activities);
  }
  return state;
}

function mergeActivities(state, activities) {
  return state.set('activitiesByGenre', activities);
}