/* eslint-disable max-len */
import { login, logout } from './session';
import { changeLocation } from './location';
import { fetchActivities, fetchFollowers, fetchFavorites, fetchFollowings } from './user';
import { fetchActivitiesByGenre } from './browse';
import { like } from './track';
import { follow } from './following';
import { setToggle } from './toggle';
import { activateTrack, activateIteratedTrack, addTrackToPlaylist, removeTrackFromPlaylist, clearPlaylist, togglePlayTrack } from './player';
import { openComments, fetchComments } from './comments';
import { filterDuration } from './filter';
/* eslint-enable max-len */

export {
  login,
  logout,
  changeLocation,
  fetchActivities,
  fetchFollowings,
  fetchFollowers,
  fetchFavorites,
  activateTrack,
  togglePlayTrack,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  clearPlaylist,
  activateIteratedTrack,
  like,
  follow,
  setToggle,
  fetchActivitiesByGenre,
  openComments,
  fetchComments,
  filterDuration
};
