import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { NotFoundedContainer, NotFoundedJumbotron } from './styles';


const NotFounded: React.FC = () => {
  return (
    <>
      <NotFoundedJumbotron fluid>
        <h3>404</h3>
      </NotFoundedJumbotron>
      <NotFoundedContainer>
        <h2>Pagina não encontrada.</h2>
      </NotFoundedContainer>
    </>
  );
};

export default NotFounded;
