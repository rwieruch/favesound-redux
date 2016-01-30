import Cookies from 'js-cookie';

function mergeFollowings(followings) {
  return {
    type: 'MERGE_FOLLOWINGS',
    followings
  };
}

export function fetchFollowings(user, nextHref) {

  const accessToken = Cookies.get('accessToken');
  const initHref = `//api.soundcloud.com/users/${user.id}/followings?limit=200&offset=0&oauth_token=${accessToken}`;
  const followingsUrl = nextHref || initHref;

  return (dispatch) => {
    return fetch(followingsUrl)
      .then(response => response.json())
      .then((data) => {
        dispatch(mergeFollowings(data.collection));

        if (data.next_href) {
          dispatch(fetchFollowings(user, data.next_href));
        }
      });
  };
}
