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

export function setTrackVolume(volume) {
  return {
    type: actionTypes.SET_VOLUME,
    volume
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
    if (randNum === index && playlist.length > 1) {
      return getRandomIndex();
    } else {
      return randNum;
    }
  }
  return playlist[getRandomIndex()];
}

export const activateIteratedTrack = (currentActiveTrackId, iterate, genre, pathname) => (dispatch, getState) => {
  const playlist = getState().player.playlist;
  const nextActiveTrackId = getIteratedTrack(playlist, currentActiveTrackId, iterate);
  const isInShuffleMode = getState().player.isInShuffleMode;
  const shouldStream = (currentActiveTrackId === playlist[playlist.length - 1] && iterate > 0);

  if (!shouldStream) {
    if (nextActiveTrackId && isInShuffleMode === false) {
      dispatch(activateTrack(nextActiveTrackId));
    } else if (isInShuffleMode) {
      const randomActiveTrackId = getRandomTrack(playlist, currentActiveTrackId);
      dispatch(activateTrack(randomActiveTrackId));
    }
  } else {
    let browserList = [];
    if (pathname === '/dashboard') {
      browserList = getState().user.activities;
    } else {
      browserList = getState().browse[genre];
    }
    if (isInShuffleMode) {
      const randomActiveTrackId = getRandomTrack(browserList, currentActiveTrackId);
      dispatch(activateTrack(randomActiveTrackId));
    } else {
      let nextBrowseTrackId = getIteratedTrack(browserList, currentActiveTrackId, iterate);
      while (playlist.includes(nextBrowseTrackId)) {
        nextBrowseTrackId = getIteratedTrack(browserList, nextBrowseTrackId, iterate);
      }
      if (nextBrowseTrackId) {
        dispatch(activateTrack(nextBrowseTrackId));
      } else {
        dispatch(togglePlayTrack(false));
      }
    }
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

export const changeVolume = (volume) => (dispatch) => {
  dispatch(setTrackVolume(volume));
};
