import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const AdForm = ({ action, actionText, ...props }) => {
  const currentUser = useSelector(({ user }) => user);
  const [adData, setAdData] = useState({
    title: props.title ?? '',
    description: props.description ?? '',
    image: props.image ?? null,
    price: props.price ?? '',
    location: props.location ?? '',
    user: props.login ?? currentUser ? currentUser.login : '',
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
    console.log(...formData);

    formData.append('image', adData.image);
    console.log(formData);
    action(formData);
  };

  if (!currentUser || currentUser.login !== adData.user) {
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
