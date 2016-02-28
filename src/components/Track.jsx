/* eslint-disable max-len */
import React from 'react';
import Waveform from 'waveform.js';
import { normalizeSamples, isJsonWaveform, isPngWaveform, durationFormat, fromNow } from '../utils/track';
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player';
/* eslint-enable max-len */

export default class Track extends React.Component {

  componentDidMount() {
    const { activity, idx } = this.props;

    if (!activity) { return; }

    const { waveform_url, id } = activity;

    if (!waveform_url) { return; }

    const elementId = this.generateElementId(id, idx);

    if (isJsonWaveform(waveform_url)) {
      this.fetchJsonWaveform(elementId, waveform_url);
    }

    if (isPngWaveform(waveform_url)) {
      this.fetchPngWaveform(elementId, activity);
    }
  }

  fetchJsonWaveform(elementId, waveformUrl) {
    fetch(waveformUrl)
      .then(response => response.json())
      .then((data) => {
        new Waveform({
          container: document.getElementById(elementId),
          innerColor: '#61B25A',
          data: normalizeSamples(data.samples)
        });
      });
  }

  fetchPngWaveform(elementId, activity) {
    const waveform = new Waveform({
      container: document.getElementById(elementId),
      innerColor: '#61B25A'
    });
    waveform.dataFromSoundCloudTrack(activity);
  }

  generateElementId(id, idx) {
    return `waveform-${id}${idx}`;
  }

  activateTrack(activity, activateTrack) {
    activateTrack(activity.id);
  }

  addTrackToPlaylist(activity, addTrackToPlaylist) {
    addTrackToPlaylist(activity);
  }

  renderWaveform(id, idx) {
    return <div className="track-content-waveform-json" id={"waveform-" + id + idx}></div>;
  }

  renderImage(artwork_url, title, avatar_url) {
    return <img src={artwork_url || avatar_url} alt={title} height="80" width="80"/>;
  }

  renderTrack() {
    const { activity, activeTrackId, activateTrack, addTrackToPlaylist, isPlaying, idx, userEntities } = this.props;

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
      created_at,
      id
    } = activity;

    const { avatar_url, username } = userEntities[user];
    const isVisible = isSameTrack(activeTrackId)(activity.id);

    return (
      <div className={"track " + (isVisible ? "track-visible" : "")}>
        <div className="track-img">
          {this.renderImage(artwork_url, title, avatar_url)}
        </div>
        <div className="track-content">
          <div className="track-content-name">
            <div><a href={user.permalink_url}>{username}</a></div>
            <div>{fromNow(created_at)}</div>
          </div>
          <div className="track-content-meta">
            <div><a href={permalink_url}>{title}</a></div>
            <div>{durationFormat(duration)}</div>
          </div>
          <div className="track-content-waveform">
            {this.renderWaveform(id, idx)}
          </div>
          <div className="track-content-info">
            <div className="track-content-info-item">
              <i className="fa fa-play"></i>&nbsp;{playback_count}
            </div>
            <div className="track-content-info-item">
              <i className="fa fa-heart"></i>&nbsp;{likes_count}
            </div>
            <div className="track-content-info-item">
              <i className="fa fa-retweet"></i>&nbsp;{reposts_count}
            </div>
            <div className="track-content-info-item">
              <i className="fa fa-comment"></i>&nbsp;{comment_count}
            </div>
            <div className="track-content-info-item">
              <i className="fa fa-download"></i>&nbsp;{download_count}
            </div>
          </div>
          <div className="track-content-actions">
            <div className="track-content-actions-item">
              <i
                className={"fa " + (isSameTrackAndPlaying(activeTrackId, activity.id, isPlaying) ? "fa-pause" : "fa-play")}
                onClick={this.activateTrack.bind(this, activity, activateTrack)}
              ></i>
            </div>
            <div className="track-content-actions-item">
              <i
                className="fa fa-th-list"
                onClick={this.addTrackToPlaylist.bind(this, activity, addTrackToPlaylist)}
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
