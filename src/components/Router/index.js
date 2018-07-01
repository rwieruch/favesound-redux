import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Browse from "../Browse";
import Callback from "../Callback";
import Dashboard from "../Dashboard";
import { DEFAULT_GENRE } from "../../constants/genre";
import { browse, dashboard, callback } from "../../constants/pathnames";

const Router = () => (
  <Switch>
    <Route exact path={`${browse}/:genre`} component={Browse} />
    <Route exact path={dashboard} component={Dashboard} />
    <Route exact path={callback} component={Callback} />
    <Redirect to={`${browse}/${DEFAULT_GENRE}`} />
  </Switch>
);

export default Router;
