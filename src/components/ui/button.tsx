"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "default",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "outline";
}) => {
  const base = "px-4 py-2 rounded transition";
  const variants = {
    default: "bg-teal-600 text-white hover:bg-teal-700",
    outline: "border border-teal-600 text-teal-600 hover:bg-teal-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </button>
  );
};
