import {useState} from 'react';
import "./burger-menu.pcss";

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openClassName = isOpen ? "burgerMenu--open" : "";

    const handleClick = () => {
        setIsOpen((prevVal) => !prevVal);
    }

    return (
        <button className={`burgerMenu ${openClassName}`} onClick={handleClick}>
            <span />
            <span />
            <span />
            <span />
        </button>
    );
}


export default BurgerMenu;