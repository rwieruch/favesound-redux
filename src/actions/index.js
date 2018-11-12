/* eslint-disable max-len */
import { login, logout } from './session';
import { fetchActivities, fetchFollowers, fetchFavorites, fetchFollowings } from './user';
import { fetchActivitiesByGenre, setSelectedGenre } from './browse';
import { like } from './track';
import { follow } from './following';
import { setToggle } from './toggle';
import { activateTrack, activateIteratedPlaylistTrack, activateIteratedStreamTrack, addTrackToPlaylist, removeTrackFromPlaylist, clearPlaylist, togglePlayTrack, toggleShuffleMode, toggleRepeatMode, changeVolume } from './player';
import { openComments, fetchComments } from './comments';
import { filterDuration, filterName } from './filter';
import { sortStream, dateSortStream } from './sort';
/* eslint-enable max-len */

export {
  login,
  logout,
  fetchActivities,
  fetchFollowings,
  fetchFollowers,
  fetchFavorites,
  activateTrack,
  togglePlayTrack,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  clearPlaylist,
  activateIteratedPlaylistTrack,
  activateIteratedStreamTrack,
  like,
  follow,
  setToggle,
  setSelectedGenre,
  fetchActivitiesByGenre,
  openComments,
  fetchComments,
  filterDuration,
  filterName,
  sortStream,
  dateSortStream,
  toggleShuffleMode,
  toggleRepeatMode,
  changeVolume,
};
