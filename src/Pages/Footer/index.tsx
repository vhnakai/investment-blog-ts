import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container,Row,Col,} from 'react-bootstrap';
// import ReactMarkdown from "react-markdown";

const Footer: React.FC = () => {

  return (
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
  );
};

export default Footer;
