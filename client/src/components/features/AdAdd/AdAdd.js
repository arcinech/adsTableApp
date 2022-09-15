import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import AdForm from '../AdForm/AdForm';
import { addAdsRequest, getRequest } from '../../../redux/reducers/adsRedux';

const AddAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async ads => {
    await dispatch(addAdsRequest(ads));

    navigate('/');
  };

  return (
    <>
      <AdForm action={handleSubmit} actionText='Add Ad' />
    </>
  );
};

export default AddAd;
