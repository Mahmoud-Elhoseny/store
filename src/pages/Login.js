import React, { useState } from 'react';
import '../css/login.css';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { logIn } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SignupSchema } from '../Validation';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const { Name, Password } = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      if (values.userName === Name && values.password === Password) {
        values.userName = Name;
        values.password = Password;
        dispatch(logIn());
        navigate('/');
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 2000);
      } else {
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 2000);
      }
    },
  });

  return (
    <Container>
      <h2>Login Form</h2>
      <div className="wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Username
            </label>
            <input
              className="form-control"
              id="userName"
              aria-describedby="emailHelp"
              name="userName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName && (
              <div className="error-message">{formik.errors.userName}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>
          {showErrorMessage && (
            <div className="invalid">Invalid username or password</div>
          )}

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/signup" className="btn btn-primary">
            Sign up
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
