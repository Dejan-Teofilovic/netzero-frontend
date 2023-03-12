import React from 'react'

/* -------------------------------------------------------------------- */

interface IProps {
  className?: string;
}

/* -------------------------------------------------------------------- */

export default function Footer({ className = '' }: IProps) {
  return (
    <div className={className}>
      <div className="mt-12 py-6 border-t">
        <p className="text-center">
          © {new Date().getFullYear()} Prototype of React + Material-Tailwind + TypeScript
        </p>
      </div>
    </div>
  )
}