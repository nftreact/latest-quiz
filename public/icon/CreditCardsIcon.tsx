import Image from 'next/image';
import image from '../images/credit-cards.png';

const CreditCardsIcon = () => {
  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <Image
      src={image}
      width={100}
      height={15}
      alt='credit cards as payment method'
      loader={loaderProp}
      style={{ filter: 'inherit' }}
    />
  );
};

export default CreditCardsIcon;
