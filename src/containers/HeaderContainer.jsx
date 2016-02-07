import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

export class Header extends React.Component {

  toggleSession(currentUser, login, logout) {
    if (currentUser) {
      logout();
    } else {
      login();
    }
  }

  renderHeader() {
    const { currentUser, login, logout } = this.props;

    return (<div className="header-content">
      <div>
        <h1>{currentUser ? 'Hey ' + currentUser.username : 'Favesound'}</h1>
      </div>
      <div>
        <a
          href="#"
          onClick={this.toggleSession.bind(this, currentUser, login, logout)}
        >
          {currentUser ? "Logout" : "Login"}
        </a>
      </div>
    </div>);
  }

  render() {
    return <div className="header">{this.renderHeader()}</div>;
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.session.get('user')
  };
}

export const HeaderContainer = connect(mapStateToProps, actions)(Header);
