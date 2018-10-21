import { orderBy } from 'lodash';
import * as sortTypes from '../constants/sortTypes';
import * as dateSortTypes from './dateSortTypes';
import moment from 'moment';

const SORT_NAMES = {
  [sortTypes.NONE]: 'NONE',
  [sortTypes.SORT_PLAYS]: 'PLAYS',
  [sortTypes.SORT_FAVORITES]: 'FAVORITES',
  [sortTypes.SORT_REPOSTS]: 'REPOSTS',
};
const DATE_SORT_NAMES = {
  [dateSortTypes.NONE]: 'NONE',
  [dateSortTypes.PAST_6MONTH]: 'PAST 6 MONTHS',
  [dateSortTypes.PAST_YEAR]: 'PAST YEAR',
  [dateSortTypes.OLDER]: 'OLDER'
};
const DATE_SORT_FUNCTIONS = {
  [dateSortTypes.NONE]: (objs) => objs,
  [dateSortTypes.PAST_6MONTH]: (activities) => sortByMonth(activities),
  [dateSortTypes.PAST_YEAR]: (activities) => sortByYear(activities),
  [dateSortTypes.OLDER]: (activities) => sortByOld(activities),
};

const SORT_FUNCTIONS = {
  [sortTypes.NONE]: (objs) => objs,
  [sortTypes.SORT_PLAYS]: (activities) => sortByPlays(activities),
  [sortTypes.SORT_FAVORITES]: (activities) => sortByFavorites(activities),
  [sortTypes.SORT_REPOSTS]: (activities) => sortByReposts(activities),
};

function sortDates(dt1, dt2) {
  const dateA = new Date(dt1.created_at);
  const dateB = new Date(dt2.created_at);
  return dateA - dateB;
}

function sortByMonth(activities) {
  const sortDt = new moment().subtract(6, 'months').date(1);
  const act = activities.filter(obj => {
    return moment(obj.created_at) >= sortDt;
  });
  return act.sort((a, b) => {
    return sortDates(a, b);
  });
}

function sortByYear(activities) {
  const sortDt = new moment().subtract(1, 'year').date(1);
  const act = activities.filter(obj => {
    return moment(obj.created_at) >= sortDt;
  });
  return act.sort((a, b) => {
    return sortDates(a, b);
  });
}

function sortByOld(activities) {
  const sortDt = new moment().subtract(1, 'year').date(1);
  const act = activities.filter(obj => {
    return moment(obj.created_at) < sortDt;
  });
  return act.sort((a, b) => {
    return sortDates(a, b);
  });
}

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
  DATE_SORT_NAMES,
  DATE_SORT_FUNCTIONS
};
