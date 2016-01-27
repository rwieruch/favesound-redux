import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

export const Favesound = React.createClass({
  getUser: function() {
    return this.props.user;
  },
  getSession: function() {
    return this.props.session;
  },
  render: function() {
    return <div>
        { this.getSession() ?
          <div>Session is there</div> :
          <button onClick={() => this.props.auth()}>
            Login
          </button>
        }
      </div>;
  }
});

function mapStateToProps(state) {
  return {
    user: state.auth.get('user'),
    session: state.auth.get('session')
  };
}

export const FavesoundContainer = connect(mapStateToProps, actions)(Favesound);