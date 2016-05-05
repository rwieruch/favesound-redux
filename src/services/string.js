import * as requestTypes from '../constants/requestTypes';

function getCommentProperty(commentId) {
  return `${commentId}/${requestTypes.COMMENTS}`;
}

export {
  getCommentProperty
};
