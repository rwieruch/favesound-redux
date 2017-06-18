const isDev = process.env.NODE_ENV === 'development';

export const REDIRECT_URI = isDev ?
  `${window.location.protocol}//${window.location.host}/callback` :
  'http://www.favesound.de/callback';

export const CLIENT_ID = isDev ?
    'a281614d7f34dc30b665dfcaa3ed7505' :
    'a281614d7f34dc30b665dfcaa3ed7505';

// This client_id is a temporary fix for the Request Limit Reached issue of the old one.
// This only apply to streaming.
export const TEMP_CLIENT_ID = 'f9e1e2232182a46705c880554a1011af';

export const OAUTH_TOKEN = 'accessToken';
