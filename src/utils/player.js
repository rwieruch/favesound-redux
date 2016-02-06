export function isSameTrackAndPlaying(activeTrack, track, isPlaying) {
    return activeTrack && isPlaying && activeTrack.origin.id === track.origin.id;
}

export function isSameTrack(track) {
    return function(obj) {
        return obj.origin.id === track.origin.id;
    }
}