import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'filled' | 'outline';
  color?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
};

const Button = ({
  children,
  variant = 'filled',
  color = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  
  const variantStyles = {
    filled: {
      primary: "bg-primary hover:bg-primary-dark text-white focus-visible:outline-primary",
      secondary: "bg-secondary hover:bg-secondary-dark text-white focus-visible:outline-secondary",
      accent: "bg-accent hover:bg-accent/90 text-foreground focus-visible:outline-accent",
    },
    outline: {
      primary: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
      secondary: "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white",
      accent: "border-2 border-accent text-foreground hover:bg-accent hover:text-foreground",
    },
  };

  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant][color]} ${sizeStyles[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 