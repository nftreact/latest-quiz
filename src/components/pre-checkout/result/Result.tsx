'use client';

import { AppFlex, Typography } from '@/primitives';
import Image from 'next/image';
import { styled } from 'styled-components';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {};

const Result = ({}: Props) => {
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
    <AppFlex direction='column' style={{border:"1px solid red"}}>
      <Header>
        <Typography fontSize={16} fontWeight={700} className='typo'>
          Now
        </Typography>
        <div className='divider' />
        <Typography fontSize={16} fontWeight={700} className='typo'>
          Goal
        </Typography>
      </Header>
      <ImageWrapper>
        <div className='image-wrapper'>
          <Image
            alt='user-image'
            src='https://web.appscdn.io/web/WebDivisionFiles/Public/FE(w)/monetisation/male_before_3.webp'
            fill
          />
        </div>
        <div className='image-wrapper'>
          <Image
            alt='user-image'
            src='https://web.appscdn.io/web/WebDivisionFiles/Public/FE(w)/monetisation/male_after_3.webp'
            fill
          />
        </div>
      </ImageWrapper>
      <UserInfoContainer>
        <AppFlex className='wrapper' direction='column'>
          <Typography fontSize={16} fontWeight={700}>
            Body fat
          </Typography>
          <Typography fontSize={12} fontWeight={300}>
            6-14%
          </Typography>
          <div className='horizontal-divider' />
          <MetabolismLevel direction='column'>
            <Typography fontSize={16} fontWeight={700}>
              Metabolism level
            </Typography>
            <AppFlex gap='3px'>
              {Array(5)
                .fill({})
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='card'
                      style={{ backgroundColor: `${index > 1 ? '#fff' : '#EF9F8F'}` }}
                    />
                  );
                })}
            </AppFlex>
          </MetabolismLevel>
        </AppFlex>
        <div className='divider' />
        <AppFlex className='wrapper' direction='column'>
          <Typography fontSize={16} fontWeight={700}>
            Body fat
          </Typography>
          <Typography fontSize={12} fontWeight={300}>
            6-14%
          </Typography>
          <div className='horizontal-divider' />
          <MetabolismLevel direction='column'>
            <Typography fontSize={16} fontWeight={700}>
              Metabolism level
            </Typography>
            <AppFlex gap='3px'>
              {Array(5)
                .fill({})
                .map((item, index, array) => {
                  return (
                    <div
                      key={index}
                      className='card'
                      style={{ backgroundColor: `${index > 3 ? '#fff' : '#EF9F8F'}` }}
                    />
                  );
                })}
            </AppFlex>
          </MetabolismLevel>
        </AppFlex>
      </UserInfoContainer>
      <Typography color='#767A86' fontSize={12} fontWeight={300} lineHeight={3}>
        This is not a guarantee or promise of results.
      </Typography>
    </AppFlex>
  );
};

export default Result;

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
    min-height: 65vw;
    object-fit: cover;

    @media (min-width: 500px) {
      min-height: 360px;
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
    width: 45%;
  }

  .divider {
    background-color: #fff;
    min-height: 20px;
    height: auto;
    min-width: 2px;
    border-radius: 10px;
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
    width: 24px;
    height: 4px;
    background-color: #fff;
  }
`;
