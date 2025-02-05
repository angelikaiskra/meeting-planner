import React from 'react';
import { FieldWrapperPassThroughProps } from '@/components/ui/form/field-wrapper';

export type SwitchProps = React.InputHTMLAttributes<HTMLInputElement> & FieldWrapperPassThroughProps;

export const Switch = ({ checked, onChange, className = "", error, ...props }: SwitchProps) => {
  return (
    <div className={"relative w-11 h-6"}>
      <input
        type={'checkbox'}
        role={'switch'}
        checked={checked}
        onChange={(e) => onChange && onChange(e)}
        className={`peer appearance-none shrink-0 w-11 h-6 rounded-full bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition checked:bg-green disabled:bg-gray-300 ${className}`}
        {...props}
      />
      <span className={'absolute w-4.5 h-4.5 rounded-full bg-white pointer-events-none peer-checked:translate-x-5 top-[3px] left-[2.5px] shadow-xs transition'} />
    </div>
  );
};