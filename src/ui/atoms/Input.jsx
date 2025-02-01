import { forwardRef } from "react";

export const Input = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={`border border-gray-600 px-4 py-2 rounded-md bg-transparent transition ease-in-out shadow-xl outline-none hover:bg-seashell-50/10 focus:shadow-primary-500/50 focus:border-primary-500 ${className}`}
      placeholder="Hola"
      {...props}
      ref={ref}
    />
  );
});

Input.displayName = "Input";
