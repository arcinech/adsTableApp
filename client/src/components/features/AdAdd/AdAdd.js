import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdForm from '../AdForm/AdForm';
import { addAdsRequest, getRequest, ADD_AD } from '../../../redux/reducers/adsRedux';

const AddAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const requests = useSelector(state => getRequest(state, ADD_AD));

  const handleSubmit = async ads => {
    await dispatch(addAdsRequest(ads));

    navigate('/');
  };
  return (
    <>
      <AdForm action={handleSubmit} requests={requests} actionText='Add Ad' />
    </>
  );
};

export default AddAd;
