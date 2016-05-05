import Cookies from 'js-cookie';
import { CLIENT_ID, OAUTH_TOKEN, REDIRECT_URI } from '../../constants/authentification';
import * as actionTypes from '../../constants/actionTypes';
import { apiUrl } from '../../services/api';
import { fetchFollowings, fetchActivities, fetchFollowers, fetchFavorites } from '../../actions/user';

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

function resetSession() {
  return {
    type: actionTypes.RESET_SESSION
  };
}

const fetchUser = () => (dispatch) => {
  fetch(apiUrl(`me`, '?'))
    .then(response => response.json())
    .then(me => {
      dispatch(setUser(me));
      dispatch(fetchActivities());
      dispatch(fetchFavorites(me));
      dispatch(fetchFollowings(me));
      dispatch(fetchFollowers(me));
    });
};

export const login = () => (dispatch) => {
  const client_id = CLIENT_ID;
  const redirect_uri = REDIRECT_URI;
  /* eslint-disable no-undef */
  SC.initialize({ client_id, redirect_uri });

  SC.connect().then((session) => {
    Cookies.set(OAUTH_TOKEN, session.oauth_token);
    dispatch(setSession(session));
    dispatch(fetchUser());
  });
  /* eslint-enable no-undef */
};

export const logout = () => (dispatch) => {
  Cookies.remove(OAUTH_TOKEN);
  dispatch(resetSession());
};
