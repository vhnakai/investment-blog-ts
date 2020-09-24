import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Home from '../Pages/Home';
import ViewArticle from '../Pages/ViewArticle';
import { Route, Switch } from 'react-router-dom';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/:id" component={ViewArticle} />
  </Switch>
);

export default Routes;