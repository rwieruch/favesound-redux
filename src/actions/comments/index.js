import { arrayOf, normalize } from 'normalizr';
import commentSchema from '../../schemas/comment';
import * as actionTypes from '../../constants/actionTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import { mergeEntities } from '../../actions/entities';
import { setDeepRequestInProcess } from '../../actions/request'; // TODO
import { setDeepPaginateLink } from '../../actions/paginate'; // TODO
import { getLazyLoadingCommentsUrl } from '../../services/api';

function mergeComments(comments, trackId) {
    return {
        type: actionTypes.MERGE_COMMENTS,
        comments,
        trackId
    };
};

export const fetchComments = (track, nextHref) => (dispatch, getState) => {
  let requestType = requestTypes.COMMENTS;
  let initUrl = 'tracks/' + track.id + '/comments?linked_partitioning=1&limit=20&offset=0';
  let url = getLazyLoadingCommentsUrl(nextHref, initUrl);
  let requestInProcess = getState().request[requestType] && getState().request[requestType][track.id];

  if (requestInProcess) { return; }

  dispatch(setRequestInProcess(true, requestType));

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(commentSchema));
      dispatch(mergeEntities(normalized.entities));
      dispatch(mergeComments(normalized.result, track.id));
      dispatch(setDeepPaginateLink(data.next_href, [paginateLinkTypes.COMMENTS, track.id]));
      dispatch(setDeepRequestInProcess(false, [requestType, track.id]));
    });
}