import React from "react";
import { Pagination } from "react-bootstrap";

interface PaginationProps {
  totalPosts : number;
  paginate: (value: number)=>void;
}


const CustomPagination: React.FC<PaginationProps> = ({totalPosts, paginate}: PaginationProps) => {

  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPosts / 10); i++){
    pageNumbers.push(i);
  }

  return(
    <Pagination>
      {
        pageNumbers.map(number => (
          <Pagination.Item key={number} onClick={() => paginate(number)} >
            {number}
          </Pagination.Item>
        ))
      }
    </Pagination>
  );

};

export default CustomPagination;
