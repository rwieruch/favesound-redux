import * as actionTypes from '../../constants/actionTypes';

const initialState = {
  isInShuffleMode: false,
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
    case actionTypes.RESET_PLAYLIST:
      return emptyPlaylist(state);
    case actionTypes.CHANGE_SHUFFLE_MODE:
      return setShuffleMode(state);
  }
  return state;
}

function setActiveTrack(state, activeTrackId) {
  return { ...state, activeTrackId };
}

function resetActiveTrack(state) {
  return { ...state, activeTrackId: null };
}

function setIsPlaying(state, isPlaying) {
  return { ...state, isPlaying };
}

function setTrackInPlaylist(state, trackId) {
  if (state.playlist.indexOf(trackId) !== -1) {
    return state;
  } else {
    return { ...state, playlist: [...state.playlist, trackId] };
  }
}

function removeTrackFromPlaylist(state, trackId) {
  const index = state.playlist.indexOf(trackId);
  const playlist = [
    ...state.playlist.slice(0, index),
    ...state.playlist.slice(index + 1)
  ];
  return { ...state, playlist };
}

function emptyPlaylist(state) {
  return { ...state, playlist: [] };
}

function setShuffleMode(state) {
  return { ...state, isInShuffleMode: !state.isInShuffleMode };
}
