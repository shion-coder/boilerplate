import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { errorsSelector } from 'redux/selectors/errors.selector';
import { selectIsAuthenticated } from 'redux/selectors/auth.selector';
import { clearErrors } from 'redux/slices/errors.slice';

/* -------------------------------------------------------------------------- */

const useForm = (fields, submit, history) => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(fields);

  const formErrors = useSelector(errorsSelector);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  // Set errors
  useEffect(() => {
    setErrors(formErrors);
  }, [formErrors]);

  // Navigate to home page after login
  useEffect(() => {
    isAuthenticated && history.push('/');
  }, [isAuthenticated, history]);

  // Clear errors when unmount component
  useEffect(() => {
    return () => dispatch(clearErrors());
  }, [dispatch]);

  const handleChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await submit(user).catch(err => console.log(err));

    // Navigate
    response?.payload?.message && history.push('/login');
    response?.payload?.token && history.push('/');
  };

  return { errors, user, handleChange, handleSubmit };
};

export default useForm;
