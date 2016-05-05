import * as actionTypes from '../../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PAGINATE_LINK:
      return setPaginateLink(state, action.nextHref, action.paginateType);
  }
  return state;
}

function setPaginateLink(state, nextHref, paginateType) {
  const paginateObject = {};
  paginateObject[paginateType] = nextHref;
  return Object.assign({}, state, paginateObject);
}
