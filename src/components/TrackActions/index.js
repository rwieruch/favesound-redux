import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';

function TrackActions({ activity, isOpen, openComments }) {
  const onOpenComments = () => openComments(activity.id);

  return (
    <div className="track-actions-list">
      <div className="track-actions-list-item">
        <button className="ghost small" type="button" onClick={onOpenComments}>Comment</button>
      </div>
    </div>
  );
}

function mapStateToProps(state, props) {
    const { activity } = props;

    return {
        activity,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openComments: bindActionCreators(actions.openComments, dispatch),
    };
}

TrackActions.propTypes = {
    openComments: React.PropTypes.func,
};

const TrackActionsContainer = connect(mapStateToProps, mapDispatchToProps)(TrackActions);

export {
    TrackActions,
    TrackActionsContainer
};