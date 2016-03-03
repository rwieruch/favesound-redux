import * as actionTypes from '../constants/actionTypes';

function setIsOpenPlaylist(isOpen) {
  return {
    type: actionTypes.SET_IS_OPEN_PLAYLIST,
    isOpen
  };
}

export const togglePlaylist = (isOpen) => (dispatch) => {
  dispatch(setIsOpenPlaylist(isOpen));
}