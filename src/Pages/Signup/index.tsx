import React, { useState } from 'react';
import api from '../../services/api';
import { Form, Button } from 'react-bootstrap';

interface User {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    api
      .post('/users/register', newUser)
      .then(res => {
        console.log(res.data);

        window.location.href = '/';
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <h3>Register</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Nome: </Form.Label>
          <Form.Control
            type="text"
            required
            value={user.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="text"
            required
            value={user.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Senha: </Form.Label>
          <Form.Control
            type="password"
            required
            value={user.password}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setUser({ ...user, password: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group>
          <Button type="submit" variant="primary">
            Cadastrar
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default Signup;
