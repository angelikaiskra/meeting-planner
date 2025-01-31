import { MenuItem } from '@/config/menu.ts';

const MenuLink = (item: MenuItem) => {
  return (
    <a href={item.link} className={'text-font-gray text-sm font-medium'}>
      {item.title}
    </a>
  );
};

export default MenuLink;