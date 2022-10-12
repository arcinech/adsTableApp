import { useDispatch, useSelector } from 'react-redux';
import AdForm from '../AdForm/AdForm';
import { addAdsRequest, getRequest, ADD_AD } from '../../../redux/reducers/adsRedux';

const AddAd = () => {
  const dispatch = useDispatch();

  const requests = useSelector(state => getRequest(state, ADD_AD));

  const handleSubmit = ads => {
    dispatch(addAdsRequest(ads));
  };
  return (
    <>
      <AdForm action={handleSubmit} requests={requests} actionText='Add Ad' />
    </>
  );
};

export default AddAd;
