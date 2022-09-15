import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AdForm from '../AdForm/AdForm';
import { editAdsRequest } from '../../../redux/reducers/adsRedux';

const EditAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const ad = useSelector(({ ads }) => ads.data.find(ad => ad._id === id));

  const handleSubmit = async ads => {
    await dispatch(editAdsRequest(ads, id));

    navigate('/');
  };

  return (
    <>
      <AdForm action={handleSubmit} {...ad} actionText='Edit Ad' />
    </>
  );
};

export default EditAd;
