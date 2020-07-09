import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { login } from 'redux/slices/auth.slice';

import useForm from 'utils/hooks/use-form';

import TextFields from 'components/common/text-fields/text-fields.component';

/* -------------------------------------------------------------------------- */

const Login = ({ login, history }) => {
  const {
    errors,
    user: { email, password },
    handleChange,
    handleSubmit,
  } = useForm({ email: '', password: '' }, login, history);

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextFields
        type="email"
        error={errors.email}
        placeholder="Email Address"
        name="email"
        value={email}
        onChange={handleChange}
      />

      <TextFields
        type="password"
        error={errors.password}
        placeholder="Password"
        name="password"
        value={password}
        onChange={handleChange}
      />

      <input type="submit" />
    </form>
  );
};

/* -------------------------------------------------------------------------- */

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, { login })(Login);
