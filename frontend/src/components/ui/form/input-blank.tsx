import classNames from "classnames";
import React from 'react';

export type InputBlankProps = React.InputHTMLAttributes<HTMLInputElement>;

export const InputBlank = React.forwardRef<HTMLInputElement, InputBlankProps>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={classNames(
        'flex h-10 w-full rounded-md border border-input bg-transparent px-4 py-1 text-sm transition-colors',
        'placeholder:text-gray-300 disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
        className
      )}
      {...props}
    />
  );
});