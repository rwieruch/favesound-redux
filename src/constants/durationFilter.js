import moment from 'moment';
import * as filterTypes from '../constants/filterTypes';

const DURATION_FILTER_NAMES = {
  [filterTypes.ALL]: 'ALL',
  [filterTypes.FILTER_DURATION_TRACK]: 'TRACK',
  [filterTypes.FILTER_DURATION_MIX]: 'MIX',
};

const DURATION_FILTER_FUNCTIONS = {
  [filterTypes.ALL]: () => true,
  [filterTypes.FILTER_DURATION_TRACK]: (activity) => !isMixDuration(activity),
  [filterTypes.FILTER_DURATION_MIX]: (activity) => isMixDuration(activity),
};

function isMixDuration(activity) {
  return moment.duration(activity.duration).asMinutes() > 15;
}

export {
  DURATION_FILTER_NAMES,
  DURATION_FILTER_FUNCTIONS,
};
