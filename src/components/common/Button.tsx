
import React from 'react'

type Props = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<Props>= ({
  className,
  onClick,
  disabled = false,
  children
}) => {
  return (
    <button
      className={`bg-blue-600 text-white px-4 py-2 rounded-md disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50 ${className}`}
      onClick={() => { onClick && onClick() }}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
