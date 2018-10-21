import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import { getAndCombined, getOrCombined } from '../../services/filter';
import Activities from '../../components/Activities';
import LoadingSpinner from '../../components/LoadingSpinner';
import StreamInteractions from '../../components/StreamInteractions';
import { DURATION_FILTER_FUNCTIONS } from '../../constants/durationFilter';
import { getTracknameFilter } from '../../constants/nameFilter';
import { SORT_FUNCTIONS, DATE_SORT_FUNCTIONS } from '../../constants/sort';
import { getArtistFilter } from '../../constants/artistFilter';

function StreamActivities({
  activities,
  requestInProcess,
  nextHref,
  trackEntities,
  activeFilter,
  activeSort,
                            activeDateSort,
  onFetchActivities,
}) {
  return (
    <div>
      <StreamInteractions />
      <Activities
        isLoading={requestInProcess && !activities}
        entities={trackEntities}
        ids={activities}
        activeFilter={activeFilter}
        activeSort={activeSort}
        activeDateSort={activeDateSort}
        scrollFunction={() => onFetchActivities(null, nextHref)}
      />
      <LoadingSpinner isLoading={!!(requestInProcess && activities)} />
    </div>
  );
}

function mapStateToProps(state) {
  const queryFilters = [getTracknameFilter(state.filter.filterNameQuery),
    getArtistFilter(state.filter.filterNameQuery, state.entities.users)];

  const filters = [
    DURATION_FILTER_FUNCTIONS[state.filter.durationFilterType],
    getOrCombined(queryFilters)
  ];

  return {
    trackEntities: state.entities.tracks,
    activities: state.user.activities,
    requestInProcess: state.request[requestTypes.ACTIVITIES],
    nextHref: state.paginate[paginateLinkTypes.ACTIVITIES],
    activeFilter: getAndCombined(filters),
    activeSort: SORT_FUNCTIONS[state.sort.sortType],
    activeDateSort: DATE_SORT_FUNCTIONS[state.sort.dateSortType],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchActivities: bindActionCreators(actions.fetchActivities, dispatch)
  };
}

StreamActivities.propTypes = {
  trackEntities: PropTypes.object,
  activities: PropTypes.array,
  requestInProcess: PropTypes.bool,
  nextHref: PropTypes.string,
  activeFilter: PropTypes.func,
  activeSort: PropTypes.func,
  activeDateSort: PropTypes.func,
  onFetchActivities: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamActivities);
