import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Home from '../Pages/Home';
import ViewArticle from '../Pages/ViewArticle';
import SignIn from '../Pages/SignIn';
import NotFounded from "../Pages/NotFounded";
import ForgotPassword from "../Pages/ForgotPassword";
import { Route, Switch } from 'react-router-dom';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signin" component={SignIn} />
    <Route path="/forgot" component={ForgotPassword}/>
    <Route path="/view/:id" component={ViewArticle} />
    <Route component={NotFounded} />
  </Switch>
);

export default Routes;
