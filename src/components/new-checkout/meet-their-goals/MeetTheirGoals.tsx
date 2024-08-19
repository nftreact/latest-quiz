'use client';

import { AppFlex, Typography } from '@/primitives';
import Image from 'next/image';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Star from '../../../../public/images/star.svg';
import AudioPlayer from '@/components/checkout/checkout-comments/AudioPlayer';
import { Navigation, Pagination } from 'swiper/modules';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  content:
    | {
        title: string;
        image: string;
        message: {
          description: string;
          title: string;
        };
      }
    | any;
};

const MeetTheirGoals = ({ content }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { image, message, title } = content;

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
    <Root>
      <Typography textalign='center' variant='h2' fontWeight={600} color='#252D48'>
        {title}
      </Typography>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        grabCursor={true}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          600: {
            slidesPerView: 'auto',
          },
        }}
      >
        {content.comments.map((item: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <Card direction='column' gap='10px'>
                <AppFlex justify='space-between' align='center'>
                  {/* right-section */}
                  <AppFlex direction='column'>
                    <Typography style={{ color: '#929DAB' }} fontSize={12}>
                      {item.date}
                    </Typography>
                    <AppFlex gap={'5px'}>
                      {Array(Number(item.rate))
                        .fill({})
                        .map((item, index) => {
                          return <Image src={Star} alt='stat' key={index} width={15} height={15} />;
                        })}
                    </AppFlex>
                  </AppFlex>
                  {/* left-section */}‍
                  <AppFlex>
                    <Image style={{ borderRadius: '30px' }} width={35} height={35} alt='logo' src={item.profileImage} />
                  </AppFlex>
                </AppFlex>
                {item.image.length > 0 && <Image width={260} height={230} alt='' src={item.image} />}
                {item.voice.length > 0 && (
                  <section>
                    <AudioPlayer voice={item.voice} />
                  </section>
                )}
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Root>
  );
};

export default MeetTheirGoals;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & .swiper {
    padding: 8px !important;
    position: relative !important;
    width: 100% !important;
  }

  & .swiper-slide {
    border-radius: 12px;
    width: max-content;
  }

  & .swiper-button-next:after {
    font-size: 25px !important;

    width: 100px;
    padding: 10px;
    border-radius: 8px;
    background-color: #f5f5f5;
  }

  & .swiper-slide img {
    height: revert-layer;
    border-radius: 8px;
    margin: auto;
  }

  & .swiper-button-prev:after {
    font-size: 25px !important;

    width: 100px;
    padding: 10px;
    border-radius: 8px;
    background-color: #f5f5f5;
  }

  & .swiper-button-next {
    color: #3ad7ab;
    scale: 0.8;
  }

  & .swiper-button-prev {
    color: #3ad7ab;
    scale: 0.8;
  }
`;

const Card = styled(AppFlex)`
  box-shadow: rgba(22, 42, 65, 0.04) 0px 2px 8px, rgba(7, 21, 37, 0.1) 0px 2px 5px;
  min-width: 280px;
  border-radius: 12px;
  padding: 16px;
  height: 100%;
`;

{
  /* <Typography textalign='center' variant='h2' fontWeight={600} color='#252D48'>
        {title}
      </Typography>
      <AppFlex gap='5px' direction='column' style={{ width: '100%' }}>
        <ImageWrraper>
          <Image fill src={image} alt='' style={{ objectFit: 'contain' }} />
        </ImageWrraper>
        <AppFlex direction='column'>
          <Typography fontWeight={700} fontSize={14} variant='subtitle1'>
            {message?.title}
          </Typography>
          <Typography variant='subtitle1' fontSize={12} fontWeight={300}>
            {message?.description}
          </Typography>
        </AppFlex>
      </AppFlex> */
}
