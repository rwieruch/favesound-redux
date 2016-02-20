import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as requestTypes from '../constants/requestTypes';
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
      activitiesNextHref,
      fetchActivities,
      followings,
      followingsNextHref,
      fetchFollowings,
      followers,
      followersNextHref,
      fetchFollowers,
      favorites,
      favoritesNextHref,
      fetchFavorites,
      requestsInProcess
    } = this.props;

    if (!currentUser) {
      return <div></div>;
    }

    return (<div className="dashboard-content">
      <div className="dashboard-content-main">
        <Activities
          {...this.props}
          requestInProcess={requestsInProcess[requestTypes.ACTIVITIES]}
          activities={activities}
          scrollFunction={() => fetchActivities(null, activitiesNextHref)}
        />
      </div>
      <div className="dashboard-content-side">
        <ItemList
          title="Followings"
          list={followings}
          nextHref={followingsNextHref}
          requestInProcess={requestsInProcess[requestTypes.FOLLOWINGS]}
          currentUser={currentUser}
          fetchMore={fetchFollowings}
          kind="user"
          {...this.props}
        />
        <ItemList
          title="Followers"
          list={followers}
          nextHref={followersNextHref}
          requestInProcess={requestsInProcess[requestTypes.FOLLOWERS]}
          currentUser={currentUser}
          fetchMore={fetchFollowers}
          kind="user"
          {...this.props}
        />
        <ItemList
          title="Favorites"
          list={favorites}
          nextHref={favoritesNextHref}
          requestInProcess={requestsInProcess[requestTypes.FAVORITES]}
          currentUser={currentUser}
          fetchMore={fetchFavorites}
          kind="track"
          {...this.props}
        />
      </div>
    </div>);
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
    followingsNextHref: state.user.followingsNextHref,
    activities: state.user.activities,
    activitiesNextHref: state.user.activitiesNextHref,
    followers: state.user.followers,
    followersNextHref: state.user.followersNextHref,
    favorites: state.user.favorites,
    favoritesNextHref: state.user.favoritesNextHref,
    requestsInProcess: state.request
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
  followers: React.PropTypes.array,
  followersNextHref: React.PropTypes.string,
  favorites: React.PropTypes.array
};
