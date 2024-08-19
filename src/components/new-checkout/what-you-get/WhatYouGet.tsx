'use client';

import { AppFlex, Typography } from '@/primitives';
import Image from 'next/image';
import { styled } from 'styled-components';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { GoStarFill } from 'react-icons/go';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  status: any;
  offer: string;
  discount: string;
  content: {
    hero: string;
    title: string;
    callToAction: {
      hint: string;
      image: string;
      title: string;
      content: {
        icon: string;
        text: string;
      }[];
    };
  };
};

const WhatYouGet = ({ content, offer, discount, status }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { callToAction, hero, title } = content;

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */
  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <AppFlex gap='30px' direction='column' align='center' style={{ minHeight: '200px', borderRadius: '10px' }}>
      <Typography textalign='center' className='typo' variant='h2' fontWeight={600} color='#252D48'>
        {title}
      </Typography>
      <AppFlex direction='column' gap='15px'>
        <Typography variant='body1' fontWeight={600} fontSize={18}>
          {hero}
        </Typography>
        <Typography variant='body1' fontWeight={500} fontSize={16}>
          {callToAction?.title}
        </Typography>
        {callToAction?.content?.map((item, index) => {
          return (
            <AppFlex gap='7px' key={index}>
              <AppFlex style={{ paddingTop: '3px' }}>
                {status === 'offer' && <GoStarFill fill='#EF9F8F' style={{ scale: '0.9' }} />}
                {status !== 'offer' && <FaRegCircleCheck style={{ scale: '1.2' }} fill='#767A86' />}
              </AppFlex>
              <Typography variant='body1' fontWeight={500} fontSize={16}>
                {item.text}
              </Typography>
            </AppFlex>
          );
        })}
      </AppFlex>
      <Typography variant='body1' fontWeight={600} fontSize={18}>
        {callToAction?.hint}
      </Typography>
      {status !== 'offer' && callToAction?.image?.length > 0 && (
        <ImageWrraper>
          <Image loader={loaderProp} fill src={callToAction?.image} alt='' style={{ objectFit: 'contain' }} />
        </ImageWrraper>
      )}
    </AppFlex>
  );
};

export default WhatYouGet;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const ImageWrraper = styled(AppFlex)`
  position: relative;
  width: 90%;
  min-height: 80vw;

  @media (min-width: 500px) {
    min-height: 460px;
    max-width: 560px;
  }
`;
