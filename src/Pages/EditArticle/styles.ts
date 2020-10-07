import styled from "styled-components";
import { Form, Button, Container, Jumbotron } from 'react-bootstrap';

export const EditArticleForm = styled(Form)``;
export const EditArticleButton = styled(Button)``;
export const EditArticleContainer = styled(Container)`
  justify-content: center;
  position: relative;
  min-height: 100vh;
`;
export const EditArticleJumbotron = styled(Jumbotron)`
  background: #6A1EDF;
  color: #f3f3f3;
  text-align: center;
`;

export const ItemGrid = styled.ul`

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;

  li {
    background: #f5f5f5;
    border: 2px solid #f5f5f5;
    height: 180px;
    border-radius: 8px;
    padding: 32px 24px 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    text-align: center;

    cursor: pointer;
  }

  li span {
    flex: 1;
    margin-top: 12px;

    display: flex;
    align-items: center;
    color: var(--title-color)
  }

  li.selected {
    background: #f3f3f3;
    border: 2px solid #6A1EDF;
  }

`;
