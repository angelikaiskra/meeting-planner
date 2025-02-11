import * as React from 'react';

import { Error } from '@/components/ui/form/error.tsx';
import { Label } from '@/components/ui/form/label.tsx';

type FieldWrapperProps = {
  children: React.ReactNode;
  label?: string;
  optional?: boolean;
  className?: string;
  errorMessage?: string;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, optional, errorMessage, children } = props;

  return (
    <div>
      <Label>
        {label} {optional && <span className={"text-gray-300"}>(optional)</span>}
        <div className="mt-2">{children}</div>
      </Label>
      <Error errorMessage={errorMessage} />
    </div>
  );
};