/* eslint-disable max-len */
import { login, logout } from './session';
import { changeLocation } from './location';
import { fetchActivities, fetchFollowers, fetchFavorites, fetchFollowings } from './user';
import { fetchActivitiesByGenre } from './browse';
import { like } from './track';
import { follow } from './following';
import { setToggle } from './toggle';
import { activateTrack, activateIteratedTrack, togglePlayTrack, addTrackToPlaylist, removeTrackFromPlaylist, clearPlaylist } from './player';
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
  fetchActivitiesByGenre
};