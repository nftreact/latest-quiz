'use client';

import { Button, Typography } from '@/primitives';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';

/**
 * props
 * _______________________________________________________________________________
 */

interface PreCheckoutButton {
  text: string;
  link: string;
  bgColor: string;
  color: string;
}

interface PreCheckoutNextButtonProps {
  inputs: PreCheckoutButton;
}

const PreCheckoutButton = ({ inputs }: PreCheckoutNextButtonProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const cookie = new Cookies();
  const type = cookie.get('type');
  const { push } = useRouter();

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Button
      className='checkoutButton'
      variant='checkout'
      position='fixed'
      onClick={() => {
        if (type === 'fastfit') {
          push('/checkout/?discount=dHJ1ZQ==');
        } else {
          push('/checkout');
        }
      }}
      style={{ zIndex: '10' }}
    >
      <Typography>{inputs?.text}</Typography>
    </Button>
  );
};

export default PreCheckoutButton;

/**
 * styled-component
 * _______________________________________________________________________________
 */
