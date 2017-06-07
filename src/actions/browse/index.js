import { arrayOf, normalize } from 'normalizr';
import trackSchema from '../../schemas/track';
import * as actionTypes from '../../constants/actionTypes';
import * as requestTypes from '../../constants/requestTypes';
import { unauthApiUrl } from '../../services/api';
import { setRequestInProcess } from '../../actions/request';
import { setPaginateLink } from '../../actions/paginate';
import { mergeEntities } from '../../actions/entities';

export function setSelectedGenre(genre) {
  return {
    type: actionTypes.SET_SELECTED_GENRE,
    genre
  };
}

function mergeActivitiesByGenre(activities, genre) {
  return {
    type: actionTypes.MERGE_GENRE_ACTIVITIES,
    activities,
    genre
  };
}

export const fetchActivitiesByGenre = (nextHref, genre) => (dispatch, getState) => {
  const requestType = requestTypes.GENRES;
  const initHref = unauthApiUrl(`tracks?linked_partitioning=1&limit=20&offset=0&tags=${genre}`, '&');
  const url = nextHref || initHref;
  const requestInProcess = getState().request[requestType];

  if (requestInProcess) { return; }

  dispatch(setRequestInProcess(true, requestType));

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(trackSchema));
      dispatch(mergeEntities(normalized.entities));
      dispatch(mergeActivitiesByGenre(normalized.result, genre));
      dispatch(setPaginateLink(data.next_href, genre));
      dispatch(setRequestInProcess(false, requestType));
    });
};
