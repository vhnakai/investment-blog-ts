import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from '../Pages/Dashboard';
import CreateArticle from '../Pages/CreateArticle';
import EditArticle from '../Pages/EditArticle';
import ViewArticle from '../Pages/ViewArticle';
import NotFounded from "../Pages/NotFounded";
import UploadImage from '../Pages/UploadImage';
import Singup from '../Pages/Signup';
import { Route, Switch } from 'react-router-dom';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/create" component={CreateArticle} />
    <Route path="/edit/:id" component={EditArticle} />
    <Route path="/singup" component={Singup} />
    <Route path="/UploadImage" component={UploadImage} />
    <Route path="/view/:id" component={ViewArticle} />
    <Route  component={NotFounded} />
  </Switch>
);

export default Routes;
