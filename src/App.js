import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Start from './pages/Start';
import Auth from './pages/Auth';
import {withRouter} from 'react-router-dom';


function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Start} />
        <Route path="/auth" component={Auth} />
        <Route path="/home" component={Main} />
      </Switch>
    </>
  );
}

export default withRouter(App);
