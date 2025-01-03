import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import PropTypes from 'prop-types';

interface User {
    username: string;
    email: string;
    _id: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface SignupData {
    username: string;
    email: string;
    password: string;
}


interface AuthContextProps {
    user: User | null;
    token: string | null;
    login: (data: LoginData) => Promise<string | Error>;
    signup: (data: SignupData) => Promise<string | Error>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    token: null,
    login: async () => Promise.resolve('success'),
    signup: async () => Promise.resolve('success'),
    logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [authToken, setAuthToken] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        try {
            if (storedUser && storedToken) {
              setAuthUser(JSON.parse(storedUser));
              setAuthToken(storedToken);
            }
        } catch (error) {
             console.error('Error retrieving auth data from localStorage:', error);
        }
    }, []);



    const login = async (loginData: LoginData): Promise<string | Error> => {
          try {
            const response = await api.post('/api/auth/login', loginData);
            if (response && response.token && response.user) {
               localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('token', response.token);
              setAuthUser(response.user);
              setAuthToken(response.token);
                return 'success';
            }
              return 'Login failed: unexpected response'
        } catch (error: any) {
              console.error('Login failed:', error);
              return error.message || 'Login failed';
        }
    };


    const signup = async (signupData: SignupData): Promise<string | Error> => {
        try {
          const response = await api.post('/api/auth/signup', signupData);
            if (response && response.token && response.user) {
              localStorage.setItem('user', JSON.stringify(response.user));
              localStorage.setItem('token', response.token);
              setAuthUser(response.user);
              setAuthToken(response.token);
              return 'success';
          }
            return 'Signup failed: unexpected response'
        } catch (error: any) {
            console.error('Signup failed:', error);
          return error.message || 'Signup failed';
        }
    };


    const logout = () => {
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          setAuthUser(null);
            setAuthToken(null);
        } catch (error) {
           console.error('Error during logout:', error);
        }
    };

    const contextValue: AuthContextProps = {
        user: authUser,
        token: authToken,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};


const useAuthContext = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuthContext };