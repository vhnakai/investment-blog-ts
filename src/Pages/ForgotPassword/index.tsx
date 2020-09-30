import React, { useState } from 'react';
import api from '../../services/api';
import { ForgotPassForm, ForgotPassButton, ForgotPassContainer, ForgotPassJumbotron } from './styles';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    api
      .post('/password/forgot', email)
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
        <h3>Recuperar senha</h3>
      </ForgotPassJumbotron>
      <ForgotPassContainer>
        <ForgotPassForm onSubmit={onSubmit}>
          <ForgotPassForm.Group>
            <ForgotPassForm.Label>Email:  </ForgotPassForm.Label>
            <ForgotPassForm.Control
            type="text"
            placeholder="email"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
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

export default ForgotPassword;
