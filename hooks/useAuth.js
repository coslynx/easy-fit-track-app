import { useContext } from 'react';
import { AuthContext, useAuthContext } from 'context/AuthContext';
import api from '../services/api';

/**
 * useAuth: A custom React hook for managing user authentication state and actions.
 *
 * This hook provides access to the current user, authentication token,
 * login, signup, and logout functionalities. It leverages the AuthContext for
 * state management and api for making API requests.
 *
 * @returns {{
 *   user: User | null,
 *   token: string | null,
 *   login: (data: { email: string, password: string }) => Promise<Error | string>,
 *   signup: (data: { username: string, email: string, password: string }) => Promise<Error | string>,
 *   logout: () => void
 * }} An object containing the user, token, login, signup, and logout functions
 */
const useAuth = () => {
  // Get the user, token, login, signup, and logout functions from the AuthContext
  const { user, token, login: contextLogin, signup: contextSignup, logout: contextLogout } = useAuthContext();

  /**
   * login: Handles user login functionality.
   *
   * Makes an API call to the login endpoint and updates the authentication state
   * using the AuthContext's login method.
   *
   * @param {{ email: string, password: string }} loginData - An object containing the user's email and password
   * @returns {Promise<string | Error>} A promise that resolves with 'success' or rejects with an Error object
   */
  const login = async (loginData) => {
    try {
      // Call the login method from the AuthContext
      return await contextLogin(loginData);
    } catch (error) {
        // Log the error to the console
        console.error('Login failed:', error);
      // Return a new Error object with a user-friendly message
      return new Error(error.message || 'Login failed');
    }
  };

  /**
   * signup: Handles user signup functionality.
   *
   * Makes an API call to the signup endpoint and updates the authentication state
   * using the AuthContext's signup method.
   *
   * @param {{ username: string, email: string, password: string }} signupData - An object containing the user's username, email, and password
   * @returns {Promise<string | Error>} A promise that resolves with 'success' or rejects with an Error object
   */
  const signup = async (signupData) => {
    try {
      // Call the signup method from the AuthContext
      return await contextSignup(signupData);
    } catch (error) {
      // Log the error to the console
      console.error('Signup failed:', error);
      // Return a new Error object with a user-friendly message
      return new Error(error.message || 'Signup failed');
    }
  };

  /**
   * logout: Handles user logout functionality.
   *
   * Updates the authentication state to null using the AuthContext's logout method.
   *
   * @returns {void}
   */
  const logout = () => {
    // Call the logout method from the AuthContext
    contextLogout();
  };

    // Return the user, token, login, signup, and logout functions
    return {
        user,
        token,
        login,
        signup,
        logout,
    };
};

export { useAuth };