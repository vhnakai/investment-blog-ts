import styled from 'styled-components';
import { Container, Jumbotron, CardColumns, Card, Button } from 'react-bootstrap';

export const DashboardContainer = styled(Container)`
  margin-top: 40px;
`;
export const DashboardJumbotron = styled(Jumbotron)``;
export const DashboardCardColumns = styled(CardColumns)``;
export const DashboardCard = styled(Card)`
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
export const DashboardButton = styled(Button)`
  margin: 4px;
`;
