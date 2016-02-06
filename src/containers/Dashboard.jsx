import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import Followings from '../components/Followings';
import Activities from '../components/Activities';
import Player from '../components/Player';
import Playlist from '../components/Playlist';
import Header from '../components/Header';

export class Dashboard extends React.Component {

  render() {
    const { currentUser, followings, activitiesNextHref } = this.props;

    if (currentUser) {
      return (<div className='dashboard'>
        <Header {...this.props} />
        <div className='dashboard-content'>
          <div className='dashboard-content-main'>
            <Activities {...this.props} scrollFunction={this.props.fetchActivities.bind(null, activitiesNextHref)}/>
          </div>
          <div className='dashboard-content-side'>
            <Followings {...this.props} />
          </div>
        </div>
        <Playlist {...this.props} />
        <Player {...this.props} />
      </div>);
    } else {
      return <button onClick={() => this.props.initSession()}>Login</button>;
    }
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.session.get('user'),
    followings: state.user.get('followings'),
    activities: state.user.get('activities'),
    activitiesNextHref: state.user.get('activitiesNextHref'),
    activitiesRequestInProcess: state.user.get('activitiesRequestInProcess'),
    activeTrack: state.player.get('activeTrack'),
    isPlaying: state.player.get('isPlaying'),
    playlist: state.player.get('playlist'),
    isOpenPlaylist: state.environment.get('isOpenPlaylist')
  };
}

export const DashboardContainer = connect(mapStateToProps, actions)(Dashboard);