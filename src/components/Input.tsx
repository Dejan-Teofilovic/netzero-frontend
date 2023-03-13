import React, { ReactNode } from 'react';

/* --------------------------------------------------------------------------- */

interface IProps {
  className?: string;
  classNameOfInput?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  error?: boolean;
  [key: string]: any;
}

/* --------------------------------------------------------------------------- */

export default function Input({ className = '', classNameOfInput = '', startAdornment, endAdornment, error, ...others }: IProps) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded bg-white ${className} ${error ? 'border-red-500' : ''}`}>
      {startAdornment}
      <input className={`w-full focus:outline-none ${classNameOfInput}`} {...others} />
      {endAdornment}
    </div>
  );
}