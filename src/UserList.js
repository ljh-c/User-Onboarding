import React from 'react';
import { 
  Card, CardBody, 
  CardTitle, CardText,
  Pagination, PaginationItem, PaginationLink 
} from 'reactstrap';

function UserList({ users }) {
  return users.map(user => {
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h2>{user.username}</h2>
          </CardTitle>
          <CardText>{user.email}</CardText>
          <CardText>{user.password}</CardText>
        </CardBody>
      </Card>
    );
  });
}

export default UserList;