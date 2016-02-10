import _ from 'lodash';
import * as actionTypes from '../constants/actionTypes';
import { togglePlaylist } from './environment';
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player';
import { apiUrl } from '../utils/soundcloudApi';

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
        let previousActiveTrack = getState().player.activeTrack;
        let isCurrentlyPlaying = getState().player.isPlaying;
        let isPlaying = !isSameTrackAndPlaying(previousActiveTrack, activeTrack, isCurrentlyPlaying);
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
        let playlistSize = getState().player.playlist.length;
        if (playlistSize) {
            dispatch(setTrackInPlaylist(track));
        } else {
            dispatch(activateTrack(track));
        }
    };
}

export function removeTrackFromPlaylist(track) {
    return (dispatch, getState) => {
        let activeTrack = getState().player.activeTrack;
        let isPlaying = getState().player.isPlaying;
        let isRelevantTrack = isSameTrackAndPlaying(activeTrack, track, isPlaying);

        if (isRelevantTrack) {
            dispatch(activateIteratedTrack(activeTrack, 1));
        }

        let playlistSize = getState().player.playlist.length;
        if (playlistSize < 2) {
            dispatch(deactivateTrack());
            dispatch(togglePlaylist(true));
        }

        dispatch(removeFromPlaylist(track));
    };
}

export function activateIteratedTrack(currentActiveTrack, iterate) {
    return (dispatch, getState) => {
        let playlist = getState().player.playlist;
        let nextActiveTrack = getIteratedTrack(playlist, currentActiveTrack, iterate);
        if (nextActiveTrack) {
            dispatch(activateTrack(nextActiveTrack));
        } else {
            dispatch(togglePlayTrack(false));
        }
    };
}

function getIteratedTrack(playlist, currentActiveTrack, iterate) {
    let index = _.findIndex(playlist, isSameTrack(currentActiveTrack));
    return playlist[index + iterate];
}