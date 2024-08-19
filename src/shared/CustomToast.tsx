'use client';
import { thisLocale } from '@/constants/projects';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = () => {
  const locale = thisLocale;
  return (
    <ToastContainer
      position={locale === 'en_US' || locale === 'it_US' ? 'bottom-left' : 'bottom-right'}
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      draggable={locale === 'en_US' || locale === 'it_US' ? false : true}
      theme='colored'
      limit={3}
      transition={Slide}
    />
  );
};

export default CustomToast;
