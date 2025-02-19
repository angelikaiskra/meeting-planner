import React from 'react';
import { FieldWrapper, FieldWrapperPassThroughProps } from '@/components/ui/form/field-wrapper.tsx';
import { InputBlank } from "./input-blank";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & FieldWrapperPassThroughProps;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", label, optional, errorMessage, ...props }, ref) => {
  return (
    <FieldWrapper label={label} optional={optional} errorMessage={errorMessage}>
      <InputBlank ref={ref} type={type} className={className} {...props} />
    </FieldWrapper>
  );
});