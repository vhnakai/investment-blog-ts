import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav , Form ,Button , FormControl} from 'react-bootstrap';
import { NavBar } from './styles';
import { checkAuthenticated } from '../../services/auth';

const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

  useEffect(() => {
    checkAuthenticated().then(isAuth => {
      if (isAuth) setIsAuthenticated(true);
    });
  }, []);

  return (
    <NavBar variant="dark">
      <NavBar.Brand as={Link} to="/">
        Investment Blog
      </NavBar.Brand>
      <NavBar.Collapse className="justify-content-end">
        <Nav className="justify-content-end">
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Articles
            </Nav.Link>
          </Nav.Item>
          {isAuthenticated ? (
            <Nav.Item>
              <Nav.Link as={Link} to={'/create'}>
                Create Article
              </Nav.Link>
            </Nav.Item>
          ) : (
            <Nav.Item>
              <Nav.Link as={Link} to={'/about'}>
                Sobre
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      </NavBar.Collapse>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-light">Search</Button>
      </Form>
    </NavBar>
  );
};

export default Navbar;
