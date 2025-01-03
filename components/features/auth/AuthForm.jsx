import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useAuth } from '../../../hooks/useAuth';
import { validateEmail, sanitizeInput } from '../../../utils/helpers';

const AuthForm = ({ isLogin = false }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const { login, signup } = useAuth();

    const isSignup = !isLogin;

    const validateForm = () => {
        let isValid = true;
        if (isSignup) {
            if (!username.trim()) isValid = false;
        }
        if (!email.trim() || !validateEmail(email.trim())) isValid = false;
        if (!password.trim()) isValid = false;
        setFormValid(isValid);
        return isValid;
    };
    
    const handleInputChange = (event, sanitizedValue, inputType) => {
      switch (inputType) {
          case 'username':
              setUsername(sanitizedValue);
              break;
        case 'email':
          setEmail(sanitizedValue);
          break;
        case 'password':
          setPassword(sanitizedValue);
          break;
        default:
            break;
      }
        validateForm();
    };
    
  const handleSubmit = async (event) => {
    event.preventDefault();
      if (!validateForm()) {
          return;
      }
    setLoading(true);
    setApiError('');

    const authData = {
        email: email.trim(),
        password: password.trim(),
      };
      
    if (isSignup) {
        authData.username = username.trim();
    }

    try {
      const response = isLogin
        ? await login(authData)
        : await signup(authData);

        if (response) {
            setLoading(false);
        }
    } catch (error) {
      setApiError(error.message || 'An unexpected error occurred');
        setLoading(false);
    }
  };


  return (
      <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-4 max-w-md w-full"
      >
          <h2 className="text-2xl font-bold mb-4 text-center">
              {isLogin ? 'Login' : 'Signup'}
          </h2>
          {isSignup && (
              <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e, sanitizedValue) => handleInputChange(e, sanitizedValue, 'username')}
                  label="Username"
                  name="username"
                  className="mb-4"
              />
          )}

        <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e, sanitizedValue) => handleInputChange(e, sanitizedValue, 'email')}
            error={email.trim() && !validateEmail(email) ? 'Invalid email format' : undefined}
            label="Email"
            name="email"
            className="mb-4"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e, sanitizedValue) => handleInputChange(e, sanitizedValue, 'password')}
            label="Password"
            name="password"
            className="mb-6"
        />


      {apiError && (
        <p className="text-red-500 text-sm italic text-center mb-4">{apiError}</p>
      )}


      <Button
          type="submit"
          disabled={loading || !formValid}
          className="mb-2"
      >
        {loading ? 'Loading...' : isLogin ? 'Login' : 'Signup'}
      </Button>

      <Button
        type="button"
        onClick={() => {
          
        }}
          disabled={loading}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-300"
      >
        {isLogin
          ? 'New user? Signup'
          : 'Already have an account? Login'}
      </Button>
      </form>
  );
};

AuthForm.propTypes = {
  isLogin: PropTypes.bool,
};

export default AuthForm;