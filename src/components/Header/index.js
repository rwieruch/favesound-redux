import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/index';
import { GENRES, DEFAULT_GENRE } from '../../constants/genre';
import { browse, dashboard } from '../../constants/pathnames';

function getGenreLink(genre) {
  return `${browse}/${genre || DEFAULT_GENRE}`;
}

function Logo() {
  return (
    <div>
      <Link to="/">
        <h1>Favesound</h1>
      </Link>
    </div>
  );
}

function MenuItem({ genre, selectedGenre }) {
  const linkClass = classNames('menu-item', {
    'menu-item-selected': genre === selectedGenre,
  });

  return (
    <Link to={getGenreLink(genre)} className={linkClass}>
      {genre}
    </Link>
  );
}

function Login({ onLogin }) {
  return (
    <Link onClick={onLogin} to={dashboard}>
      Login
    </Link>
  );
}

function Logout({ onLogout }) {
  return (
    <Link onClick={onLogout} to={browse}>
      Logout
    </Link>
  );
}

function SessionAction({ currentUser, onLogin, onLogout }) {
  return (
    <div>
      { currentUser ? <Logout onLogout={onLogout} /> : <Login onLogin={onLogin} /> }
    </div>
  );
}

function MenuList({ selectedGenre }) {
  if (!selectedGenre) return null;
  return (
    <div>
      {map((genre, key) => {
        const menuItemProps = { genre, selectedGenre, key };
        return <MenuItem {...menuItemProps} />;
      }, GENRES)}
    </div>
  );
}

function Header({ currentUser, selectedGenre, onLogin, onLogout }) {
  return (
    <div className="header">
      <div className="header-content">
        <Logo />
        <MenuList selectedGenre={selectedGenre} />
        <SessionAction currentUser={currentUser} onLogin={onLogin} onLogout={onLogout} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.session.user,
    selectedGenre: state.browse.selectedGenre
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: bindActionCreators(actions.login, dispatch),
    onLogout: bindActionCreators(actions.logout, dispatch),
  };
}

Header.propTypes = {
  currentUser: React.PropTypes.object,
  onLogin: React.PropTypes.func,
  onLogout: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
