import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IMGS_URL } from '../../../config';

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
  // console.log(params);
  // console.log(loggedUser, user);

  return (
    <Card style={!params.id ? { width: '18rem' } : { width: '50%' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Img src={`${IMGS_URL}/${image}`} />
        <Card.Text>{price}</Card.Text>
        <Card.Text>{location}</Card.Text>
        <Card.Text>{createdAt}</Card.Text>
        <Card.Text>{user?.login}</Card.Text>
        {!params.id && (
          <Button as={NavLink} to={`/ads/${_id}`} va riant='primary'>
            Read more
          </Button>
        )}
        {loggedUser?.login === user.login && params.id === _id && (
          <>
            <Button
              className='me-auto ms-0'
              as={NavLink}
              to={`/ads/edit/${_id}`}
              variant='primary'
            >
              Edit
            </Button>
            <Button
              className='ms-auto me-0'
              as={NavLink}
              to={`/ads/delete/${_id}`}
              variant='danger'
            >
              Delete
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default AdCard;
