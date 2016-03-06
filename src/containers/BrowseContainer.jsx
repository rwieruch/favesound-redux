import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import * as requestTypes from '../constants/requestTypes';
import { DEFAULT_GENRE } from '../constants/genre';
import { HeaderContainer } from '../containers/HeaderContainer';
import { PlayerContainer } from '../containers/PlayerContainer';
import { PlaylistContainer } from '../containers/PlaylistContainer';
import Activities from '../components/Activities';

export class Browse extends React.Component {

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

  getInnerContent() {
    const { browseActivities, genre, requestsInProcess, trackEntities } = this.props;

    if (!browseActivities) { return; }

    return (
      <div className="browse-content">
        <Activities
          requestInProcess={requestsInProcess[requestTypes.GENRES]}
          ids={browseActivities[genre]}
          entities={trackEntities}
          scrollFunction={this.fetchActivitiesByGenre}
        />
      </div>
    );
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
    return (
      <div className="browse">
        <HeaderContainer genre={this.props.genre} pathname={this.props.pathname}/>
        {this.getInnerContent()}
        <PlaylistContainer />
        <PlayerContainer />
      </div>
    );
  }

}

function mapStateToProps(state, routerState) {
  return {
    pathname: routerState.location.pathname,
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

export const BrowseContainer = connect(mapStateToProps, mapDispatchToProps)(Browse);

Browse.defaultProps = {
  genre: DEFAULT_GENRE
};
