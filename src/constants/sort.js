import sortBy from 'lodash/fp/sortBy';
import * as sortTypes from '../constants/sortTypes';

const SORT_NAMES = {
  [sortTypes.NONE]: 'NONE',
  [sortTypes.SORT_FAVORITES]: 'FAVORITES',
};

const SORT_FUNCTIONS = {
  [sortTypes.ALL]: () => true,
  [sortTypes.SORT_FAVORITES]: (activities) => sortByFavorites(activities),
};

function sortByFavorites(activities) {
  return sortBy((activity) => activity.likes_count, activities);
}

export {
  SORT_NAMES,
  SORT_FUNCTIONS,
};
