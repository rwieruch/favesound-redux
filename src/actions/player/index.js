import find from 'lodash/fp/find';
import findIndex from 'lodash/fp/findIndex';
import * as actionTypes from '../../constants/actionTypes';
import * as toggleTypes from '../../constants/toggleTypes';
import { resetToggle } from '../../actions/toggle';
import { isSameTrackAndPlaying, isSameTrack } from '../../services/player';

export function setActiveTrack(activeTrackId) {
  return {
    type: actionTypes.SET_ACTIVE_TRACK,
    activeTrackId
  };
}

function setIsPlaying(isPlaying) {
  return {
    type: actionTypes.SET_IS_PLAYING,
    isPlaying
  };
}

function setTrackInPlaylist(trackId) {
  return {
    type: actionTypes.SET_TRACK_IN_PLAYLIST,
    trackId
  };
}

function removeFromPlaylist(trackId) {
  return {
    type: actionTypes.REMOVE_TRACK_FROM_PLAYLIST,
    trackId
  };
}

function deactivateTrack() {
  return {
    type: actionTypes.RESET_ACTIVE_TRACK,
  };
}

function emptyPlaylist() {
  return {
    type: actionTypes.RESET_PLAYLIST,
  };
}

function setIsInShuffleMode(isInShuffleMode) {
  return {
    type: actionTypes.CHANGE_SHUFFLE_MODE,
    isInShuffleMode
  };
}

export const clearPlaylist = () => (dispatch) => {
  dispatch(emptyPlaylist());
  dispatch(deactivateTrack());
  dispatch(resetToggle(toggleTypes.PLAYLIST));
};

function isInPlaylist(playlist, trackId) {
  return find(isSameTrack(trackId), playlist);
}

export const togglePlayTrack = (isPlaying) => (dispatch) => {
  dispatch(setIsPlaying(isPlaying));
};

export const activateTrack = (trackId) => (dispatch, getState) => {
  const playlist = getState().player.playlist;
  const previousActiveTrackId = getState().player.activeTrackId;
  const isCurrentlyPlaying = getState().player.isPlaying;
  const isPlaying = !isSameTrackAndPlaying(previousActiveTrackId, trackId, isCurrentlyPlaying);

  dispatch(togglePlayTrack(isPlaying));
  dispatch(setActiveTrack(trackId));

  if (!isInPlaylist(playlist, trackId)) {
    dispatch(setTrackInPlaylist(trackId));
  }
};

export const addTrackToPlaylist = (track) => (dispatch, getState) => {
  const playlist = getState().player.playlist;

  if (!isInPlaylist(playlist, track.id)) {
    dispatch(setTrackInPlaylist(track.id));
  }

  if (!playlist.length) {
    dispatch(activateTrack(track.id));
  }
};

function getIteratedTrack(playlist, currentActiveTrackId, iterate) {
  const index = findIndex(isSameTrack(currentActiveTrackId), playlist);
  return playlist[index + iterate];
}

function getRandomTrack(playlist, currentActiveTrackId) {
  const index = findIndex(isSameTrack(currentActiveTrackId), playlist);
  function getRandomIndex() {
    const randNum = Math.floor(Math.random() * playlist.length);
    if (randNum === index) {
      return getRandomIndex();
    } else {
      return randNum;
    }
  }
  return playlist[getRandomIndex()];
}

export const activateIteratedTrack = (currentActiveTrackId, iterate) => (dispatch, getState) => {
  const playlist = getState().player.playlist;
  const nextActiveTrackId = getIteratedTrack(playlist, currentActiveTrackId, iterate);
  const randomActiveTrackId = getRandomTrack(playlist, currentActiveTrackId);
  const shuffleMode = getState().player.shuffleMode;
  // const previousActiveTrackId = getState().player.activeTrackId;


  if (nextActiveTrackId && shuffleMode === false) {
    dispatch(activateTrack(nextActiveTrackId));
  } else if (shuffleMode === true) {
    dispatch(activateTrack(randomActiveTrackId));
    // dispatch(removeTrackFromPlaylist(previousActiveTrackId));
  } else {
    dispatch(togglePlayTrack(false));
  }
};

export const removeTrackFromPlaylist = (track) => (dispatch, getState) => {
  const activeTrackId = getState().player.activeTrackId;
  const isPlaying = getState().player.isPlaying;
  const isRelevantTrack = isSameTrackAndPlaying(activeTrackId, track.id, isPlaying);

  if (isRelevantTrack) {
    dispatch(activateIteratedTrack(activeTrackId, 1));
  }

  const playlistSize = getState().player.playlist.length;
  if (playlistSize < 2) {
    dispatch(deactivateTrack());
    dispatch(resetToggle(toggleTypes.PLAYLIST));
  }

  dispatch(removeFromPlaylist(track.id));
};

export const toggleShuffleMode = (isInShuffleMode) => (dispatch) => {
  dispatch(setIsInShuffleMode(isInShuffleMode));
};
