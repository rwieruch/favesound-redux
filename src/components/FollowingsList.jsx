import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import * as toggleTypes from '../constants/toggleTypes';
import * as requestTypes from '../constants/requestTypes';
import * as paginateLinkTypes from '../constants/paginateLinkTypes';
import { List } from '../components/List';

function FollowingsList({
  currentUser,
  userEntities,
  followings,
  nextHref,
  requestInProcess,
  isExpanded,
  setToggle,
  fetchFollowings
}) {
  return (
    <List
      title="Followings"
      ids={followings}
      entities={userEntities}
      nextHref={nextHref}
      requestInProcess={requestInProcess}
      isExpanded={isExpanded}
      toggleMore={() => setToggle(toggleTypes.FOLLOWINGS)}
      currentUser={currentUser}
      fetchMore={() => fetchFollowings(currentUser, nextHref)}
      kind="USER"
    />
  );
}

function mapStateToProps(state) {
  const nextHref = state.paginate[paginateLinkTypes.FOLLOWERS];
  const requestInProcess = state.paginate[requestTypes.FOLLOWERS];
  const isExpanded = state.toggle[toggleTypes.FOLLOWERS];

  return {
    currentUser: state.session.user,
    userEntities: state.entities.users,
    followings: state.user.followings,
    nextHref,
    requestInProcess,
    isExpanded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setToggle: bindActionCreators(actions.setToggle, dispatch),
    fetchFollowings: bindActionCreators(actions.fetchFollowings, dispatch)
  };
}

FollowingsList.propTypes = {
  currentUser: React.PropTypes.object,
  userEntities: React.PropTypes.object,
  followings: React.PropTypes.array,
  requestsInProcess: React.PropTypes.object,
  paginateLinks: React.PropTypes.object,
  toggle: React.PropTypes.object,
  setToggle: React.PropTypes.func,
  fetchFollowings: React.PropTypes.func
};

const FollowingsListContainer = connect(mapStateToProps, mapDispatchToProps)(FollowingsList);

export {
  FollowingsList,
  FollowingsListContainer
};
