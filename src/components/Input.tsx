import React, { ReactNode } from 'react';

/* --------------------------------------------------------------------------- */

interface IProps {
  className?: string;
  classNameOfInput?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  [key: string]: any;
}

/* --------------------------------------------------------------------------- */

export default function Input({ className = '', classNameOfInput = '', startAdornment, endAdornment, ...others }: IProps) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded bg-white ${className}`}>
      {startAdornment}
      <input className={`w-full focus:outline-none ${classNameOfInput}`} {...others} />
      {endAdornment}
    </div>
  );
}