import React from 'react';

export default class Header extends React.Component {

  renderHeader() {

    const { currentUser, login, logout } = this.props;

    return (<div className='header-content'>
      <div>
        <h1>{currentUser ? 'Hey ' + currentUser.username : 'Favesound'}</h1>
      </div>
      <div>
        <a href="#" onClick={() => currentUser ? logout() : login() }>{currentUser ? 'Logout': 'Login'}</a>
      </div>
    </div>);
  }

  render() {
    return <div className='header'>{this.renderHeader()}</div>;
  }

}