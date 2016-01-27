import * as initialize from '../constants/initialize';

function setSession(session) {
  return {
    type: 'SET_SESSION',
    session
  };
}

function setUser(user) {
  return {
    type: 'SET_USER',
    user
  };
}

export function auth() {

  const client_id = initialize.CLIENT_ID;
  const redirect_uri = `${window.location.protocol}//${window.location.host}/callback`;

  return (dispatch) => {
    SC.initialize({ client_id, redirect_uri });

    SC.connect().then((session) => {
      console.log('session', session);
      dispatch(setSession(session))

      SC.get('/me').then((me) => {
        console.log('me', me);
        dispatch(setSession(me))
      });
    })
  }
}