import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from '../Pages/Dashboard';
import CreateArticle from '../Pages/CreateArticle';
import EditArticle from '../Pages/EditArticle';
import ViewArticle from '../Pages/ViewArticle';
import Singup from '../Pages/Signup';
import { Route, Switch } from 'react-router-dom';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/create" component={CreateArticle} />
    <Route path="/edit/:id" component={EditArticle} />
    <Route path="/singup" component={Singup} />
    <Route path="/:id" component={ViewArticle} />
  </Switch>
);

export default Routes;
