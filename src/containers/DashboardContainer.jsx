import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { HeaderContainer } from '../containers/HeaderContainer';
import { PlayerContainer } from '../containers/PlayerContainer';
import { PlaylistContainer } from '../containers/PlaylistContainer';
import ItemList from '../components/ItemList';
import Activities from '../components/Activities';

export class Dashboard extends React.Component {

  getInnerContent() {
    const {
      currentUser,
      activities,
      followings,
      followers,
      followersNextHref,
      followersRequestInProcess,
      fetchFollowers,
      favorites,
      favoritesRequestInProcess
    } = this.props;

    if (!currentUser) {
      return <div></div>;
    }

    return (<div className="dashboard-content">
      <div className="dashboard-content-main">
        <Activities
          {...this.props}
          activities={activities}
          scrollFunction={() => this.fetchActivities()}
        />
      </div>
      <div className="dashboard-content-side">
        <ItemList
          title="Followings"
          list={followings}
          kind="user"
          {...this.props}
        />
        <ItemList
          title="Followers"
          list={followers}
          nextHref={followersNextHref}
          requestInProcess={followersRequestInProcess}
          currentUser={currentUser}
          fetchMore={fetchFollowers}
          kind="user"
          {...this.props}
        />
        <ItemList
          title="Favorites"
          list={favorites}
          requestInProcess={favoritesRequestInProcess}
          currentUser={currentUser}
          kind="track"
          {...this.props}
        />
      </div>
    </div>);
  }

  fetchActivities() {
    const { activitiesNextHref } = this.props;
    this.props.fetchActivities(null, activitiesNextHref);
  }

  render() {
    return (<div className="dashboard">
      <HeaderContainer genre={this.props.genre} pathname={this.props.pathname}/>
      {this.getInnerContent()}
      <PlaylistContainer />
      <PlayerContainer />
    </div>);
  }

}

function mapStateToProps(state, routerState) {
  return {
    pathname: routerState.location.pathname,
    genre: routerState.location.query.genre,
    currentUser: state.session.user,
    activeTrack: state.player.activeTrack,
    isPlaying: state.player.isPlaying,
    followings: state.user.followings,
    activities: state.user.activities,
    activitiesNextHref: state.user.activitiesNextHref,
    activitiesRequestInProcess: state.user.activitiesRequestInProcess,
    followers: state.user.followers,
    followersNextHref: state.user.followersNextHref,
    followersRequestInProcess: state.user.followersRequestInProcess,
    favorites: state.user.favorites,
    favoritesRequestInProcess: state.user.favoritesRequestInProcess
  };
}

export const DashboardContainer = connect(mapStateToProps, actions)(Dashboard);

Dashboard.propTypes = {
  pathname: React.PropTypes.string.isRequired,
  genre: React.PropTypes.string,
  currentUser: React.PropTypes.object,
  activeTrack: React.PropTypes.object,
  isPlaying: React.PropTypes.bool.isRequired,
  followings: React.PropTypes.array,
  activities: React.PropTypes.array,
  activitiesNextHref: React.PropTypes.string,
  activitiesRequestInProcess: React.PropTypes.bool.isRequired,
  followers: React.PropTypes.array,
  followersNextHref: React.PropTypes.string,
  followersRequestInProcess: React.PropTypes.bool.isRequired,
  favorites: React.PropTypes.array,
  favoritesRequestInProcess: React.PropTypes.bool.isRequired
};
