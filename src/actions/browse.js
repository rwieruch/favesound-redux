import { CLIENT_ID } from '../constants/authentification';
import { unauthApiUrl } from '../utils/soundcloudApi';
import { mapInOrigin } from '../utils/track';
import { setRequestInProcess } from '../actions/request';
import { setPaginateLink } from '../actions/paginate';
import * as actionTypes from '../constants/actionTypes';
import * as requestTypes from '../constants/requestTypes';

function mergeActivitiesByGenre(activities) {
  return {
    type: actionTypes.MERGE_GENRE_ACTIVITIES,
    activities
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
        dispatch(setPaginateLink(data.next_href, genre));
        dispatch(setRequestInProcess(false, requestType));
      });
  };
}
