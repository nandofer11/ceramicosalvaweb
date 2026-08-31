type StripeBarProps = {
  variant?: 'primary' | 'white';
  className?: string;
};

const StripeBar = ({ variant = 'primary', className = '' }: StripeBarProps) => {
  return (
    <div
      aria-hidden
      className={`${variant === 'primary' ? 'stripes-primary' : 'stripes-white'} ${className}`}
    />
  );
};

export default StripeBar;