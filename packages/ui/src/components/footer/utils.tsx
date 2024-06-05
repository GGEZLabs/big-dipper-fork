const GGEZ_SITE_URL = 'https://ggez.one';

export const donateLink = {
  key: 'donate',
  url: `${GGEZ_SITE_URL}/donate`,
};

export const footerLinks = [
  {
    key: 'company',
    links: [
      {
        key: 'contact',
        url: `${GGEZ_SITE_URL}`,
      },
    ],
  },
  {
    key: 'bigDipper',
    links: [
      {
        key: 'about',
        url: `${GGEZ_SITE_URL}`,
      },
      {
        key: 'faq',
        url: `${GGEZ_SITE_URL}`,
      },
      {
        key: 'termsAndConditions',
        url: `${GGEZ_SITE_URL}/legal/terms`,
      },
      {
        key: 'privacyPolicy',
        url: `${GGEZ_SITE_URL}/legal/privacy`,
      },
    ],
  },
];
