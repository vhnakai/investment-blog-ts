import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { useForm } from 'react-hook-form';
import {
  ForgotPassForm,
  ForgotPassButton,
  ForgotPassContainer,
  ForgotPassJumbotron,
} from './styles';

const ResetPassword: React.FC = () => {
  const params: any = useParams();
  const [password, setPassword] = useState('');
  const [confirmedPassword, setconfirmedPassword] = useState('');

  const { register, errors, getValues, handleSubmit } = useForm();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    api
      .post('api/reset/' + params.id, password)
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
      <ForgotPassJumbotron fluid>
        <h3>Alteração de senha</h3>
      </ForgotPassJumbotron>
      <ForgotPassContainer>
        <ForgotPassForm onSubmit={handleSubmit(onSubmit)}>
          <ForgotPassForm.Group>
            <ForgotPassForm.Label>Nova senha: </ForgotPassForm.Label>
            <ForgotPassForm.Control
              type="password"
              placeholder="Nova senha"
              required
              ref={register({ required: 'Senha é obrigatória.' })}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPassword(e.target.value)
              }
            />
            {errors.password && (
              <p style={{ color: 'white' }}>{errors.password.message}</p>
            )}
          </ForgotPassForm.Group>
          <ForgotPassForm.Group>
            <ForgotPassForm.Label>Confirme a senha nova: </ForgotPassForm.Label>
            <ForgotPassForm.Control
              type="password"
              placeholder="Confirme a senha"
              required
              ref={register({
                required: 'Confirme a senha!',
                validate: {
                  matchesPreviousPassword: value => {
                    const { password } = getValues();
                    return password === value || 'As senhas devem ser iguais!';
                  },
                },
              })}
              value={confirmedPassword}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setconfirmedPassword(e.target.value)
              }
            />
            {errors.passwordConfirmation && (
              <p style={{ color: 'white' }}>
                {errors.passwordConfirmation.message}
              </p>
            )}
          </ForgotPassForm.Group>
          <ForgotPassForm.Group>
            <ForgotPassButton type="submit" variant="primary">
              Recuperar
            </ForgotPassButton>
          </ForgotPassForm.Group>
        </ForgotPassForm>
      </ForgotPassContainer>
    </>
  );
};

export default ResetPassword;
