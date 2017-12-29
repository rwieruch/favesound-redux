import PropTypes from 'prop-types';
import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import { TrackPlaylistContainer } from '../../components/Track';
import ButtonInline from '../../components/ButtonInline';

function PlaylistItem({ activity }) {
  return (
    <li>
      <TrackPlaylistContainer activity={activity} />
    </li>
  );
}

function PlaylistMenu({ onClearPlaylist }) {
  return (
    <div className="playlist-menu">
      <div>Playlist</div>
      <div>
        <ButtonInline onClick={onClearPlaylist}>
          Clear playlist
        </ButtonInline>
      </div>
    </div>
  );
}

function Playlist({ toggle, playlist, trackEntities, onClearPlaylist }) {
  const playlistClass = classNames(
    'playlist',
    {
      'playlist-visible': toggle[toggleTypes.PLAYLIST]
    }
  );

  return (
    <div className={playlistClass}>
      <PlaylistMenu onClearPlaylist={onClearPlaylist} />
      <ul>
        {map((id, key) => {
          return <PlaylistItem key={key} activity={trackEntities[id]} />;
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
    onClearPlaylist: bindActionCreators(actions.clearPlaylist, dispatch),
  };
}

Playlist.propTypes = {
  toggle: PropTypes.object,
  playlist: PropTypes.array,
  trackEntities: PropTypes.object,
  onClearPlaylist: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
