import { orderBy } from 'lodash';
import * as sortTypes from '../constants/sortTypes';

const SORT_NAMES = {
  [sortTypes.NONE]: 'NONE',
  [sortTypes.SORT_PLAYS]: 'PLAYS',
  [sortTypes.SORT_FAVORITES]: 'FAVORITES',
  [sortTypes.SORT_REPOSTS]: 'REPOSTS',
};

const SORT_FUNCTIONS = {
  [sortTypes.NONE]: (objs) => objs,
  [sortTypes.SORT_PLAYS]: (activities) => sortByPlays(activities),
  [sortTypes.SORT_FAVORITES]: (activities) => sortByFavorites(activities),
  [sortTypes.SORT_REPOSTS]: (activities) => sortByReposts(activities),
};

function sortByPlays(activities) {
  return orderBy(activities, (activity) => activity.playback_count, 'desc');
}

function sortByFavorites(activities) {
  return orderBy(activities, (activity) => activity.likes_count, 'desc');
}

function sortByReposts(activities) {
  return orderBy(activities, (activity) => activity.reposts_count, 'desc');
}

export {
  SORT_NAMES,
  SORT_FUNCTIONS,
};
