import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { searchAdsRequest, getRequest } from '../../../redux/reducers/adsRedux';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(searchAdsRequest(searchPhrase));
    setSearchPhrase('');
    navigate(`/search/${searchPhrase}`);
  };

  return (
    <section>
      <h1>Search bulletin board!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formTitle'>
          <Form.Label>Search: </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter title'
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
