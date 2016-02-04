import * as actionTypes from '../constants/actionTypes';
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

export function activateTrack(activeTrack) {
    return (dispatch, getState) => {
        let previousActiveTrack = getState().player.get('activeTrack');
        let isCurrentlyPlaying = getState().player.get('isPlaying');
        let isPlaying = !isActivePlayingTrack(previousActiveTrack, activeTrack, isCurrentlyPlaying);
        dispatch(togglePlayTrack(isPlaying));
        dispatch(setActiveTrack(activeTrack));
    };
}

export function togglePlayTrack(isPlaying) {
    return dispatch => {
        dispatch(setIsPlaying(isPlaying));
    };
}