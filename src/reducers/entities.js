import * as actionTypes from '../constants/actionTypes';
import merge from 'lodash/fp/merge';

const initialState = {
  users: {},
  tracks: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.MERGE_ENTITIES:
    return mergeEntities(state, action.entities);
  case actionTypes.SYNC_ENTITIES:
    return syncEntities(state, action.entity, action.key);
  }
  return state;
}

function mergeEntities(state, entities) {
  return merge(entities, state, {});
}

function syncEntities(state, entity, key) {
  const obj = {};
  obj[entity.id] = entity;

  const entities = {};
  entities[key] = Object.assign({}, state[key], obj);

  return merge(entities, state, {});
}
