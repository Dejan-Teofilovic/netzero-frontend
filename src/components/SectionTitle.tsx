import React from "react";

/* ----------------------------------------------------------- */

interface IProps {
  title: string;
  className?: string;
}

/* ----------------------------------------------------------- */

export default function SectionTitle({ className = '', title }: IProps) {
  return (
    <h2 className={`text-3xl font-bold text-center ${className}`}>
      {title}
    </h2>
  )
}