import React from 'react';
import { StyledForm, StyledFormControl } from "./styles";
interface SearchFormProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>)=>void;
  value: string;
}

const SearchForm: React.FC<SearchFormProps> = ({onChange, value}:SearchFormProps) => {

  return (
      <StyledForm>
        <StyledFormControl type="text" placeholder="Search" className="mr-sm-2" onChange={onChange} value={value}/>
      </StyledForm>
  );
};

export default SearchForm;
