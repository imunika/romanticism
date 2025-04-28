import { Taviraj, Raleway, Lato, Italiana, Roboto, Antic_Didone } from 'next/font/google';

export const taviraj = Taviraj({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-taviraj',
});

export const raleway = Raleway({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-raleway',
});

export const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
});

export const italiana = Italiana({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-italiana',
});

export const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const antic_didone = Antic_Didone({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-antic_didone',
});
