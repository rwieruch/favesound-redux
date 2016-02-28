export function isSameTrackAndPlaying(activeTrack, track, isPlaying) {
    return activeTrack && isPlaying && activeTrack.id === track.id;
}

export function isSameTrack(track) {
    return function(obj) {
        return track && obj && obj.id === track.id;
    }
}