import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://mario.raval.li/", // replace this with your deployed domain
  author: "Mario Ravalli",
  profile: "https://mario.raval.li/",
  desc: "A minimal, simple blog",
  title: "Raval.li",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "it", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN", "it-IT"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: false,
  width: 96,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/mrkrash/PersonalBlog",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/marioravalli/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mastodon",
    href: "https://github.com/mrkrash/PersonalBlog",
    linkTitle: `${SITE.title} on Mastodon`,
    active: false,
  },
];
