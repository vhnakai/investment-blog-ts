import React from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const SignIn: React.FC = () => {
  return (
    <Container fluid="sm">
      <Row className="text-center" >
        <Col >
          <div style={{ padding: 48 }}>
            <h1 >LOGO AQUI</h1>
            <h4 className="mb" >Bem-vindo</h4>
          </div>

          <Form style={{ maxWidth: 320, paddingTop: 24, margin: "auto" }}>
            <Form.Group >
              <Form.Control type="text" placeholder="Login" required />
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                block
              >
                Entrar
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container >
  );
}

export default SignIn;
