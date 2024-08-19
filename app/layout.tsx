import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics, ReactQueryProvider, StyledComponentsRegistry } from '@/providers';
import { GlobalStyle, fonts } from '@/theme';
import '../src/theme/globals.css';
import RootLayout from '@/layouts/RootLayout';
import { THISPROJECT, thisLocale } from '@/constants/projects';
import 'react-spring-bottom-sheet/dist/style.css';

export const metadata: Metadata = {
  title: `${THISPROJECT.SITE_TITLE} | ${THISPROJECT.META_DESCRIPTION}`,
  description: THISPROJECT.META_DESCRIPTION,
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

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const direction = THISPROJECT.DEFAULT_LOCALE === 'fa_IR' ? 'rtl' : 'ltr';
  const locale = thisLocale;

  return (
    <html dir={direction} lang='fa'>
      <body
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
