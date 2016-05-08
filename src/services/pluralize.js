export function getPluralized(count, string) {
  return count > 1 ? string + 's' : string;
}

export function getPluralizedWithCount(count, string) {
  return count > 1 ? count + ' ' + string + 's' : count + ' ' + string;
}
