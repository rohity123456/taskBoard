import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 'md', message }) => {
  const spinnerSize = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }[size];

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col items-center'>
        <div
          className={`
            animate-spin rounded-full border-t-2 border-b-2 border-blue-500
            ${spinnerSize}
          `}
        />
        {message && <p className='mt-2 text-gray-500'>{message}</p>}
      </div>
    </div>
  );
};

export default Loading;
