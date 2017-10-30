import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetSession } from '../../actions/session';
import * as requestTypes from '../../constants/requestTypes';
import StreamActivities from '../../components/StreamActivities';
import FollowersList from '../../components/FollowersList';
import FollowingsList from '../../components/FollowingsList';
import FavoritesList from '../../components/FavoritesList';

class Dashboard extends React.Component {
  componentWillUnmount() {
    this.props.resetSession();
  }

  render() {
    const { isAuthInProgress, isAuthed, loginError } = this.props;
    if ((!isAuthInProgress && !isAuthed) || loginError) {
      return <Redirect to="/" />;
    }

    if (isAuthInProgress) {
      return null;
    }

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
}

const mapStateToProps = state => ({
  isAuthed: state.session.session,
  isAuthInProgress: state.request[requestTypes.AUTH],
  loginError: state.session.loginError,
});

export default connect(mapStateToProps, { resetSession })(Dashboard);
