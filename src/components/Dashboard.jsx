import React from 'react';
import { connect } from 'react-redux';
import { HeaderContainer } from '../components/Header';
import { PlayerContainer } from '../components/Player';
import { PlaylistContainer } from '../components/Playlist';
import { StreamActivitiesContainer } from '../components/StreamActivities';
import { FollowersListContainer } from '../components/FollowersList';
import { FollowingsListContainer } from '../components/FollowingsList';
import { FavoritesListContainer } from '../components/FavoritesList';

export const Dashboard = ({
  genre,
  pathname
}) => {
  return (
    <div className="dashboard">
      <HeaderContainer
        genre={genre}
        pathname={pathname}
      />
      <div className="dashboard-content">
        <div className="dashboard-content-main">
          <StreamActivitiesContainer />
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
    genre: routerState.location.query.genre
  };
}

export const DashboardContainer = connect(mapStateToProps)(Dashboard);
