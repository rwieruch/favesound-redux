import * as actionTypes from '../constants/actionTypes';

export function mergeUserEntities(users) {
  return {
    type: actionTypes.MERGE_USER_ENTITIES,
    users
  }
}
