import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/reducers/usersRedux';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'clientError', 'serverError'
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ login, password }),
    };

    setStatus('loading');
    fetch(`${API_URL}/auth/login`, options)
      .then(res => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(logIn({ login }));
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => {
        setStatus('serverError');
      });
  };
  return (
    <Form className='col-12 col-sm-3 mx-auto' onSubmit={handleSubmit}>
      <h1 className='my-4'>Sign in</h1>
      {status === 'success' && (
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully registered!</p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant='danger'>
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant='danger'>
          <Alert.Heading>Incorrect data.</Alert.Heading>
          <p>Password or login is incorrect.</p>
        </Alert>
      )}

      {status === 'loading' && (
        <Spinner animation='border' role='status' className='block mx-auto'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}

      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Login</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter login'
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button className='mb-3' variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default Login;
