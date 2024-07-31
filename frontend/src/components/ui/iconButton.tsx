import React, { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, ...props }) => {
  return (
    <button
      {...props}
      className={`
        flex items-center justify-center
        rounded-md
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${props.className} 
      `}
    >
      {icon}
    </button>
  );
};

export default IconButton;
