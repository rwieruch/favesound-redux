import * as actionTypes from '../constants/actionTypes';

export function mergeEntities(entities) {
  return {
    type: actionTypes.MERGE_ENTITIES,
    entities
  }
}
