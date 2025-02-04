import ContentWrapper from "@/components/ui/content-wrapper/content-wrapper.tsx";
import logoDark from "@/assets/images/logo-gray.svg";
import Typography from "@/components/ui/typography/typography.tsx";
import githubIcon from "@/assets/icons/github.svg";
import { githubRepoLink, linkedinLink } from '@/config/menu.ts';

const Footer = () => {
    return (
        <div className={"bg-gray-100 py-10 md:py-12"}>
            <ContentWrapper>
                <div className={"flex justify-between flex-wrap text-gray-500 text-sm"}>
                    <div className={"w-full md:w-fit"}>
                        <img src={logoDark} alt="MeetPoll Logo" />

                        <div className={"mt-4"}>
                            Made by <a className={"underline"} href={linkedinLink}>Angelika Iskra</a>.
                        </div>

                        <div className={"mt-2"}>
                            The code is open source.
                        </div>

                        <div className={"mt-2"}>
                            <a className={"underline"} href={githubRepoLink}>
                                <img src={githubIcon} alt="GitHub Icon" className={"inline-block w-6 h-6"}/>
                            </a>
                        </div>
                    </div>

                    <div className={"mt-8 md:mt-2 w-full md:w-fit"}>
                        <Typography as={"span"} className={"footer-title"}>
                            Legal
                        </Typography>

                        <div className={"mt-4 font-medium text-accent"}>
                            <a href={"/privacy-policy"} className={"block w-fit"}>Privacy Policy</a>
                            <a href={"/cookie-policy"} className={"mt-2 block w-fit"}>Cookie Policy</a>
                        </div>
                    </div>

                    <div className={"mt-8 md:mt-2 w-full md:w-fit"}>
                        <Typography as={"span"} className={"footer-title"}>
                            Donate
                        </Typography>

                        <p className={"mt-4 md:max-w-52"}>
                            If you like this website, consider
                            <a href={"#donate"} className={"font-medium text-sm text-accent"}> buying me a coffee</a>.
                        </p>
                    </div>

                    <div className={"mt-8 md:mt-2 w-full md:w-fit"}>
                        <Typography as={"span"} className={"footer-title"}>
                            Language
                        </Typography>

                        {/*<LanguageSelector/>*/}
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default Footer;