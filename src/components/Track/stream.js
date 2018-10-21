import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import * as sortTypes from '../../constants/sortTypes';
import * as dateSortTypes from '../../constants/dateSortTypes';
import * as filterTypes from '../../constants/filterTypes';
import WaveformSc from '../../components/WaveformSc';
import TrackActions from '../../components/TrackActions';
import Artwork from '../../components/Artwork';
import ArtworkAction from '../../components/ArtworkAction';
import Permalink from '../../components/Permalink';
import InfoList from '../../components/InfoList';
import { durationFormat, fromNow } from '../../services/track';
import { getPluralizedWithCount } from '../../services/pluralize';
import { isSameTrackAndPlaying, isSameTrack } from '../../services/player';
import * as attributes from "../../constants/trackAttributes";

function Duration({ duration, isActive }) {
  const durationClass = classNames({
    'active-duration-filter': isActive
  });

  return (
    <span className={durationClass}>
      {durationFormat(duration)}
    </span>
  );
}

function Created({ created_at, isActive }) {
  const durationClass = classNames({
    'active-duration-filter': isActive
  });

  return (
    <span className={durationClass}>
     {fromNow(created_at)}
    </span>
  );
}

function TrackStream({
  activity,
  activeTrackId,
  isPlaying,
  userEntities,
  typeReposts,
  typeTracks,
  activeSortType,
  activeDateSortType,
  activeDurationFilterType,
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
      count: playback_count,
      activeSort: activeSortType === sortTypes.SORT_PLAYS,
      title: attributes.PLAYBACK
    },
    {
      className: 'fa fa-heart',
      count: likes_count,
      activeSort: activeSortType === sortTypes.SORT_FAVORITES,
      title: attributes.LIKES
    },
    {
      className: 'fa fa-retweet',
      count: reposts_count,
      activeSort: activeSortType === sortTypes.SORT_REPOSTS,
      title: attributes.REPOST
    },
    {
      className: 'fa fa-comment',
      count: comment_count,
      title: attributes.COMMENTS
    },
    {
      className: 'fa fa-download',
      count: download_count,
      title: attributes.DOWNLOADS
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
            <TrackIcon trackCount={typeTracks[activity.id]} />
            <RepostIcon repostCount={typeReposts[activity.id]} />
            <Permalink link={userEntity.permalink_url} text={username} openInNewTab />
              &nbsp;&#8209;&nbsp;
            <Permalink link={permalink_url} text={title} openInNewTab />
          </div>
          <div>
            <Duration
              duration={duration}
              isActive={activeDurationFilterType !== filterTypes.ALL}
            /> /
            <Created
              created_at={created_at}
              isActive={activeDateSortType !== dateSortTypes.NONE}
            />
            </div>
        </div>
        <div className="track-content-footer">
          <div>
            <InfoList information={information} />
          </div>
          <div className="track-content-footer-actions">
            <TrackActions activity={activity} />
          </div>
        </div>
      </div>
      <div className="track-waveform">
        <WaveformSc activity={activity} />
      </div>
    </div>
  );
}

function TrackIcon({ trackCount }) {
  const title = 'Released by ' + getPluralizedWithCount(trackCount, 'guy') + '.';
  return trackCount ? <span title={title}><i className="fa fa-play" /> </span> : null;
}

function RepostIcon({ repostCount }) {
  const title = 'Reposted by ' + getPluralizedWithCount(repostCount, 'guy') + '.';
  return repostCount ? <span title={title}><i className="fa fa-retweet" /> </span> : null;
}

TrackStream.propTypes = {
  userEntities: PropTypes.object,
  typeReposts: PropTypes.object,
  typeTracks: PropTypes.object,
  activity: PropTypes.object,
  isPlaying: PropTypes.bool,
  activeTrackId: PropTypes.number,
  activeSortType: PropTypes.string,
  activeDateSortType: PropTypes.string,
  activeDurationFilterType: PropTypes.string,
  onActivateTrack: PropTypes.func,
};

export {
  TrackStream
};
