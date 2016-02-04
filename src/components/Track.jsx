import React from 'react';
import {getTrackIcon} from '../utils/track';

export default class Track extends React.Component {

  renderImage(artwork_url, title, avatar_url) {
    return <img src={artwork_url || avatar_url} alt={title}/>;
  }

  renderTrack() {
    const { activity } = this.props;
    const { origin, type } = activity;

    if (!origin) { return; }

    const { user, title, reposts_count, playback_count, likes_count, permalink_url, artwork_url } = origin;
    const { avatar_url, username } = user;
    const permalink_url_user = user.permalink_url;

    return (
      <div className='track'>
        <div className='track-img' onClick={() => this.props.activateTrack(activity)}>
          {this.renderImage(artwork_url, title, avatar_url)}
          <div className='track-img-overlay'><i className='fa fa-play'></i></div>
        </div>
        <div className='track-content'>
          <a href={permalink_url}><i className={getTrackIcon(type)}></i>&nbsp;{username} - {title}</a>
        </div>
      </div>);
  }

  render() {
    return <div>{this.renderTrack()}</div>;
  }

}