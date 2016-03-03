/* eslint-disable max-len */
import Cookies from 'js-cookie';
import { CLIENT_ID } from '../constants/authentification';
import * as actionTypes from '../constants/actionTypes';
import { apiUrl } from '../utils/soundcloudApi';
import { changeLocation } from './location';
import { browse, dashboard } from '../constants/pathnames';
import { fetchFollowings, fetchActivities, fetchFollowers, fetchFavorites, setFollowings, setFollowers, setFavorites, setActivities } from './user';
/* eslint-enable max-len */

const OAUTH_TOKEN = 'accessToken';

function setSession(session) {
  return {
    type: actionTypes.SET_SESSION,
    session
  };
}

function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    user
  };
}

export const login = () => (dispatch) => {
  const client_id = CLIENT_ID;
  const redirect_uri = `${window.location.protocol}//${window.location.host}/callback`;

  SC.initialize({ client_id, redirect_uri });

  dispatch(changeLocation(dashboard));
  SC.connect().then((session) => {
    Cookies.set(OAUTH_TOKEN, session.oauth_token);
    dispatch(setSession(session));
    dispatch(fetchUser(session.oauth_token));
  });
}

export const logout = () => (dispatch) => {
  Cookies.remove(OAUTH_TOKEN);
  dispatch(changeLocation(browse));
  dispatch(setSession(null));
  dispatch(setUser(null));
  dispatch(setFollowings([]));
  dispatch(setFollowers([]));
  dispatch(setFavorites([]));
  dispatch(setActivities([]));
}

const fetchUser = (accessToken) => (dispatch) => {
  fetch(apiUrl(`me`, '?'))
    .then(response => response.json())
    .then(me => {
      dispatch(setUser(me));
      dispatch(fetchActivities());
      dispatch(fetchFavorites(me));
      dispatch(fetchFollowings(me));
      dispatch(fetchFollowers(me));
    });
}