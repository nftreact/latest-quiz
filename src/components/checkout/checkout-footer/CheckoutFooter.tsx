'use client';

import { THISPROJECT } from '@/constants/projects';
import { AppFlex, Button, Typography } from '@/primitives';
import { CheckoutButton } from '@/types/checkout';
import { useRouter } from 'next/router';
import Enamad from './Enamad';
/**
 * props
 * _______________________________________________________________________________
 */
interface CheckoutFooterProps {
  button: CheckoutButton;
  description: string;
}

const CheckoutFooter = ({ button, description }: CheckoutFooterProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const handleButtonClick = () => {
    const plansSection = document.getElementById('plans');
    if (plansSection) {
      plansSection.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <AppFlex gap={'20px'} direction='column' align='center' style={{ paddingInline: '16px', paddingTop: '40px' }}>
      <Button onClick={handleButtonClick} variant='checkout' className='checkoutButton'>
        <Typography>{button.text}</Typography>
      </Button>
      <Typography
        textalign='center'
        style={{ lineHeight: '30px' }}
        variant='subtitle2'
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {THISPROJECT.ENAMAD && <Enamad />}
    </AppFlex>
  );
};

export default CheckoutFooter;

/**
 * styled-component
 * _______________________________________________________________________________
 */
