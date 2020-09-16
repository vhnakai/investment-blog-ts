import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Routes from './routes'
import Navbar from "./Pages/Navbar";
import Footer from "./Pages/Footer";

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Routes />
    <Footer />
  </Router>
);

export default App;
