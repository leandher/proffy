import React from 'react';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';

import Login from '../pages/Login';

const AuthRoutes: React.FC = () => (
  <BrowserRouter>
    <Route path="/" exact component={Login} />

    <Route path="/**">
      <Redirect to="/" />
    </Route>
  </BrowserRouter>
);

export default AuthRoutes;
