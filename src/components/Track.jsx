import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import { WaveformSc } from '../components/WaveformSc';
import { Artwork } from '../components/Artwork';
import { InfoList } from '../components/InfoList';
import { durationFormat, fromNow } from '../services/track';
import { isSameTrackAndPlaying, isSameTrack } from '../services/player';

const Track = ({ activity, activeTrackId, isPlaying, idx, userEntities, activateTrack, addTrackToPlaylist }) => {
  const {
    user,
    title,
    duration,
    reposts_count,
    playback_count,
    comment_count,
    download_count,
    likes_count,
    artwork_url,
    permalink_url,
    created_at
  } = activity;

  const { avatar_url, username } = userEntities[user];
  const isVisible = isSameTrack(activeTrackId)(activity.id);
  const isSameAndPlaying = isSameTrackAndPlaying(activeTrackId, activity.id, isPlaying);

  const information = [
    {
      className: 'fa fa-play',
      count: playback_count
    },
    {
      className: 'fa fa-heart',
      count: likes_count
    },
    {
      className: 'fa fa-retweet',
      count: reposts_count
    },
    {
      className: 'fa fa-comment',
      count: comment_count
    },
    {
      className: 'fa fa-download',
      count: download_count
    }
  ];

  return (
    <div className={"track " + (isVisible ? "track-visible" : "")}>
      <div>
        <Artwork image={artwork_url} title={title} optionalImage={avatar_url} size={80} />
      </div>
      <div className="track-content">
        <div className="track-content-name">
          <div><a href={user.permalink_url}>{username}</a></div>
          <div>{fromNow(created_at)}</div>
        </div>
        <div className="track-content-meta">
          <div><a href={permalink_url}>{title}</a></div>
          <div>{durationFormat(duration)}</div>
        </div>
        <div className="track-content-waveform">
          <WaveformSc activity={activity} idx={idx} />
        </div>
        <InfoList information={information} />
        <div className="track-content-actions">
          <div className="track-content-actions-item">
            <i
              className={"fa " + (isSameAndPlaying ? "fa-pause" : "fa-play")}
              onClick={activateTrack.bind(null, activity.id)}
            ></i>
          </div>
          <div className="track-content-actions-item">
            <i
              className="fa fa-th-list"
              onClick={addTrackToPlaylist.bind(null, activity)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    userEntities: state.entities.users,
    activity: ownProps.activity,
    isPlaying: state.player.isPlaying,
    activeTrackId: state.player.activeTrackId,
    idx: ownProps.idx
  };
}

function mapDispatchToProps(dispatch) {
  return {
    activateTrack: bindActionCreators(actions.activateTrack, dispatch),
    addTrackToPlaylist: bindActionCreators(actions.addTrackToPlaylist, dispatch)
  };
}

export const TrackContainer = connect(mapStateToProps, mapDispatchToProps)(Track);
