import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import map from '../../services/map';
import { getCommentProperty } from '../../services/string';
import ButtonMore from '../../components/ButtonMore';
import Artwork from '../../components/Artwork';
import { fromNow } from '../../services/track';

function CommentExtension({
  activity,
  commentIds,
  commentEntities,
  userEntities,
  requestInProcess,
  nextHref,
  onFetchComments
}) {
  const moreButtonProps = {
    onClick: () => onFetchComments(activity.id, nextHref),
    isLoading: requestInProcess || !commentIds,
    nextHref,
  };

  return (
    <div className="comment-extension">
      {map((commentId, key) => {
        const comment = commentEntities[commentId];
        const user = userEntities[comment.user];
        return (
          <div key={key} className="comment-extension-item">
            <Artwork image={user.avatar_url} title={user.username} size={40} />
            <div className="comment-extension-item-body">
              <div className="comment-extension-item-body-header">
                <span>{user.username}</span>
                <span>{fromNow(comment.created_at)}</span>
              </div>
              <div>
                {comment.body}
              </div>
            </div>
          </div>
        );
      }, commentIds)}
      <ButtonMore { ...moreButtonProps } />
    </div>
  );
}

function mapStateToProps(state, props) {
  const { activity } = props;
  const requestInProcess = state.request[getCommentProperty(activity.id)];
  const nextHref = state.paginate[getCommentProperty(activity.id)];

  return {
    activity,
    commentIds: state.comment.comments[activity.id],
    commentEntities: state.entities.comments,
    userEntities: state.entities.users,
    requestInProcess,
    nextHref,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchComments: bindActionCreators(actions.fetchComments, dispatch),
  };
}

CommentExtension.propTypes = {
  onFetchComments: PropTypes.func,
  activity: PropTypes.object,
  commentIds: PropTypes.array,
  commentEntities: PropTypes.object,
  userEntities: PropTypes.object,
  requestInProcess: PropTypes.bool,
  nextHref: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentExtension);
