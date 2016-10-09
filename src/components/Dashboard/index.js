import React from 'react';
import StreamActivities from '../../components/StreamActivities';
import FollowersList from '../../components/FollowersList';
import FollowingsList from '../../components/FollowingsList';
import FavoritesList from '../../components/FavoritesList';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <StreamActivities />
      </div>
      <div className="dashboard-side">
        <FollowingsList />
        <FollowersList />
        <FavoritesList />
      </div>
    </div>
  );
}

export default Dashboard;
