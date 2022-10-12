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
import EditAd from './components/features/EditAd/EditAd';
import DeleteAd from './components/features/DeleteAd/DeleteAd';
import NotFound from './components/pages/NotFound/NotFound';
import Search from './components/pages/Search/Search';
import SearchResult from './components/features/SearchResult/SearchResult';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const option = {
          method: 'GET',
          header: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        };
        const res = await fetch(`${API_URL}/auth/getUser`, option);
        const json = await res.json();
        if (res.status === 200) {
          dispatch(logIn(json));
        } else {
          console.log(json.message);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <>
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ads/:id' element={<SingleAd />} />
          <Route path='/ads/add' element={<AddAd />} />
          <Route path='/ads/edit/:id' element={<EditAd />} />
          <Route path='/ads/delete/:id' element={<DeleteAd />} />
          <Route path='/search' element={<Search />} />
          <Route path='/search/:searchPhrase' element={<SearchResult />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </>
  );
};

export default App;
