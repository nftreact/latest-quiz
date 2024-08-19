'use client';

import { Fragment } from 'react';
import { styled } from 'styled-components';
import Image from 'next/image';
import Tooltip from './Tooltip';
import ImageChart from '../../../../../public/images/chart.webp';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  inputs: {
    status: string;
    current: string;
    goal: string;
    unit: string;
    inputs: {
      data: string[];
      months: string[];
      lastTooltipText: string;
    };
  };
};

const ParasitChart = (props: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { inputs } = props;

  const myData = [
    {
      id: 1,
      text: inputs.inputs.data[0],
      top: 'calc(0% - 2.2rem)',
      left: 'calc(0% - 0.3rem)',
    },
    {
      id: 2,
      text: inputs.inputs.data[1],
      top: 'calc(0% - 0.4rem)',
      left: 'calc(25% - 1.1rem)',
    },
    {
      id: 3,
      text: inputs.inputs.data[2],
      top: 'calc(0% + 0.5rem)',
      left: 'calc(50% - 1.3rem)',
    },
    {
      id: 4,
      text: inputs.inputs.data[3],
      top: 'calc(0% + 2.5rem)',
      left: 'calc(75% - 1.4rem)',
    },
  ];

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
    <Container>
      <InnerContainer>
        <ImageWrapper>
          <AbsoluteImageContainer>
            <Image src={ImageChart} alt='chart' fill loader={loaderProp} />
          </AbsoluteImageContainer>
          {myData.map((item, index) => {
            if (item.text !== '')
              return (
                <Fragment key={item.id}>
                  <Tooltip
                    text={item.text}
                    extraStyles={{
                      color: '#fff',
                      backgroundColor: '#252d48',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      top: item.top,
                      left: item.left,
                      width: '44px',
                      height: '24px',
                    }}
                    delay={(index + 1) * 500}
                    isLast={index === myData.length - 1}
                    latsTooltipText={inputs.inputs.lastTooltipText}
                  />
                </Fragment>
              );
          })}
          <AnimatedDiv className='chartAnimation' />
        </ImageWrapper>
      </InnerContainer>
      <MonthsContainer>
        {inputs.inputs.months.map((monthName: any) => (
          <MonthText key={monthName}>{monthName}</MonthText>
        ))}
      </MonthsContainer>
    </Container>
  );
};

export default ParasitChart;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Container = styled.div`
  position: relative;
  padding: 57px 20px 44px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 12px;
  border-radius: 12px;
  height: 220px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 400px) {
    width: 100%;
    padding: 57px 0px 44px;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 298px;
  min-height: 118px;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const AbsoluteImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
`;

const AnimatedDiv = styled.div`
  position: absolute;
  min-height: 118px;
  right: 0;
  z-index: 1000;
  width: 100%;
  background-color: #fff; /* Light gray */

  &.dark {
    background-color: #1f2937; /* Dark gray */
  }
`;

const MonthsContainer = styled.div`
  position: absolute;
  bottom: 13px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 36px;
  width: 100%;
  max-width: 350px;
  padding: 0 12px;
  height: 1rem;
  margin-top: 0.5rem;
  margin: 0 auto;
  flex-direction: row-reverse;

  @media (min-width: 364px) and (max-width: 400px) {
    gap: 38px;
  }
`;

const MonthText = styled.p`
  color: rgb(118, 122, 134);
  font-size: 0.75rem; /* 12px */
  text-align: center;
  width: 30px;
`;
