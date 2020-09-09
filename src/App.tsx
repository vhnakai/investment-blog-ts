import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Routes from './routes'
import Navbar from "./Pages/Navbar";

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Container fluid>
      <Row>
        <Routes />
      </Row>
    </Container>
  </Router>
);

export default App;
