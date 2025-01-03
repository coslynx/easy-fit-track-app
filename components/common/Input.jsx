import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { sanitizeInput } from '../../utils/helpers';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  error,
  label,
  name,
}) => {
  const [inputId, setInputId] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (name) {
      setInputId(`${name}-${type}`.replace(/\s+/g, '-').toLowerCase());
    } else {
      setInputId(`input-${Date.now()}-${type}`.replace(/\s+/g, '-').toLowerCase());
    }
  }, [type, name]);

  const handleChange = (event) => {
      const sanitizedValue = sanitizeInput(event.target.value);
        if (typeof onChange === 'function') {
          onChange(event, sanitizedValue);
      } else {
        console.error('Error: onChange prop must be a function.');
      }
  };

  let inputType = type;
    if (type !== 'text' && type !== 'email' && type !== 'password' && type !== 'number') {
      inputType = 'text';
    console.warn(`Warning: Invalid input type prop: ${type}. Defaulting to 'text'.`);
  }

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        type={inputType}
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full`}
        aria-describedby={error ? `${inputId}-error` : undefined}
          ref={inputRef}
      />
        
        {error && (
            <p id={`${inputId}-error`} className="text-red-500 text-xs italic mt-1">
                {error}
            </p>
        )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
    name: PropTypes.string
};

export default Input;