import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";

import { login, logout } from "../../actions";
import { browse, dashboard } from "../../constants/pathnames";

import connectImg from "../../assets/btn-connect-m.png";
import disconnectImg from "../../assets/btn-disconnect-m.png";

function mapStateToProps(state) {
  return {
    currentUser: state.session.user
  };
}

@connect(mapStateToProps, { login, logout })
class SessionAction extends Component {
  render() {
    const { currentUser } = this.props;

    if (currentUser) {
      return (
        <div className="session-link">
          <Link onClick={this.props.logout} to={browse}>
            <img src={disconnectImg} alt="Disconnect" />
          </Link>
        </div>
      );
    }

    return (
      <div className="session-link">
        <Link onClick={this.props.login} to={dashboard}>
          <img src={connectImg} alt="Connect" />
        </Link>
      </div>
    );
  }
}

SessionAction.propTypes = {
  currentUser: PropTypes.string,
  login: PropTypes.func,
  logout: PropTypes.func
};

export default SessionAction;
