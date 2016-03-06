import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as toggleTypes from '../constants/toggleTypes';
import * as requestTypes from '../constants/requestTypes';
import * as paginateLinkTypes from '../constants/paginateLinkTypes';
import { HeaderContainer } from '../containers/HeaderContainer';
import { PlayerContainer } from '../containers/PlayerContainer';
import { PlaylistContainer } from '../containers/PlaylistContainer';
import { ItemList } from '../components/ItemList';
import Activities from '../components/Activities';

export class Dashboard extends React.Component {

  getInnerContent() {
    const {
      currentUser,
      activities,
      fetchActivities,
      followings,
      fetchFollowings,
      followers,
      fetchFollowers,
      favorites,
      fetchFavorites,
      requestsInProcess,
      paginateLinks,
      userEntities,
      trackEntities,
      toggle,
      setToggle
    } = this.props;

    if (!currentUser) {
      return <div></div>;
    }

    return (
      <div className="dashboard-content">
        <div className="dashboard-content-main">
          <Activities
            requestInProcess={requestsInProcess[requestTypes.ACTIVITIES]}
            entities={trackEntities}
            ids={activities}
            scrollFunction={() => fetchActivities(null, paginateLinks[paginateLinkTypes.ACTIVITIES])}
          />
        </div>
        <div className="dashboard-content-side">
          <ItemList
            title="Followings"
            ids={followings}
            entities={userEntities}
            nextHref={paginateLinks[paginateLinkTypes.FOLLOWINGS]}
            requestInProcess={requestsInProcess[requestTypes.FOLLOWINGS]}
            isExpanded={toggle[toggleTypes.FOLLOWINGS]}
            toggleMore={() => setToggle(toggleTypes.FOLLOWINGS)}
            currentUser={currentUser}
            fetchMore={() => fetchFollowings(currentUser, paginateLinks[paginateLinkTypes.FOLLOWINGS])}
            kind="USER"
          />
          <ItemList
            title="Followers"
            ids={followers}
            entities={userEntities}
            nextHref={paginateLinks[paginateLinkTypes.FOLLOWERS]}
            requestInProcess={requestsInProcess[requestTypes.FOLLOWERS]}
            isExpanded={toggle[toggleTypes.FOLLOWERS]}
            toggleMore={() => setToggle(toggleTypes.FOLLOWERS)}
            currentUser={currentUser}
            fetchMore={() => fetchFollowers(currentUser, paginateLinks[paginateLinkTypes.FOLLOWERS])}
            kind="USER"
          />
          <ItemList
            title="Favorites"
            ids={favorites}
            entities={trackEntities}
            nextHref={paginateLinks[paginateLinkTypes.FAVORITES]}
            requestInProcess={requestsInProcess[requestTypes.FAVORITES]}
            isExpanded={toggle[toggleTypes.FAVORITES]}
            toggleMore={() => setToggle(toggleTypes.FAVORITES)}
            currentUser={currentUser}
            fetchMore={() => fetchFavorites(currentUser, paginateLinks[paginateLinkTypes.FAVORITES])}
            kind="TRACK"
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="dashboard">
        <HeaderContainer genre={this.props.genre} pathname={this.props.pathname}/>
        {this.getInnerContent()}
        <PlaylistContainer />
        <PlayerContainer />
      </div>
    );
  }

}

function mapStateToProps(state, routerState) {
  return {
    pathname: routerState.location.pathname,
    genre: routerState.location.query.genre,
    currentUser: state.session.user,
    activeTrackId: state.player.activeTrackId,
    isPlaying: state.player.isPlaying,
    userEntities: state.entities.users,
    trackEntities: state.entities.tracks,
    followings: state.user.followings,
    activities: state.user.activities,
    followers: state.user.followers,
    favorites: state.user.favorites,
    requestsInProcess: state.request,
    paginateLinks: state.paginate,
    toggle: state.toggle
  };
}

export const DashboardContainer = connect(mapStateToProps, actions)(Dashboard);

Dashboard.propTypes = {
  pathname: React.PropTypes.string.isRequired,
  genre: React.PropTypes.string,
  currentUser: React.PropTypes.object,
  activeTrackId: React.PropTypes.number,
  isPlaying: React.PropTypes.bool.isRequired,
  followings: React.PropTypes.array,
  activities: React.PropTypes.array,
  followers: React.PropTypes.array,
  favorites: React.PropTypes.array,
  userEntities: React.PropTypes.object,
  trackEntities: React.PropTypes.object,
  toggle: React.PropTypes.object
};
