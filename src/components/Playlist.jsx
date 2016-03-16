import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import * as toggleTypes from '../constants/toggleTypes';
import { MiniTrackContainer } from '../components/MiniTrack';

const renderMiniTrack = (trackEntities) => (id, idx) => {
  return (
    <li key={idx}>
      <MiniTrackContainer activity={trackEntities[id]}/>
    </li>
  );
};

const renderPlaylist = (playlist, trackEntities) => {
  return <ul>{playlist.map(renderMiniTrack(trackEntities))}</ul>;
};

const renderMenu = (clearPlaylist) => {
  return (
    <div className="playlist-menu">
      <div>Player Queue</div>
      <div>
        <button className="inline" onClick={clearPlaylist}>
          Clear Queue
        </button>
      </div>
    </div>
  );
};

export const Playlist = ({ toggle, playlist, trackEntities, clearPlaylist }) => {
  return (
    <div className={toggle[toggleTypes.PLAYLIST] ? 'playlist playlist-visible' : 'playlist'}>
      {renderMenu(clearPlaylist)}
      {renderPlaylist(playlist, trackEntities)}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    toggle: state.toggle,
    playlist: state.player.playlist,
    trackEntities: state.entities.tracks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearPlaylist: bindActionCreators(actions.clearPlaylist, dispatch),
  };
}

export const PlaylistContainer = connect(mapStateToProps, mapDispatchToProps)(Playlist);
