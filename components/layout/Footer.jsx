import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ className = '' }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`bg-gray-100 text-gray-500 py-2 text-center ${className}`}>
            © {currentYear} Easy Fitness Tracker
        </footer>
    );
};

Footer.propTypes = {
    className: PropTypes.string,
};

export default Footer;