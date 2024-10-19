'use client';

import { AppFlex, Typography } from '@/primitives';
import { sliderItem } from '@/types/checkout';
import { styled } from 'styled-components';
import Image from 'next/image';
import { HTMLAttributes, forwardRef, useState } from 'react';
import { colors } from '@/theme';
import { imageLoader } from '@/utils/imageLoader';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  card: sliderItem;
};

type RootType = Props & HTMLAttributes<HTMLHeadingElement>;

const NewCardSlider = forwardRef(({ card, ...rest }: RootType) => {
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

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root direction='column' gap={'20px'}>
      <SocialLogoAndDateWrapper gap={'5px'} align='center'>
        <Image src={card.socialLogo} alt='socialLogo' width={20} height={20} priority loader={imageLoader} />
        <Typography variant='body2' fontSize={14} tag='p'>
          {card.date}
        </Typography>
      </SocialLogoAndDateWrapper>

      <ShowImageBtn {...rest}>
        <Typography fontSize={10} tag='p' textalign='center' textcolor='#fff'>
          نمایش تصویر
        </Typography>
      </ShowImageBtn>
      <ProfileInfoWraper direction='column' align='center' gap={'10px'}>
        <ProfileImageWrapper justify='center' align='center'>
          <Image
            style={{ borderRadius: '50%', objectFit: 'cover' }}
            src={card.profileImage}
            alt='socialLogo'
            width={60}
            height={60}
            objectFit='cover'
            priority={true}
          />
        </ProfileImageWrapper>
        <Typography fontSize={16}>{card.name}</Typography>
      </ProfileInfoWraper>
      <Typography variant='body2' tag='p' fontSize={13} style={{ paddingInline: '16px' }}>
        {card.comment.length > 200 ? `${card.comment.slice(0, 200)} ....` : card.comment}
      </Typography>
    </Root>
  );
});

export default NewCardSlider;

NewCardSlider.displayName = 'CardSlider';

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(AppFlex)`
  /* min-width: 320px; */
  max-width: 400px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 10px;
  padding: 16px;
  position: relative;
  min-height: 241px;
`;

const ProfileInfoWraper = styled(AppFlex)`
  width: 100%;
  height: max-content;
`;

const ProfileImageWrapper = styled(AppFlex)`
  position: relative;
  border-radius: 50%;
  border: 1px solid red;
  width: 70px;
  height: 70px;
  margin-inline: auto;
`;

const SocialLogoAndDateWrapper = styled(AppFlex)`
  position: absolute;
  top: 13px;
  width: fit-content;
`;

const ShowImageBtn = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  padding: 5px 6px;
  background-color: ${colors.primary};
  border-radius: 4px;
  cursor: pointer;
  z-index: 100;

  transition: all 0.5s;

  &:hover {
    background-color: #1f5a47;
    opacity: 0.8;
  }
`;
