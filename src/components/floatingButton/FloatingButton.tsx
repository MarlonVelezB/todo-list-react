
import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";


interface FloatingButtonProps {
  icon?: React.ReactNode;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  tooltip?: string;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon = <FaPlus className="w-6 h-6" />,
  onClick,
  color = 'primary',
  size = 'medium',
  position = 'bottom-right',
  tooltip,
  disabled = false,
  ariaLabel = 'Floating action button',
  className = ''
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const colorStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-sm hover:shadow-md',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-sm hover:shadow-md',
    error: 'bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md'
  };

  const sizeStyles = {
    small: 'w-12 h-12 text-sm',
    medium: 'w-14 h-14 text-base',
    large: 'w-16 h-16 text-lg'
  };

  const positionStyles = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const tooltipPosition = {
    'bottom-right': 'bottom-full right-0 mb-2',
    'bottom-left': 'bottom-full left-0 mb-2',
    'top-right': 'top-full right-0 mt-2',
    'top-left': 'top-full left-0 mt-2'
  };

  return (
    <div className={`fixed z-50 ${positionStyles[position]}`}>
      <div className="relative">
        <button
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className={`
            ${sizeStyles[size]}
            ${colorStyles[color]}
            rounded-full
            flex items-center justify-center
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-4 focus:ring-opacity-50
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'}
            ${color === 'primary' ? 'focus:ring-blue-300' : ''}
            ${color === 'secondary' ? 'focus:ring-gray-300' : ''}
            ${color === 'success' ? 'focus:ring-green-300' : ''}
            ${color === 'warning' ? 'focus:ring-yellow-300' : ''}
            ${color === 'error' ? 'focus:ring-red-300' : ''}
            ${className}
          `}
        >
          {icon}
        </button>

        {/* Tooltip */}
        {tooltip && showTooltip && (
          <div className={`
            absolute ${tooltipPosition[position]}
            bg-gray-900 text-white text-sm px-3 py-2 rounded-lg
            whitespace-nowrap z-10 opacity-90
            animate-in fade-in duration-200
          `}>
            {tooltip}
            <div className={`
              absolute w-2 h-2 bg-gray-900 transform rotate-45
              ${position.includes('bottom') ? '-bottom-1' : '-top-1'}
              ${position.includes('right') ? 'right-3' : 'left-3'}
            `} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingButton;