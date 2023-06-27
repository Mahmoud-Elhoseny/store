import React, { useRef, useState } from 'react'
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { insertProduct } from '../store/productSlice';
import { useNavigate } from 'react-router';
const AddProduct = () => {

  const [preview, setPreview] = useState()

  const { isLoggedIn } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const title = useRef(null)
  const image = useRef(null)
  const category = useRef(null)
  const description = useRef(null)
  const count = useRef(null)
  const price = useRef(null)


  const { handleChange, handleSubmit, values, setFieldValue } = useFormik({
    initialValues: {
      title: '',
      image: '',
      category: '',
      description: '',
      count: '',
      price: '',
    },
    onSubmit: values => {
      const id = Math.floor(Math.random() * 10500)
      dispatch(insertProduct({
        id,
        title: values.title,
        image: values.image,
        category: values.category,
        description: values.description,
        count: values.count,
        price: values.price,
      }))

      navigate("/")
    }
  }
  )



  return (
    <Container>
      <h2>insert Products</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
          <Form.Label>Title </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            id='title'
            name="title"
            onChange={handleChange}
            value={values.title}
            ref={title}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>product Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            id='image'
            name="image"
            onChange={(e) => {
              let reader = new FileReader()
              reader.onload = () => {
                if (reader.readyState === 2) {
                  setFieldValue('image', reader.result)
                  setPreview(reader.result)
                }
              }
              reader.readAsDataURL(e.target.files[0])
            }}
            ref={image}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>category </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            id='category'
            name="category"
            onChange={handleChange}
            value={values.category}
            ref={category}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>description </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            id='description'
            name="description"
            onChange={handleChange}
            value={values.description}
            ref={description}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>count </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter count"
            id='count'
            name="count"
            onChange={handleChange}
            value={values.count}
            ref={count}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            id='price'
            name="price"
            onChange={handleChange}
            value={values.price}
            ref={price}
            required
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" disabled={!isLoggedIn}>
          {isLoggedIn? "Submit" : "login first please"}
        </Button>
      </Form>
    </Container>
  )
}

export default AddProduct
