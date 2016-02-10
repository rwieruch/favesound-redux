import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import MiniTrack from '../components/MiniTrack';

export class Playlist extends React.Component {

  renderMiniTrack(activity, idx) {
    return (
      <li key={idx}>
        <MiniTrack activity={activity} {...this.props}/>
      </li>
    );
  }

  renderPlaylist() {
    const { playlist } = this.props;
    return (<ul>{playlist.map(this.renderMiniTrack.bind(this))}</ul>);
  }

  render() {
    return (<div className={this.props.isOpenPlaylist ? 'playlist playlist-visible' : 'playlist'}>
        {this.renderPlaylist()}
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    activeTrack: state.player.activeTrack,
    isPlaying: state.player.isPlaying,
    playlist: state.player.playlist,
    isOpenPlaylist: state.environment.isOpenPlaylist
  };
}

export const PlaylistContainer = connect(mapStateToProps, actions)(Playlist);

Playlist.propTypes = {
  activeTrack: React.PropTypes.object,
  isPlaying: React.PropTypes.bool,
  playlist: React.PropTypes.array,
  isOpenPlaylist: React.PropTypes.bool,
};
