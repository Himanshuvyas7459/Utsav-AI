import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const baseStyles =
    'px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-red-500 text-white hover:bg-red-600',
    secondary: 'bg-gray-800 text-white hover:bg-gray-900',
    outline: 'border-2 border-red-500 text-red-500 hover:bg-red-50'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
