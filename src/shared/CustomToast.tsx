import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = () => {
  return (
    <ToastContainer
      position='bottom-right'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={true}
      draggable={false}
      theme='colored'
      limit={3}
      transition={Slide}
    />
  );
};

export default CustomToast;
