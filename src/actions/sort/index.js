import * as actionTypes from '../../constants/actionTypes';

export function sortStream(sortType) {
  return {
    type: actionTypes.SORT_STREAM,
    sortType
  };
}
export function dateSortStream(dateSortType) {
  return {
    type: actionTypes.DATE_SORT_STREAM,
    dateSortType
  };
}
