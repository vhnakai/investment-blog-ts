import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import CreateArticle from "./Pages/CreateArticle";
import EditArticle from "./Pages/EditArticle";
import ViewArticle from "./Pages/ViewArticle";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const App: React.FC = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/create" exact component={CreateArticle} />
      <Route path="/edit/:id" component={EditArticle} />
      <Route path="/:id" component={ViewArticle} />
    </Switch>
  </Router>
);

export default App;
