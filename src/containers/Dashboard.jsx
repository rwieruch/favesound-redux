import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {Followings} from '../components/Followings';
import {Activities} from '../components/Activities';

export class Dashboard extends React.Component {

  login() {
    this.props.initSession();
  }

  render() {
    const { currentUser, followings } = this.props;

    if (currentUser) {
      return (<div className='dashboard'>
        <h1>Hello {currentUser.username}</h1>
        <div className='dashboard-content'>
          <Activities {...this.props} />
          <Followings {...this.props} />
        </div>
      </div>);
    } else {
      return <button onClick={() => this.login()}>Login</button>;
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