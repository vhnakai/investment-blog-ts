import React from 'react';
import { Form , FormControl} from 'react-bootstrap';

interface SearchFormProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>)=>void;
  value: string;
}

const SearchForm: React.FC<SearchFormProps> = ({onChange, value}:SearchFormProps) => {

  return (
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={onChange} value={value}/>
      </Form>
  );
};

export default SearchForm;
