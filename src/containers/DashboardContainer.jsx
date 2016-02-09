import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { dehydrate } from '../utils/immutableUtil';
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

    const activitiesD = dehydrate(activities);

    if (!currentUser) {
      return <div></div>;
    }

    return (<div className="dashboard-content">
      <div className="dashboard-content-main">
        <Activities
          {...this.props}
          activities={activitiesD}
          scrollFunction={() => this.fetchActivities()}
        />
      </div>
      <div className="dashboard-content-side">
        <ItemList
          title="Followings"
          list={followings}
          kind="user"
        />
        <ItemList
          title="Followers"
          list={followers}
          nextHref={followersNextHref}
          requestInProcess={followersRequestInProcess}
          currentUser={currentUser}
          fetchMore={fetchFollowers}
          kind="user"
        />
        <ItemList
          title="Favorites"
          list={favorites}
          requestInProcess={favoritesRequestInProcess}
          currentUser={currentUser}
          kind="track"
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
    currentUser: state.session.get('user'),
    activeTrack: state.player.get('activeTrack'),
    isPlaying: state.player.get('isPlaying'),
    followings: state.user.get('followings'),
    activities: state.user.get('activities'),
    activitiesNextHref: state.user.get('activitiesNextHref'),
    activitiesRequestInProcess: state.user.get('activitiesRequestInProcess'),
    followers: state.user.get('followers'),
    followersNextHref: state.user.get('followersNextHref'),
    followersRequestInProcess: state.user.get('followersRequestInProcess'),
    favorites: state.user.get('favorites'),
    favoritesRequestInProcess: state.user.get('favoritesRequestInProcess')
  };
}

export const DashboardContainer = connect(mapStateToProps, actions)(Dashboard);

Dashboard.propTypes = {
  pathname: React.PropTypes.string.isRequired,
  genre: React.PropTypes.string,
  currentUser: React.PropTypes.object,
  activeTrack: React.PropTypes.object,
  isPlaying: React.PropTypes.bool.isRequired,
  followings: ImmutablePropTypes.list.isRequired,
  activities: ImmutablePropTypes.list.isRequired,
  activitiesNextHref: React.PropTypes.string,
  activitiesRequestInProcess: React.PropTypes.bool.isRequired,
  followers: ImmutablePropTypes.list.isRequired,
  followersNextHref: React.PropTypes.string,
  followersRequestInProcess: React.PropTypes.bool.isRequired,
  favorites: ImmutablePropTypes.list.isRequired,
  favoritesRequestInProcess: React.PropTypes.bool.isRequired
};
