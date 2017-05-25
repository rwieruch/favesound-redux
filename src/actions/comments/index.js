import { arrayOf, normalize } from 'normalizr';
import commentSchema from '../../schemas/comment';
import * as actionTypes from '../../constants/actionTypes';
import { mergeEntities } from '../../actions/entities';
import { setRequestInProcess } from '../../actions/request';
import { setPaginateLink } from '../../actions/paginate';
import { getLazyLoadingCommentsUrl } from '../../services/api';
import { getCommentProperty } from '../../services/string';

export function setOpenComments(trackId) {
  return {
    type: actionTypes.OPEN_COMMENTS,
    trackId
  };
}

export function mergeComments(comments, trackId) {
  return {
    type: actionTypes.MERGE_COMMENTS,
    comments,
    trackId
  };
}

export const fetchComments = (trackId, nextHref) => (dispatch, getState) => {
  const requestProperty = getCommentProperty(trackId);
  const initUrl = 'tracks/' + trackId + '/comments?linked_partitioning=1&limit=20&offset=0';
  const url = getLazyLoadingCommentsUrl(nextHref, initUrl);
  const requestInProcess = getState().request[requestProperty];

  if (requestInProcess) { return; }

  dispatch(setRequestInProcess(true, requestProperty));

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(commentSchema));
      dispatch(mergeEntities(normalized.entities));
      dispatch(mergeComments(normalized.result, trackId));
      dispatch(setPaginateLink(data.next_href, requestProperty));
      dispatch(setRequestInProcess(false, requestProperty));
    });
};

export const openComments = (trackId) => (dispatch, getState) => {
  const comments = getState().comment.comments[trackId];

  dispatch(setOpenComments(trackId));

  if (!comments) {
    dispatch(fetchComments(trackId));
  }
};
