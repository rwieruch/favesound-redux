import React from 'react';
import ReactDOM from 'react-dom';
import {addAccessTokenWith} from '../utils/soundcloudApi';

export default class Footer extends React.Component {

  componentDidUpdate() {

    let audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    const { isPlaying } = this.props;
    isPlaying ? audioElement.play() : audioElement.pause();
  }

  togglePlay() {
    let { togglePlayTrack, isPlaying } = this.props;

    isPlaying ? togglePlayTrack(!isPlaying) : togglePlayTrack(!isPlaying);
  }

  renderNav() {

    const { activeTrack, isPlaying, isOpenPlaylist } = this.props;

    if (!activeTrack) { return; }

    const { origin } = activeTrack;
    const { user, title, stream_url } = origin;
    const { username } = user;

    return (
      <div className='player-content'>
        <div>
          <i className='fa fa-step-backward'></i>
        </div>
        <div>
          <i className={'fa ' + (isPlaying ? 'fa-pause' : 'fa-play')} onClick={() => this.togglePlay()}></i>
        </div>
        <div>
          <i className='fa fa-step-forward'></i>
        </div>
        <div>
          {username} - {title}
        </div>
        <div>
          <i className='fa fa-th-list' onClick={() => this.props.togglePlaylist(isOpenPlaylist)}></i>
        </div>
        <audio id='audio' ref='audio' src={addAccessTokenWith(stream_url, '?')}></audio>
      </div>
    );
  }

  render() {
    return <div className={this.props.activeTrack ? 'player player-visible' : 'player'}>{this.renderNav()}</div>;
  }

}