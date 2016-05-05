import React from 'react';
import { Artwork } from '../../components/Artwork';
import { Permalink } from '../../components/Permalink';
import { InfoList } from '../../components/InfoList';
import { Actions } from '../../components/HoverActions';
import { isSameTrackAndPlaying, isSameTrack } from '../../services/player';

function TrackPreview({
  activity,
  isPlaying,
  activeTrackId,
  userEntities,
  onActivateTrack,
  onAddTrackToPlaylist
}) {
  const { avatar_url, username } = userEntities[activity.user];
  const { playback_count, favoritings_count, comment_count, permalink_url, artwork_url } = activity;

  const isVisible = isSameTrack(activeTrackId)(activity.id);
  const trackIsPlaying = isSameTrackAndPlaying(activeTrackId, activity.id, isPlaying);

  const configuration = [
    {
      className: trackIsPlaying ? 'fa fa-pause' : 'fa fa-play',
      fn: () => onActivateTrack(activity.id),
    },
    {
      className: 'fa fa-th-list',
      fn: () => onAddTrackToPlaylist(activity)
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
        <Artwork image={artwork_url} title={activity.title} optionalImage={avatar_url} size={40} />
      </div>
      <div className="item-content">
        <Permalink link={permalink_url} text={username + ' - ' + activity.title} />
        <InfoList information={information} />
        <Actions configuration={configuration} isVisible={isVisible} />
      </div>
    </div>
  );
}

TrackPreview.propTypes = {
  userEntities: React.PropTypes.object,
  activity: React.PropTypes.object,
  isPlaying: React.PropTypes.bool,
  activeTrackId: React.PropTypes.number,
  onActivateTrack: React.PropTypes.func,
  onAddTrackToPlaylist: React.PropTypes.func
};

export {
  TrackPreview
};
