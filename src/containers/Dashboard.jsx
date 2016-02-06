import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import UserMosaic from '../components/UserMosaic';
import Activities from '../components/Activities';
import Player from '../components/Player';
import Playlist from '../components/Playlist';
import Header from '../components/Header';

export class Dashboard extends React.Component {

  getInnerContent() {
    const { currentUser, followings, activitiesNextHref, followers, followersNextHref, followersRequestInProcess, fetchFollowers } = this.props;

    if (currentUser) {
      return (<div className='dashboard-content'>
        <div className='dashboard-content-main'>
          <Activities {...this.props} scrollFunction={this.props.fetchActivities.bind(null, null, activitiesNextHref)}/>
        </div>
        <div className='dashboard-content-side'>
          <UserMosaic title='Followings' userList={followings} />
          <UserMosaic title='Followers' userList={followers} nextHref={followersNextHref} requestInProcess={followersRequestInProcess} currentUser={currentUser} fetchMore={fetchFollowers}/>
        </div>
      </div>);
    } else {
      return <div></div>;
    }

  }

  render() {
    return (<div className='dashboard'>
      <Header {...this.props} />
      {this.getInnerContent()}
      <Playlist {...this.props} />
      <Player {...this.props} />
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
    isPlaying: state.player.get('isPlaying'),
    playlist: state.player.get('playlist'),
    isOpenPlaylist: state.environment.get('isOpenPlaylist')
  };
}

export const DashboardContainer = connect(mapStateToProps, actions)(Dashboard);