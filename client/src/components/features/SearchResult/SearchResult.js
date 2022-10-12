import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AdsList from '../AdsList/AdsList';
import {
  getRequest,
  getSearchResult,
  SEARCH_ADS,
} from '../../../redux/reducers/adsRedux';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const SearchResult = () => {
  const { searchPhrase } = useParams();

  const ads = useSelector(getSearchResult);
  const requests = useSelector(state => getRequest(state, SEARCH_ADS));
  if (!requests || requests.pending === true) {
    return <Spinner />;
  } else if (
    requests.pending === false &&
    requests.success === true &&
    (!ads || ads.length === 0)
  ) {
    return (
      <div>
        <h2>Sorry, no results found</h2>
      </div>
    );
  } else if (requests.error) {
    return <Alert variant='danger'>Error! {requests.error}</Alert>;
  } else {
    return (
      <div>
        <h2>Search results for: {searchPhrase}</h2>
        <AdsList ads={ads} />
      </div>
    );
  }
};

export default SearchResult;
