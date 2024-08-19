'use client';

import { AppFlex, Typography } from '@/primitives';
import Image from 'next/image';
import { styled } from 'styled-components';

/**
 * props
 * _______________________________________________________________________________
 */
type ResultOfProgramProps = {
  content: {
    hint: string;
    title: string;
    after: {
      title: string;
      image: string;
      param1: {
        title: string;
        value: string;
      };
      param2: {
        title: string;
        value: string;
      };
    };
    before: {
      title: string;
      image: string;
      param1: {
        title: string;
        value: string;
      };
      param2: {
        title: string;
        value: string;
      };
    };
  };
};

const ResultOfProgram = ({ content }: ResultOfProgramProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { after, before, hint, title } = content;

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
    <AppFlex direction='column'>
      <Header>
        <Typography fontSize={16} fontWeight={700} className='typo'>
          {before.title}
        </Typography>
        <div className='divider' />
        <Typography fontSize={16} fontWeight={700} className='typo'>
          {after.title}
        </Typography>
      </Header>
      <ImageWrapper>
        <div className='image-wrapper'>
          <Image
            loader={loaderProp}
            className='width-image'
            alt='user-image'
            src={before.image}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className='image-wrapper'>
          <Image
            loader={loaderProp}
            className='width-image'
            alt='user-image'
            src={after.image}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </ImageWrapper>
      <UserInfoContainer>
        <AppFlex className='wrapper' direction='column'>
          <Typography fontSize={16} fontWeight={700}>
            {before.param1.title}
          </Typography>
          <Typography fontSize={12} fontWeight={300}>
            {before.param1.value}
          </Typography>
          <div className='horizontal-divider' />
          <MetabolismLevel direction='column'>
            <Typography fontSize={16} fontWeight={700}>
              {before.param2.title}
            </Typography>
            <AppFlex gap='2px'>
              {Array(5)
                .fill({})
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='card'
                      style={{ backgroundColor: `${index + 1 > Number(before.param2.value) ? '#fff' : '#3AD7AB'}` }}
                    />
                  );
                })}
            </AppFlex>
          </MetabolismLevel>
        </AppFlex>
        <div className='divider' />
        <AppFlex className='wrapper' direction='column'>
          <Typography fontSize={16} fontWeight={700}>
            {after.param1.title}
          </Typography>
          <Typography fontSize={12} fontWeight={300}>
            {after.param1.value}
          </Typography>
          <div className='horizontal-divider' />
          <MetabolismLevel direction='column'>
            <Typography fontSize={16} fontWeight={700}>
              {after.param2.title}
            </Typography>
            <AppFlex gap='3px'>
              {Array(5)
                .fill({})
                .map((item, index, array) => {
                  return (
                    <div
                      key={index}
                      className='card'
                      style={{ backgroundColor: `${index > Number(after.param2.value) ? '#fff' : '#3AD7AB'}` }}
                    />
                  );
                })}
            </AppFlex>
          </MetabolismLevel>
        </AppFlex>
      </UserInfoContainer>
      <Typography color='#767A86' fontSize={12} fontWeight={300} lineHeight={1.5} style={{ marginTop: '10px' }}>
        {hint}
      </Typography>
    </AppFlex>
  );
};

export default ResultOfProgram;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Header = styled(AppFlex)`
  background-color: #f1efee;
  padding: 10px;
  width: 100%;
  justify-content: space-between;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  .typo {
    width: 49%;
    text-align: center;
  }

  .divider {
    background-color: #fff;
    min-height: 20px;
    min-width: 2px;
    border-radius: 10px;
  }
`;

const ImageWrapper = styled(AppFlex)`
  width: 100%;
  background: radial-gradient(85% 85% at 50% 50%, #fefefe 26.94%, #ddcdd0 100%);
  .image-wrapper {
    width: 50%;
    position: relative;
    min-height: 70vw;
    object-fit: cover;

    .width-image {
      width: 98% !important;
      margin: auto;
    }

    @media (min-width: 500px) {
      min-height: 280px;

      .width-image {
        width: 70% !important;
        margin: auto;
      }
    }
  }
`;

const UserInfoContainer = styled(AppFlex)`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #f1efee;
  padding: 10px;
  width: 100%;
  justify-content: space-between;

  .wrapper {
    width: 48%;
  }

  .divider {
    background-color: #fff;
    min-height: 20px;
    height: auto;
    min-width: 2px;
    border-radius: 10px;
    margin-inline: 15px;
  }

  .horizontal-divider {
    background-color: #fff;
    min-height: 1px;
    width: 100%;
    border-radius: 10px;
    margin-block: 10px;
  }
`;

const MetabolismLevel = styled(AppFlex)`
  .card {
    width: 17px;
    height: 4px;
    background-color: #fff;
  }
`;
