import Cookies from 'js-cookie';

export function apiUrl(url) {
    const accessToken = Cookies.get('accessToken');
    return `//api.soundcloud.com/${url}&oauth_token=${accessToken}`;
}

export function addAccessToken(url) {
    const accessToken = Cookies.get('accessToken');
    return `${url}&oauth_token=${accessToken}`;
}