export function isActivePlayingTrack(activeTrack, track, isPlaying) {
    return activeTrack && isPlaying && activeTrack.origin.id === track.origin.id;
}