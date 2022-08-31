import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from './redux/reducers/usersRedux';
import { API_URL } from './config';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Home from './components/pages/Home/Home';
import Logout from './components/pages/Logout/Logout';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import SingleAd from './components/pages/SingleAd/SingleAd';
import AddAd from './components/features/AdAdd/AdAdd';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // const option = {
    //   method: 'GET',
    //   header: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    // };

    axios.get(`${API_URL}/auth/getUser`, { withCredentials: true }).then(res => {
      if (res.status === 200) {
        console.log(res);
        dispatch(logIn(res.data));
      } else {
        console.log(res);
      }
    });
  }, [dispatch]);

  return (
    <>
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ads/:id' element={<SingleAd />} />
          <Route path='/ads/add' element={<AddAd />} />
          {/* <Route path='/ads/edit/:id' element={<AdEdit />} /> */}
          {/* <Route path='/ads/remove/:id' element={<AdRemove />} /> */}
          {/* <Route path='/search/:searchPhrase' element={<Search />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          {/* <Route path='/*' element={<NotFound />} /> */}
        </Routes>
        <Footer />
      </Container>
    </>
  );
};

export default App;
