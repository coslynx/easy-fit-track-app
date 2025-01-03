import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import PropTypes from 'prop-types';

const Header = () => {
    const { authUser, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };


    return (
        <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
            <div className="font-bold text-xl">
                <Link to="/dashboard" className="hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-2 py-1 rounded">
                   Easy Fitness Tracker
                </Link>
            </div>
            <nav className="flex items-center">
                {authUser ? (
                    <>
                        <Link to="/goals" className="mr-4 block hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-3 py-1 rounded">
                            Goals
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="ml-auto cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-3 py-1 rounded"
                        >
                           Logout
                        </button>
                    </>
                ) : null }
            </nav>
        </header>
    );
};

Header.propTypes = {
    // No props defined for this component, but keeping it for potential future use.
};

export default Header;