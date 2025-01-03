import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, className = '', disabled = false, type = 'button' }) => {
  const handleClick = (event) => {
    if (typeof onClick !== 'function') {
      console.error('Error: onClick prop must be a function.');
      event.preventDefault();
      return;
    }
    onClick(event);
  };

  let buttonType = type;
    if (type !== 'button' && type !== 'submit' && type !== 'reset') {
      buttonType = 'button';
        console.warn(`Warning: Invalid button type prop: ${type}. Defaulting to 'button'.`);
  }

  return (
    <button
      type={buttonType}
      onClick={handleClick}
      className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;