import localFont from 'next/font/local';

export const fonts = localFont({
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
