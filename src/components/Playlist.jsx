import React from 'react';
import map from 'lodash/fp/map';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import * as toggleTypes from '../constants/toggleTypes';
import { PlaylistTrackContainer } from '../components/PlaylistTrack';

function PlaylistItem({ trackEntities, id }) {
  return (
    <li>
      <PlaylistTrackContainer activity={trackEntities[id]}/>
    </li>
  );
}

function PlaylistMenu({ clearPlaylist }) {
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
}

function Playlist({ toggle, playlist, trackEntities, clearPlaylist }) {
  const playlistClass = classNames(
    'playlist',
    {
      'playlist-visible': toggle[toggleTypes.PLAYLIST]
    }
  );

  return (
    <div className={playlistClass}>
      <PlaylistMenu clearPlaylist={clearPlaylist} />
      <ul>
        {map((id, idx) => {
          const props = { id, trackEntities };
          return <PlaylistItem key={idx} { ...props } />;
        }, playlist)}
      </ul>
    </div>
  );
}

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

Playlist.propTypes = {
  toggle: React.PropTypes.object,
  playlist: React.PropTypes.array,
  trackEntities: React.PropTypes.object,
  clearPlaylist: React.PropTypes.func
};

const PlaylistContainer = connect(mapStateToProps, mapDispatchToProps)(Playlist);

export {
  Playlist,
  PlaylistContainer
};
