import React from 'react'

/* -------------------------------------------------------------------- */

interface IProps {
  className?: string;
}

/* -------------------------------------------------------------------- */

export default function Footer({ className = '' }: IProps) {
  return (
    <div className={className}>
      <div className="py-6 bg-gray-900">
        <p className="text-center text-white">
          © {new Date().getFullYear()} Nori
        </p>
      </div>
    </div>
  )
}