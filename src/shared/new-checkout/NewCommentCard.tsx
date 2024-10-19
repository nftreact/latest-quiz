'use client';

import { CommentsItem } from '@/types/checkout';
import Image from 'next/image';
import styled from 'styled-components';
import Star from '../../../public/images/star.svg';
import { AppFlex, Typography } from '@/primitives';
import dynamic from 'next/dynamic';

const AudioPlayer = dynamic(() => import('../../components/checkout/checkout-comments/AudioPlayer'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
/**
 * props
 * _______________________________________________________________________________
 */
type Props = {};

const NewCommentCard = ({ profileName, profileImage, date, title, text, image, rate, voice }: CommentsItem) => {
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
    <Container direction='column' gap={'10px'}>
      <AppFlex justify='space-between' align='center'>
        <AppFlex align='center' gap={'5px'}>
          <Image
            src={profileImage}
            width={40}
            height={40}
            alt='profile image'
            style={{ borderRadius: '50px', objectFit: 'cover' }}
            loading='lazy'
          />
          <Typography style={{ fontSize: '13px', color: '#8490a1', fontWeight: '600', paddingRight: '5px' }}>
            {profileName}
          </Typography>
        </AppFlex>
        <AppFlex direction='column' gap={'5px'} align='flex-end'>
          <Typography style={{ fontSize: '13px', color: '#8490a1', fontWeight: '600' }}>{date}</Typography>
          <AppFlex gap={'5px'}>
            {Array(5)
              .fill({})
              .map((item, index) => {
                return <Image src={Star} alt='stat' key={index} width={15} height={15} />;
              })}
          </AppFlex>
        </AppFlex>
      </AppFlex>
      <AppFlex direction='column' gap={'8px'}>
        {voice && <AudioPlayer voice={voice} />}
        {title && (
          <Typography
            style={{
              fontSize: '16px',
              color: '#090A0',
              fontWeight: '700',
            }}
          >
            {title}
          </Typography>
        )}
        {text && <Typography style={{ fontSize: '14px', color: '#6C727A', minHeight: '40px' }}>{text}</Typography>}
        {image && (
          <ImageWrapper>
            <Image src={image} fill alt='comment image' loading='lazy' style={{ borderRadius: '8px' }} />
          </ImageWrapper>
        )}
      </AppFlex>
    </Container>
  );
};

export default NewCommentCard;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Container = styled(AppFlex)`
  border-radius: 12px;
  background-color: white;
  padding: 24px 16px;
  overflow: unset;
  box-shadow: 0 2px 8px rgb(22 42 65 / 4%), 0 14px 26px rgb(7 21 37 / 10%);
`;

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 70vw;

  @media (min-width: 768px) {
    height: 20vw;
  }
`;
