import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import { TrackPlaylist } from './playlist';
import { TrackPreview } from './preview';
import { TrackStream } from './stream';

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

const TrackPlaylistContainer = connect(mapStateToProps, mapDispatchToProps)(TrackPlaylist);
const TrackPreviewContainer = connect(mapStateToProps, mapDispatchToProps)(TrackPreview);
const TrackStreamContainer = connect(mapStateToProps, mapDispatchToProps)(TrackStream);

export {
  TrackPlaylistContainer,
  TrackPreviewContainer,
  TrackStreamContainer,
};
