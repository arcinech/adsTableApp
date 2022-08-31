import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const AdForm = ({ action, actionText, ...props }) => {
  const currentUser = useSelector(({ user }) => user);
  const [title, setTitle] = useState(props.title ?? '');
  const [description, setDescription] = useState(props.description ?? '');
  const [image, setImage] = useState(props.image ?? null);
  const [price, setPrice] = useState(props.price ?? '');
  const [location, setLocation] = useState(props.location ?? '');
  const [user] = useState(props.login ?? currentUser.login ?? '');
  const [createdAt] = useState(props.cretedAt ?? Date.now());

  const handleSubmit = e => {
    e.preventDefault();
    action({ title, description, image, price, location, user, createdAt, ...props });
  };
  if (!currentUser || currentUser.login !== user) {
    return (
      <Alert variant='warning'>
        To access this page, please register, login or be an author of this ad!
      </Alert>
    );
  } else {
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formDescription'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows='3'
              placeholder='Enter description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPrice'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formLocation'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter location'
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formImage'>
            <Form.Label>Image</Form.Label>
            <Form.Control type='file' onChange={e => setImage(e.target.files[0])} />
          </Form.Group>
          <Button variant='primary' type='submit'>
            {actionText}
          </Button>
        </Form>
      </>
    );
  }
};

export default AdForm;
