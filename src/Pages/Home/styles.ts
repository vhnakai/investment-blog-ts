import styled , {css} from 'styled-components';
import { Container, Jumbotron, Row, Col, Card } from 'react-bootstrap';

interface CardProps {
  types: 'IMPACTO SOCIAL' | 'ALTERNATIVOS' | 'DICAS' | 'IDEIAS';
}

export const HomeContainer = styled(Container)`
+  justify-content: center;
  position: relative;
  min-height: 100vh;
`;
export const HomeJumbotron = styled(Jumbotron)`
  background: #6A1EDF;
  color: #f3f3f3;
  text-align: center;
`;
export const HomeRow = styled(Row)`
`;
export const HomeCol = styled(Col)`
  padding: 20px;
  text-align: center;
  a {
    text-decoration: none;
    color: #f3f3f3;
  }
`;

export const HomeCard = styled(Card)<CardProps>`
  margin-top: 8px;
  background: #222;
  color: #f3f3f3;
  text-align: center;
  a {
    text-decoration: 'none';
    color: #f3f3f3;
  }

  p {
    text-align: justify;
  }

  ${props => props.types === 'IMPACTO SOCIAL' && css`
    border: 'danger';
  ` }
  ${props => props.types === 'ALTERNATIVOS' && css`
    border: 'warning';
  ` }
  ${props => props.types === 'DICAS' && css`
    border: 'success';
  ` }
  ${props => props.types === 'IDEIAS' && css`
    border: 'info';
  ` }

`;

export const AdContainer = styled.div`
  padding: 48px;
`;

