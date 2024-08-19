import localFont from 'next/font/local';

export const fa_IRFonts = localFont({
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
});

export const en_USFonts = localFont({
  src: [
    {
      path: '../../public/fonts/en_US/Gilroy-ExtraBold.ttf',
      style: 'normal',
      weight: '900',
    },
    {
      path: '../../public/fonts/en_US/Gilroy-SemiBold.ttf',
      style: 'normal',
      weight: '600',
    },
    {
      path: '../../public/fonts/en_US/Gilroy-Medium.ttf',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../../public/fonts/en_US/Gilroy-Regular.ttf',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../../public/fonts/en_US/Gilroy-Light.ttf',
      style: 'normal',
      weight: '300',
    },
    {
      path: '../../public/fonts/en_US/Gilroy-Thin.ttf',
      style: 'normal',
      weight: '200',
    },
  ],
  display: 'swap',
  variable:"--en-fonts"
});
