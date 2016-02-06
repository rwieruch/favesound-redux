import React from 'react';
import ReactDOM from 'react-dom';
import Waveform from 'waveform.js';
import {getTrackIcon, isNoTrack, normalizeSamples} from '../utils/track';
import {isSameTrackAndPlaying} from '../utils/player';

export default class Track extends React.Component {

  componentDidMount() {

    let { idx, activity } = this.props;
    let { origin } = activity;

    if (!origin) { return; }

    let { waveform_url, id } = origin;

    if (!waveform_url) { return; }

    fetch(waveform_url)
      .then(response => response.json())
      .then((data) => {
        var waveform = new Waveform({
          container: document.getElementById('waveform-' + id + idx),
          innerColor: '#61B25A',
          data: normalizeSamples(data.samples)
        });
      });

  }

  renderImage(artwork_url, title, avatar_url) {
    return <img src={artwork_url || avatar_url} alt={title} height='100' width='100'/>;
  }

  renderActions(isPlaying, activity, activeTrack) {

    const { origin } = activity;
    const { stream_url } = origin;

    if (!stream_url) { return; }

    return (
      <div className='track-actions'>
        <div className='track-actions-item'>
          <i
              className={'fa ' + (isSameTrackAndPlaying(activeTrack, activity, isPlaying) ? 'fa-pause' : 'fa-play')}
              onClick={() => this.props.activateTrack(activity)}>
          </i>
        </div>
        <div className='track-actions-item'>
          <i
              className={'fa fa-th-list'}
              onClick={() => this.props.addTrackToPlaylist(activity)}>
          </i>
        </div>
      </div>);
  }

  renderTrack() {
    const { activity, activeTrack, isPlaying, idx } = this.props;
    const { origin, type } = activity;

    if (isNoTrack(activity)) { return; }

    const { user, title, reposts_count, playback_count, comment_count, download_count, likes_count, permalink_url, artwork_url, stream_url, id } = origin;
    const { avatar_url, username } = user;
    const permalink_url_user = user.permalink_url;

    return (
      <div className='track'>
        <div className='track-img'>
          {this.renderImage(artwork_url, title, avatar_url)}
        </div>
        <div className='track-content'>
          <a href={permalink_url}><i className={getTrackIcon(type)}></i>&nbsp;{username} - {title} {type}</a>
          <div className='track-content-waveform' id={'waveform-' + id + idx}></div>
          <div className='track-content-info'>
            <div className='track-content-info-item'>
              <i className='fa fa-play'></i>&nbsp;{playback_count}
            </div>
            <div className='track-content-info-item'>
              <i className='fa fa-heart'></i>&nbsp;{likes_count}
            </div>
            <div className='track-content-info-item'>
              <i className='fa fa-retweet'></i>&nbsp;{reposts_count}
            </div>
            <div className='track-content-info-item'>
              <i className='fa fa-comment'></i>&nbsp;{comment_count}
            </div>
            <div className='track-content-info-item'>
              <i className='fa fa-download'></i>&nbsp;{download_count}
            </div>
          </div>
          <div className='track-content-actions'>
            <div className='track-content-actions-item'>
              <i
                  className={'fa ' + (isSameTrackAndPlaying(activeTrack, activity, isPlaying) ? 'fa-pause' : 'fa-play')}
                  onClick={() => this.props.activateTrack(activity)}>
              </i>
            </div>
            <div className='track-content-actions-item'>
              <i
                  className={'fa fa-th-list'}
                  onClick={() => this.props.addTrackToPlaylist(activity)}>
              </i>
            </div>
          </div>
        </div>
      </div>);
  }

  render() {
    return <div>{this.renderTrack()}</div>;
  }

}