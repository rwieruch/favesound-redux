import Cookies from 'js-cookie';

export function apiUrl(url, symbol) {
    const accessToken = Cookies.get('accessToken');
    return `//api.soundcloud.com/${url}${symbol}oauth_token=${accessToken}`;
}

export function addAccessTokenWith(url, symbol) {
    const accessToken = Cookies.get('accessToken');
    return `${url}${symbol}oauth_token=${accessToken}`;
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
