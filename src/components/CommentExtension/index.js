import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import map from '../../services/map';
import { getCommentProperty } from '../../services/string';
import { Artwork } from '../../components/Artwork';
import { LoadingSpinner } from '../../components/LoadingSpinner';

function CommentExtension({
  activity,
  commentIds,
  commentEntities,
  userEntities,
  requestsInProcess,
  nextHrefs,
  onFetchComments
}) {
  if (!commentIds) {
    return <LoadingSpinner isLoading={requestInProcess} />;
  }

  const requestInProcess = requestsInProcess[getCommentProperty(activity.id)];
  const nextHref = nextHrefs[getCommentProperty(activity.id)];

  const moreButtonProps = {
    onClick: () => onFetchComments(activity.id, nextHref),
    requestInProcess
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
              {comment.body}
            </div>
          </div>
        );
      }, commentIds)}
      <div className="comment-extension-more">
        <MoreButton { ...moreButtonProps } />
      </div>
    </div>
  );
}

function MoreButton({ onClick, requestInProcess }) {
  return (
    <div>
      {
        requestInProcess ?
        <noscript /> :
        <button className="ghost" onClick={() => onClick()}>
          More
        </button>
      }
      <LoadingSpinner isLoading={requestInProcess} />
    </div>
  );
}

function mapStateToProps(state, props) {
  const { activity } = props;

  return {
    activity,
    commentIds: state.comment.comments[activity.id],
    commentEntities: state.entities.comments,
    userEntities: state.entities.users,
    requestsInProcess: state.request,
    nextHrefs: state.paginate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchComments: bindActionCreators(actions.fetchComments, dispatch),
    // createComment: bindActionCreators(actions.createComment, dispatch),
  };
}

CommentExtension.propTypes = {
  // createComment: React.PropTypes.func,
  onFetchComments: React.PropTypes.func,
  activity: React.PropTypes.object,
  commentIds: React.PropTypes.array,
  commentEntities: React.PropTypes.object,
  userEntities: React.PropTypes.object,
  requestsInProcess: React.PropTypes.object,
  nextHrefs: React.PropTypes.object,
};

const CommentExtensionContainer = connect(mapStateToProps, mapDispatchToProps)(CommentExtension);

export {
  CommentExtension,
  CommentExtensionContainer
};