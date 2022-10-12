import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { searchAdsRequest, clearSearch } from '../../../redux/reducers/adsRedux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearSearch());
  }, [dispatch]);

  const handleSubmit = async e => {
    e.preventDefault();
    await dispatch(searchAdsRequest(searchPhrase));
    navigate(`/search/${searchPhrase}`);
    setSearchPhrase('');
  };
  return (
    <section>
      <h1>Search bulletin board!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formTitle'>
          <Form.Label>Search: </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter search phrase'
            name='searchPhrase'
            value={searchPhrase}
            onChange={e => setSearchPhrase(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Search
        </Button>
      </Form>
    </section>
  );
};

export default Search;
