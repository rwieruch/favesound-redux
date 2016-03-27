const isDev = process.env.NODE_ENV === 'development';

export const REDIRECT_URI = isDev ?
  `${window.location.protocol}//${window.location.host}/callback` :
  'http://www.favesound.de/callback';

export const CLIENT_ID = isDev ?
    'a281614d7f34dc30b665dfcaa3ed7505' :
    '1512fb9cbe8228095fe92c6503e3a071';

export const OAUTH_TOKEN = 'accessToken';
