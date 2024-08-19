'use client';

import { styled } from 'styled-components';
import { THISPROJECT } from '@/constants/projects';
import Image from 'next/image';
import Cookies from 'universal-cookie';
import QuestionProgressBar from '@/layouts/header/QuestionProgressBar';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { AppFlex, Typography } from '@/primitives';
import { useQuery } from '@tanstack/react-query';
import { getQuestion } from '../questions.services';
import { useEffect, useState } from 'react';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  ip: any;
};

const QuestionHeader = ({ ip }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const pathname = usePathname().split('/') as string[];
  const { back } = useRouter();

  const cookie = new Cookies();
  const params = useParams();
  const Authorization = cookie.get('Authorization');
  const userCode = cookie.get('code');
  const type = cookie.get('type');
  const quesryString = params?.slug[0];

  const { data, isFetching } = useQuery({
    queryKey: ['question'],
    queryFn: async () => {
      const res = await getQuestion({
        Authorization: Authorization,
        params: quesryString,
        type,
        ip: ip,
        userCode: userCode,
      });

      return res;
    },
  });
  const hasHeader = data?.hasHeader;

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  const renderQuestionProgress = () => {
    if ((data && Number(data?.currentQuestion), hasHeader === 'true')) {
      return (
        <QuestionProgressBar
          allQuestions={data ? data?.allQuestions : ''}
          currentQuestion={data ? data?.currentQuestion : ''}
        />
      );
    }
  };

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const imageLoader = ({ src, width, quality }: { src: string; width: string; quality: string }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const getContentBasedOnLayoutSegmen = (pathname: string | null) => {
    if (
      data &&
      pathname &&
      pathname === 'question' &&
      Number(data.currentQuestion) > 1 &&
      THISPROJECT.DEFAULT_LOCALE === 'fa_IR'
    ) {
      return (
        <div style={{ cursor: 'pointer' }}>
          <FaArrowRightLong onClick={back} />
        </div>
      );
    }

    if (
      data &&
      pathname &&
      pathname === 'question' &&
      Number(data.currentQuestion) > 1 &&
      THISPROJECT.DEFAULT_LOCALE === 'en_US'
    ) {
      return (
        <div
          onClick={back}
          style={{
            cursor: 'pointer',
            width: '50px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FaArrowLeftLong />
        </div>
      );
    }
  };

  const QuestionCounter = () => {
    if (data && Number(data.allQuestions) && Number(data.currentQuestion)) {
      return (
        <AppFlex gap='2px' align='center'>
          <Typography style={{ color: '#E76D85', fontSize: '16px' }} fontWeight={600} variant='subtitle2'>
            {Number(data.currentQuestion)}
          </Typography>
          <Typography style={{ color: '#E76D85', fontSize: '16px' }} fontWeight={700} variant='subtitle2'>
            /
          </Typography>
          <Typography style={{ color: '#454E57', fontSize: '16px' }} fontWeight={600} variant='subtitle2'>
            {Number(data.allQuestions)}
          </Typography>
        </AppFlex>
      );
    }
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <>
      <Root
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <FaArrowRightLong onClick={back} style={{ cursor: 'pointer' }} />
        <Image
          loader={imageLoader as any}
          src={THISPROJECT.LOGO_URL}
          alt={'header-logo'}
          width={100}
          height={30}
          className='logo'
          priority
        />
        <p></p>
      </Root>
      <>
        <Container>
          {getContentBasedOnLayoutSegmen(pathname[1])}
          <Image
            loader={imageLoader as any}
            src={THISPROJECT.LOGO_URL}
            alt={'header-logod'}
            width={100}
            height={30}
            className='logo'
            priority
          />
          {/* {QuestionCounter()} */}
        </Container>
        {renderQuestionProgress()}
      </>
    </>
  );
};

export default QuestionHeader;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 8px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 95;

  .logo {
    margin-inline: auto;
  }
`;

const Root = styled.header`
  position: fixed;
  width: 100%;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 95;

  .logo {
    margin-inline: auto;
  }
`;
