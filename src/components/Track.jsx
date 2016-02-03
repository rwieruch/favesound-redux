import React from 'react';

export default class Track extends React.Component {

  renderImage(artwork_url, title, avatar_url) {
    return (
      <div>
        <img src={artwork_url || avatar_url}
          alt={title}/>
      </div>);
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
        <div>
          {this.renderImage(artwork_url, title, avatar_url)}
        </div>
        <div className='track-content'>
          <a href={permalink_url}>{username} - {title}</a>
        </div>
      </div>);
  }

  render() {
    return <div>{this.renderTrack()}</div>;
  }

}