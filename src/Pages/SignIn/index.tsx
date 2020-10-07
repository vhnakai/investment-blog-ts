import React, { useState } from 'react';
import {
  SignInContainer,
  SignInRow,
  SignInCol,
  SignInForm,
  SignInButton,
  WelcomeContainer,
} from './styles';
import { signin } from '../../services/auth';

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
    signin(user.email, user.password).then(res => {
      console.log(res);
      window.location.href = '/';
    });
  };

  return (
    <SignInContainer fluid="sm">
      <SignInRow className="text-center">
        <SignInCol>
          <WelcomeContainer>
            <h1>LOGO AQUI</h1>
            <h4 className="mb">Bem-vindo</h4>
          </WelcomeContainer>

          <SignInForm onSubmit={onSubmit}>
            <SignInForm.Group>
              <SignInForm.Control
                type="text"
                placeholder="Login"
                required
                value={user.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUser({ ...user, email: e.target.value })
                }
              />
              <SignInForm.Control
                type="password"
                placeholder="Password"
                required
                value={user.password}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setUser({ ...user, password: e.target.value })
                }
              />
            </SignInForm.Group>
            <SignInForm.Group>
              <SignInButton type="submit" variant="primary" size="lg" block>
                Entrar
              </SignInButton>
            </SignInForm.Group>
          </SignInForm>
        </SignInCol>
      </SignInRow>
    </SignInContainer>
  );
};

export default SignIn;
