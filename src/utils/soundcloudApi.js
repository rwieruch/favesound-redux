import Cookies from 'js-cookie';

export function apiUrl(url) {
    const accessToken = Cookies.get('accessToken');
    return `//api.soundcloud.com/${url}&oauth_token=${accessToken}`;
}

export function addAccessTokenWith(url, symbol) {
    const accessToken = Cookies.get('accessToken');
    return `${url}${symbol}oauth_token=${accessToken}`;
}