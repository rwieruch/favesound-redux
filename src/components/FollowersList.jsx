import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import * as toggleTypes from '../constants/toggleTypes';
import * as requestTypes from '../constants/requestTypes';
import * as paginateLinkTypes from '../constants/paginateLinkTypes';
import { List } from '../components/List';

export const FollowersList = ({
  currentUser,
  userEntities,
  followers,
  requestsInProcess,
  paginateLinks,
  toggle,
  setToggle,
  fetchFollowers
}) => {
  return (
    <List
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
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.session.user,
    userEntities: state.entities.users,
    followers: state.user.followers,
    requestsInProcess: state.request,
    paginateLinks: state.paginate,
    toggle: state.toggle
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setToggle: bindActionCreators(actions.setToggle, dispatch),
    fetchFollowers: bindActionCreators(actions.fetchFollowers, dispatch)
  };
}

export const FollowersListContainer = connect(mapStateToProps, mapDispatchToProps)(FollowersList);
