import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import { UserPreview } from './preview';

function mapStateToProps(state, props) {
  return {
    followings: state.user.followings,
    user: props.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFollow: bindActionCreators(actions.follow, dispatch)
  };
}

const UserPreviewContainer = connect(mapStateToProps, mapDispatchToProps)(UserPreview);

export {
  UserPreviewContainer
};
