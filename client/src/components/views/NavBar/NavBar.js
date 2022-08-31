import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import styles from './navbar.module.scss';

const NavBar = () => {
  const user = useSelector(state => state.user);

  const loginSelector = user => {
    if (!user) {
      return (
        <>
          <Nav.Link as={Link} to='/login'>
            Login
          </Nav.Link>
          <Nav.Link as={Link} to='/register'>
            Register
          </Nav.Link>
        </>
      );
    } else {
      return (
        <Nav.Link as={Link} to='/logout'>
          Logout
        </Nav.Link>
      );
    }
  };
  return (
    <>
      <Navbar bg='primary' variant='dark' className='mb-3'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Ads.App
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            {loginSelector(user)}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
