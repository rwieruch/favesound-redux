import * as actionTypes from '../constants/actionTypes';
import _ from 'lodash';

const initialState = {
    users: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.MERGE_ENTITIES:
    return mergeEntities(state, action.entities);
  }
  return state;
}

function mergeEntities(state, entities) {
  return _.merge({}, state, entities);
}
