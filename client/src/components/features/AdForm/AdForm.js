import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { request } from 'express';

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

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

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
  } else if (!request.pending) {
    return (
      <>
        <Form onSubmit={validate(handleSubmit)}>
          <Form.Group className='mb-3' controlId='formTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              {...register('title', { required: true, minLength: 3, maxLength: 50 })}
              type='text'
              placeholder='Enter title'
              name='title'
              value={adData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <small className='d-block form-text text-danger mt-2'>
                Title is too short or too long!(min.3, max.50)
              </small>
            )}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formDescription'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              {...register('description', {
                required: true,
                minLength: 10,
                maxLength: 500,
              })}
              as='textarea'
              rows='3'
              placeholder='Enter description'
              value={adData.description}
              name='description'
              onChange={handleChange}
            />
            {errors.description && (
              <small className='d-block form-text text-danger mt-2'>
                Description is too short or too long!(min.10, max.500)
              </small>
            )}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPrice'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              {...register('price', {
                required: true,
                min: 0,
                max: 1000000,
                type: 'number',
              })}
              type='number'
              placeholder='Enter price'
              value={adData.price}
              name='price'
              onChange={handleChange}
            />
            {errors.price && (
              <small className='d-block form-text text-danger mt-2'>
                Wrong price!(min.0, max.1000000)
              </small>
            )}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formLocation'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              {...register('location', { required: true, minLength: 0, maxLength: 50 })}
              type='text'
              placeholder='Enter location'
              value={adData.location}
              name='location'
              onChange={handleChange}
            />
            {errors.location && (
              <small className='d-block form-text text-danger mt-2'>
                Location length is wrong!(min.0, max.50)
              </small>
            )}
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
  } else if (request.pending === true) {
    <Spinner />;
  } else {
    <Alert variant='warning'>Somthing went wrong</Alert>;
  }
};

export default AdForm;
