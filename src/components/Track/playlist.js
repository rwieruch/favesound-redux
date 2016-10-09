import React from 'react';
import Artwork from '../../components/Artwork';
import Permalink from '../../components/Permalink';
import Actions from '../../components/HoverActions';
import { isSameTrackAndPlaying, isSameTrack } from '../../services/player';

function TrackPlaylist({
  activity,
  userEntities,
  activeTrackId,
  isPlaying,
  onActivateTrack,
  onRemoveTrackFromPlaylist
}) {
  if (!activity) { return null; }

  const { user, title, permalink_url, artwork_url } = activity;
  const { avatar_url, username } = userEntities[user];

  const trackIsPlaying = isSameTrackAndPlaying(activeTrackId, activity.id, isPlaying);
  const isVisible = isSameTrack(activeTrackId)(activity.id);

  const configuration = [
    {
      className: trackIsPlaying ? 'fa fa-pause' : 'fa fa-play',
      fn: () => onActivateTrack(activity.id),
    },
    {
      className: 'fa fa-times',
      fn: () => onRemoveTrackFromPlaylist(activity)
    }
  ];

  return (
    <div className="playlist-track">
      <div>
        <Artwork image={artwork_url} title={title} optionalImage={avatar_url} size={40} />
      </div>
      <div className="playlist-track-content">
        <Permalink link={permalink_url} text={username + ' - ' + title} />
        <Actions configuration={configuration} isVisible={isVisible} />
      </div>
    </div>
  );
}

TrackPlaylist.propTypes = {
  activity: React.PropTypes.object,
  userEntities: React.PropTypes.object,
  isPlaying: React.PropTypes.bool,
  activeTrackId: React.PropTypes.number,
  onActivateTrack: React.PropTypes.func,
  onRemoveTrackFromPlaylist: React.PropTypes.func
};

export {
  TrackPlaylist
};
