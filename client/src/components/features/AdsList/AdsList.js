import AdCard from '../../common/AdCard/AdCard';
import styles from './AdsList.module.scss';

const AdsList = ({ ads }) => {
  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {ads?.map(ad => (
          <article key={ad._id}>
            <AdCard {...ad} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AdsList;
