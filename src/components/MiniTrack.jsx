import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import { Artwork } from '../components/Artwork';
import { Permalink } from '../components/Permalink';
import { Actions } from '../components/Actions';
import { isSameTrackAndPlaying, isSameTrack } from '../services/player';

const renderActions = (activity, activeTrackId, activateTrack, removeTrackFromPlaylist, isPlaying) => {
  const trackIsPlaying = isSameTrackAndPlaying(activeTrackId, activity.id, isPlaying);
  const isVisible = isSameTrack(activeTrackId)(activity.id);

  const configuration = [
    {
      className: trackIsPlaying ? 'fa fa-pause' : 'fa fa-play',
      fn: () => activateTrack(activity.id),
    },
    {
      className: 'fa fa-times',
      fn: () => removeTrackFromPlaylist(activity)
    }
  ];

  return <Actions configuration={configuration} isVisible={isVisible} />;
};

const MiniTrack = ({ activity, userEntities, activeTrackId, isPlaying, activateTrack, removeTrackFromPlaylist }) => {
  if (!activity) {
    return;
  }

  const { user, title, permalink_url, artwork_url } = activity;
  const { avatar_url, username } = userEntities[user];
  const linkText = username + ' - ' + title;

  return (
    <div className="mini-track">
      <div>
        <Artwork image={artwork_url} title={title} optionalImage={avatar_url} size={40} />
      </div>
      <div className="mini-track-content">
        <Permalink link={permalink_url} text={linkText} />
      </div>
      {renderActions(activity, activeTrackId, activateTrack, removeTrackFromPlaylist, isPlaying)}
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    activity: ownProps.activity,
    userEntities: state.entities.users,
    isPlaying: state.player.isPlaying,
    activeTrackId: state.player.activeTrackId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    activateTrack: bindActionCreators(actions.activateTrack, dispatch),
    removeTrackFromPlaylist: bindActionCreators(actions.removeTrackFromPlaylist, dispatch)
  };
}

export const MiniTrackContainer = connect(mapStateToProps, mapDispatchToProps)(MiniTrack);
