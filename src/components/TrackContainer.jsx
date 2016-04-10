import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import { PlaylistTrack } from '../components/PlaylistTrack';
import { StreamTrack } from '../components/StreamTrack';
import { PreviewTrack } from '../components/PreviewTrack';

function mapStateToProps(state, props) {
  return {
    idx: props.idx,
    userEntities: state.entities.users,
    activity: props.activity,
    isPlaying: state.player.isPlaying,
    activeTrackId: state.player.activeTrackId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    activateTrack: bindActionCreators(actions.activateTrack, dispatch),
    addTrackToPlaylist: bindActionCreators(actions.addTrackToPlaylist, dispatch),
    removeTrackFromPlaylist: bindActionCreators(actions.removeTrackFromPlaylist, dispatch),
  };
}

const PlaylistTrackContainer = connect(mapStateToProps, mapDispatchToProps)(PlaylistTrack);
const PreviewTrackContainer = connect(mapStateToProps, mapDispatchToProps)(PreviewTrack);
const StreamTrackContainer = connect(mapStateToProps, mapDispatchToProps)(StreamTrack);

export {
  PlaylistTrackContainer,
  PreviewTrackContainer,
  StreamTrackContainer,
};
