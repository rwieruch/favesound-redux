import {Map} from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = Map({
  isOpenPlaylist: false
});

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.SET_IS_OPEN_PLAYLIST:
    return setIsOpenPlaylist(state, action.isOpen);
  }
  return state;
}

function setIsOpenPlaylist(state, isOpen) {
  return state.set('isOpenPlaylist', !isOpen);
}