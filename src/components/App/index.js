import Cookies from "js-cookie";
import React, { Component, Fragment } from "react";

import Header from "../Header";
import Player from "../Player";
import Volume from "../Volume";
import Router from "../Router";
import Playlist from "../Playlist";
import { OAUTH_TOKEN } from "../../constants/authentication";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.onAppClose = this.onAppClose.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onAppClose);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onAppClose);
  }

  onAppClose() {
    Cookies.remove(OAUTH_TOKEN);
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Router />
        <Playlist />
        <Volume />
        <Player />
      </Fragment>
    );
  }
}
