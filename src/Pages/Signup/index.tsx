import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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

  const { register , handleSubmit} = useForm();


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    api
      .post('/users/', newUser)
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
      <Form onSubmit={handleSubmit(onSubmit)}>
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
            ref={register({
              required: "Coloque seu e-mail",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Insira um email válido.",
              },
             })}
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
            ref={register({required: "Senha é obrigatória.", minLength: 6})}
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
