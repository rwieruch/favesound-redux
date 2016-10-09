import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import CommentExtension from '../../components/CommentExtension';

function TrackExtension({ activity, isOpenComment }) {
  return isOpenComment ? <CommentExtension activity={activity} /> : null;
}

function mapStateToProps(state, props) {
  const { activity } = props;
  return {
    activity,
    isOpenComment: state.comment.openComments[activity.id]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openComments: bindActionCreators(actions.openComments, dispatch),
  };
}

TrackExtension.propTypes = {
  activity: React.PropTypes.object,
  openComments: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackExtension);
