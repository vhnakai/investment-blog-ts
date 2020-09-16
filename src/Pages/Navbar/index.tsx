import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as Navb, Nav } from 'react-bootstrap';
import { isAuthenticated } from '../../services/auth';

const Navbar: React.FC = () => {
  return (
    <Navb bg="dark" variant="dark">
      <Navb.Brand as={Link} to="/" className="navbar-brand">
        Investment Blog
      </Navb.Brand>
      <Navb.Collapse className="justify-content-end">
        <Nav className="justify-content-end">
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Articles
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={isAuthenticated() ? '/create' : '/signin'}>
              Create Article
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navb.Collapse>
    </Navb>
  );
};

export default Navbar;
