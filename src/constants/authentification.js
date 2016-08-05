const isDev = process.env.NODE_ENV === 'development';

export const REDIRECT_URI = isDev ?
  `${window.location.protocol}//${window.location.host}/callback` :
  'http://www.favesound.de/callback';

export const CLIENT_ID = isDev ?
    '7961251d7ec99ca5ed3f53f8ddc1c21a' :
    'fad359d29a1b84f605b4c235122286d7';

export const OAUTH_TOKEN = 'accessToken';
