import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import { addAccessTokenWith } from '../../services/api';
import { ButtonInline } from '../../components/ButtonInline';

class Player extends React.Component {

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    const { isPlaying, volume } = this.props;
    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    audioElement.volume = volume / 100;
  }

  renderNav() {
    const {
      currentUser,
      activeTrackId,
      isPlaying,
      entities,
      playlist,
      isInShuffleMode,
      onSetToggle,
      onActivateIteratedTrack,
      onLike,
      onTogglePlayTrack,
      onSetShuffleMode,
      volume
    } = this.props;

    if (!activeTrackId) { return null; }

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

    const shuffleClass = classNames(
      'fa fa-random',
      {
        randomSelected: isInShuffleMode
      }
    );

    return (
      <div className="player-content">
        <div className="player-content-action">
          <ButtonInline onClick={() => onActivateIteratedTrack(activeTrackId, -1)}>
            <i className="fa fa-step-backward" />
          </ButtonInline>
        </div>
        <div className="player-content-action">
          <ButtonInline onClick={() => onTogglePlayTrack(!isPlaying)}>
            <i className={playClass} />
          </ButtonInline>
        </div>
        <div className="player-content-action">
          <ButtonInline onClick={() => onActivateIteratedTrack(activeTrackId, 1)}>
            <i className="fa fa-step-forward" />
          </ButtonInline>
        </div>
        <div className="player-content-name">
          {username} - {title}
        </div>
        <div className="player-content-action">
          <ButtonInline onClick={() => onSetToggle(toggleTypes.PLAYLIST)}>
            <i className="fa fa-th-list" /> {playlist.length}
          </ButtonInline>
        </div>
        <div className="player-content-action">
          <ButtonInline onClick={onSetShuffleMode}>
            <i className={shuffleClass} />
          </ButtonInline>
        </div>
        <div className="player-content-action">
          <ButtonInline onClick={() => onSetToggle(toggleTypes.VOLUME)}>
            <i className="fa fa-volume-up" /> {volume}
          </ButtonInline>
        </div>
        <div className="player-content-action">
          {
            currentUser ?
            <ButtonInline onClick={() => onLike(track)}>
              <i className={likeClass} />
            </ButtonInline> : null
          }
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
    currentUser: state.session.user,
    activeTrackId: state.player.activeTrackId,
    isPlaying: state.player.isPlaying,
    entities: state.entities,
    playlist: state.player.playlist,
    isInShuffleMode: state.player.isInShuffleMode,
    volume: state.player.volume,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTogglePlayTrack: bindActionCreators(actions.togglePlayTrack, dispatch),
    onSetToggle: bindActionCreators(actions.setToggle, dispatch),
    onActivateIteratedTrack: bindActionCreators(actions.activateIteratedTrack, dispatch),
    onLike: bindActionCreators(actions.like, dispatch),
    onSetShuffleMode: bindActionCreators(actions.toggleShuffleMode, dispatch),
  };
}

Player.propTypes = {
  currentUser: React.PropTypes.object,
  activeTrackId: React.PropTypes.number,
  isPlaying: React.PropTypes.bool,
  entities: React.PropTypes.object,
  playlist: React.PropTypes.array,
  onTogglePlayTrack: React.PropTypes.func,
  onSetToggle: React.PropTypes.func,
  onActivateIteratedTrack: React.PropTypes.func,
  onLike: React.PropTypes.func,
  onSetShuffleMode: React.PropTypes.func,
  isInShuffleMode: React.PropTypes.bool,
};

const PlayerContainer = connect(mapStateToProps, mapDispatchToProps)(Player);

export {
  Player,
  PlayerContainer
};
