import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {Followings} from '../components/Followings';
import {Activities} from '../components/Activities';

export class Dashboard extends React.Component {

  render() {
    const { currentUser, followings } = this.props;

    if (currentUser) {
      return <div>
        <div>Hello {currentUser.username}</div>
        <Followings {...this.props} />
        <Activities {...this.props} />
      </div>;
    } else {
      return <button onClick={() => this.props.initSession()}>Login</button>;
    }
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.session.get('user'),
    followings: state.user.get('followings'),
    activities: state.user.get('activities')
  };
}

export const DashboardContainer = connect(mapStateToProps, actions)(Dashboard);