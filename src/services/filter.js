import every from 'lodash/fp/every';
import some from 'lodash/fp/some';

export function getOrCombined(filters) {
  return (obj) => some((fn) => fn(obj), filters);
}

export function getAndCombined(filters) {
  return (obj) => every((fn) => fn(obj), filters);
}
