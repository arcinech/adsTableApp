import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  deleteAdsRequest,
  getRequest,
  DELETE_AD,
} from '../../../redux/reducers/adsRedux';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const DeleteAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const requests = useSelector(state => getRequest(state, DELETE_AD));

  useEffect(() => {
    const deleteAction = () => {
      dispatch(deleteAdsRequest(id));
      navigate('/');
    };
    deleteAction();
  }, [dispatch, id, navigate]);
  if (requests.pending === true) {
    return <Spinner />;
  } else if (requests.pending === false && requests.success === true) {
    return null;
  } else {
    return <Alert variant='danger'>Error! {requests.error}</Alert>;
  }
};

export default DeleteAd;
