/* eslint-disable max-len */
import { login, logout } from './session';
import { changeLocation } from './location';
import { fetchActivities, fetchFollowers, fetchFavorites, fetchFollowings } from './user';
import { togglePlaylist } from './environment';
import { fetchActivitiesByGenre } from './browse';
import { like } from './track';
import { activateTrack, activateIteratedTrack, togglePlayTrack, addTrackToPlaylist, removeTrackFromPlaylist } from './player';
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
  activateIteratedTrack,
  like,
  togglePlaylist,
  fetchActivitiesByGenre
};