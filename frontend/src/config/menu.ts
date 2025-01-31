import { paths } from '@/config/paths.ts';

interface MenuItem {
  title: string;
  link: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    title: paths.createPoll.menuTitle,
    link: paths.createPoll.getHref(),
  },
  {
    title: paths.login.menuTitle,
    link: paths.login.getHref(),
  },
  {
    title: paths.register.menuTitle,
    link: paths.register.getHref(),
  }
];

export const linkedinLink = "https://www.linkedin.com/in/angelika-iskra/";
export const githubLink = "https://github.com/angelikaiskra";
export const githubRepoLink = "https://github.com/angelikaiskra/meeting-poll";