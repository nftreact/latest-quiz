'use client';

import AudioPlayer from '@/components/checkout/checkout-comments/AudioPlayer';
import { AppFlex, Button, Typography } from '@/primitives';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoStarFill } from 'react-icons/go';
import { keyframes, styled } from 'styled-components';

const Modal = dynamic(() => import('react-minimal-modal').then((item) => item.default));

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  content: {
    title: string;
    stories: {
      comment: string;
      date: string;
      mainImage: string;
      name: string;
      profileImage: string;
      socialLogo: string;
    }[];
  };
};

const SuccessStories = ({ content }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  const { stories, title } = content;
  const [imageModal, setImageModal] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { back, push } = useRouter();
  const params = useParams();

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    setIsOpenModal(Boolean(window.location.hash === '#dialog'));
  }, [params]);

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = 'hidden';
    }

    const html = document.querySelector('html');
    if (html) {
      html.style.overflow = isOpenModal ? 'hidden' : 'auto';
    }
  }, [isOpenModal]);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <AppFlex gap='30px' direction='column' align='center'>
      <Typography textalign='center' variant='h2' fontWeight={600} color='#252D48'>
        {title}
      </Typography>
      <AppFlex gap='30px' direction='column'>
        {stories?.map((item: any, index) => {
          return (
            <AppFlex direction='column' gap='5px' key={index}>
              <AppFlex align='flex-start' gap='7px'>
                <Image
                  style={{ height: 'auto', objectFit: 'contain' }}
                  width={16}
                  height={18}
                  alt=''
                  src={
                    "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'%3E%3Cpath fill='%23252D48' d='m8.048 4.618-1.652 6.39h-3.45l2.6-6.39zm4.665 0-1.652 6.39H7.61l2.6-6.39z'/%3E%3C/svg%3E"
                  }
                />
                <Typography style={{ color: '#252D48' }} variant='subtitle1' fontWeight={400} fontSize={14}>
                  {item.comment}
                </Typography>
              </AppFlex>
              <section
                style={{
                  justifyContent: 'space-between',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AppFlex align='center' gap='10px'>
                  <AppFlex gap='2px'>
                    {Array(5)
                      .fill({})
                      .map((item) => {
                        return <GoStarFill fill='#F7EB7B' key={item} style={{ scale: '0.9' }} />;
                      })}
                  </AppFlex>
                  <Typography style={{ color: '#252D48' }} variant='body1' fontWeight={900} fontSize={18}>
                    {item.name}
                  </Typography>
                </AppFlex>
                {Boolean(item.mainImage) && (
                  <section>
                    <Button
                      onClick={() => {
                        push(`${window.location.href}#dialog`);
                        setLoading(true);
                        setImageModal(item.mainImage);
                        // setIsOpenModal(true);
                      }}
                      variant='checkout'
                      style={{
                        width: 'max-content',
                        maxWidth: 'max-content',
                        padding: '2px 12px',
                        height: 'max-content',
                        minHeight: 0,
                        borderRadius: '4px',
                      }}
                    >
                      <Typography variant='subtitle2' fontSize={11} fontWeight={500}>
                        مشاهده اسکرین شات
                      </Typography>
                    </Button>
                  </section>
                )}
              </section>
              {item.voice.length > 0 && (
                <section style={{ width: '100%', margin: 'auto' }}>
                  <AudioPlayer voice={item.voice} />
                </section>
              )}
            </AppFlex>
          );
        })}
      </AppFlex>
      <ModalStyle
        open={isOpenModal}
        onClose={() => {
          back();
          // setIsOpenModal(false);
        }}
      >
        <ImageWrapper>
          {loading && <div className='styled' />}
          <Image
            style={{ objectFit: 'contain', borderRadius: '10px' }}
            onLoadingComplete={() => setLoading(false)}
            onLoad={() => setLoading(false)}
            fill
            src={imageModal}
            alt='SuccessStories-image-modal'
          />
        </ImageWrapper>
      </ModalStyle>
    </AppFlex>
  );
};

export default SuccessStories;

/**
 * styled-component
 * _______________________________________________________________________________
 */
const ModalStyle = styled(Modal)`
  && .modal__header {
    display: flex;
    justify-content: start;
  }

  &.modal__popup {
    max-width: max-content !important;
  }

  & .modal__body {
    overflow: hidden !important;
  }

  & .modal__close-button {
    cursor: pointer !important;
    color: #000;
  }
`;

const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  min-width: 328px;
  width: 60vw;
  height: 76vh;

  @media (min-width: 600px) {
    width: 100%;
    height: 75vh;
  }

  .styled {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 100%);
    background-size: 200px 100%;
    animation: ${loadingAnimation} 4s infinite linear;
    border-radius: 20px;
    width: 100%;
    max-width: 600px;
  }
`;
