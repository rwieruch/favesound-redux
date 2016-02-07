import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

export class Header extends React.Component {

  renderHeader() {
    const { currentUser, login, logout } = this.props;

    if (currentUser) {
      return (
        <div className="header-content">
          <div>
            <h1>Favesound</h1>
          </div>
          <div>
            <a href="#" onClick={() => logout()}>
              Logout
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header-content">
          <div>
            <h1>Favesound</h1>
          </div>
          <div>
            <a href="#" onClick={() => login()}>
              Login
            </a>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="header">
        {this.renderHeader()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.session.get('user')
  };
}

export const HeaderContainer = connect(mapStateToProps, actions)(Header);
