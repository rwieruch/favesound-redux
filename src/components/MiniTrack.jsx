import React from 'react';
import {isSameTrackAndPlaying, isSameTrack} from '../utils/player';

export default class MiniTrack extends React.Component {

  renderImage(artwork_url, title, avatar_url) {
    return <img src={artwork_url || avatar_url} alt={title} height='40' width='40'/>;
  }

  renderTrack() {
    const { activity, activeTrack, isPlaying } = this.props;
    const { origin, type } = activity;

    if (!origin) { return; }

    const { user, title, reposts_count, playback_count, likes_count, permalink_url, artwork_url } = origin;
    const { avatar_url, username } = user;
    const permalink_url_user = user.permalink_url;

    const trackIsPlaying = isSameTrackAndPlaying(activeTrack, activity, isPlaying);
    const trackIsSame = isSameTrack.bind(activeTrack)(activity);

    return (
      <div className={'mini-track ' + (trackIsSame ? 'active-track' : '' )}>
        <div className='mini-track-img'>
          {this.renderImage(artwork_url, title, avatar_url)}
        </div>
        <div className='mini-track-content'>
          <a href={permalink_url}>{username} - {title}</a>
        </div>
        <div className='mini-track-action'>
          <i
            className={'fa ' + (trackIsPlaying ? 'fa-pause' : 'fa-play')}
            onClick={() => this.props.activateTrack(activity)}>
          </i>
        </div>
        <div className='mini-track-action'>
          <i
            className='fa fa-times'
            onClick={() => this.props.removeTrackFromPlaylist(activity)}>
          </i>
        </div>
      </div>);
  }

  render() {
    return <div>{this.renderTrack()}</div>;
  }

}