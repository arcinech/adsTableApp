import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AdsList from '../AdsList/AdsList';
import { getRequest, getSearchResult } from '../../../redux/reducers/adsRedux';
import Spinner from 'react-bootstrap/Spinner';

const SearchResult = () => {
  const { searchResult } = useParams();

  const ads = useSelector(getSearchResult);
  const request = useSelector(getRequest);

  if (request.pending === false && request.success === true && ads.length === 0) {
    return (
      <div>
        <h2>Sorry, no results found</h2>
      </div>
    );
  } else if (request.pending === true) {
    return <Spinner />;
  } else {
    return (
      <div>
        <h2>Search results for: {searchResult}</h2>
        <AdsList ads={ads} />
      </div>
    );
  }
};

export default SearchResult;
