import flagPl from "@/assets/icons/flag-pl.png";
import flagEn from "@/assets/icons/flag-uk.png";

export interface Language {
    name: string;
    code: string;
    flag: string;
}

export const languages: Language[] = [
    { name: 'English', code: 'uk', flag: flagEn },
    { name: 'Polish', code: 'pl', flag: flagPl },
];