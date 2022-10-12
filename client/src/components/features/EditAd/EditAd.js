import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AdForm from '../AdForm/AdForm';
import { editAdsRequest, getRequest, EDIT_AD } from '../../../redux/reducers/adsRedux';
const EditAd = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ad = useSelector(({ ads }) => ads.data.find(ad => ad._id === id));
  const requests = useSelector(state => getRequest(state, EDIT_AD));

  const handleSubmit = ad => {
    dispatch(editAdsRequest(ad, id));
  };

  return (
    <>
      <AdForm action={handleSubmit} requests={requests} {...ad} actionText='Edit Ad' />
    </>
  );
};

export default EditAd;
