import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { ForgotPassForm, ForgotPassButton, ForgotPassContainer, ForgotPassJumbotron } from './styles';

const ResetPassword: React.FC = () => {

  const params: any = useParams();
  const [password, setPassword] = useState('');
  const [confirmedPassword, setconfirmedPassword] = useState('');




  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO Confirm Password Verification and Password Interface
    api
      .post('/reset/' + params.id , password)
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
        <ForgotPassForm onSubmit={onSubmit}>
          <ForgotPassForm.Group>
            <ForgotPassForm.Label>Nova senha:  </ForgotPassForm.Label>
            <ForgotPassForm.Control
                type="password"
                placeholder="Nova senha"
                required
                value={password}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setPassword(e.target.value)
                }
              />
          </ForgotPassForm.Group>
          <ForgotPassForm.Group>
            <ForgotPassForm.Label>Confirme a senha nova:  </ForgotPassForm.Label>
            <ForgotPassForm.Control
                type="password"
                placeholder="Confirme a senha"
                required
                value={password}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setconfirmedPassword(e.target.value)
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

export default ResetPassword;
