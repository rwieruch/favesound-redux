import Cookies from 'js-cookie';

export function apiUrl(url) {
    const accessToken = Cookies.get('accessToken');
    return `//api.soundcloud.com/${url}&oauth_token=${accessToken}`;
}