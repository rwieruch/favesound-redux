import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import { GENRES, DEFAULT_GENRE } from '../constants/genre';
import { browse } from '../constants/pathnames';

const renderLogo = (genre) => {
  return (
    <Link to={browse + '?genre=' + genre}>
      <h1>Favesound</h1>
    </Link>
  );
};

const renderMenuItemBrowse = (pathname, selectedGenre) => (genre, idx) => {
  if (pathname !== browse) { return; }

  return (
    <Link
      key={idx}
      to={browse + '?genre=' + genre}
      className={(genre === selectedGenre ? "menu-item menu-item-selected" : "menu-item")}
    >
      {genre}
    </Link>
  );
};

const renderAction = (currentUser, login, logout) => {
  if (currentUser) {
    return (
      <a href="#" onClick={logout}>
        Logout
      </a>
    );
  } else {
    return (
      <a href="#" onClick={login}>
        Login
      </a>
    );
  }
};

export const Header = ({ currentUser, genre, pathname, login, logout }) => {
  return (
    <div className="header">
      <div className="header-content">
        <div>
          {renderLogo(genre)}
        </div>
        <div>
          {GENRES.map(renderMenuItemBrowse(pathname, genre))}
        </div>
        <div>
          {renderAction(currentUser, login, logout)}
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    currentUser: state.session.user,
    genre: ownProps.genre,
    pathname: ownProps.pathname
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(actions.login, dispatch),
    logout: bindActionCreators(actions.logout, dispatch)
  };
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

Header.defaultProps = {
  genre: DEFAULT_GENRE
};
