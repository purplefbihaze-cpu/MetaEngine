
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, className = '', ...props }) => {
  const baseStyle = "relative inline-flex items-center justify-center px-6 py-2.5 font-mono text-sm font-medium tracking-wide transition-all duration-300 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.3)] border border-transparent",
    secondary: "bg-transparent text-white border border-white/20 hover:border-white/50 hover:bg-white/5 backdrop-blur-sm",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {/* Shine effect for primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
      {icon && <span className="mr-2">{icon}</span>}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode, colorClass?: string }> = ({ children, colorClass = 'text-white bg-white/10 border-white/10' }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border backdrop-blur-md ${colorClass}`}>
    {children}
  </span>
);

export const SectionHeading: React.FC<{ title: string, subtitle?: string, center?: boolean }> = ({ title, subtitle, center = false }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
    <div className={`h-1 w-20 bg-gradient-to-r from-nexus-code to-nexus-social rounded-full mt-6 relative overflow-hidden ${center ? 'mx-auto' : ''}`}>
       <div className="absolute inset-0 bg-white/50 w-full h-full animate-shimmer" />
    </div>
  </div>
);