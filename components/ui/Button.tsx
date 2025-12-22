
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  type = 'button',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-calm-blue/40 disabled:opacity-50 active:scale-95 group overflow-hidden pointer-events-auto cursor-pointer";
  
  const variants = {
    primary: "bg-gradient-to-tr from-calm-blue to-soft-lavender text-white hover:from-[#3d5191] hover:to-[#5e71b2] shadow-[0_10px_20px_-5px_rgba(74,97,173,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(74,97,173,0.5)]",
    secondary: "bg-soft-lavender text-white hover:bg-blue-600 shadow-[0_10px_20px_-5px_rgba(113,136,214,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(113,136,214,0.5)]",
    outline: "border-2 border-calm-blue/30 text-calm-blue hover:border-calm-blue hover:bg-calm-blue/5",
    white: "bg-white text-calm-blue hover:bg-gray-50 shadow-lg"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3.5 sm:px-8 sm:py-4 text-base",
    lg: "px-7 py-4 sm:px-10 sm:py-5 text-base sm:text-lg",
  };

  return (
    <button 
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-20 pointer-events-none">{children}</span>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
    </button>
  );
};

export default Button;
