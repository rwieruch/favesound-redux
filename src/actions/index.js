import { login, logout } from './session';
import { changeLocation } from './location';
import { fetchActivities, fetchFollowers, fetchFavorites } from './user';
import { togglePlaylist } from './environment';
import { fetchActivitiesByGenre } from './browse';
import {
  activateTrack,
  activateIteratedTrack,
  togglePlayTrack,
  addTrackToPlaylist,
  removeTrackFromPlaylist
} from './player';

export {
  login,
  logout,
  changeLocation,
  fetchActivities,
  fetchFollowers,
  fetchFavorites,
  activateTrack,
  togglePlayTrack,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  activateIteratedTrack,
  togglePlaylist,
  fetchActivitiesByGenre
};