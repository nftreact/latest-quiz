'use client';

import { AppFlex, Button, Typography } from '@/primitives';
import { TiArrowSortedDown } from 'react-icons/ti';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import BmiInfo from './BmiInfo';
import { useWindowSize } from '@/hooks';
import UserInfo from './UserInfo';
import HintBmi from './HintBmi';
import { useRouter } from 'next/navigation';
import { getCookies } from '@/utils/insdex';
import { useQuestionContext } from '@/providers';

const NewBmi = (min: any, max: any, bmi: any) => {
  const newMinRange = min - min;
  const newMaxRange = max - min;
  const newBmiValue = bmi - min;

  const newBmi = (newBmiValue * 100) / newMaxRange;

  return newBmi;
};
/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  aid: string;
  data: {
    items: {
      title: string;
      button: {
        bgColor: string;
        text: string;
        textColor: string;
      };
      section1: {
        labels: string[];
        hint: string;
        maxRange: number;
        minRange: number;
        statusText: string;
        statusValue: number;
        title: string;
      };
      section2: {
        image: string;
        items: {
          icon: string;
          label: string;
          value: string;
        }[];
      };
      section3: {
        description: string;
        emoji: string;
        title: string;
      };
    };
  };
};

const SummaryQuestionRoot = ({ data, aid }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { button, section1, section2, section3, title } = data.items;
  const { maxRange, minRange, statusValue } = section1;
  const NewBmiValue = NewBmi(minRange, maxRange, statusValue);
  const [value, setValue] = useState<any>();
  const [bmiValue, setBmiValue] = useState(0);
  const { width } = useWindowSize();
  const lableValue = width < 400 ? value - 8 : value - 5;
  const { type } = getCookies();
  const { dispatch } = useQuestionContext();
  const bmiRound = Math.round(section1.statusValue);

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    setTimeout(() => {
      setValue(NewBmiValue);
      setBmiValue(NewBmiValue);
    }, 500);
  }, [value]);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <AppFlex direction='column' gap='5px'>
      {/* title */}
      <Typography textalign='center' fontSize={28} fontWeight={600} style={{ margin: 'auto', lineHeight: 1.3 }}>
        {title}
      </Typography>
      {/* BmiContainer */}
      <BmiContainer>
        <AppFlex justify='space-between'>
          <Typography className='title' fontWeight={700}>
            {section1.title}
          </Typography>
          <AppFlex>
            <Typography className='title' style={{ opacity: 0.5 }}>
              {section1.hint}
            </Typography>
          </AppFlex>
        </AppFlex>
        <AppFlex align='center' style={{ width: '100%', position: 'relative', minHeight: '35px' }}>
          <Lable value={lableValue}>
            <Typography textalign='center' style={{ lineHeight: '20px' }} textcolor='#fff' fontSize={12}>
              {/* {thisLabel} */}
              {section1.statusText}
            </Typography>
            <AppFlex style={{ position: 'absolute', right: '40%', bottom: -10 }}>
              <TiArrowSortedDown />
            </AppFlex>
          </Lable>
        </AppFlex>
        <BmiInfo value={bmiValue} list={section1.labels} min={section1.minRange} max={section1.maxRange} />
      </BmiContainer>
      <UserInfo image={section2.image} items={section2.items} />
      <HintBmi svgIcon={section3.emoji} title={section3.title} description={section3.description} />
      <Button
        className='button-style'
        style={{ marginTop: '5px' }}
        variant='question'
        onClick={() => {
          dispatch({
            type: 'UPDATE_QUESTIONS',
            payload: {
              aid: aid,
              type: type,
            },
          });
        }}
      >
        {button.text}
      </Button>
    </AppFlex>
  );
};

export default SummaryQuestionRoot;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const BmiContainer = styled.section`
  box-shadow: 0 2px 6px rgb(0 0 0 / 8%), 0 2px 34px rgb(0 0 0 / 5%);
  border-radius: 10px;
  background-color: #fff;
  padding: 5px 16px;

  .title {
    font-size: 11px;

    @media (min-width: 500px) {
      font-size: 17px;
    }
  }
`;

const Lable = styled(AppFlex)<{ value: any }>`
  position: absolute;
  padding-block: 5px;
  padding-inline: 8px;
  transition: all 2s ease-in;
  left: ${({ value }) => (value ? `${value}%` : '-30px')};
  background-color: #454e57;
  border-radius: 4px;
  max-width: 100px;
  display: flex;
  justify-content: center;

  svg {
    fill: #454e57;
  }
`;
