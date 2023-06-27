import React from 'react'
import '../css/login.css'
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { logInOut } from '../store/authSlice'
import { useDispatch } from 'react-redux';
import { SignupSchema } from "../Validation"

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      userName: '',
      Email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      dispatch(logInOut({ userName: values.userName, password: values.password }))
      navigate("/login")
    }
  })


  return (
    <Container>
      <h2> Signup Form</h2>
      <div className='wrapper'>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Username</label>
            <input
              className="form-control"
              id="userName"
              aria-describedby="emailHelp"
              name="userName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div>{formik.errors.userName}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email</label>
            <input
              className="form-control"
              id="Email"
              aria-describedby="emailHelp"
              name="Email"
              type="Email"
              onChange={formik.handleChange}
              value={formik.values.Email}
              required
            />
            {formik.touched.Email && formik.errors.Email ? (
              <div>{formik.errors.Email}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <button className="btn btn-primary" type='submit'>Submit</button>
        </form>
        <div className="text-center mt-4">
          <Link to='/login' className=' btn btn-primary' >You hava account ? Login</Link>
        </div>
      </div>
    </Container>
  );
}



export default Signup


