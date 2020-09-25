import styled from 'styled-components';
import { Container, Jumbotron, CardColumns, Card } from 'react-bootstrap';

export const HomeContainer = styled(Container)``;
export const HomeJumbotron = styled(Jumbotron)`
  background: #6A1EDF;
  color: #f3f3f3;
  text-align: center;
`;
export const HomeCardColumns = styled(CardColumns)``;
export const HomeCard = styled(Card)`
  background: #222;
  color: #f3f3f3;
  a {
    textDecoration: 'none';
    color: #f3f3f3;
  }

  p {
    text-align: justify;
  }
`;
