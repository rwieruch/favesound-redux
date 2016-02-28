import _ from 'lodash';
import * as actionTypes from '../constants/actionTypes';
import {isSameTrack} from '../utils/player';

const initialState = {
  activeTrackId: null,
  isPlaying: false,
  playlist: []
};

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.SET_ACTIVE_TRACK:
    return setActiveTrack(state, action.activeTrackId);
  case actionTypes.RESET_ACTIVE_TRACK:
    return resetActiveTrack(state);
  case actionTypes.SET_IS_PLAYING:
    return setIsPlaying(state, action.isPlaying);
  case actionTypes.SET_TRACK_IN_PLAYLIST:
    return setTrackInPlaylist(state, action.trackId);
  case actionTypes.REMOVE_TRACK_FROM_PLAYLIST:
    return removeTrackFromPlaylist(state, action.trackId);
  case actionTypes.EMPTY_PLAYLIST:
    return emptyPlaylist(state);
  }
  return state;
}

function setActiveTrack(state, activeTrackId) {
  return Object.assign({}, state, { activeTrackId });
}

function resetActiveTrack(state) {
  return Object.assign({}, state, { activeTrackId: null });
}

function setIsPlaying(state, isPlaying) {
  return Object.assign({}, state, { isPlaying });
}

function setTrackInPlaylist(state, trackId) {
  if (_.find(state.playlist, isSameTrack(trackId))) {
    return state;
  } else {
    const playlist = [
      trackId,
      ...state.playlist
    ];
    return Object.assign({}, state, { playlist });
  }
}

function removeTrackFromPlaylist(state, trackId) {
  let index = _.findIndex(state.playlist, isSameTrack(trackId));
  const playlist = [
    ...state.playlist.slice(0, index),
    ...state.playlist.slice(index + 1)
  ];
  return Object.assign({}, state, { playlist });
}

function emptyPlaylist(state) {
  return Object.assign({}, state, { playlist: [] });
}