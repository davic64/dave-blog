import { forwardRef } from "react";

const baseStyles = "rounded-md text-white transition ease-in-out";
const borderStyles = "border border-gray-600";

const colors = {
  primary: "border-primary-500",
  danger: "border-red-500",
  warning: "border-yellow-500",
};

const variants = {
  primary: `${borderStyles} text-gray-300 hover:border-primary-500 hover:text-white hover:shadow-xl hover:shadow-primary-500/40 hover:bg-primary-500/10`,
  gradient: `${baseStyles} duration-300 gradient-animation`,
  danger: `${baseStyles} ${borderStyles} hover:border-red-500 hover:text-white hover:shadow-xl hover:shadow-red-500/40 hover:bg-red-500/10`,
  warning: `${baseStyles} ${borderStyles} hover:border-yellow-500 hover:text-white hover:shadow-xl hover:shadow-yellow-500/40 hover:bg-yellow-500/10`,
};

const sizes = {
  sm: "px-4 py-0",
  md: "px-4 py-2",
  lg: "px-8 py-4",
};

export const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      className,
      borderColor,
      size = "md",
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={`${sizes[size]} transition ease-in-out ${colors[borderColor]} ${variants[variant]} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
