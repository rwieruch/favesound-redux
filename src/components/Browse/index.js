import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DEFAULT_GENRE } from '../../constants/genre';
import { SORT_FUNCTIONS } from '../../constants/sort';
import { DURATION_FILTER_FUNCTIONS } from '../../constants/durationFilter';
import * as actions from '../../actions/index';
import * as requestTypes from '../../constants/requestTypes';
import { StreamInteractions } from '../../components/StreamInteractions';
import Activities from '../../components/Activities';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { getTracknameFilter } from '../../constants/nameFilter';
import { getAndCombined } from '../../services/filter';

class Browse extends React.Component {

  constructor(props) {
    super(props);
    this.fetchActivitiesByGenre = this.fetchActivitiesByGenre.bind(this);
  }

  componentDidMount() {
    if (!this.needToFetchActivities()) { return; }
    this.fetchActivitiesByGenre();
  }

  componentDidUpdate() {
    if (!this.needToFetchActivities()) { return; }
    this.fetchActivitiesByGenre();
  }

  fetchActivitiesByGenre() {
    const { genre, paginateLinks } = this.props;
    const nextHref = paginateLinks[genre];
    this.props.fetchActivitiesByGenre(nextHref, genre);
  }

  needToFetchActivities() {
    const { genre, browseActivities } = this.props;
    return !browseActivities[genre] || browseActivities[genre].length < 20;
  }

  render() {
    const { browseActivities, genre, requestsInProcess, trackEntities, activeFilter, activeSort } = this.props;

    return (
      <div className="browse">
        <StreamInteractions />
        <Activities
          isLoading={requestsInProcess[requestTypes.GENRES] && !browseActivities[genre]}
          ids={browseActivities[genre]}
          entities={trackEntities}
          activeFilter={activeFilter}
          activeSort={activeSort}
          scrollFunction={this.fetchActivitiesByGenre}
        />
        <LoadingSpinner isLoading={requestsInProcess[requestTypes.GENRES] && browseActivities[genre]} />
      </div>
    );
  }

}

function mapStateToProps(state, routerState) {
  const filters = [
    DURATION_FILTER_FUNCTIONS[state.filter.durationFilterType],
    getTracknameFilter(state.filter.filterNameQuery)
  ];

  return {
    genre: routerState.location.query.genre,
    browseActivities: state.browse,
    requestsInProcess: state.request,
    paginateLinks: state.paginate,
    trackEntities: state.entities.tracks,
    userEntities: state.entities.users,
    activeFilter: getAndCombined(filters),
    activeSort: SORT_FUNCTIONS[state.sort.sortType],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchActivitiesByGenre: bindActionCreators(actions.fetchActivitiesByGenre, dispatch)
  };
}

Browse.propTypes = {
  genre: React.PropTypes.string,
  browseActivities: React.PropTypes.object,
  requestsInProcess: React.PropTypes.object,
  paginateLinks: React.PropTypes.object,
  trackEntities: React.PropTypes.object,
  userEntities: React.PropTypes.object,
  fetchActivitiesByGenre: React.PropTypes.func
};

Browse.defaultProps = {
  genre: DEFAULT_GENRE
};

const BrowseContainer = connect(mapStateToProps, mapDispatchToProps)(Browse);

export {
  Browse,
  BrowseContainer
};
