import moment from 'moment';

export function isTrack(track) {
  let { origin, type } = track;
  return origin && type && type !== 'playlist' && type !== 'playlist-repost';
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
  return moment(new Date(createdAt)).from(moment());
}
