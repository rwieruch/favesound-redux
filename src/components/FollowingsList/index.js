import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import List from '../../components/List';

function FollowingsList({
  currentUser,
  userEntities,
  followings,
  nextHref,
  requestInProcess,
  isExpanded,
  onSetToggle,
  onFetchFollowings
}) {
  return (
    <List
      title="Following"
      ids={followings}
      entities={userEntities}
      nextHref={nextHref}
      requestInProcess={requestInProcess}
      isExpanded={isExpanded}
      currentUser={currentUser}
      onToggleMore={() => onSetToggle(toggleTypes.FOLLOWINGS)}
      onFetchMore={() => onFetchFollowings(currentUser, nextHref)}
      kind="USER"
    />
  );
}

function mapStateToProps(state) {
  const nextHref = state.paginate[paginateLinkTypes.FOLLOWINGS];
  const requestInProcess = state.request[requestTypes.FOLLOWINGS];
  const isExpanded = state.toggle[toggleTypes.FOLLOWINGS];

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
    onSetToggle: bindActionCreators(actions.setToggle, dispatch),
    onFetchFollowings: bindActionCreators(actions.fetchFollowings, dispatch)
  };
}

FollowingsList.propTypes = {
  currentUser: React.PropTypes.object,
  userEntities: React.PropTypes.object,
  followings: React.PropTypes.array,
  requestsInProcess: React.PropTypes.object,
  paginateLinks: React.PropTypes.object,
  toggle: React.PropTypes.object,
  onSetToggle: React.PropTypes.func,
  onFetchFollowings: React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingsList);
export { FollowingsList };
