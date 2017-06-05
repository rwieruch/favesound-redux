export function isSameTrackAndPlaying(activeTrackId, trackId, isPlaying) {
  return activeTrackId && isPlaying && activeTrackId === trackId;
}

export function isSameTrack(trackId) {
  return function is(id) {
    return trackId && id && trackId === id;
  };
}

export function formatSeconds(num) {
  if (num < 3600) {
    const minutes = padZero(Math.floor(num / 60), 2);
    const seconds = padZero(num % 60, 2);
    return `${minutes}:${seconds}`;
  } else {
    const hours = padZero(Math.floor(num / 3600), 2);
    const minutes = padZero(Math.floor((num - (hours * 3600)) / 60), 2);
    const seconds = padZero(num % 60, 2);
    return `${hours}:${minutes}:${seconds}`;
  }
}

function padZero(num, size) {
  let s = String(num);
  while (s.length < size) {
    s = `0${s}`;
  }
  return s;
}
