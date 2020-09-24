import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Routes from './routes'
import Navbar from "./Components/Navbar";

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Routes />
  </Router>
);

export default App;
