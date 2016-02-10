import _ from 'lodash';
import * as actionTypes from '../constants/actionTypes';
import {isSameTrack} from '../utils/player';

const initialState = {
  activeTrack: null,
  isPlaying: false,
  playlist: []
};

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
  return Object.assign({}, state, { activeTrack });
}

function resetActiveTrack(state) {
  return Object.assign({}, state, { activeTrack: null });
}

function setIsPlaying(state, isPlaying) {
  return Object.assign({}, state, { isPlaying });
}

function setTrackInPlaylist(state, track) {
  let item = _.find(state.playlist, isSameTrack(track));
  if (item) {
    return state;
  } else {
    const playlist = [
      ...state.playlist,
      track
    ];
    return Object.assign({}, state, { playlist });
  }
}

function removeTrackFromPlaylist(state, track) {
  let index = _.findIndex(state.playlist, isSameTrack(track));
  const playlist = [
    ...state.playlist.slice(0, index),
    ...state.playlist.slice(index + 1)
  ];
  return Object.assign({}, state, { playlist });
}
