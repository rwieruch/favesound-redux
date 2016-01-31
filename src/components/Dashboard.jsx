import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {Followings} from '../components/Followings';

export class Dashboard extends React.Component {

  render() {
    const { currentUser, followings } = this.props;

    if (currentUser) {
      return <div>
        <div>Hello {currentUser.username}</div>
        <Followings {...this.props} />
      </div>;
    } else {
      return <button onClick={() => this.props.initSession()}>Login</button>;
    }
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.session.get('user'),
    followings: state.user.get('followings')
  };
}

export const DashboardContainer = connect(mapStateToProps, actions)(Dashboard);