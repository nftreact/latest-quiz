'use client';

import { AppFlex, Typography } from '@/primitives';
import Image from 'next/image';
import { styled } from 'styled-components';
import 'rc-slider/assets/index.css';
import LineBar from './LineBar';
import { useEffect, useState } from 'react';
import { THISPROJECT, thisLanguage } from '@/constants/projects';
import ResultList from './ResultList';
import BackgroundTriangles from './BackgroundTriangles';
import { useWindowScrollPositions } from '@/hooks';

/**
 * props
 * _______________________________________________________________________________
 */

interface ResultBoxListItem {
  icon: string;
  title: string;
  description: string;
  descriptionColor: string;
}
interface ResultBoxProps {
  title: string;
  scaleList: string[];
  thisValue: number;
  warningTitle?: string;
  warningDescription?: string;
  isSummary?: boolean;
  items: ResultBoxListItem[];
  borderImage: string;
  showBox: boolean;
  showContent: boolean;
  lineBarLabel: string;
  video?: {
    link: string;
    text: string;
  };
}

const ResultBox = (props: ResultBoxProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const {
    borderImage,
    items,
    lineBarLabel,
    scaleList,
    showBox,
    showContent,
    thisValue,
    title,
    isSummary,
    video,
    warningDescription,
    warningTitle,
  } = props;

  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useWindowScrollPositions();

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    if (scrollY >= 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scrollY]);

  useEffect(() => {
    setValue(thisLanguage === 'ir' ? 100 - thisValue : thisValue);
  }, []);

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
    <AppFlex
      direction='column'
      align='center'
      gap={'20px'}
      style={{ padding: '24px 0px', opacity: isVisible ? 1 : 0, transition: 'opacity 1s' }}
    >
      <Typography variant='h3' tag='h2' textalign='center'>
        {title}
      </Typography>
      <Container
        direction='column'
        gap={'20px'}
        className={`resultBox${showBox ? 'Shown' : ''}`}
        style={{ width: '100%' }}
      >
        {video?.link && <div>{/* <VideoPlayer inputs={video} /> */}</div>}
        <LineBar
          scaleList={scaleList}
          value={value}
          warningTitle={warningTitle}
          warningDescription={warningDescription}
          isSummary={isSummary}
          thisLabel={lineBarLabel}
        />
        <Divider />
        <div style={{ overflow: 'hidden', position: 'relative', minHeight: '320px' }}>
          <ResultList list={items} showContent={showContent} />
          {borderImage && (
            <div style={{ marginTop: '0px' }}>
              <Image
                loader={loaderProp}
                className={`resultBoxBorderImage${showContent ? 'Shown' : ''}`}
                src={borderImage}
                width={120}
                height={400}
                alt='hey!'
                style={{
                  height: 'auto',
                  position: 'absolute',
                  zIndex: 1,
                  bottom: '0',
                  ...(THISPROJECT.DEFAULT_LOCALE === 'fa_IR' ? { right: 0 } : { left: 0 }),
                }}
                loading='lazy'
              />
            </div>
          )}
          <BackgroundTriangles />
        </div>
      </Container>
    </AppFlex>
  );
};

export default ResultBox;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Container = styled(AppFlex)`
  border-radius: 12px;
  box-shadow: 0 2px 6px rgb(22 42 65 / 6%), 0 12px 24px rgb(7 21 37 / 8%);
  position: relative;

  .resultBox {
    opacity: 0;
    transform: translateY(50px);
  }

  .resultBoxBorderImage {
    transform: translateX(20px);
    opacity: 0;
  }

  .resultBoxBorderImage {
    transform: translateX(20px);
    opacity: 0;
  }

  .resultBoxList {
    transform: translateY(20px);
    opacity: 0;
  }

  .resultBoxShown,
  .resultBoxBorderImageShown,
  .resultBoxListShown,
  .percentageBoxShown,
  .preCheckoutBannerTitleShown {
    opacity: 1;
    transform: translate(0, 0);
    transition: all 1s ease-in;
  }
`;

const Divider = styled.div`
  background-color: #eaeef2;
  height: 2px;
  width: 90%;
  margin: auto;
`;
