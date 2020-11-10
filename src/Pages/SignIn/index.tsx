import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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

  const { register, errors, handleSubmit} = useForm();

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

          <SignInForm onSubmit={handleSubmit(onSubmit)}>
            <SignInForm.Group>
              <SignInForm.Control
                type="text"
                placeholder="Email"
                required
                ref={register({required:"E-mail é obrigatório."})}
                value={user.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUser({ ...user, email: e.target.value })
                }
              />
              <SignInForm.Control
                type="password"
                placeholder="Senha"
                required
                ref={register({required: "Senha é obrigatória."})}
                value={user.password}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setUser({ ...user, password: e.target.value })
                }
              />
              {errors.password && (
                <p style={{ color: 'red'}}>{errors.password.message}</p>
              )}
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
