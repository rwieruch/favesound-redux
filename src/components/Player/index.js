import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import { addTempClientIdWith } from '../../services/api';
import { formatSeconds } from '../../services/player';
import ButtonInline from '../../components/ButtonInline';
import ReactTooltip from 'react-tooltip';
import Clipboard from 'react-clipboard.js';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.updateProgress = this.updateProgress.bind(this);
    this.setAudioPosition = this.setAudioPosition.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleIteratedTrack = this.handleIteratedTrack.bind(this);
  }

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    const { isPlaying, volume } = this.props;
    if (isPlaying) {
      audioElement.play();
      audioElement.addEventListener('timeupdate', this.updateProgress, false);
      audioElement.addEventListener('timeupdate', this.handleTimeUpdate, false);
    } else {
      audioElement.pause();
    }
    audioElement.volume = volume / 100;
  }

  setAudioPosition(ev) {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    if (!audioElement) { return; }
    const songPercentage = ev.clientX / window.innerWidth;
    const duration = audioElement.duration;
    audioElement.currentTime = duration * songPercentage;
  }

  updateProgress(event) {
    const statusbar = document.getElementById('player-status-bar');
    if (!statusbar) return;
    let val = 0;
    if (event.target.currentTime > 0) {
      val = ((100 / event.target.duration) * event.target.currentTime).toFixed(2);
    }
    statusbar.style.width = val + "%";

    if (event.target.duration <= event.target.currentTime) {
      const { activeTrackId } = this.props;
      this.handleIteratedTrack(activeTrackId, 1);
    }
  }

  handleTimeUpdate(event) {
    const timeElapsedElement = document.getElementById('player-status-time');
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    if (!timeElapsedElement || !audioElement) return;
    if (event.target.currentTime > 0) {
      const timeInSeconds = Math.floor(event.target.currentTime);
      const duration = isNaN(Math.trunc(audioElement.duration)) ? 'Loading' : Math.trunc(audioElement.duration);

      timeElapsedElement.textContent = `${formatSeconds(timeInSeconds)}/${formatSeconds(duration)}`;
    } else {
      timeElapsedElement.textContent = 'Loading...';
    }
  }

  handleIteratedTrack(iterate) {
    const { activeTrackId, playlist } = this.props;
    const shouldStream = (activeTrackId === playlist[playlist.length - 1] && iterate > 0);

    if (!shouldStream) {
      this.props.onActivateIteratedPlaylistTrack(activeTrackId, iterate);
    } else {
      this.props.onActivateIteratedStreamTrack(activeTrackId, 1);
    }
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
      onLike,
      onTogglePlayTrack,
      onSetShuffleMode,
      volume
    } = this.props;

    if (!activeTrackId) { return null; }

    const track = entities.tracks[activeTrackId];
    const { user, title, stream_url } = track;
    const { username } = entities.users[user];

    const isMuted = !volume;

    const muteClass = classNames(
      'fa',
      {
        'fa-volume-up': !isMuted,
        'fa-volume-off': isMuted,
      }
    );

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
      <div className="player-container">
        <div className="player-status" onClick={this.setAudioPosition}>
          <div id="player-status-bar" className="player-status-bar">
            <span className="player-status-bar-dragger"></span>
          </div>
        </div>
        <div className="player-content">
          <div className="player-content-action">
            <ButtonInline onClick={() => this.handleIteratedTrack(-1)}>
              <i className="fa fa-step-backward" />
            </ButtonInline>
          </div>
          <div className="player-content-action">
            <ButtonInline onClick={() => onTogglePlayTrack(!isPlaying)}>
              <i className={playClass} />
            </ButtonInline>
          </div>
          <div className="player-content-action">
            <ButtonInline onClick={() => this.handleIteratedTrack(1)}>
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
              <i className={muteClass} />
            </ButtonInline>
          </div>
          <div className="player-status-time">
            <span id="player-status-time" className="player-status-time"></span>
          </div>
          <div className="player-content-action">
            {
              currentUser ?
              <ButtonInline onClick={() => onLike(track)}>
                <i className={likeClass} />
              </ButtonInline> : null
            }
          </div>
          <div className="player-content-action">
            <a data-tip="Song URL Copied!" data-for="copy">
              <Clipboard component="span" data-clipboard-text={track.permalink_url}>
                <div className="player-content-link">
                  <i className="fa fa-share" />
                </div>
              </Clipboard>
            </a>
            <ReactTooltip
              delayHide={3000}
              id="copy"
              event="click"
              eventOff="mousemove"
              aria-haspopup="true"
              effect="solid"
              offset={{ right: 25 }}
            />
          </div>
          <audio id="audio" ref="audio" src={addTempClientIdWith(stream_url, '?')}></audio>
        </div>
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
    volume: state.player.volume
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTogglePlayTrack: bindActionCreators(actions.togglePlayTrack, dispatch),
    onSetToggle: bindActionCreators(actions.setToggle, dispatch),
    onActivateIteratedPlaylistTrack: bindActionCreators(actions.activateIteratedPlaylistTrack, dispatch),
    onActivateIteratedStreamTrack: bindActionCreators(actions.activateIteratedStreamTrack, dispatch),
    onLike: bindActionCreators(actions.like, dispatch),
    onSetShuffleMode: bindActionCreators(actions.toggleShuffleMode, dispatch),
  };
}

Player.propTypes = {
  currentUser: PropTypes.object,
  activeTrackId: PropTypes.number,
  isPlaying: PropTypes.bool,
  entities: PropTypes.object,
  playlist: PropTypes.array,
  onTogglePlayTrack: PropTypes.func,
  onSetToggle: PropTypes.func,
  onActivateIteratedPlaylistTrack: PropTypes.func,
  onActivateIteratedStreamTrack: PropTypes.func,
  onLike: PropTypes.func,
  onSetShuffleMode: PropTypes.func,
  isInShuffleMode: PropTypes.bool,
  handleTimeUpdate: PropTypes.func,
  handleIteratedTrack: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
