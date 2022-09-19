import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const AdForm = ({ action, actionText, requests, ...props }) => {
  const currentUser = useSelector(({ user }) => user);
  const [adData, setAdData] = useState({
    title: props.title ?? '',
    description: props.description ?? '',
    image: null,
    price: props.price ?? '',
    location: props.location ?? '',
    user: props.user ?? currentUser ? currentUser.id : undefined,
    createdAt: props.cretedAt ?? undefined,
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;

    setAdData({ ...adData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();

    for (let key of [
      'title',
      'description',
      'price',
      'location',
      'user',
      'createdAt',
    ]) {
      formData.append(key, adData[key]);
    }
    if (adData.image !== null) {
      formData.append('image', adData.image);
    }
    action(formData);
  };

  if (!currentUser) {
    return (
      <Alert variant='warning'>To access this page, you need to be logged in!</Alert>
    );
  } else if (adData.user !== currentUser.id) {
    return (
      <Alert variant='warning'>
        To access this page, you need to be logged author of this ad!
      </Alert>
    );
  } else if (requests.pending === true) {
    return <Spinner />;
  } else if (requests.error === true) {
    return <Alert variant='danger'>{requests.error}</Alert>;
  } else {
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title'
              name='title'
              value={adData.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formDescription'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows='3'
              placeholder='Enter description'
              value={adData.description}
              name='description'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPrice'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={adData.price}
              name='price'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formLocation'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter location'
              value={adData.location}
              name='location'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formImage'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='file'
              onChange={e => setAdData({ ...adData, image: e.target.files[0] })}
            />
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
