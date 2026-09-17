import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'white' | 'dark' | 'sidebar' | 'compact' | 'ai';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  showTagline = false,
  size = 'md',
  className = '',
  onClick,
}) => {
  // Dimensions based on size
  const iconSizes = {
    sm: 'w-7 h-7 text-sm',
    md: 'w-8 h-8 text-base',
    lg: 'w-10 h-10 text-lg',
    xl: 'w-12 h-12 text-xl',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const isWhite = variant === 'white';
  const isAi = variant === 'ai';

  return (
    <div
      id="ytech-cfo-brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none transition-all ${
        onClick ? 'cursor-pointer hover:opacity-95' : ''
      } ${className}`}
    >
      {/* Precision Geometric Icon Mark */}
      <div
        className={`flex-shrink-0 rounded-lg flex items-center justify-center font-black ${
          iconSizes[size]
        } ${
          isWhite
            ? 'bg-slate-800 border border-slate-700 text-white'
            : 'bg-slate-900 text-white shadow-sm'
        }`}
      >
        <span className="font-bold tracking-tight">Y</span>
      </div>

      {/* Brand Typography */}
      {variant !== 'icon' && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1">
            <span
              className={`font-bold tracking-tight ${textSizes[size]} ${
                isWhite ? 'text-white' : 'text-slate-900'
              }`}
            >
              YTech
            </span>
            <span
              className={`font-bold tracking-tight text-blue-600 ${textSizes[size]}`}
            >
              CFO
            </span>
            {(isAi || variant === 'full') && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-blue-50 text-blue-700 border border-blue-100">
                AI
              </span>
            )}
          </div>

          {showTagline && (
            <span
              className={`text-[10px] tracking-wider font-semibold uppercase mt-0.5 ${
                isWhite ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Financial Operating System
            </span>
          )}
        </div>
      )}
    </div>
  );
};
