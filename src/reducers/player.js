import {Map} from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = Map({
  activeTrack: null,
  isPlaying: false
});

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.SET_ACTIVE_TRACK:
    return setActiveTrack(state, action.activeTrack);
  case actionTypes.SET_IS_PLAYING:
    return setIsPlaying(state, action.isPlaying);
  }
  return state;
}

function setActiveTrack(state, activeTrack) {
  return state.set('activeTrack', activeTrack);
}

function setIsPlaying(state, isPlaying) {
  return state.set('isPlaying', isPlaying);
}
