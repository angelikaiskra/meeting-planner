import { ReactNode } from 'react';

export type LabelProps = {
  children: ReactNode;
  className?: string;
};

export const Label = ({ className, children, ...props }: LabelProps) => {
  return (
    <label className="text-sm leading-none text-font-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70" {...props}>
      {children}
    </label>
  );
};