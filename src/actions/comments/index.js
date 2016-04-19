import * as actionTypes from '../../constants/actionTypes';

export function mergeComments(comments) {
    return {
        type: actionTypes.MERGE_COMMENTS,
        comments
    };
};