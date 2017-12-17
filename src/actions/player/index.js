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

export function setIsPlaying(isPlaying) {
  return {
    type: actionTypes.SET_IS_PLAYING,
    isPlaying
  };
}

export function setTrackInPlaylist(trackId) {
  return {
    type: actionTypes.SET_TRACK_IN_PLAYLIST,
    trackId
  };
}

export function removeFromPlaylist(trackId) {
  return {
    type: actionTypes.REMOVE_TRACK_FROM_PLAYLIST,
    trackId
  };
}

export function deactivateTrack() {
  return {
    type: actionTypes.RESET_ACTIVE_TRACK,
  };
}

export function emptyPlaylist() {
  return {
    type: actionTypes.RESET_PLAYLIST,
  };
}

export function setIsInShuffleMode() {
  return {
    type: actionTypes.SET_SHUFFLE_MODE,
  };
}

export function setIsInRepeatMode() {
  return {
    type: actionTypes.SET_REPEAT_MODE,
  };
}

export function setTrackVolume(volume) {
  return {
    type: actionTypes.SET_VOLUME,
    volume
  };
}

export const clearPlaylist = () => (dispatch) => {
  dispatch(emptyPlaylist());
  dispatch(deactivateTrack());
  dispatch(togglePlayTrack(false));
  dispatch(resetToggle(toggleTypes.PLAYLIST));
  dispatch(resetToggle(toggleTypes.VOLUME));
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
  const nextIndex = (index + iterate) % playlist.length;
  return playlist[nextIndex];
}

function getRandomTrack(playlist, currentActiveTrackId) {
  const index = findIndex(isSameTrack(currentActiveTrackId), playlist);

  function getRandomIndex() {
    const randNum = Math.floor(Math.random() * playlist.length);
    if (randNum === index && playlist.length > 1) {
      return getRandomIndex();
    } else {
      return randNum;
    }
  }
  return playlist[getRandomIndex()];
}

export const activateIteratedPlaylistTrack = (currentActiveTrackId, iterate) => (dispatch, getState) => {
  const playlist = getState().player.playlist;
  const nextActiveTrackId = getIteratedTrack(playlist, currentActiveTrackId, iterate);
  const isInShuffleMode = getState().player.isInShuffleMode;

  if (nextActiveTrackId && isInShuffleMode === false) {
    dispatch(activateTrack(nextActiveTrackId));
  } else if (isInShuffleMode) {
    dispatchRandomTrack(playlist, currentActiveTrackId, dispatch);
  }
};

function dispatchRandomTrack(playlist, currentActiveTrackId, dispatch) {
  const randomActiveTrackId = getRandomTrack(playlist, currentActiveTrackId);
  dispatch(activateTrack(randomActiveTrackId));
}

export const activateIteratedStreamTrack = (currentActiveTrackId, iterate) => (dispatch, getState) => {
  const isInShuffleMode = getState().player.isInShuffleMode;
  const playlist = getState().player.playlist;

  const streamList = getStreamList(getState);

  if (isInShuffleMode) {
    dispatchRandomTrack(streamList, currentActiveTrackId, dispatch);
  } else {
    const nextStreamTrackId = findNextStreamTrackId(streamList, playlist, currentActiveTrackId, iterate);
    if (nextStreamTrackId) {
      dispatch(activateTrack(nextStreamTrackId));
    } else {
      dispatch(togglePlayTrack(false));
    }
  }
};

function getStreamList(getState) {
  const selectedGenre = getState().browse.selectedGenre;
  if (selectedGenre) {
    return getState().browse[selectedGenre];
  }
  return getState().user.activities;
}

function findNextStreamTrackId(streamList, playlist, currentActiveTrackId, iterate) {
  let nextStreamTrackId = getIteratedTrack(streamList, currentActiveTrackId, iterate);
  while (playlist.includes(nextStreamTrackId)) {
    nextStreamTrackId = getIteratedTrack(streamList, nextStreamTrackId, iterate);
  }
  return nextStreamTrackId;
}

export const removeTrackFromPlaylist = (track) => (dispatch, getState) => {
  const activeTrackId = getState().player.activeTrackId;
  const isPlaying = getState().player.isPlaying;
  const isRelevantTrack = isSameTrackAndPlaying(activeTrackId, track.id, isPlaying);

  if (isRelevantTrack) {
    dispatch(activateIteratedPlaylistTrack(activeTrackId, 1));
  }

  const playlistSize = getState().player.playlist.length;
  if (playlistSize < 2) {
    dispatch(deactivateTrack());
    dispatch(togglePlayTrack(false));
    dispatch(resetToggle(toggleTypes.PLAYLIST));
    dispatch(resetToggle(toggleTypes.VOLUME));
  }

  dispatch(removeFromPlaylist(track.id));
};

export const toggleShuffleMode = (isInShuffleMode) => (dispatch) => {
  dispatch(setIsInShuffleMode(isInShuffleMode));
};

export const toggleRepeatMode = (isInRepeatMode) => (dispatch) => {
  dispatch(setIsInRepeatMode(isInRepeatMode));
};


export const changeVolume = (volume) => (dispatch) => {
  dispatch(setTrackVolume(volume));
};
