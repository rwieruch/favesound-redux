import React from 'react';
import { autoLogin } from '../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class AutoLogin extends React.Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    if (this.props.isAuthed) {
      return <Redirect to="/dashboard" />;
    }
    return null;
  }
}

const mapStateToProps = state => ({
  isAuthed: !!state.session.user,
});

export default connect(mapStateToProps, { autoLogin })(AutoLogin);
