import * as actionTypes from '../constants/actionTypes';

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

export function activateTrack(activeTrack) {
    return dispatch => {
        dispatch(togglePlayTrack(true));
        dispatch(setActiveTrack(activeTrack));
    };
}

export function togglePlayTrack(isPlaying) {
    return dispatch => {
        dispatch(setIsPlaying(isPlaying));
    };
}