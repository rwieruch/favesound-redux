export function isSameTrackAndPlaying(activeTrackId, trackId, isPlaying) {
    return activeTrackId && isPlaying && activeTrackId === trackId;
}

export function isSameTrack(trackId) {
    return function(id) {
        return trackId && id && trackId === id;
    }
}