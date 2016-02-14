import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { addAccessTokenWith } from '../utils/soundcloudApi';

export class Player extends React.Component {

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    const { isPlaying } = this.props;
    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  togglePlay(togglePlayTrack, isPlaying) {
    if (isPlaying) {
      togglePlayTrack(!isPlaying);
    } else {
      togglePlayTrack(!isPlaying);
    }
  }

  togglePlaylist(isOpenPlaylist, togglePlaylist) {
    togglePlaylist(isOpenPlaylist);
  }

  activateIteratedTrack(activeTrack, iterate, activateIteratedTrack) {
    activateIteratedTrack(activeTrack, iterate);
  }

  renderNav() {
    const {
      activeTrack,
      isPlaying,
      isOpenPlaylist,
      togglePlayTrack,
      togglePlaylist,
      activateIteratedTrack
    } = this.props;

    if (!activeTrack) { return; }

    const { origin } = activeTrack;
    const { user, title, stream_url } = origin;
    const { username } = user;

    return (
      <div className="player-content">
        <div>
          <i
            className="fa fa-step-backward"
            onClick={this.activateIteratedTrack.bind(this, activeTrack, -1, activateIteratedTrack)}
          ></i>
        </div>
        <div>
          <i
            className={"fa " + (isPlaying ? "fa-pause" : "fa-play")}
            onClick={this.togglePlay.bind(this, togglePlayTrack, isPlaying)}
          ></i>
        </div>
        <div>
          <i
            className="fa fa-step-forward"
            onClick={this.activateIteratedTrack.bind(this, activeTrack, 1, activateIteratedTrack)}
          ></i>
        </div>
        <div className="player-content-name">
          {username} - {title}
        </div>
        <div>
          <i
            className="fa fa-th-list"
            onClick={this.togglePlaylist.bind(this, isOpenPlaylist, togglePlaylist)}
          ></i>
        </div>
        <audio id="audio" ref="audio" src={addAccessTokenWith(stream_url, '?')}></audio>
      </div>
    );
  }

  render() {
    return <div className={this.props.activeTrack ? "player player-visible" : "player"}>{this.renderNav()}</div>;
  }

}

function mapStateToProps(state) {
  return {
    activeTrack: state.player.activeTrack,
    isPlaying: state.player.isPlaying,
    isOpenPlaylist: state.environment.isOpenPlaylist
  };
}

export const PlayerContainer = connect(mapStateToProps, actions)(Player);

Player.propTypes = {
  activeTrack: React.PropTypes.object,
  isPlaying: React.PropTypes.bool,
  isOpenPlaylist: React.PropTypes.bool
};
