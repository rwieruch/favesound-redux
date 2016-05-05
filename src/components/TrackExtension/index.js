import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import { CommentExtensionContainer } from '../../components/CommentExtension';

function TrackExtension({ activity, isOpenComment }) {
    if (isOpenComment) {
        return <CommentExtensionContainer activity={activity} />;
    }

    return <noscript />;
}

function mapStateToProps(state, props) {
  const { activity } = props;
  return {
    activity: activity,
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

const TrackExtensionContainer = connect(mapStateToProps, mapDispatchToProps)(TrackExtension);

export {
  TrackExtension,
  TrackExtensionContainer
};
