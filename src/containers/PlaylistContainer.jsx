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
    return (<ul>{playlist.toJSON().map(this.renderMiniTrack.bind(this))}</ul>);
  }

  render() {
    return (<div className={this.props.isOpenPlaylist ? 'playlist playlist-visible' : 'playlist'}>
        {this.renderPlaylist()}
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    activeTrack: state.player.get('activeTrack'),
    isPlaying: state.player.get('isPlaying'),
    playlist: state.player.get('playlist'),
    isOpenPlaylist: state.environment.get('isOpenPlaylist')
  };
}

export const PlaylistContainer = connect(mapStateToProps, actions)(Playlist);
