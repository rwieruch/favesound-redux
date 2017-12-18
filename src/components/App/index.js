import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { DEFAULT_GENRE } from '../../constants/genre';
import Browse from '../../components/Browse';
import Callback from '../../components/Callback';
import Dashboard from '../../components/Dashboard';
import Header from '../../components/Header';
import Player from '../../components/Player';
import Playlist from '../../components/Playlist';
import Volume from '../../components/Volume';
import { browse, dashboard, callback } from '../../constants/pathnames';
import AutoLogin from '../../components/AutoLogin';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <AutoLogin />
        <Switch>
          <Route exact path={`${browse}/:genre`} component={Browse} />
          <Route exact path={dashboard} component={Dashboard} />
          <Route exact path={callback} component={Callback} />
          <Redirect to={`${browse}/${DEFAULT_GENRE}`} />
        </Switch>
        <Playlist />
        <Volume />
        <Player />
      </div>
    </BrowserRouter>
  );
}

export default App;
