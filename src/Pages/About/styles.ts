import styled from "styled-components";
import { Container, Jumbotron } from 'react-bootstrap';

export const AboutContainer = styled(Container)`
  justify-content: center;
  position: relative;
  min-height: 100vh;
  text-align: justify;
  h3{
    text-indent: 1.5em;
    font-size: larger;
    margin-bottom: 1em;
  }
`;
export const AboutJumbotron = styled(Jumbotron)`
  background: #6A1EDF;
  color: #f3f3f3;
  text-align: center;

`;
