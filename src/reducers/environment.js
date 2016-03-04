import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isOpenPlaylist: false
};

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.SET_IS_OPEN_PLAYLIST:
    return { ...state, isOpenPlaylist: !action.isOpen };
  }
  return state;
}