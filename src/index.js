/* eslint-disable */
import SC from "soundcloud";
import { AppContainer } from "react-hot-loader";
/* eslint-enable */

import { render } from "react-dom";
import Favicon from "react-favicon";
import { Provider } from "react-redux";
import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";

import ico from "../src/assets/sc_ico.png";

import configureStore from "./stores/configureStore";

import "../styles/index.scss";
import App from "./components/App";

const store = configureStore();

const app = (
  <AppContainer>
    <Fragment>
      <Favicon url={ico} />
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Fragment>
  </AppContainer>
);

render(app, document.getElementById("app"));

if (module.hot) {
  module.hot.accept("./components/App", () => {
    // eslint-disable-next-line
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
