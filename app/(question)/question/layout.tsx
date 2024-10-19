/* eslint-disable no-var */
import type { Metadata } from 'next'
import '../../../src/theme/globals.css'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import '@/constants/GlobalVariables'
import '@/theme/theme.config.css'
import { en_fonts, fa_fonts } from '@/theme/font-config'
import { ReactQueryProvider, StyledComponentsRegistry } from '@/providers'
import { GlobalVariables } from '@/constants/type'
import Image from 'next/image'
import { Suspense } from 'react'

declare global {
  var config: GlobalVariables
}

const { metaTitle, faviconUrl, metaDescription, language, logoUrl } = global.config

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  icons: {
    icon: faviconUrl,
  },
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const fonts = global.config.locale === 'fa_IR' ? fa_fonts : en_fonts
  return (
    <html lang={language} dir={global.config.locale === 'fa_IR' ? 'rtl' : 'ltr'} className={fonts.variable}>
      <body>
        <Theme accentColor='gray' grayColor='gray' radius='large' scaling='100%'>
          <ReactQueryProvider>
            <StyledComponentsRegistry>
              <Suspense>
                <header style={{ padding: '12px 16px', display: 'flex', justifyContent: 'center' }}>
                  <Image src={logoUrl} alt={'header-logo'} width={100} height={30} className='logo' priority />
                </header>
                <main>{children}</main>
              </Suspense>
            </StyledComponentsRegistry>
          </ReactQueryProvider>
        </Theme>
      </body>
    </html>
  )
}
