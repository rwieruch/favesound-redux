const ACTIVITY_TYPES = {
  trackRepost: 'track-repost',
  playlistRepost: 'playlist-repost',
  playlist: 'playlist',
  track: 'track'
};

export function getTrackIcon(type) {
  if (type === ACTIVITY_TYPES.trackRepost) {
    return 'fa fa-retweet';
  }

  if (type === ACTIVITY_TYPES.playlist || type === ACTIVITY_TYPES.playlistRepost) {
    return 'fa fa-list';
  }

  if (type === ACTIVITY_TYPES.track) {
    return 'fa fa-play';
  }
}

export function isNoTrack(track) {
  let { origin, type } = track;
  return !origin || !type || type === 'playlist' || type === 'playlist-repost'
}

export function normalizeSamples(samples) {
  let highestValue = 0;
  for (var i = 0; i <= samples.length; i++) {
    if (samples[i] > highestValue) {
      highestValue = samples[i];
    }
  }

  let newSamples = [];
  for (var j = 0; j <= samples.length; j++) {
    let newValue = samples[j] / highestValue;
    newSamples.push(newValue);
  }
  return newSamples;
}