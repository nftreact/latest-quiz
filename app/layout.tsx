import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics, ReactQueryProvider, StyledComponentsRegistry } from '@/providers';
import { GlobalStyle } from '@/theme';
import '../src/theme/globals.css';
import RootLayout from '@/layouts/RootLayout';
import { THISPROJECT, thisLocale } from '@/constants/projects';
import { en_USFonts, fa_IRFonts } from '@/theme/fonts';
import Head from 'next/head';

export const metadata: Metadata = {
  title: THISPROJECT.PAGE_TITLE,
  description: THISPROJECT.PAGE_DESCRIPTION,
  icons: THISPROJECT.FAVICON_URL,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const direction = THISPROJECT.DEFAULT_LOCALE === 'fa_IR' ? 'rtl' : 'ltr';
  const locale = thisLocale;
  const fonts = thisLocale === 'en_US' || thisLocale === 'it_US' ? en_USFonts : fa_IRFonts;

  return (
    <html dir={direction}>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
      </head>
      <body
        translate='no'
        style={{
          fontFamily: `${fonts.style.fontFamily}`,
        }}
      >
        <GoogleAnalytics />
        <ReactQueryProvider>
          <StyledComponentsRegistry>
            <GlobalStyle locale={locale} />
            <RootLayout>{children}</RootLayout>
          </StyledComponentsRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
