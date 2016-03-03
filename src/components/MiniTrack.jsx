import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Actions } from '../components/Actions';
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player';

const renderImage = (artwork_url, title, avatar_url) => {
  return <img src={artwork_url || avatar_url} alt={title} height="40" width="40"/>;
}

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
}

const MiniTrack = ({ activity, userEntities, activeTrackId, activateTrack, removeTrackFromPlaylist, isPlaying }) => {

  if (!activity) {
    return;
  }

  const { user, title, permalink_url, artwork_url } = activity;
  const { avatar_url, username } = userEntities[user];

  return (
    <div className="mini-track">
      <div className="mini-track-img">
        {renderImage(artwork_url, title, avatar_url)}
      </div>
      <div className="mini-track-content">
        <div className="mini-track-content-name">
          <a href={permalink_url}>{username} - {title}</a>
        </div>
        {renderActions(activity, activeTrackId, activateTrack, removeTrackFromPlaylist, isPlaying)}
      </div>
    </div>
  );

}

function mapStateToProps(state, ownProps) {
  return {
    activity: ownProps.activity,
    userEntities: state.entities.users,
    isPlaying: state.player.isPlaying,
    activeTrackId: state.player.activeTrackId
  };
}

export const MiniTrackContainer = connect(mapStateToProps, actions)(MiniTrack);
