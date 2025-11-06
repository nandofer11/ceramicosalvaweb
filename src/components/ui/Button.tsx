import React from 'react';
import { motion } from 'framer-motion';

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
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
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
  icon,
  iconPosition = 'left',
  loading = false,
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  
  const variantStyles = {
    filled: {
      primary: "bg-primary hover:bg-primary-dark text-white focus-visible:outline-primary shadow-md hover:shadow-lg",
      secondary: "bg-secondary hover:bg-secondary-dark text-white focus-visible:outline-secondary shadow-md hover:shadow-lg",
      accent: "bg-accent hover:bg-accent/90 text-foreground focus-visible:outline-accent shadow-md hover:shadow-lg",
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
  const disabledClass = disabled || loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:transform hover:scale-[1.02] active:scale-[0.98]";

  const buttonVariants = {
    initial: { 
      scale: 1,
    },
    hover: { 
      scale: disabled || loading ? 1 : 1.02,
      transition: { duration: 0.2 } 
    },
    tap: { 
      scale: disabled || loading ? 1 : 0.98,
      transition: { duration: 0.1 } 
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant][color]} ${sizeStyles[size]} ${widthClass} ${disabledClass} ${className}`}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.2 }}
    >
      {loading ? (
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Cargando...
        </div>
      ) : (
        <div className="flex items-center">
          {icon && iconPosition === 'left' && <span className="mr-2 motion-safe:group-hover:animate-bounce">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="ml-2 motion-safe:group-hover:animate-pulse">{icon}</span>}
        </div>
      )}
    </motion.button>
  );
};

export default Button; 