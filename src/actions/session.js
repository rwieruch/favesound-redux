import Cookies from 'js-cookie';
import {CLIENT_ID} from '../constants/authentification';
import * as actionTypes from '../constants/actionTypes';
import {fetchFollowings, fetchActivities} from './user';

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

export function initSession() {

  const client_id = CLIENT_ID;
  const redirect_uri = `${window.location.protocol}//${window.location.host}/callback`;

  return (dispatch) => {
    SC.initialize({ client_id, redirect_uri });

    SC.connect().then((session) => {
      Cookies.set(OAUTH_TOKEN, session.oauth_token);
      dispatch(setSession(session));
      dispatch(fetchUser(session.oauth_token));
    });
  }
}

function fetchUser(accessToken) {
  return dispatch => {
    fetch(`//api.soundcloud.com/me?oauth_token=${accessToken}`)
      .then(response => response.json())
      .then(me => {
        dispatch(setUser(me));
        dispatch(fetchFollowings(me));
        dispatch(fetchActivities());
      });
  };
}