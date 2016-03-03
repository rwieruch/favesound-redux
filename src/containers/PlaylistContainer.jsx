import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { MiniTrackContainer } from '../components/MiniTrack';

export class Playlist extends React.Component {

  renderMiniTrack(id, idx) {
    const { trackEntities } = this.props;
    return (
      <li key={idx}>
        <MiniTrackContainer activity={trackEntities[id]}/>
      </li>
    );
  }

  renderPlaylist() {
    const { playlist } = this.props;
    return <ul>{playlist.map(this.renderMiniTrack.bind(this))}</ul>;
  }

  renderMenu() {
    return (
      <div className="playlist-menu">
        <div>Player Queue</div>
        <div>
          <button className="inline" onClick={this.props.clearPlaylist.bind(this)}>
            Clear Queue
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={this.props.isOpenPlaylist ? 'playlist playlist-visible' : 'playlist'}>
        {this.renderMenu()}
        {this.renderPlaylist()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeTrackId: state.player.activeTrackId,
    isPlaying: state.player.isPlaying,
    playlist: state.player.playlist,
    isOpenPlaylist: state.environment.isOpenPlaylist,
    trackEntities: state.entities.tracks,
    userEntities: state.entities.users
  };
}

export const PlaylistContainer = connect(mapStateToProps, actions)(Playlist);

Playlist.propTypes = {
  activeTrackId: React.PropTypes.number,
  isPlaying: React.PropTypes.bool,
  playlist: React.PropTypes.array,
  isOpenPlaylist: React.PropTypes.bool,
  trackEntities: React.PropTypes.object,
  userEntities: React.PropTypes.object
};
