import React from 'react';
import { StreamActivitiesContainer } from '../components/StreamActivities';
import { FollowersListContainer } from '../components/FollowersList';
import { FollowingsListContainer } from '../components/FollowingsList';
import { FavoritesListContainer } from '../components/FavoritesList';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <StreamActivitiesContainer />
      </div>
      <div className="dashboard-side">
        <FollowingsListContainer />
        <FollowersListContainer />
        <FavoritesListContainer />
      </div>
    </div>
  );
}

export {
  Dashboard
};
