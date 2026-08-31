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
  const baseStyles =
    "inline-flex items-center justify-center rounded-none font-display uppercase tracking-widest transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 select-none";

  const variantStyles = {
    filled: {
      primary: "bg-primary text-white hover:bg-primary-dark shadow-[0_4px_0_0_var(--ink)] hover:shadow-[0_5px_0_0_var(--ink)]",
      secondary: "bg-ink text-white hover:bg-charcoal shadow-[0_4px_0_0_var(--primary)] hover:shadow-[0_5px_0_0_var(--primary)]",
      accent: "bg-white text-ink hover:bg-concrete-200 shadow-[0_4px_0_0_var(--ink)] hover:shadow-[0_5px_0_0_var(--ink)]",
    },
    outline: {
      primary: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
      secondary: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
      accent: "border-2 border-white text-white hover:bg-white hover:text-ink",
    },
  };

  const sizeStyles = {
    sm: "text-[13px] px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-3.5",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled || loading ? "opacity-50 cursor-not-allowed shadow-none" : "cursor-pointer";

  const buttonVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: disabled || loading ? 1 : 1.02, transition: { duration: 0.2 } },
    tap: { scale: disabled || loading ? 1 : 0.97, y: disabled || loading ? 0 : 2, transition: { duration: 0.1 } },
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
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Cargando...
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </div>
      )}
    </motion.button>
  );
};

export default Button;