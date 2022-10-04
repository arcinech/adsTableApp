import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logOut } from '../../../redux/reducers/usersRedux';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'DELETE',
        credentials: 'include',
      }).then(() => {
        console.log('logged out');
        dispatch(logOut());
        navigate('/');
      });
    })();
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
