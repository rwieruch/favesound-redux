import {Map, List, fromJS} from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = Map({
  activitiesByGenre: List(),
  activitiesByGenreNextHrefs: Map(),
  activitiesByGenreInProcess: false
});

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.MERGE_GENRE_ACTIVITIES:
    return mergeActivities(state, fromJS(action.activities));
  case actionTypes.SET_ACTIVITIES_BY_GENRE_REQUEST_IN_RPOCESS:
    return setActivitiesByGenreInProcess(state, action.inProcess);
  case actionTypes.SET_ACTIVITIES_BY_GENRE_NEXT_HREF:
    return setActivitiesByGenreNextHref(state, action.nextHref, action.genre);
  }
  return state;
}

function mergeActivities(state, activities) {
  return state.updateIn(['activitiesByGenre'], (list) => list.concat(activities));
}

function setActivitiesByGenreInProcess(state, inProcess) {
  return state.set('activitiesByGenreInProcess', inProcess);
}

function setActivitiesByGenreNextHref(state, nextHref, genre) {
  return state.set('activitiesNextHref', nextHref);
}