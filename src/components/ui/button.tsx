// src/components/ui/button.tsx
"use client";

import React from "react";

export const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition ${className}`}
    >
      {children}
    </button>
  );
};
