import React from 'react';
import { FieldWrapperPassThroughProps } from '@/components/ui/form/field-wrapper';

export type SwitchProps = React.InputHTMLAttributes<HTMLInputElement> & FieldWrapperPassThroughProps;

export const Switch = ({ checked, onChange, className, error, ...props }: SwitchProps) => {
  return (
    <div>
      <input
        type={"checkbox"}
        role={"switch"}
        checked={checked}
        onChange={(e) => onChange && onChange(e)}
        className={`peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-transparent p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 ${className}`}
        {...props}
      />
      <span className={"pointer-events-none flex h-full w-4 items-center justify-center rounded-full bg-white shadow-lg ring-0 transition-transform duration-100 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"} />
    </div>
  );
};