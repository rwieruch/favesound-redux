import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import { ButtonGhost } from '../../components/ButtonGhost';

function TrackActions({ activity, onOpenComments, onAddTrackToPlaylist }) {
  return (
    <div className="track-actions-list">
      <div className="track-actions-list-item">
        <ButtonGhost isSmall={true} onClick={onAddTrackToPlaylist}>
          <i className="fa fa-th-list" /> Add to Playlist
        </ButtonGhost>
      </div>
      <div className="track-actions-list-item">
        <ButtonGhost isSmall={true} onClick={onOpenComments}>
          <i className="fa fa-comment" /> Comment
        </ButtonGhost>
      </div>
    </div>
  );
}

function mapStateToProps(state, props) {
  return {
    activity: props.activity
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
  activity: React.PropTypes.object,
  onOpenComments: React.PropTypes.func,
  onAddTrackToPlaylist: React.PropTypes.func,
};

const TrackActionsContainer = connect(mapStateToProps, mapDispatchToProps)(TrackActions);

export {
  TrackActions,
  TrackActionsContainer
};
