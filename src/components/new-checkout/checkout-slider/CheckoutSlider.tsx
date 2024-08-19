'use client';

import { AppFlex, Button, Typography } from '@/primitives';
import Image from 'next/image';
import Slider from './Slider';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  content: {
    title: string;
    sliderImages: string[];
    callToAction: {
      description: string;
      image: string;
      numValue: string;
      button: {
        text: string;
      };
    };
  };
};

const CheckoutSlider = ({ content }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { callToAction, sliderImages, title } = content;

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
    <AppFlex gap='30px' align='center' direction='column' style={{ minHeight: '200px', borderRadius: '10px' }}>
      <Typography textalign='center' variant='h2' fontWeight={600} color='#252D48'>
        {title}
      </Typography>
      <Slider data={sliderImages} />
      <AppFlex direction='column' gap='10px' align='center'>
        <Image width={300} height={100} src={callToAction?.image} alt='' style={{ objectFit: 'cover' }} />
        <AppFlex align='center' direction='column'>
          <Typography variant='h1' textalign='center' fontSize={40} fontWeight={700} style={{ color: '#3AD7AB' }}>
            {callToAction?.numValue}
          </Typography>
          <Typography textalign='center' variant='body2' fontWeight={700} style={{ maxWidth: '350px' }}>
            {callToAction?.description}
          </Typography>
        </AppFlex>
      </AppFlex>
      <Button
        onClick={handleButtonClick}
        style={{ backgroundColor: '#3AD7AB', boxShadow: ' 0 0 #3AD7AB', maxWidth: '250px', zIndex: 1, margin: 'auto' }}
        variant='question'
      >
        {callToAction?.button?.text}
      </Button>
    </AppFlex>
  );
};

export default CheckoutSlider;

/**
 * styled-component
 * _______________________________________________________________________________
 */
