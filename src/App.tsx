import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Routes from './routes'
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Routes />
    <Footer />
  </Router>
);

export default App;
