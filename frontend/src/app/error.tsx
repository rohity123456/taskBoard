'use client';

import React from 'react';
import Link from 'next/link';
import { ErrorProps } from 'next/error';

interface CustomErrorProps extends ErrorProps {
  reset?: () => void;
  error?: any;
}

const ErrorPage: React.FC<CustomErrorProps> = ({ error, reset }) => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-primary'>
      <div className='bg-secondary p-8 rounded-lg shadow-md max-w-md w-full text-center'>
        <h1 className='text-4xl font-bold mb-4'>
          {error?.statusCode === 404 ? 'Page Not Found' : 'Error'}
        </h1>
        <p className='text-gray-600 mb-8'>
          {error?.statusCode
            ? `An error ${error.statusCode} occurred on server.`
            : 'Something went wrong. Please try again later.'}
        </p>
        <div className='flex space-x-4 justify-center'>
          {reset && (
            <button
              onClick={() => reset()}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Try Again
            </button>
          )}
          <Link
            href='/'
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
