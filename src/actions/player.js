import * as actionTypes from '../constants/actionTypes';
import {togglePlaylist} from './environment';
import {isActivePlayingTrack} from '../utils/player';

function setActiveTrack(activeTrack) {
    return {
        type: actionTypes.SET_ACTIVE_TRACK,
        activeTrack
    };
}

function setIsPlaying(isPlaying) {
    return {
        type: actionTypes.SET_IS_PLAYING,
        isPlaying
    };
}

function setTrackInPlaylist(track) {
    return {
        type: actionTypes.SET_TRACK_IN_PLAYLIST,
        track
    }
}

function removeFromPlaylist(track) {
    return {
        type: actionTypes.REMOVE_TRACK_FROM_PLAYLIST,
        track
    };
}

function deactivateTrack() {
    return {
        type: actionTypes.RESET_ACTIVE_TRACK,
        null
    };
}

export function activateTrack(activeTrack) {
    return (dispatch, getState) => {
        let previousActiveTrack = getState().player.get('activeTrack');
        let isCurrentlyPlaying = getState().player.get('isPlaying');
        let isPlaying = !isActivePlayingTrack(previousActiveTrack, activeTrack, isCurrentlyPlaying);
        dispatch(togglePlayTrack(isPlaying));
        dispatch(setActiveTrack(activeTrack));
        dispatch(setTrackInPlaylist(activeTrack));
    };
}

export function togglePlayTrack(isPlaying) {
    return dispatch => {
        dispatch(setIsPlaying(isPlaying));
    };
}

export function addTrackToPlaylist(track) {
    return (dispatch, getState) => {
        let playlistSize = getState().player.get('playlist').size;
        if (playlistSize) {
            dispatch(setTrackInPlaylist(track));
        } else {
            dispatch(activateTrack(track));
        }
    };
}

export function removeTrackFromPlaylist(track) {
    return (dispatch, getState) => {
        let activeTrack = getState().player.get('activeTrack');
        let isPlaying = getState().player.get('isPlaying');
        let isRelevantTrack = isActivePlayingTrack(activeTrack, track, isPlaying);

        if (isRelevantTrack) {
            dispatch(activateNextTrack(activeTrack));
        }

        let playlistSize = getState().player.get('playlist').size;
        if (playlistSize < 2) {
            dispatch(deactivateTrack());
            dispatch(togglePlaylist(true));
        }

        dispatch(removeFromPlaylist(track));
    };
}

function activateNextTrack(currentActiveTrack) {
    return (dispatch, getState) => {
        let playlist = getState().player.get('playlist');
        let index = playlist.findIndex(obj => obj.origin.id === currentActiveTrack.origin.id);
        let nextTrack = playlist.get(index + 1);
        if (nextTrack) {
            dispatch(activateTrack(nextTrack));
        } else {
            dispatch(togglePlayTrack(false));
        }
    };
}