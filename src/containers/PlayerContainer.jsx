import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as toggleTypes from '../constants/toggleTypes';
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
    togglePlayTrack(!isPlaying);
  }

  activateIteratedTrack(activeTrackId, iterate, activateIteratedTrack) {
    activateIteratedTrack(activeTrackId, iterate);
  }

  like(track, like) {
    like(track);
  }

  renderNav() {
    const {
      activeTrackId,
      isPlaying,
      togglePlayTrack,
      setToggle,
      activateIteratedTrack,
      like,
      userEntities,
      trackEntities
    } = this.props;

    if (!activeTrackId) { return; }

    const track = trackEntities[activeTrackId];
    const { user, title, stream_url } = track;
    const { username } = userEntities[user];

    return (
      <div className="player-content">
        <div>
          <i
            className="fa fa-step-backward"
            onClick={this.activateIteratedTrack.bind(this, activeTrackId, -1, activateIteratedTrack)}
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
            onClick={this.activateIteratedTrack.bind(this, activeTrackId, 1, activateIteratedTrack)}
          ></i>
        </div>
        <div className="player-content-name">
          {username} - {title}
        </div>
        <div>
          <i
            className="fa fa-th-list"
            onClick={setToggle.bind(this, toggleTypes.PLAYLIST)}
          ></i>
        </div>
        <div>
          <i
            className={"fa fa-heart " + (track.user_favorite ? "is-favorite" : "")}
            onClick={this.like.bind(this, track, like)}
          ></i>
        </div>
        <audio id="audio" ref="audio" src={addAccessTokenWith(stream_url, '?')}></audio>
      </div>
    );
  }

  render() {
    return <div className={this.props.activeTrackId ? "player player-visible" : "player"}>{this.renderNav()}</div>;
  }

}

function mapStateToProps(state) {
  return {
    activeTrackId: state.player.activeTrackId,
    isPlaying: state.player.isPlaying,
    userEntities: state.entities.users,
    trackEntities: state.entities.tracks,
  };
}

export const PlayerContainer = connect(mapStateToProps, actions)(Player);

Player.propTypes = {
  activeTrackId: React.PropTypes.number,
  isPlaying: React.PropTypes.bool,
  userEntities: React.PropTypes.object,
  trackEntities: React.PropTypes.object
};
