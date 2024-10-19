import localFont from 'next/font/local'

export const fa_fonts = localFont({
  src: [
    {
      path: '../../public/fonts/fa_IR/IRANSansWeb(FaNum).ttf',
      style: 'normal',
    },
    {
      path: '../../public/fonts/fa_IR/YekanBakh-Regular.ttf',
      style: 'normal',
    },
    {
      path: '../../public/fonts/en_US/Gilroy-Regular.ttf',
      style: 'normal',
    },
    {
      path: '../../public/fonts/fa_IR/dana_fa.ttf',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--fa-fonts',
})

export const en_fonts = localFont({
  src: [
    {
      path: '../../public/fonts/en_US/Gilroy-ExtraBold.ttf',
      style: 'normal',
      weight: '900',
    },
    {
      path: '../../public/fonts/en_US/Gilroy-Bold.ttf',
      style: 'normal',
      weight: '600',
    },
    {
      path: '../../public/fonts/en_US/Gilroy-Light.ttf',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../../public/fonts/en_US/Gilroy-Thin.ttf',
      style: 'normal',
      weight: '300',
    },
  ],
  display: 'swap',
  variable: '--en-fonts',
})
