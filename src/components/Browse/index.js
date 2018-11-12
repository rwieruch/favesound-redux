import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SORT_FUNCTIONS, DATE_SORT_FUNCTIONS } from '../../constants/sort';
import { DURATION_FILTER_FUNCTIONS } from '../../constants/durationFilter';
import * as actions from '../../actions/index';
import * as requestTypes from '../../constants/requestTypes';
import StreamInteractions from '../../components/StreamInteractions';
import Activities from '../../components/Activities';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getTracknameFilter } from '../../constants/nameFilter';
import { getAndCombined, getOrCombined } from '../../services/filter';
import { getArtistFilter } from "../../constants/artistFilter";

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.fetchActivitiesByGenre = this.fetchActivitiesByGenre.bind(this);
  }

  componentDidMount() {
    const { setSelectedGenre, match } = this.props;
    setSelectedGenre(match.params.genre);

    if (!this.needToFetchActivities()) {
      return;
    }
    this.fetchActivitiesByGenre();
  }

  componentWillReceiveProps(nextProps) {
    const curGenre = this.props.match.params.genre;
    const nextGenre = nextProps.match.params.genre;
    const { setSelectedGenre } = this.props;
    if (curGenre !== nextGenre) {
      setSelectedGenre(nextGenre);
    }
  }

  componentDidUpdate() {
    if (!this.needToFetchActivities()) { return; }
    this.fetchActivitiesByGenre();
  }

  componentWillUnmount() {
    const { setSelectedGenre } = this.props;
    setSelectedGenre(null);
  }

  fetchActivitiesByGenre() {
    const { match, paginateLinks } = this.props;
    const genre = match.params.genre;
    const nextHref = paginateLinks[genre];
    this.props.fetchActivitiesByGenre(nextHref, genre);
  }

  needToFetchActivities() {
    const { match, browseActivities } = this.props;
    const genre = match.params.genre;
    return !browseActivities[genre] || browseActivities[genre].length < 20;
  }

  render() {
    const { browseActivities, match, requestsInProcess, trackEntities,
      activeFilter, activeSort, activeDateSort } = this.props;
    const genre = match.params.genre;
    return (
      <div className="browse">
        <StreamInteractions />
        <Activities
          isLoading={requestsInProcess[requestTypes.GENRES] && !browseActivities[genre]}
          ids={browseActivities[genre]}
          entities={trackEntities}
          activeFilter={activeFilter}
          activeSort={activeSort}
          activeDateSort={activeDateSort}
          scrollFunction={this.fetchActivitiesByGenre}
        />
        <LoadingSpinner isLoading={!!(requestsInProcess[requestTypes.GENRES] && browseActivities[genre])} />
      </div>
    );
  }

}

function mapStateToProps(state) {
  const queryFilters = [getTracknameFilter(state.filter.filterNameQuery),
    getArtistFilter(state.filter.filterNameQuery, state.entities.users)];

  const filters = [
    DURATION_FILTER_FUNCTIONS[state.filter.durationFilterType],
    getOrCombined(queryFilters)
  ];

  return {
    browseActivities: state.browse,
    requestsInProcess: state.request,
    paginateLinks: state.paginate,
    trackEntities: state.entities.tracks,
    userEntities: state.entities.users,
    activeFilter: getAndCombined(filters),
    activeSort: SORT_FUNCTIONS[state.sort.sortType],
    activeDateSort: DATE_SORT_FUNCTIONS[state.sort.dateSortType],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedGenre: bindActionCreators(actions.setSelectedGenre, dispatch),
    fetchActivitiesByGenre: bindActionCreators(actions.fetchActivitiesByGenre, dispatch)
  };
}

Browse.propTypes = {
  browseActivities: PropTypes.object,
  requestsInProcess: PropTypes.object,
  paginateLinks: PropTypes.object,
  trackEntities: PropTypes.object,
  userEntities: PropTypes.object,
  fetchActivitiesByGenre: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
