import logo from "@/assets/logo.svg";
import linkedinIcon from "@/assets/icons/linkedin.svg";
import githubIcon from "@/assets/icons/github.svg";

import ContentWrapper from "@/components/ui/content-wrapper/content-wrapper.tsx";
import BurgerMenu from "@/components/ui/burger-menu/burger-menu.tsx";
import MenuLinks from "@/components/ui/menu-links/menu-links.tsx";
import DividerLine from "@/components/ui/divider-line/divider-line.tsx";
import { githubLink, linkedinLink } from '@/config/menu.ts';

const Header = () => {
    return (
        <div className={"fixed top-0 left-0 w-full h-80"}>
            <ContentWrapper>
                <div className={"py-6 flex justify-between items-center"}>
                    <div className={"flex items-center"}>
                        {/*<Link to={"/"}>*/}
                            <img src={logo} alt="Logo"/>
                        {/*</Link>*/}

                        <div className={"hidden lg:block ml-16"}>
                            <MenuLinks/>
                        </div>
                    </div>

                    <div className={"h-4 lg:hidden"}>
                        <BurgerMenu/>
                    </div>

                    <div className={"gap-x-3 hidden lg:flex"}>
                        <a href={linkedinLink}>
                            <img src={linkedinIcon} alt="LinkedIn"/>
                        </a>

                        <a href={githubLink}>
                            <img src={githubIcon} alt="GitHub"/>
                        </a>
                    </div>
                </div>
                <DividerLine color={"gray-200"} />
            </ContentWrapper>
        </div>
    );
};

export default Header;