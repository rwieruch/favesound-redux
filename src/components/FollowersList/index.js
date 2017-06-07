import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import List from '../../components/List';

function FollowersList({
  currentUser,
  userEntities,
  followers,
  nextHref,
  requestInProcess,
  isExpanded,
  onSetToggle,
  onFetchFollowers
}) {
  return (
    <List
      title="Followers"
      ids={followers}
      entities={userEntities}
      nextHref={nextHref}
      requestInProcess={requestInProcess}
      isExpanded={isExpanded}
      currentUser={currentUser}
      onToggleMore={() => onSetToggle(toggleTypes.FOLLOWERS)}
      onFetchMore={() => onFetchFollowers(currentUser, nextHref)}
      kind="USER"
    />
  );
}

function mapStateToProps(state) {
  const nextHref = state.paginate[paginateLinkTypes.FOLLOWERS];
  const requestInProcess = state.request[requestTypes.FOLLOWERS];
  const isExpanded = state.toggle[toggleTypes.FOLLOWERS];

  return {
    currentUser: state.session.user,
    userEntities: state.entities.users,
    followers: state.user.followers,
    nextHref,
    requestInProcess,
    isExpanded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSetToggle: bindActionCreators(actions.setToggle, dispatch),
    onFetchFollowers: bindActionCreators(actions.fetchFollowers, dispatch)
  };
}

FollowersList.propTypes = {
  currentUser: PropTypes.object,
  userEntities: PropTypes.object,
  followers: PropTypes.array,
  requestsInProcess: PropTypes.object,
  paginateLinks: PropTypes.object,
  toggle: PropTypes.object,
  onSetToggle: PropTypes.func,
  onFetchFollowers: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowersList);
export { FollowersList };
