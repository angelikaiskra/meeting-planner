import { MENU_ITEMS } from '@/config/menu.ts';
import MenuLink from '@/components/ui/menu-links/menu-link.tsx';

const MenuLinks = () => {
    return (
        <ul className={"flex grow items-center gap-x-12"}>
            {
                MENU_ITEMS.map((item) => (
                    <MenuLink key={item.title} title={item.title} link={item.link} />
                ))
            }
        </ul>
    );
};

export default MenuLinks;