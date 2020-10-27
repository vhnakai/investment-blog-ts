import styled from "styled-components";
import { Form , FormControl} from 'react-bootstrap';

export const StyledForm = styled(Form)`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  padding: 25px;
`;

export const StyledFormControl = styled(FormControl)`
  text-align: center;
  background: #f3f3f3;
  border-radius: 10px;
  border: 2px solid #f3f3f3;
  color: #f4ede8;
    &::placeholder {
      color: #666360;
    }
`;
