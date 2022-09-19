import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AdCard from '../../common/AdCard/AdCard';
import styles from './SingleAd.module.scss';

const SingleAd = () => {
  const { id } = useParams();
  const ad = useSelector(({ ads }) => ads.data.find(ad => ad._id === id));

  return (
    <div className={styles.root}>
      <h1>Single Ad</h1>
      <AdCard {...ad} id={id} />
    </div>
  );
};

export default SingleAd;
