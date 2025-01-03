import React from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthForm from '../components/features/auth/AuthForm';

const Home = () => {
  const [searchParams] = useSearchParams();
  const loginParam = searchParams.get('login');

  const isLogin = loginParam === 'true';


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Welcome to Easy Fitness Tracker
      </h1>
      <div className="w-full max-w-md">
      <AuthForm isLogin={isLogin} />
      </div>
    </div>
  );
};

export default Home;