import { MENU_ITEMS } from '@/config/menu.ts';

const MenuLinks = () => {
    return (
        <ul className={"flex grow items-center gap-x-12"}>
            {
                MENU_ITEMS.map((item) => (
                    <li key={item.title}>
                        <a href={item.link} className={"text-font-gray text-sm font-medium"}>
                            {item.title}
                        </a>
                    </li>
                ))
            }
        </ul>
    );
};

export default MenuLinks;