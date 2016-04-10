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
  activateTrack,
  addTrackToPlaylist
}) {
  const { avatar_url, username } = userEntities[activity.user];
  const { playback_count, favoritings_count, comment_count } = activity;

  const isVisible = isSameTrack(activeTrackId)(activity.id);
  const trackIsPlaying = isSameTrackAndPlaying(activeTrackId, activity.id, isPlaying);
  const linkText = username + ' - ' + activity.title;

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
        <Permalink link={activity.permalink_url} text={linkText} />
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
  activateTrack: React.PropTypes.func,
  addTrackToPlaylist: React.PropTypes.func
};

export {
  TrackPreview
};
