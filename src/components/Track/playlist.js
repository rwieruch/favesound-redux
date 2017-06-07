import PropTypes from 'prop-types';
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
  const userPermalinkUrl = userEntities[user].permalink_url;

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
        <Permalink link={permalink_url} text={title} title={title}/>
        <Permalink link={userPermalinkUrl} text={'by: ' + username} title={username}/>
        <Actions configuration={configuration} isVisible={isVisible} />
      </div>
    </div>
  );
}

TrackPlaylist.propTypes = {
  activity: PropTypes.object,
  userEntities: PropTypes.object,
  isPlaying: PropTypes.bool,
  activeTrackId: PropTypes.number,
  onActivateTrack: PropTypes.func,
  onRemoveTrackFromPlaylist: PropTypes.func
};

export {
  TrackPlaylist
};
