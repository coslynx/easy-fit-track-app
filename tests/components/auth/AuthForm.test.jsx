import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AuthForm from '../../../components/features/auth/AuthForm';
import { useAuth } from '../../../hooks/useAuth';

// Mock the useAuth hook
jest.mock('../../../hooks/useAuth', () => ({
    useAuth: () => ({
        login: jest.fn(() => Promise.resolve({ message: 'Login successful' })),
        signup: jest.fn(() => Promise.resolve({ message: 'Signup successful' })),
        logout: jest.fn(() => Promise.resolve()),
        user: null,
        token: null
    }),
}));



describe('AuthForm Component', () => {
    it('renders without crashing', () => {
        render(<AuthForm />);
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Password' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Signup' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Already have an account? Login' })).toBeInTheDocument();
    });

    it('renders login form correctly when isLogin prop is true', () => {
        render(<AuthForm isLogin={true} />);
        expect(screen.queryByRole('textbox', { name: 'Username' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('renders signup form correctly when isLogin prop is false or undefined', () => {
        render(<AuthForm isLogin={false} />);
        expect(screen.getByRole('textbox', { name: 'Username' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Signup' })).toBeInTheDocument();

        render(<AuthForm />);
        expect(screen.getByRole('textbox', { name: 'Username' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Signup' })).toBeInTheDocument();
    });

    it('updates input field values correctly', () => {
        render(<AuthForm />);
        const usernameInput = screen.getByRole('textbox', { name: 'Username' });
        const emailInput = screen.getByRole('textbox', { name: 'Email' });
        const passwordInput = screen.getByRole('textbox', { name: 'Password' });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        expect(usernameInput.value).toBe('testuser');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(passwordInput.value).toBe('password123');
    });

     it('submits login form successfully', async () => {
          const mockLogin = jest.fn(() => Promise.resolve({ message: 'Login successful' }));
        useAuth.mockReturnValue({
            login: mockLogin,
             signup: jest.fn(() => Promise.resolve({ message: 'Signup successful' })),
              logout: jest.fn(() => Promise.resolve()),
             user: null,
            token: null
        });

        render(<AuthForm isLogin={true} />);
        const emailInput = screen.getByRole('textbox', { name: 'Email' });
        const passwordInput = screen.getByRole('textbox', { name: 'Password' });
        const submitButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
          
        fireEvent.click(submitButton);

        expect(screen.getByRole('button', { name: 'Loading...' })).toBeInTheDocument();
        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
            });
            expect(screen.queryByRole('button', { name: 'Loading...' })).not.toBeInTheDocument();
        });
    });


    it('submits signup form successfully', async () => {
       const mockSignup = jest.fn(() => Promise.resolve({ message: 'Signup successful' }));
         useAuth.mockReturnValue({
             signup: mockSignup,
              login: jest.fn(() => Promise.resolve({ message: 'Login successful' })),
               logout: jest.fn(() => Promise.resolve()),
            user: null,
           token: null
        });
        render(<AuthForm />);
        const usernameInput = screen.getByRole('textbox', { name: 'Username' });
        const emailInput = screen.getByRole('textbox', { name: 'Email' });
        const passwordInput = screen.getByRole('textbox', { name: 'Password' });
        const submitButton = screen.getByRole('button', { name: 'Signup' });

         fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        fireEvent.click(submitButton);

        expect(screen.getByRole('button', { name: 'Loading...' })).toBeInTheDocument();


       await waitFor(() => {
            expect(mockSignup).toHaveBeenCalledWith({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
            expect(screen.queryByRole('button', { name: 'Loading...' })).not.toBeInTheDocument();
       });
    });
    
    it('displays login error message', async () => {
      const mockLogin = jest.fn(() => Promise.reject(new Error('Login failed')));
        useAuth.mockReturnValue({
            login: mockLogin,
              signup: jest.fn(() => Promise.resolve({ message: 'Signup successful' })),
               logout: jest.fn(() => Promise.resolve()),
             user: null,
           token: null
        });

        render(<AuthForm isLogin={true} />);
        const emailInput = screen.getByRole('textbox', { name: 'Email' });
        const passwordInput = screen.getByRole('textbox', { name: 'Password' });
        const submitButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        expect(screen.getByRole('button', { name: 'Loading...' })).toBeInTheDocument();

       await waitFor(() => {
             expect(mockLogin).toHaveBeenCalledWith({
                 email: 'test@example.com',
                 password: 'password123',
             });
            expect(screen.queryByRole('button', { name: 'Loading...' })).not.toBeInTheDocument();
             expect(screen.getByText('Login failed')).toBeInTheDocument();
        });
    });

      it('displays signup error message', async () => {
        const mockSignup = jest.fn(() => Promise.reject(new Error('Signup failed')));
           useAuth.mockReturnValue({
              signup: mockSignup,
               login: jest.fn(() => Promise.resolve({ message: 'Login successful' })),
                logout: jest.fn(() => Promise.resolve()),
              user: null,
             token: null
         });

        render(<AuthForm />);
        const usernameInput = screen.getByRole('textbox', { name: 'Username' });
        const emailInput = screen.getByRole('textbox', { name: 'Email' });
        const passwordInput = screen.getByRole('textbox', { name: 'Password' });
        const submitButton = screen.getByRole('button', { name: 'Signup' });
        
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

          expect(screen.getByRole('button', { name: 'Loading...' })).toBeInTheDocument();
          
        await waitFor(() => {
           expect(mockSignup).toHaveBeenCalledWith({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
             expect(screen.queryByRole('button', { name: 'Loading...' })).not.toBeInTheDocument();
             expect(screen.getByText('Signup failed')).toBeInTheDocument();
        });
    });
    

     it('displays email error message and disables submit button with invalid email', () => {
        render(<AuthForm />);
        const emailInput = screen.getByRole('textbox', { name: 'Email' });
        const submitButton = screen.getByRole('button', { name: 'Signup' });

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
    });

     it('disables submit button with empty password', () => {
        render(<AuthForm />);
         const passwordInput = screen.getByRole('textbox', { name: 'Password' });
        const submitButton = screen.getByRole('button', { name: 'Signup' });

         fireEvent.change(passwordInput, { target: { value: '' } });
        expect(submitButton).toBeDisabled();
     });

     it('disables submit button with empty username during signup', () => {
         render(<AuthForm />);
          const usernameInput = screen.getByRole('textbox', { name: 'Username' });
          const submitButton = screen.getByRole('button', { name: 'Signup' });

         fireEvent.change(usernameInput, { target: { value: '' } });
          expect(submitButton).toBeDisabled();
     });
    
    it('toggles between login and signup forms', () => {
        const mockNavigate = jest.fn()
          
          render(<AuthForm  />)

        const toggleButton = screen.getByRole('button', { name: 'Already have an account? Login' });
        expect(screen.getByRole('textbox', { name: 'Username' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Signup' })).toBeInTheDocument();

        fireEvent.click(toggleButton);
         expect(screen.queryByRole('textbox', { name: 'Username' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();

         const toggleButton2 = screen.getByRole('button', { name: 'New user? Signup' });
          fireEvent.click(toggleButton2);
        expect(screen.getByRole('textbox', { name: 'Username' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Signup' })).toBeInTheDocument();
        
    });
});