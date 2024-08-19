import Image from 'next/image';
import image from '../images/paypal.png';

const PayPalIcon = () => {
  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };
  return <Image src={image} width={100} height={30} alt='paypal as payment method' loader={loaderProp} />;
};

export default PayPalIcon;
