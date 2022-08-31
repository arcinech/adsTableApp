import { API_URL } from '../../../config';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logOut } from '../../../redux/reducers/usersRedux';
import axios from 'axios';

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.delete(`${API_URL}/auth/logout`, { credentials: 'include' }).then(res => {
      console.log('logged out' + res);
      dispatch(logOut());
      <Navigate to='/' />;
    });
  }, [dispatch]);

  return null;
};

export default Logout;
