import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import { UserPreview } from './preview';

function mapStateToProps(state, ownProps) {
  return {
    followings: state.user.followings,
    user: ownProps.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    follow: bindActionCreators(actions.follow, dispatch)
  };
}

const UserPreviewContainer = connect(mapStateToProps, mapDispatchToProps)(UserPreview);

export {
  UserPreviewContainer
};
