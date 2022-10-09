import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IMGS_URL } from '../../../config';
import ModalDelete from '../ModalDelete/ModalDelete';

const AdCard = ({
  title,
  description,
  image,
  price,
  location,
  createdAt,
  user,
  _id,
  ...params
}) => {
  const loggedUser = useSelector(({ user }) => user);

  return (
    <Card style={!params.id ? { width: '18rem' } : { width: '50%' }}>
      <Card.Body>
        <div className='d-flex justify-content-between'>
          <Card.Title>{title}</Card.Title>
        </div>
        <Card.Img src={`${IMGS_URL}/${image}`} />
        <Card.Text>{description}</Card.Text>
        <Card.Text>{price}</Card.Text>
        <Card.Text>{location}</Card.Text>
        <Card.Text>{createdAt}</Card.Text>
        <Card.Text>Author: {user?.login}</Card.Text>
        {!params.id && (
          <Button as={NavLink} to={`/ads/${_id}`} variant='primary'>
            Read more
          </Button>
        )}
        {loggedUser?.login === user?.login && params.id === _id && (
          <>
            <Button
              className='me-1'
              as={NavLink}
              to={`/ads/edit/${_id}`}
              variant='primary'
            >
              Edit
            </Button>
            <ModalDelete id={_id} />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default AdCard;
