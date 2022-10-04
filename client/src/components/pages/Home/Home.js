import AdsList from '../../features/AdsList/AdsList';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import {
  getRequest,
  getAds,
  LOAD_ADS,
  loadAdsRequest,
} from '../../../redux/reducers/adsRedux';
import { NavLink } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const request = useSelector(state => getRequest(state, LOAD_ADS));
  const ads = useSelector(getAds);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  if (!request || !request.success) {
    return <Spinner />;
  } else if (request.error === true) {
    return <Alert color='warning'>{request.error}</Alert>;
  } else {
    return (
      <section className={styles.root}>
        <div className={styles.titleBar}>
          <h3>Bulletin board home</h3>
          <Button as={NavLink} to={'/ads/add'} className='ms-3 my-3'>
            Add ad
          </Button>
        </div>
        {ads && ads.length > 0 && <AdsList ads={ads} />}
        {(!ads ? true : ads.length === 0 ? true : false) && (
          <Alert color='warning'>No ads found!</Alert>
        )}
      </section>
    );
  }
};

export default Home;
