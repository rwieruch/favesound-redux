import _ from 'lodash';
import * as actionTypes from '../constants/actionTypes';
import { togglePlaylist } from './environment';
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player';
import { apiUrl } from '../utils/soundcloudApi';

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
    }
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
        null
    }
}

function emptyPlaylist() {
    return {
        type: actionTypes.EMPTY_PLAYLIST,
        null
    };
}

export function clearPlaylist() {
    return dispatch => {
        dispatch(emptyPlaylist());
        dispatch(deactivateTrack());
        dispatch(togglePlaylist(true));
    };
}

export function activateTrack(trackId) {
    return (dispatch, getState) => {
        let playlist = getState().player.playlist;
        let previousActiveTrackId = getState().player.activeTrackId;
        let isCurrentlyPlaying = getState().player.isPlaying;
        let isPlaying = !isSameTrackAndPlaying(previousActiveTrackId, trackId, isCurrentlyPlaying);

        dispatch(togglePlayTrack(isPlaying));
        dispatch(setActiveTrack(trackId));

        if (!isInPlaylist(playlist, trackId)) {
            dispatch(setTrackInPlaylist(trackId));
        }
    };
}

export function togglePlayTrack(isPlaying) {
    return dispatch => {
        dispatch(setIsPlaying(isPlaying));
    };
}

export function addTrackToPlaylist(track) {
    return (dispatch, getState) => {
        let playlist = getState().player.playlist;

        if (!isInPlaylist(playlist, track.id)) {
            dispatch(setTrackInPlaylist(track.id));
        }

        if (!playlist.length) {
            dispatch(activateTrack(track.id));
        }
    };
}

export function removeTrackFromPlaylist(track) {
    return (dispatch, getState) => {
        let activeTrackId = getState().player.activeTrackId;
        let isPlaying = getState().player.isPlaying;
        let isRelevantTrack = isSameTrackAndPlaying(activeTrackId, track.id, isPlaying);

        if (isRelevantTrack) {
            dispatch(activateIteratedTrack(activeTrackId, 1));
        }

        let playlistSize = getState().player.playlist.length;
        if (playlistSize < 2) {
            dispatch(deactivateTrack());
            dispatch(togglePlaylist(true));
        }

        dispatch(removeFromPlaylist(track.id));
    };
}

export function activateIteratedTrack(currentActiveTrackId, iterate) {
    return (dispatch, getState) => {
        let playlist = getState().player.playlist;
        let nextActiveTrackId = getIteratedTrack(playlist, currentActiveTrackId, iterate);

        if (nextActiveTrackId) {
            dispatch(activateTrack(nextActiveTrackId));
        } else {
            dispatch(togglePlayTrack(false));
        }
    };
}

function getIteratedTrack(playlist, currentActiveTrackId, iterate) {
    let index = _.findIndex(playlist, isSameTrack(currentActiveTrackId));
    return playlist[index + iterate];
}

function isInPlaylist(playlist, trackId) {
    return _.find(playlist, isSameTrack(trackId));
}