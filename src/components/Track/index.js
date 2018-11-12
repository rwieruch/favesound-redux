import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import { TrackPlaylist } from './playlist';
import { TrackPreview } from './preview';
import { TrackStream } from './stream';

function mapStateToProps(state, props) {
  const { idx, activity } = props;

  return {
    idx,
    activity,
    typeReposts: state.user.typeReposts,
    typeTracks: state.user.typeTracks,
    userEntities: state.entities.users,
    isPlaying: state.player.isPlaying,
    activeTrackId: state.player.activeTrackId,
    activeSortType: state.sort.sortType,
    activeDateSortType: state.sort.dateSortType,
    activeDurationFilterType: state.filter.durationFilterType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onActivateTrack: bindActionCreators(actions.activateTrack, dispatch),
    onAddTrackToPlaylist: bindActionCreators(actions.addTrackToPlaylist, dispatch),
    onRemoveTrackFromPlaylist: bindActionCreators(actions.removeTrackFromPlaylist, dispatch),
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
