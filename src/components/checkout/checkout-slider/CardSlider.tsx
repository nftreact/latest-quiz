'use client';

import { AppFlex, Typography } from '@/primitives';
import { sliderItem } from '@/types/checkout';
import { styled } from 'styled-components';
import Image from 'next/image';
import { HTMLAttributes, forwardRef } from 'react';
import { colors } from '@/theme';
import { imageLoader } from '@/utils/imageLoader';
import { thisLocale } from '@/constants/projects';
import { GoStarFill } from 'react-icons/go';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  card: sliderItem;
};

type RootType = Props & HTMLAttributes<HTMLHeadingElement>;

const CardSlider = forwardRef(({ card, ...rest }: RootType) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const locale = thisLocale;

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
    <Root direction='column' gap={'10px'}>
      <AppFlex gap='10px' align='center'>
        <FirstIndexTypoWrapper justify='center' align='center'>
          {card.name[0].toUpperCase()}
        </FirstIndexTypoWrapper>
        <Typography fontSize={16}>{card.name}</Typography>
      </AppFlex>
      <AppFlex gap='2px'>
        {Array(5)
          .fill({})
          .map((item) => {
            return <GoStarFill fill='#F7EB7B' key={item} style={{ scale: '0.9' }} />;
          })}
      </AppFlex>
      <Typography style={{ color: '#666C7E' }} variant='body2' tag='p' fontSize={16} fontWeight={500}>
        {card.comment}
      </Typography>
    </Root>
  );
});

export default CardSlider;

CardSlider.displayName = 'CardSlider';

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(AppFlex)`
  /* min-width: 320px; */
  max-width: 400px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 10px;
  padding: 18px 24px;
  position: relative;
  min-height: 280px;
`;

const FirstIndexTypoWrapper = styled(AppFlex)`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #eef4fc;
  color: #727884;
  font-weight: 600;
  font-size: 14px;
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
  top: 13px;
  width: fit-content;
`;

const ShowImageBtn = styled.div`
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

{
  /* <ShowImageBtn {...rest}>
          <Typography fontSize={10} tag='p' textalign='center' textcolor='#fff'>
            {locale === 'fa_IR'
              ? 'نمایش تصویر'
              : locale === 'en_US'
              ? 'Show chat image'
              : locale === 'it_US' && `Mostra l'immagine della chat`}
          </Typography>
        </ShowImageBtn> */
}
{
  /* <SocialLogoAndDateWrapper gap={'5px'} align='center'>
          <Image src={card.socialLogo} alt='socialLogo' width={20} height={20} priority loader={imageLoader} />
          <Typography variant='body2' fontSize={14} tag='p'>
            {card.date}
          </Typography>
        </SocialLogoAndDateWrapper> */
}

// <ProfileInfoWraper direction='column' align='center' gap={'10px'}>
//   <ProfileImageWrapper justify='center' align='center'>
//     <Image
//       style={{ borderRadius: '50%', objectFit: 'cover' }}
//       src={card.profileImage}
//       alt='socialLogo'
//       width={60}
//       height={60}
//       objectFit='cover'
//       priority={true}
//     />
//   </ProfileImageWrapper>
// </ProfileInfoWraper>;
