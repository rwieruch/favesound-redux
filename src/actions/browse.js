import { CLIENT_ID } from '../constants/authentification';
import { unauthApiUrl } from '../utils/soundcloudApi';
import { mapInOrigin } from '../utils/track';
import * as actionTypes from '../constants/actionTypes';

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

function setActivitiesByGenreRequestInProcess(inProcess) {
  return {
    type: actionTypes.SET_ACTIVITIES_BY_GENRE_REQUEST_IN_RPOCESS,
    inProcess
  };
}

export function fetchActivitiesByGenre(nextHref, genre) {
  return (dispatch, getState) => {

    const initHref = unauthApiUrl(`tracks?linked_partitioning=1&limit=20&offset=0&tags=${genre}`, '&');
    const url = nextHref || initHref;

    let requestInProcess = getState().browse.activitiesByGenreInProcess;

    if (requestInProcess) { return; }

    dispatch(setActivitiesByGenreRequestInProcess(true));

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const activities = data.collection.map(mapInOrigin('browse'));
        dispatch(mergeActivitiesByGenre(activities));
        dispatch(setActivitiesByGenreNextHref(data.next_href, genre));
        dispatch(setActivitiesByGenreRequestInProcess(false));
      });
  };
}
