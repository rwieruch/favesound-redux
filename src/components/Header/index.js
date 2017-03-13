import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import { GENRES, DEFAULT_GENRE } from '../../constants/genre';
import { browse, dashboard, callback } from '../../constants/pathnames';

function getGenreLink(genre) {
  return browse + '?genre=' + genre;
}

function Logo({ genre }) {
  return (
    <div>
      <Link to={getGenreLink(genre)}>
        <h1>Favesound</h1>
      </Link>
    </div>
  );
}

function MenuItem({ pathname, selectedGenre, genre }) {
  if (pathname === dashboard || pathname === callback) { return null; }

  const linkClass = classNames(
    'menu-item',
    {
      'menu-item-selected': genre === selectedGenre
    }
  );

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

function MenuList({ selectedGenre, pathname }) {
  return (
    <div>
      {map((genre, key) => {
        const menuItemProps = { genre, selectedGenre, pathname, key };
        return <MenuItem { ...menuItemProps } />;
      }, GENRES)}
    </div>
  );
}

function Header({ currentUser, genre, pathname, onLogin, onLogout }) {
  return (
    <div className="header">
      <div className="header-content">
        <Logo genre={genre} />
        <MenuList selectedGenre={genre} pathname={pathname} />
        <SessionAction currentUser={currentUser} onLogin={onLogin} onLogout={onLogout} />
      </div>
    </div>
  );
}

function mapStateToProps(state, props) {
  return {
    currentUser: state.session.user,
    genre: props.genre,
    pathname: props.pathname
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
  genre: React.PropTypes.string,
  pathname: React.PropTypes.string,
  onLogin: React.PropTypes.func,
  onLogout: React.PropTypes.func,
};

Header.defaultProps = {
  genre: DEFAULT_GENRE
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
