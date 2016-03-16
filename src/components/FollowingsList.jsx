import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import * as toggleTypes from '../constants/toggleTypes';
import * as requestTypes from '../constants/requestTypes';
import * as paginateLinkTypes from '../constants/paginateLinkTypes';
import { List } from '../components/List';

export const FollowingsList = ({
  currentUser,
  userEntities,
  followings,
  requestsInProcess,
  paginateLinks,
  toggle,
  setToggle,
  fetchFollowings
}) => {
  return (
    <List
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
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.session.user,
    userEntities: state.entities.users,
    followings: state.user.followings,
    requestsInProcess: state.request,
    paginateLinks: state.paginate,
    toggle: state.toggle
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setToggle: bindActionCreators(actions.setToggle, dispatch),
    fetchFollowings: bindActionCreators(actions.fetchFollowings, dispatch)
  };
}

export const FollowingsListContainer = connect(mapStateToProps, mapDispatchToProps)(FollowingsList);
