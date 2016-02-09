import React from 'react';
import Waveform from 'waveform.js';
import { getTrackIcon, isNoTrack, normalizeSamples, isJsonWaveform, isPngWaveform } from '../utils/track';
import { isSameTrackAndPlaying } from '../utils/player';

export default class Track extends React.Component {

  componentDidMount() {
    const { activity, idx } = this.props;
    const { origin } = activity;

    if (!origin) { return; }

    const { waveform_url, id } = origin;

    if (!waveform_url) { return; }

    if (isJsonWaveform(waveform_url)) {
      this.fetchJsonWaveform(id, idx, waveform_url);
    }
  }

  fetchJsonWaveform(id, idx, waveformUrl) {
    fetch(waveformUrl)
      .then(response => response.json())
      .then((data) => {
        const elementId = `waveform-${id}${idx}`;
        new Waveform({
          container: document.getElementById(elementId),
          innerColor: '#61B25A',
          data: normalizeSamples(data.samples)
        });
      });
  }

  activateTrack(activity, activateTrack) {
    activateTrack(activity);
  }

  addTrackToPlaylist(activity, addTrackToPlaylist) {
    addTrackToPlaylist(activity);
  }


  renderWaveform(id, idx, waveformUrl, title) {
    if (isJsonWaveform(waveformUrl)) {
      return <div className="track-content-waveform-json" id={"waveform-" + id + idx}></div>;
    }

    if (isPngWaveform(waveformUrl)) {
      return <img className="track-content-waveform-png" src={waveformUrl} alt={title} height="40" width="95%"/>;
    }

    return;
  }

  renderImage(artwork_url, title, avatar_url) {
    return <img src={artwork_url || avatar_url} alt={title} height="100" width="100"/>;
  }

  renderTrack() {
    const { activity, activeTrack, activateTrack, addTrackToPlaylist, isPlaying, idx } = this.props;
    const { origin, type } = activity;

    if (isNoTrack(activity)) { return; }

    const {
      user,
      title,
      reposts_count,
      playback_count,
      comment_count,
      download_count,
      likes_count,
      artwork_url,
      permalink_url,
      waveform_url,
      id
    } = origin;

    const { avatar_url, username } = user;

    return (
      <div className="track">
        <div className="track-img">
          {this.renderImage(artwork_url, title, avatar_url)}
        </div>
        <div className="track-content">
          <div className="track-content-name">
            <a href={permalink_url}><i className={getTrackIcon(type)}></i>&nbsp;{username} - {title} {type}</a>
          </div>
          <div className="track-content-waveform">
            {this.renderWaveform(id, idx, waveform_url, title)}
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
                className={"fa " + (isSameTrackAndPlaying(activeTrack, activity, isPlaying) ? "fa-pause" : "fa-play")}
                onClick={this.activateTrack.bind(this, activity, activateTrack)}
              ></i>
            </div>
            <div className="track-content-actions-item">
              <i
                className={"fa fa-th-list"}
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
