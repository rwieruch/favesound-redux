import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { GENRES, DEFAULT_GENRE } from '../constants/genre';
import { browse } from '../constants/pathnames';

export class Header extends React.Component {

  constructor(props) {
    super(props);
    this.renderMenuItemBrowse = this.renderMenuItemBrowse.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  renderLogo() {
    return (
      <Link to={browse + '?genre=' + this.props.genre}>
        <h1>Favesound</h1>
      </Link>
    );
  }

  renderMenuItemBrowse(genre, idx) {
    if (this.props.pathname !== browse) { return; }

    return (
      <Link
        key={idx}
        to={browse + '?genre=' + genre}
        className={(genre === this.props.genre ? "menu-item menu-item-selected" : "menu-item")}
      >
        {genre}
      </Link>
    );
  }

  renderAction() {
    const { currentUser, login, logout } = this.props;

    if (currentUser) {
      return (
        <a href="#" onClick={() => logout()}>
          Logout
        </a>
      );
    } else {
      return (
        <a href="#" onClick={() => login()}>
          Login
        </a>
      );
    }
  }

  renderHeader() {
    return (
      <div className="header-content">
        <div>
          {this.renderLogo()}
        </div>
        <div>
          {GENRES.map(this.renderMenuItemBrowse)}
        </div>
        <div>
          {this.renderAction()}
        </div>
      </div>
    );
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
    currentUser: state.session.get('user'),
    activitiesByGenreNextHrefs: state.browse.get('activitiesByGenreNextHrefs')
  };
}

export const HeaderContainer = connect(mapStateToProps, actions)(Header);


Header.defaultProps = {
  genre: DEFAULT_GENRE
};
