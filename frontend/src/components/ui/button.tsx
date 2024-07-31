import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  isActive,
  icon,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`
        flex justify-center px-4 py-2 rounded-md text-textSecondary align-middle
        ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}
        ${props.className}
        `}
    >
      {icon ? icon : null}
      {children}
    </button>
  );
};

export default Button;
