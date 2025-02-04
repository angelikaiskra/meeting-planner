import React, { ReactNode } from 'react';

export type FormProps = {
  id: string;
  onSubmit:  React.FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  className?: string;
};

export const Form = ({ id, onSubmit, children, className, ...props }: FormProps) => {
  return (
    <form className={`space-y-6 ${className}`} id={id} onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
};