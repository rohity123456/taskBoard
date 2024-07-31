'use client';
import React from 'react';
import StoreProvider from './StoreProvider';

interface ProviderProps {
  children: React.ReactNode;
}
const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <StoreProvider>{children}</StoreProvider>
    </>
  );
};

export default Providers;
