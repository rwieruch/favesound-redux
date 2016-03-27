import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import * as toggleTypes from '../constants/toggleTypes';
import { addAccessTokenWith } from '../services/api';

class Player extends React.Component {

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

  renderNav() {
    const { activeTrackId, isPlaying, setToggle, activateIteratedTrack, like, entities, togglePlayTrack } = this.props;

    if (!activeTrackId) { return; }

    const track = entities.tracks[activeTrackId];
    const { user, title, stream_url } = track;
    const { username } = entities.users[user];
    const playClass = classNames(
      'fa',
      {
        'fa-pause': isPlaying,
        'fa-play': !isPlaying
      }
    );
    const likeClass = classNames(
      'fa fa-heart',
      {
        'is-favorite': track.user_favorite
      }
    );

    return (
      <div className="player-content">
        <div>
          <i
            className="fa fa-step-backward"
            onClick={activateIteratedTrack.bind(null, activeTrackId, -1)}
          ></i>
        </div>
        <div>
          <i
            className={playClass}
            onClick={togglePlayTrack.bind(null, !isPlaying)}
          ></i>
        </div>
        <div>
          <i
            className="fa fa-step-forward"
            onClick={activateIteratedTrack.bind(null, activeTrackId, 1)}
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
            className={likeClass}
            onClick={like.bind(null, track)}
          ></i>
        </div>
        <audio id="audio" ref="audio" src={addAccessTokenWith(stream_url, '?')}></audio>
      </div>
    );
  }

  render() {
    const playerClass = classNames(
      'player',
      {
        'player-visible': this.props.activeTrackId
      }
    );

    return <div className={playerClass}>{this.renderNav()}</div>;
  }

}

function mapStateToProps(state) {
  return {
    activeTrackId: state.player.activeTrackId,
    isPlaying: state.player.isPlaying,
    entities: state.entities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePlayTrack: bindActionCreators(actions.togglePlayTrack, dispatch),
    setToggle: bindActionCreators(actions.setToggle, dispatch),
    activateIteratedTrack: bindActionCreators(actions.activateIteratedTrack, dispatch),
    like: bindActionCreators(actions.like, dispatch)
  };
}

Player.propTypes = {
  activeTrackId: React.PropTypes.number,
  isPlaying: React.PropTypes.bool,
  entities: React.PropTypes.object,
  togglePlayTrack: React.PropTypes.func,
  setToggle: React.PropTypes.func,
  activateIteratedTrack: React.PropTypes.func,
  like: React.PropTypes.func
};

const PlayerContainer = connect(mapStateToProps, mapDispatchToProps)(Player);

export {
  Player,
  PlayerContainer
};
