import * as actionTypes from '../../constants/actionTypes';

export function mergeEntities(entities) {
  return {
    type: actionTypes.MERGE_ENTITIES,
    entities
  };
}

export function syncEntities(entity, key) {
  return {
    type: actionTypes.SYNC_ENTITIES,
    entity,
    key
  };
}
