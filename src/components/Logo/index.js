import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/soundcloud.png";

const Logo = () => (
  <Fragment>
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="FaveSound" />
        <h1>FaveSound</h1>
      </Link>
    </div>
    <div className="github-link">
      <Link to="https://github.com/rwieruch/favesound-redux" target="_blank">
        <img
          src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png"
          alt="Fork me on GitHub"
        />
      </Link>
    </div>
  </Fragment>
);

export default Logo;
