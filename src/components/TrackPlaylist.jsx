import React from 'react';
import { Artwork } from '../components/Artwork';
import { Permalink } from '../components/Permalink';
import { Actions } from '../components/Actions';
import { isSameTrackAndPlaying, isSameTrack } from '../services/player';

function ActionsWrapper({ activity, activeTrackId, activateTrack, removeTrackFromPlaylist, isPlaying }) {
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

function TrackPlaylist({ activity, userEntities, activeTrackId, isPlaying, activateTrack, removeTrackFromPlaylist }) {
  if (!activity) {
    return <span></span>;
  }

  const { user, title, permalink_url, artwork_url } = activity;
  const { avatar_url, username } = userEntities[user];
  const linkText = username + ' - ' + title;
  const actionsWrapperProps = { activity, activeTrackId, activateTrack, removeTrackFromPlaylist, isPlaying };

  return (
    <div className="playlist-track">
      <div>
        <Artwork image={artwork_url} title={title} optionalImage={avatar_url} size={40} />
      </div>
      <div className="playlist-track-content">
        <Permalink link={permalink_url} text={linkText} />
        <ActionsWrapper { ...actionsWrapperProps } />
      </div>
    </div>
  );
}

TrackPlaylist.propTypes = {
  activity: React.PropTypes.object,
  userEntities: React.PropTypes.object,
  isPlaying: React.PropTypes.bool,
  activeTrackId: React.PropTypes.number,
  activateTrack: React.PropTypes.func,
  removeTrackFromPlaylist: React.PropTypes.func
};

export {
  TrackPlaylist
};
