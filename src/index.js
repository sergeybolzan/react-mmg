import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import store from './store';
import './index.css';
import StartGame from './components/container/StartGame';
import Game from './components/container/Game';
import Results from './components/container/Results';

const history = createHistory({ basename: process.env.PUBLIC_URL });

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={StartGame} />
        <Route path="/game" component={Game} />
        <Route path="/results" component={Results} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
