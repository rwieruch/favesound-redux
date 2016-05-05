import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';

function TrackActions({ activity, onOpenComments, onAddTrackToPlaylist }) {
  return (
    <div className="track-actions-list">
      <div className="track-actions-list-item">
        <button className="ghost small" type="button" onClick={() => onOpenComments()}>
          <i className="fa fa-comment" /> Comment
        </button>
      </div>
      <div className="track-actions-list-item">
        <button className="ghost small" type="button" onClick={() => onAddTrackToPlaylist()}>
          <i className="fa fa-th-list" /> Add to Playlist
        </button>
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

function mapDispatchToProps(dispatch, props) {

    const { activity } = props;
    return {
        onOpenComments: () => bindActionCreators(actions.openComments, dispatch)(activity.id),
        onAddTrackToPlaylist: () => bindActionCreators(actions.addTrackToPlaylist, dispatch)(activity),
    };
}

TrackActions.propTypes = {
    onOpenComments: React.PropTypes.func,
    onAddTrackToPlaylist: React.PropTypes.func,
};

const TrackActionsContainer = connect(mapStateToProps, mapDispatchToProps)(TrackActions);

export {
    TrackActions,
    TrackActionsContainer
};