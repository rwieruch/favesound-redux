import {Map, List} from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = Map({
  activeTrack: null,
  isPlaying: false,
  playlist: List()
});

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.SET_ACTIVE_TRACK:
    return setActiveTrack(state, action.activeTrack);
  case actionTypes.RESET_ACTIVE_TRACK:
    return resetActiveTrack(state);
  case actionTypes.SET_IS_PLAYING:
    return setIsPlaying(state, action.isPlaying);
  case actionTypes.SET_TRACK_IN_PLAYLIST:
    return setTrackInPlaylist(state, action.track);
  case actionTypes.REMOVE_TRACK_FROM_PLAYLIST:
    return removeTrackFromPlaylist(state, action.track);
  }
  return state;
}

function setActiveTrack(state, activeTrack) {
  return state.set('activeTrack', activeTrack);
}

function resetActiveTrack(state) {
  return state.set('activeTrack', null);
}

function setIsPlaying(state, isPlaying) {
  return state.set('isPlaying', isPlaying);
}

function setTrackInPlaylist(state, track) {
  let item = state.get('playlist').find(obj => obj.origin.id === track.origin.id);
  if (item) {
    return state;
  } else {
    return state.updateIn(['playlist'], list => list.push(track));
  }
}

function removeTrackFromPlaylist(state, track) {
  let index = state.get('playlist').findIndex(obj => obj.origin.id === track.origin.id);
  return state.updateIn(['playlist'], list => list.delete(index));
}
