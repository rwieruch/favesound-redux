import { CLIENT_ID } from '../constants/authentification';
import { unauthApiUrl } from '../utils/soundcloudApi';
import { mapInOrigin } from '../utils/track';
import { setRequestInProcess } from '../actions/request';
import * as actionTypes from '../constants/actionTypes';
import * as requestTypes from '../constants/requestTypes';

function mergeActivitiesByGenre(activities) {
  return {
    type: actionTypes.MERGE_GENRE_ACTIVITIES,
    activities
  };
}

function setActivitiesByGenreNextHref(nextHref, genre) {
  return {
    type: actionTypes.SET_ACTIVITIES_BY_GENRE_NEXT_HREF,
    nextHref,
    genre
  };
}

export function fetchActivitiesByGenre(nextHref, genre) {
  return (dispatch, getState) => {

    let requestType = requestTypes.GENRES;
    let initHref = unauthApiUrl(`tracks?linked_partitioning=1&limit=20&offset=0&tags=${genre}`, '&');
    let url = nextHref || initHref;
    let requestInProcess = getState().request[requestType];

    if (requestInProcess) { return; }

    dispatch(setRequestInProcess(true, requestType));

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const activities = data.collection.map(mapInOrigin('browse'));
        dispatch(mergeActivitiesByGenre(activities));
        dispatch(setActivitiesByGenreNextHref(data.next_href, genre));
        dispatch(setRequestInProcess(false, requestType));
      });
  };
}
