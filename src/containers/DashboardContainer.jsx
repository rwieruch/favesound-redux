import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { HeaderContainer } from '../containers/HeaderContainer';
import { PlayerContainer } from '../containers/PlayerContainer';
import { PlaylistContainer } from '../containers/PlaylistContainer';
import UserMosaic from '../components/UserMosaic';
import Activities from '../components/Activities';

export class Dashboard extends React.Component {

  getInnerContent() {
    const {
      currentUser,
      followings,
      followers,
      followersNextHref,
      followersRequestInProcess,
      fetchFollowers
    } = this.props;

    if (currentUser) {
      return (<div className="dashboard-content">
        <div className="dashboard-content-main">
          <Activities
            {...this.props}
            scrollFunction={this.fetchActivities}
          />
        </div>
        <div className="dashboard-content-side">
          <UserMosaic
            title="Followings"
            userList={followings}
          />
          <UserMosaic
            title="Followers"
            userList={followers}
            nextHref={followersNextHref}
            requestInProcess={followersRequestInProcess}
            currentUser={currentUser}
            fetchMore={fetchFollowers}
          />
        </div>
      </div>);
    } else {
      return <div></div>;
    }
  }

  fetchActivities() {
    const { activitiesNextHref } = this.props;
    this.props.fetchActivities(null, activitiesNextHref);
  }

  render() {
    return (<div className="dashboard">
      <HeaderContainer />
      {this.getInnerContent()}
      <PlaylistContainer />
      <PlayerContainer />
    </div>);
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.session.get('user'),
    followings: state.user.get('followings'),
    activities: state.user.get('activities'),
    activitiesNextHref: state.user.get('activitiesNextHref'),
    activitiesRequestInProcess: state.user.get('activitiesRequestInProcess'),
    followers: state.user.get('followers'),
    followersNextHref: state.user.get('followersNextHref'),
    followersRequestInProcess: state.user.get('followersRequestInProcess'),
    activeTrack: state.player.get('activeTrack'),
    isPlaying: state.player.get('isPlaying')
  };
}

export const DashboardContainer = connect(mapStateToProps, actions)(Dashboard);
