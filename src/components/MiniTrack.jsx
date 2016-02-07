import React from 'react';
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player';

export default class MiniTrack extends React.Component {

  activateTrack(activity, activateTrack) {
    activateTrack(activity);
  }

  removeTrackFromPlaylist(activity, removeTrackFromPlaylist) {
    removeTrackFromPlaylist(activity);
  }

  renderImage(artwork_url, title, avatar_url) {
    return <img src={artwork_url || avatar_url} alt={title} height="40" width="40"/>;
  }

  renderTrack() {
    const { activity, activeTrack, activateTrack, removeTrackFromPlaylist, isPlaying } = this.props;
    const { origin } = activity;

    if (!origin) { return; }

    const { user, title, permalink_url, artwork_url } = origin;
    const { avatar_url, username } = user;

    const trackIsPlaying = isSameTrackAndPlaying(activeTrack, activity, isPlaying);
    const trackIsSame = isSameTrack(activeTrack)(activity);

    return (
      <div className={"mini-track " + (trackIsSame ? "active-track" : "")}>
        <div className="mini-track-img">
          {this.renderImage(artwork_url, title, avatar_url)}
        </div>
        <div className="mini-track-content">
          <a href={permalink_url}>{username} - {title}</a>
          <div className="mini-track-content-action">
            <div className="mini-track-content-action-item">
              <i
                className={"fa " + (trackIsPlaying ? "fa-pause" : "fa-play")}
                onClick={this.activateTrack.bind(this, activity, activateTrack)}
              ></i>
            </div>
            <div className="mini-track-content-action-item">
              <i
                className="fa fa-times"
                onClick={this.removeTrackFromPlaylist.bind(this, activity, removeTrackFromPlaylist)}
              ></i>
            </div>
          </div>
        </div>
      </div>);
  }

  render() {
    return <div>{this.renderTrack()}</div>;
  }

}
