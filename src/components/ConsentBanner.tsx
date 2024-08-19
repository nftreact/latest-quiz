import { AppFlex } from '@/primitives';
import { AuthContext } from '@/providers/AuthProvider';
import { consentGrantedAdStorage } from '@/utils/sample';
import React, { useContext } from 'react';
import styled from 'styled-components';

const ConsentBanner = () => {
  const { dispatch } = useContext(AuthContext);

  return (
    <Root>
      <div className='container'>
        <span>
          By clicking “Accept All Cookies”, you agree to the storing of cookies on your device to enhance site
          navigation, analyze site usage, and assist in our marketing efforts.
        </span>
        <AppFlex className='button-wrapper' gap='10px'>
          <BannerButton
            onClick={() => {
              dispatch({ type: 'GIVE_CONSENT' });
              consentGrantedAdStorage('granted');
            }}
          >
            Accept All Cookies
          </BannerButton>
          <BannerButton
            style={{ backgroundColor: '#fff', color: ' #3bd6ad', border: '1px solid  #3bd6ad' }}
            onClick={() => {
              dispatch({ type: 'WITHDRAW_CONSENT' });
              consentGrantedAdStorage('denied');
            }}
          >
            Reject All
          </BannerButton>
        </AppFlex>
      </div>
    </Root>
  );
};

export default ConsentBanner;

const Root = styled.section`
  direction: ltr;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 4px;
  background-color: #fff;
  /* position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99999999; */

  .container {
    max-width: 1000px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding: 25px 16px;

    span {
      text-align: center;
      line-height: 25px;
      font-size: 10px;
    }

    .button-wrapper {
      @media (min-width: 700px) {
      }
    }

    @media (min-width: 700px) {
      flex-direction: row;
      justify-content: space-between;
      gap: 50px;

      span {
        text-align: initial;
      }
    }
  }
`;

const BannerButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 10px;
  border-radius: 18px;
  padding: 10px 20px;
  font-weight: 600;
  background-color: #3bd6ad;
  color: #fff;
  width: max-content;
  min-width: 120px;

  @media (min-width: 700px) {
    min-width: 160px;
  }
`;
