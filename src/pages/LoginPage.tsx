import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';

const LoginPage: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleMockLogin = () => {
    // Mock login for now
    login({
      id: 1,
      email: 'test@example.com',
      nickname: 'TestUser',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Write to yourself, reply a year later.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-4">
            <button
              onClick={handleMockLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
            >
              Sign in with Mock Account
            </button>
            <button
              disabled
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:text-lg opacity-50 cursor-not-allowed"
            >
              Sign in with Google (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
