import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Home from "../Pages/Home";
import CreateArticle from "../Pages/CreateArticle";
import EditArticle from "../Pages/EditArticle";
import ViewArticle from "../Pages/ViewArticle";
import { Route, Switch } from 'react-router-dom';

const Routes: React.FC = () => (
  <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/create" exact component={CreateArticle} />
      <Route path="/edit/:id" component={EditArticle} />
      <Route path="/:id" component={ViewArticle} />
  </Switch>
)



export default Routes;
