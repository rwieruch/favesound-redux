import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DEFAULT_GENRE } from '../constants/genre';
import * as actions from '../actions/index';
import * as requestTypes from '../constants/requestTypes';
import Activities from '../components/Activities';

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
    const { browseActivities, genre, requestsInProcess, trackEntities } = this.props;

    return (
      <div className="browse">
        <Activities
          requestInProcess={requestsInProcess[requestTypes.GENRES]}
          ids={browseActivities[genre]}
          entities={trackEntities}
          scrollFunction={this.fetchActivitiesByGenre}
        />
      </div>
    );
  }

}

function mapStateToProps(state, routerState) {
  return {
    genre: routerState.location.query.genre,
    browseActivities: state.browse,
    requestsInProcess: state.request,
    paginateLinks: state.paginate,
    trackEntities: state.entities.tracks,
    userEntities: state.entities.users
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
