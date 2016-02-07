import { login, logout } from './session';
import { fetchActivities, fetchFollowers, fetchFavorites } from './user';
import { togglePlaylist } from './environment';
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
  fetchActivities,
  fetchFollowers,
  fetchFavorites,
  activateTrack,
  togglePlayTrack,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  activateIteratedTrack,
  togglePlaylist
};