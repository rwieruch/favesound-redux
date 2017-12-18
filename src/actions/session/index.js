import Cookies from 'js-cookie';
import { CLIENT_ID, OAUTH_TOKEN, REDIRECT_URI } from '../../constants/authentication';
import * as actionTypes from '../../constants/actionTypes';
import { apiUrl } from '../../services/api';
import { fetchFollowings, fetchActivities, fetchFollowers, fetchFavorites } from '../../actions/user';
import { setRequestInProcess } from '../../actions/request';
import * as requestTypes from '../../constants/requestTypes';

function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    user
  };
}

export function resetSession() {
  return {
    type: actionTypes.RESET_SESSION
  };
}

const fetchUser = () => (dispatch) => {
  fetch(apiUrl('me', '?'))
    .then(response => response.json())
    .then(me => {
      dispatch(setUser(me));
      dispatch(fetchActivities());
      dispatch(fetchFavorites(me));
      dispatch(fetchFollowings(me));
      dispatch(fetchFollowers(me));
    });
};

export const autoLogin = () => (dispatch) => {
  if (!Cookies.get(OAUTH_TOKEN)) {
    return;
  }

  fetch(apiUrl('me', '?')).then(response => {
    if (response.status === 401 && Cookies.get(OAUTH_TOKEN)) {
      // If current OAUTH_TOKEN is no longer valid
      dispatch(logout());
      dispatch(login());
    } else if (response.ok) {
      // Perform login
      dispatch(fetchUser());
    }
  });
};

export const login = () => (dispatch) => {
  const client_id = CLIENT_ID;
  const redirect_uri = REDIRECT_URI;
  dispatch(setRequestInProcess(true, requestTypes.AUTH));
  SC.initialize({ client_id, redirect_uri });
  SC.connect().then((session) => {
    Cookies.set(OAUTH_TOKEN, session.oauth_token, { expires: 7 });
    dispatch(fetchUser());
    dispatch(setRequestInProcess(false, requestTypes.AUTH));
  }).catch(() => {
    dispatch(setRequestInProcess(false, requestTypes.AUTH));
  });
};

export const logout = () => (dispatch) => {
  Cookies.remove(OAUTH_TOKEN);
  dispatch(resetSession());
};
