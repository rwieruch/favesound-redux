import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import * as requestTypes from '../constants/requestTypes';
import * as paginateLinkTypes from '../constants/paginateLinkTypes';
import { HeaderContainer } from '../components/Header';
import { PlayerContainer } from '../components/Player';
import { PlaylistContainer } from '../components/Playlist';
import { FollowersListContainer } from '../components/FollowersList';
import { FollowingsListContainer } from '../components/FollowingsList';
import { FavoritesListContainer } from '../components/FavoritesList';
import Activities from '../components/Activities';

export const Dashboard = ({
  genre,
  pathname,
  activities,
  requestsInProcess,
  paginateLinks,
  trackEntities,
  fetchActivities
}) => {
  return (
    <div className="dashboard">
      <HeaderContainer genre={genre} pathname={pathname}/>
      <div className="dashboard-content">
        <div className="dashboard-content-main">
          <Activities
            requestInProcess={requestsInProcess[requestTypes.ACTIVITIES]}
            entities={trackEntities}
            ids={activities}
            scrollFunction={() => fetchActivities(null, paginateLinks[paginateLinkTypes.ACTIVITIES])}
          />
        </div>
        <div className="dashboard-content-side">
          <FollowingsListContainer />
          <FollowersListContainer />
          <FavoritesListContainer />
        </div>
      </div>
      <PlaylistContainer />
      <PlayerContainer />
    </div>
  );
};

function mapStateToProps(state, routerState) {
  return {
    pathname: routerState.location.pathname,
    genre: routerState.location.query.genre,
    trackEntities: state.entities.tracks,
    activities: state.user.activities,
    requestsInProcess: state.request,
    paginateLinks: state.paginate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchActivities: bindActionCreators(actions.fetchActivities, dispatch)
  };
}

export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
