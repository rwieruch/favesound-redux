import React from 'react';
import classNames from 'classnames';
import { WaveformSc } from '../../components/WaveformSc';
import { TrackActionsContainer } from '../../components/TrackActions';
import { Artwork } from '../../components/Artwork';
import { ArtworkAction } from '../../components/ArtworkAction';
import { Permalink } from '../../components/Permalink';
import { InfoList } from '../../components/InfoList';
import { durationFormat, fromNow } from '../../services/track';
import { isSameTrackAndPlaying, isSameTrack } from '../../services/player';

function TrackStream({
  activity,
  activeTrackId,
  isPlaying,
  idx,
  userEntities,
  onActivateTrack,
}) {
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

  const userEntity = userEntities[user];
  const { avatar_url, username } = userEntity;

  const isVisible = isSameTrack(activeTrackId)(activity.id);
  const isSameAndPlaying = isSameTrackAndPlaying(activeTrackId, activity.id, isPlaying);

  const trackClass = classNames(
    'track',
    {
      'track-visible': isVisible
    }
  );

  const playClass = classNames(
    'fa',
    {
      'fa-pause': isSameAndPlaying,
      'fa-play': !isSameAndPlaying
    }
  );

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
    <div className={trackClass}>
      <div className="track-artwork">
        <ArtworkAction action={() => onActivateTrack(activity.id)} className={playClass} isVisible={isVisible}>
          <Artwork image={artwork_url} title={title} optionalImage={avatar_url} size={120} />
        </ArtworkAction>
      </div>
      <div className="track-content">
        <div className="track-content-header">
          <div>
            <Permalink link={userEntity.permalink_url} text={username} />&nbsp;-&nbsp;
            <Permalink link={permalink_url} text={title} />
          </div>
          <div>{durationFormat(duration)} / {fromNow(created_at)}</div>
        </div>
        <div className="track-content-footer">
          <div>
            <InfoList information={information} />
          </div>
          <div className="track-content-footer-actions">
            <TrackActionsContainer activity={activity} />
          </div>
        </div>
      </div>
      <div className="track-waveform">
        <WaveformSc activity={activity} idx={idx} />
      </div>
    </div>
  );
}

TrackStream.propTypes = {
  userEntities: React.PropTypes.object,
  activity: React.PropTypes.object,
  isPlaying: React.PropTypes.bool,
  activeTrackId: React.PropTypes.number,
  idx: React.PropTypes.number,
  onActivateTrack: React.PropTypes.func,
};

export {
  TrackStream
};
