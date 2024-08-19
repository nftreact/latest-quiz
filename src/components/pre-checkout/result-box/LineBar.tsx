'use client';

import { AppFlex, Typography } from '@/primitives';
import { styled } from 'styled-components';
import Slider from 'rc-slider';
import { TiArrowSortedDown } from 'react-icons/ti';
import { THISPROJECT, thisLanguage } from '@/constants/projects';
import Image from 'next/image';
import { useWindowSize } from '@/hooks';
import Warning from '../../../../public/images/warning.png';

/**
 * props
 * _______________________________________________________________________________
 */
interface LineBarProps {
  value: number;
  scaleList: string[];
  warningTitle?: string;
  warningDescription?: string;
  isSummary?: boolean;
  thisLabel: string;
}

const LineBar = ({ scaleList, thisLabel, value, isSummary, warningDescription, warningTitle }: LineBarProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { width } = useWindowSize();
  const isMoble = width < 600;
  const lableValue = isMoble ? value - 10 : value - 7;

  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

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
    <Container id='lineBarContainer' direction='column' gap={'20px'}>
      <AppFlex align='center' style={{ width: '100%', position: 'relative', minHeight: '35px' }}>
        <Lable value={lableValue}>
          <Typography textalign='center' style={{ lineHeight: '20px' }} textcolor='#fff' fontSize={12}>
            {thisLabel}
          </Typography>
          <AppFlex style={{ position: 'absolute', right: '40%', bottom: -10 }}>
            <TiArrowSortedDown />
          </AppFlex>
        </Lable>
      </AppFlex>
      <Slider min={0} max={100} value={value} reverse />
      <AppFlex justify='space-between' direction={thisLanguage === 'ir' ? 'row-reverse' : 'row'}>
        {scaleList?.map((item, i) => {
          return (
            <Typography key={item + i} textcolor='#D1D5DA' variant='body2'>
              {item}
            </Typography>
          );
        })}
      </AppFlex>

      {isSummary && (
        <WarningContainer align='center' gap={'20px'}>
          <WarningSVGContainer justify='center' align='center'>
            <Image src={Warning} alt='Warning-svg' width={25} height={25} loader={loaderProp} />
          </WarningSVGContainer>
          <AppFlex direction='column' align='flex-start' gap={'10px'}>
            <Typography variant='body1' fontWeight={600} fontSize={16}>
              {warningTitle}
            </Typography>
            <Typography variant='subtitle2' textcolor='#663C01'>
              {warningDescription}
            </Typography>
          </AppFlex>
        </WarningContainer>
      )}
    </Container>
  );
};

export default LineBar;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const WarningContainer = styled(AppFlex)`
  background-color: #fff3e5;
  padding: 16px;
  border-radius: 8px;
`;

const WarningSVGContainer = styled(AppFlex)`
  background-color: #fde3bf;
  min-width: 52px;
  height: 55px;
  border-radius: 10px;
`;

const Container = styled(AppFlex)`
  padding: 16px;

  .rc-slider-track {
    margin-top: -3px;
    height: 10px;
    background: linear-gradient(-90deg, #96d9ff, #b7f5a8 31.77%, #f9eb7c 66.15%, #fc806e);
  }

  & .rc-slider-rail {
    margin-top: -3px;
    height: 10px;
    background-color: red;
    background: linear-gradient(-90deg, #96d9ff, #b7f5a8 31.77%, #f9eb7c 66.15%, #fc806e);
    opacity: 1;
    transition: opacity 1s ease-in-out;
  }

  & .rc-slider-handle {
    transition: all 2s ease-in;
    background-color: #fff;
    border: 1px solid #fff;
    z-index: 10;
    width: 20px;
    height: 20px;
    opacity: 1 !important;
    margin-top: -9px;
    box-shadow: 0 2px 6px rgb(36 36 36 / 45%), 0 12px 24px rgb(36 36 36 / 20%);
  }
`;

const Lable = styled(AppFlex)<{ value: any }>`
  position: absolute;
  padding-block: 5px;
  padding-inline: 5px;
  transition: all 2s ease-in;
  right: ${({ value }) => value && `${value - 4}%`};
  background-color: #757575;
  border-radius: 4px;
  max-width: 70px;
  display: flex;
  justify-content: center;

  svg {
    fill: #757575;
  }
`;
