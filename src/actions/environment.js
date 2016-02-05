import * as actionTypes from '../constants/actionTypes';
import {isActivePlayingTrack} from '../utils/player';

function setIsOpenPlaylist(isOpen) {
    return {
        type: actionTypes.SET_IS_OPEN_PLAYLIST,
        isOpen
    };
}

export function togglePlaylist(isOpen) {
    return dispatch => {
        dispatch(setIsOpenPlaylist(isOpen));
    };
}