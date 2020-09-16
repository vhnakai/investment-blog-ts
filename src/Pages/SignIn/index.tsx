import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { auth, isAuthenticated } from '../../services/auth';

interface User {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth(user.email, user.password).then(res => {
      console.log(res);
      window.location.href = '/';
    });
  };

  return (
    <Container fluid="sm">
      <Row className="text-center">
        <Col>
          <div style={{ padding: 48 }}>
            <h1>LOGO AQUI</h1>
            <h4 className="mb">Bem-vindo</h4>
          </div>

          <Form
            style={{ maxWidth: 320, paddingTop: 24, margin: 'auto' }}
            onSubmit={onSubmit}
          >
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Login"
                required
                value={user.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUser({ ...user, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={user.password}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setUser({ ...user, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" variant="primary" size="lg" block>
                Entrar
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
