import React from "react";

/* ----------------------------------------------------------- */

interface IProps {
  title: string;
  className?: string;
}

/* ----------------------------------------------------------- */

export default function SectionTitle({ className = '', title }: IProps) {
  return (
    <h2 className={`text-center text-2xl lg:text-3xl font-bold ${className}`}>
      {title}
    </h2>
  )
}