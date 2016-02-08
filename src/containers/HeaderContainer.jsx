import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { GENRES } from '../constants/browse';

export class Header extends React.Component {

  constructor(props) {
    super(props);
    this.renderMenuItem = this.renderMenuItem.bind(this);
  }

  // fetchActivitiesByGenre(genre) {
  //   const { activitiesByGenreNextHrefs } = this.props;
  //   const nextHref = activitiesByGenreNextHrefs.get(genre);
  //   this.props.fetchActivitiesByGenre(nextHref, genre);
  // }

        // onClick={this.fetchActivitiesByGenre.bind(this, genre)}
  renderMenuItem(genre, idx) {
    return (
      <Link
        key={idx}
        to={'/browse?genre=' + genre}
        className={(genre === this.props.genre ? "selected" : "")}
      >
        {genre}
      </Link>
    );
  }

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
            {GENRES.map(this.renderMenuItem)}
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
    currentUser: state.session.get('user'),
    activitiesByGenreNextHrefs: state.browse.get('activitiesByGenreNextHrefs')
  };
}

export const HeaderContainer = connect(mapStateToProps, actions)(Header);
