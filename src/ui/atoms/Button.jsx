import { forwardRef } from "react";

const variants = {
  primary:
    "border text-gray-300 border-gray-600 text-white shadow-primary-500/50 hover:border-primary-500 hover:text-white hover:shadow-xl hover:shadow-primary-500/40 hover:bg-primary-500/10",
  gradient:
    "px-4 py-2 rounded-md text-white transition ease-in-out duration-300 gradient-animation",
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
