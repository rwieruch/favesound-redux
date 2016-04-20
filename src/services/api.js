import Cookies from 'js-cookie';
import { CLIENT_ID } from '../constants/authentification';

export function apiUrl(url, symbol) {
  const accessToken = Cookies.get('accessToken');
  return `//api.soundcloud.com/${url}${symbol}oauth_token=${accessToken}`;
}

export function unauthApiUrl(url, symbol) {
  return `//api.soundcloud.com/${url}${symbol}client_id=${CLIENT_ID}`;
}

export function addAccessTokenWith(url, symbol) {
  const accessToken = Cookies.get('accessToken');
  if (accessToken) {
    return `${url}${symbol}oauth_token=${accessToken}`;
  } else {
    return `${url}${symbol}client_id=${CLIENT_ID}`;
  }
}

export function getLazyLoadingUrl(user, nextHref, initHref) {
  let urlPrefix;
  if (user) {
    urlPrefix = `users/${user.id}`;
  } else {
    urlPrefix = `me`;
  }

  if (nextHref) {
    return addAccessTokenWith(nextHref, '&');
  } else {
    return apiUrl(`${urlPrefix}/${initHref}`, '&');
  }
}

export function getLazyLoadingCommentsUrl(nextHref, initHref) {
  if (nextHref) {
    return addAccessTokenWith(nextHref, '&');
  } else {
    return apiUrl(`${initHref}`, '&');
  }
}
