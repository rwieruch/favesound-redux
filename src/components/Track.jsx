import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { WaveformSc } from '../components/WaveformSc';
import { durationFormat, fromNow } from '../utils/track';
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player';

const renderImage = (artwork_url, title, avatar_url) => {
  return <img src={artwork_url || avatar_url} alt={title} height="80" width="80"/>;
};

const Track = ({ activity, activeTrackId, activateTrack, addTrackToPlaylist, isPlaying, idx, userEntities }) => {
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

  return (
    <div className={"track " + (isVisible ? "track-visible" : "")}>
      <div className="track-img">
        {renderImage(artwork_url, title, avatar_url)}
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
        <div className="track-content-info">
          <div className="track-content-info-item">
            <i className="fa fa-play"></i>&nbsp;{playback_count}
          </div>
          <div className="track-content-info-item">
            <i className="fa fa-heart"></i>&nbsp;{likes_count}
          </div>
          <div className="track-content-info-item">
            <i className="fa fa-retweet"></i>&nbsp;{reposts_count}
          </div>
          <div className="track-content-info-item">
            <i className="fa fa-comment"></i>&nbsp;{comment_count}
          </div>
          <div className="track-content-info-item">
            <i className="fa fa-download"></i>&nbsp;{download_count}
          </div>
        </div>
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
    trackEntities: state.entities.tracks,
    userEntities: state.entities.users,
    activity: ownProps.activity,
    idx: ownProps.idx
  };
}

export const TrackContainer = connect(mapStateToProps, actions)(Track);
