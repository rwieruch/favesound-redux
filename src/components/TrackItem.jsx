import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import { Artwork } from '../components/Artwork';
import { InfoList } from '../components/InfoList';
import { Actions } from '../components/Actions';
import { isSameTrackAndPlaying, isSameTrack } from '../services/player';

const TrackItem = ({ activity, isPlaying, activeTrackId, userEntities, activateTrack, addTrackToPlaylist }) => {
  const { avatar_url, username } = userEntities[activity.user];
  const { playback_count, favoritings_count, comment_count } = activity;

  const isVisible = isSameTrack(activeTrackId)(activity.id);
  const trackIsPlaying = isSameTrackAndPlaying(activeTrackId, activity.id, isPlaying);

  const configuration = [
    {
      className: trackIsPlaying ? 'fa fa-pause' : 'fa fa-play',
      fn: () => activateTrack(activity.id),
    },
    {
      className: 'fa fa-th-list',
      fn: () => addTrackToPlaylist(activity)
    }
  ];

  const information = [
    {
      className: 'fa fa-play',
      count: playback_count
    },
    {
      className: 'fa fa-heart',
      count: favoritings_count
    },
    {
      className: 'fa fa-comment',
      count: comment_count
    }
  ];

  return (
    <div className="item">
      <div>
        <Artwork image={activity.artwork_url} title={activity.title} optionalImage={avatar_url} size={40} />
      </div>
      <div className="item-content">
        <div className="item-content-name">
          <a href={activity.permalink_url}>
            {username} - {activity.title}
          </a>
        </div>
        <InfoList information={information} />
        <Actions configuration={configuration} isVisible={isVisible} />
      </div>
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
    addTrackToPlaylist: bindActionCreators(actions.addTrackToPlaylist, dispatch)
  };
}

export const TrackItemContainer = connect(mapStateToProps, mapDispatchToProps)(TrackItem);
