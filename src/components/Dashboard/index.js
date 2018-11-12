import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as requestTypes from '../../constants/requestTypes';
import StreamActivities from '../../components/StreamActivities';
import FollowersList from '../../components/FollowersList';
import FollowingsList from '../../components/FollowingsList';
import FavoritesList from '../../components/FavoritesList';

class Dashboard extends React.Component {
  render() {
    const { isAuthInProgress, isAuthed } = this.props;

    if (isAuthInProgress) {
      return null;
    }

    if (!isAuthed) {
      return <Redirect to="/" />;
    }

    return (
      <div>
      <div className="dashboard">
        <div className="dashboard-main">
          <StreamActivities />
        </div>
      </div>
        <div className="dashboard-side">
          <FollowingsList />
          <FollowersList />
          <FavoritesList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: Boolean(state.session.session),
  isAuthInProgress: state.request[requestTypes.AUTH],
});

export default connect(mapStateToProps)(Dashboard);
