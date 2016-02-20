import moment from 'moment';

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
  for (let i = 0; i <= samples.length; i++) {
    if (samples[i] > highestValue) {
      highestValue = samples[i];
    }
  }

  let newSamples = [];
  for (let j = 0; j <= samples.length; j++) {
    let newValue = samples[j] / highestValue;
    newSamples.push(newValue);
  }
  return newSamples;
}

export function isJsonWaveform(waveformUrl) {
  return waveformUrl.indexOf('.json') !== -1;
}

export function isPngWaveform(waveformUrl) {
  return waveformUrl.indexOf('.png') !== -1;
}

export function durationFormat(ms) {
  let duration = moment.duration(ms);
  if (duration.asHours() > 1) {
    return Math.floor(duration.asHours()) + moment.utc(duration.asMilliseconds()).format(":mm:ss");
  } else {
    return moment.utc(duration.asMilliseconds()).format("mm:ss");
  }
}

export function fromNow(createdAt) {
  return moment(createdAt).from(moment());
}

export function mapInOrigin(type) {
  return function (origin) {
    return { origin, type };
  };
}