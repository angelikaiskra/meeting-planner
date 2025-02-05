import React from 'react';
import { FieldWrapper, FieldWrapperPassThroughProps } from '@/components/ui/form/field-wrapper.tsx';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & FieldWrapperPassThroughProps;

export const Input = ({ className, type = "text", label, optional, error, ...props }: InputProps) => {
  return (
    <FieldWrapper label={label} optional={optional} error={error}>
      <input
        type={type}
        className={'flex h-10 w-full rounded-md border border-input bg-transparent px-4 py-1 text-sm transition-colors placeholder:text-gray-300 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent'}
        {...props}
      />
    </FieldWrapper>
  );
};