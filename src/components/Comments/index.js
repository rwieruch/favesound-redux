import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Comments({ comments }) {
    return <p>foo</p>;
}

function mapStateToProps(state) {
    return {
        comments: state.comments,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createComment: bindActionCreators(createComment, dispatch),
    };
}

Comments.propTypes = {
    createComment: React.PropTypes.func,
};

const CommentsContainer = connect(mapStateToProps, mapDispatchToProps)(Comments);

export {
    Comments,
    CommentsContainer
};