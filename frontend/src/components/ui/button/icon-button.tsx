import { Icon, IconProps } from '@phosphor-icons/react';
import React, { ReactNode } from 'react';
import classNames from 'classnames';

type IconButton = Omit<IconProps, 'onClick'> & {
  icon: Icon;
  children?: ReactNode;
  btnClassName?: string;
  iconClassName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const IconButton = ({
  icon: Icon,
  children,
  btnClassName,
  iconClassName,
  onClick,
  disabled = false,
  ...props
}: IconButton) => {
  return (
    <button onClick={onClick} disabled={disabled}
      className={classNames('bg-white cursor-pointer p-1.5 hover:bg-gray-100 rounded-lg flex items-center text-sm gap-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:bg-gray-200 disabled:rounded-md disabled:cursor-default', btnClassName)}>
      <Icon className={classNames(iconClassName)} {...props} />
      {children}
    </button>
  );
};

export default IconButton;