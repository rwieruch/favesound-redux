import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import map from '../../services/map';
import { getCommentProperty } from '../../services/string';
import { Artwork } from '../../components/Artwork';
import { LoadingSpinner } from '../../components/LoadingSpinner';

function CommentExtension({ commentIds, commentEntities, userEntities, requestsInProcess }) {
  return (
    <div>
      {map((commentId, key) => {
        const comment = commentEntities[commentId];
        const user = userEntities[comment.user];
        const requestInProcess = requestsInProcess[getCommentProperty(commentId)];
        console.log(requestInProcess);
        if (requestInProcess) {
          return <LoadingSpinner isLoading={requestInProcess} />;
        }

        return (
          <div key={key} className="comment">
            <Artwork image={user.avatar_url} title={user.username} size={40} />
            <div className="comment-body">
              {comment.body}
            </div>
          </div>
        );
      }, commentIds)}
    </div>
  );
}

function mapStateToProps(state, props) {
  const { activity } = props;

  return {
    commentIds: state.comment.comments[activity.id],
    commentEntities: state.entities.comments,
    userEntities: state.entities.users,
    requestsInProcess: state.request
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createComment: bindActionCreators(actions.createComment, dispatch),
  };
}

CommentExtension.propTypes = {
  // createComment: React.PropTypes.func,
  commentIds: React.PropTypes.array,
  commentEntities: React.PropTypes.object,
  userEntities: React.PropTypes.object,
  requestsInProcess: React.PropTypes.object,
};

const CommentExtensionContainer = connect(mapStateToProps, mapDispatchToProps)(CommentExtension);

export {
  CommentExtension,
  CommentExtensionContainer
};