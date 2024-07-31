import React, { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Content of the modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Handle escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        className='fixed top-0 left-0 w-full h-full bg-secondary opacity-50'
        onClick={onClose}
      />
      <div className='z-50 bg-primary rounded-lg shadow-lg p-8 w-11/12 md:max-w-md'>
        {children}
      </div>
    </div>
  );
};

export default Modal;
