import { Icon, IconProps } from '@phosphor-icons/react';
import { ReactNode } from 'react';
import classNames from 'classnames';

type IconButton = IconProps & {
  icon: Icon;
  children: ReactNode;
  btnClassName?: string;
  iconClassName?: string;
}

const IconButton = ({ icon: Icon, children, btnClassName, iconClassName, ...props }: IconButton) => {
  return (
    <button className={classNames('bg-white cursor-pointer p-1.5 hover:bg-gray-100 rounded-lg flex items-center text-sm gap-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', btnClassName)}>
      <Icon className={classNames(iconClassName)} {...props} />
      {children}
    </button>
  );
};

export default IconButton;