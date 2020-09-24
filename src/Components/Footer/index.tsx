import React from 'react';
//import { Link } from 'react-router-dom';
import { Container, Row, Col, } from 'react-bootstrap';


const Footer: React.FC = () => {

  return (
    <footer className='fixed-bottom'>
      <Container fluid>
        <Row>
          <Col sm={9}>
            <h2>We are</h2>
            <p>Investing in what you believe is our focus.</p>

          </Col>
          <Col sm={3}>
            <h4>Facebook</h4>
            <h4>Twitter</h4>
            <h4>Instagram</h4>
          </Col>

        </Row>
      </Container>
    </footer>

  );
};

export default Footer;
