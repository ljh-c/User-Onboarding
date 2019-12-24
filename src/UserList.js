import React, { useState } from 'react';
import { 
  Card, CardBody, 
  CardTitle, CardText,
  Pagination, PaginationItem, PaginationLink 
} from 'reactstrap';

function UserList({ users }) {
  const pageSize = 1;
  const pageCount = Math.ceil(users.length / pageSize);
  const [currentPage, setCurrentPage] = useState(0);

  const handleClick = (event, index) => {
    event.preventDefault();
    setCurrentPage(index);
  };

  return (<>
    {users.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    .map(user => {
      return (
        <Card key={user.id}>
          <CardBody>
          <CardTitle>
            <h2>{user.username}</h2>
          </CardTitle>
          <CardText>{user.email}</CardText>
          <CardText>{user.password}</CardText>
          </CardBody>
        </Card>
    )})}

    <Pagination aria-label="page navigation">
    
    <PaginationItem disabled={currentPage <= 0}>
      <PaginationLink 
        previous href="#" 
        onClick={event => handleClick(event, currentPage - 1)} />
    </PaginationItem>

    {[...Array(pageCount)].map((page, index) => {
      return (<PaginationItem active={index === currentPage} key={index}>
        <PaginationLink 
          onClick={event => handleClick(event, index)} 
          href="#">
            {index + 1}
        </PaginationLink>
      </PaginationItem>)
      }
    )}

    <PaginationItem disabled={currentPage >= (pageCount - 1)}>
      <PaginationLink 
        onClick={event => handleClick(event, currentPage + 1)}
        next href="#" />
    </PaginationItem>

    </Pagination>
  </>);  
}

export default UserList;

// users.map(user => {
//   return (
//     <Card>
//       <CardBody>
//         <CardTitle>
//           <h2>{user.username}</h2>
//         </CardTitle>
//         <CardText>{user.email}</CardText>
//         <CardText>{user.password}</CardText>
//       </CardBody>
//     </Card>
//   );
// });