import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { deleteAdsRequest } from '../../../redux/reducers/adsRedux';

const DeleteAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteAction = async () => {
      await dispatch(deleteAdsRequest(id));

      navigate('/');
    };
    deleteAction();
  }, [dispatch, id, navigate]);
  return <></>;
};

export default DeleteAd;
