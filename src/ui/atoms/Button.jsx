import { forwardRef } from "react";

const baseStyles = "px-4 py-2 rounded-md text-white transition ease-in-out";
const borderStyles = "border border-gray-600";
const hoverEffects = (color) => `
  hover:border-${color}-500 
  hover:text-white 
  hover:shadow-xl 
  hover:shadow-${color}-500/40 
  hover:bg-${color}-500/10
`;

const variants = {
  primary: `${borderStyles} text-gray-300 ${hoverEffects("primary")}`,
  gradient: `${baseStyles} duration-300 gradient-animation`,
  danger: `${baseStyles} ${borderStyles} ${hoverEffects("red")}`,
  warning: `${baseStyles} ${borderStyles} ${hoverEffects("yellow")}`,
};

export const Button = forwardRef(
  ({ children, variant = "primary", className = "", ...props }, ref) => {
    return (
      <button
        className={`${
          variant !== "text" ? "px-4 py-2 rounded-md" : undefined
        } transition ease-in-out ${variants[variant]} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
