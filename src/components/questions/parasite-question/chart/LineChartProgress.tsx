'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import { css, styled } from 'styled-components';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AppFlex } from '@/primitives';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  inputs: {
    status: 'up' | 'down';
    current: string;
    goal: string;
    unit: string;
  };
};

const LineChartProgress = ({ inputs }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  const ref = useRef<any>();
  const [id, setId] = useState(0);
  const [isShowLable, setIsShowLable] = useState(false);
  const { current, goal, status } = inputs;
  const currentStrValue = current.split(':');
  const goalStrValue = goal.split(':');
  const [currentValue, setCurrentValue] = useState<{
    cx: number;
    cy: number;
    unit: string;
    value: number;
    date: string;
  }>({ cx: 0, cy: 0, unit: '', value: 0, date: '' });

  const [goalValue, setGoalValue] = useState<{
    cx: number;
    cy: number;
    unit: string;
    value: number;
    date: string;
  }>({ cx: 0, cy: 0, unit: '', value: 0, date: '' });

  useEffect(() => {
    const points = ref?.current?.props?.points;
    const timeOutId = setTimeout(() => {
      setId((preve) => preve + 1); // Update state to show the label
    }, 10);

    const timeoutId = setTimeout(() => {
      setIsShowLable(true); // Update state to show the label
    }, 4000);

    const currentLableTimeout = setTimeout(() => {
      setCurrentValue({
        value: points[0].payload.values,
        unit: points[0].payload.unit,
        cx: points[0].x,
        cy: points[0].y,
        date: currentStrValue[0],
      });
    }, 3900);

    const goalLableTimeout = setTimeout(() => {
      setGoalValue({
        value: points[5].payload.values,
        unit: points[5].payload.unit,
        cx: points[5].x,
        cy: points[5].y,
        date: goalStrValue[0],
      });
    }, 3900);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(currentLableTimeout);
      clearTimeout(goalLableTimeout);
      clearTimeout(timeOutId);
    };
  }, []);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */
  const CustomizedDot = (props: { cx: any; cy: any; stroke: any; payload: any; value: any }) => {
    const {
      cx,
      cy,
      payload: { name },
    } = props;

    if (name === 'current') {
      return (
        <svg
          x={cx}
          y={cy - 12}
          width='20px'
          height='20px'
          stroke='#fff'
          viewBox='0 0 24 24'
          fill={'#F35F6E'}
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
            stroke='#fff'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      );
    }

    if (name === 'goal') {
      return (
        <svg
          x={cx}
          y={cy - 12}
          width='20px'
          height='20px'
          stroke='#fff'
          viewBox='0 0 24 24'
          fill={'#41B8A9'}
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
            stroke='#fff'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      );
    }

    if (name === 'last') {
      return (
        <svg
          width={50}
          height={30}
          x={cx - 28}
          y={cy - 15}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          stroke='#000000'
          stroke-width='0.00024000000000000003'
        >
          <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
          <g id='SVGRepo_iconCarrier'>
            {' '}
            <path
              className='rotate-90'
              d='M12.2048 7.29258L18.1189 15.7412C18.49 16.2715 18.1107 17 17.4635 17L6.53652 17C5.88931 17 5.50998 16.2715 5.88114 15.7412L11.7952 7.29258C11.8947 7.1504 12.1053 7.1504 12.2048 7.29258Z'
              fill='#86CAAD'
            ></path>{' '}
          </g>
        </svg>
      );
    }

    return (
      <svg
        x={cx}
        y={cy - 12}
        width='20px'
        height='20px'
        stroke='#fff'
        viewBox='0 0 24 24'
        fill='#F9A29B'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
          stroke='#fff'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    );
  };

  const handleLeanerGradiant = () => {
    if (status === 'up') {
      return (
        <linearGradient id='colorUv' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' style={{ stopColor: 'rgb(237,210,210)' }} />
          <stop offset='33%' style={{ stopColor: 'rgb(231,229,211)' }} />
          <stop offset='66%' style={{ stopColor: 'rgb(231,229,211)' }} />
          <stop offset='100%' style={{ stopColor: 'rgb(194,221,219)' }} />
        </linearGradient>
      );
    }

    if (status === 'down') {
      return (
        <linearGradient id='colorUv' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' style={{ stopColor: 'rgb(237,210,210)' }} />
          <stop offset='33%' style={{ stopColor: 'rgb(231,229,211)' }} />
          <stop offset='66%' style={{ stopColor: 'rgb(231,229,211)' }} />
          <stop offset='100%' style={{ stopColor: 'rgb(194,221,219)' }} />
        </linearGradient>
      );
    }
  };

  const handleDataBaseOnGrowth = () => {
    // status === 'up'
    if (status === 'up') {
      const data = [
        {
          name: 'current',
          uv: 4000,
          pv: 400,
          values: currentStrValue[1],
          date: currentStrValue[0],
          unit: 'kg',
        },
        {
          name: 'A',
          uv: 3000,
          pv: 500,
          values: 90,
          unit: 'kg',
          date: '',
        },
        {
          name: 'B',
          pv: 620,
          values: 110,
          date: '',
        },
        {
          name: '',
          pv: 720,
          values: currentStrValue[1],
          date: currentStrValue[0],
          unit: 'kg',
        },
        {
          name: 'A',
          pv: 830,
          values: 90,
          unit: 'kg',
          date: '',
        },
        {
          name: 'goal',
          uv: 4000,
          pv: 950,
          values: goalStrValue[1],
          date: goalStrValue[0],
          unit: 'kg',
        },
        {
          name: 'last',
          uv: 4000,
          pv: 950,
          values: 1100,
          date: '',
        },
      ];
      return data;
    }

    // status === 'down'status === 'down'

    if (status === 'down') {
      const data = [
        {
          name: 'current',
          pv: 1100,
          values: currentStrValue[1],
          date: currentStrValue[0],
          unit: 'kg',
        },
        {
          name: 'A',
          pv: 960,
          values: 90,
          unit: 'kg',
          date: '',
        },
        {
          name: 'A',
          pv: 830,
          values: 90,
          unit: 'kg',
          date: '',
        },
        {
          name: '',
          pv: 720,
          values: currentStrValue[1],
          date: currentStrValue[0],
          unit: 'kg',
        },
        {
          name: 'B',
          pv: 620,
          values: 110,
          date: '',
        },
        {
          name: 'goal',
          pv: 500,
          values: goalStrValue[1],
          date: goalStrValue[0],
          unit: 'kg',
        },
        {
          name: 'last',
          pv: 500,
          values: 110,
          date: '',
        },
      ];

      return data;
    }
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root>
      {/* LableCharts */}
      <LableCharts
        isshowlable={String(isShowLable)}
        name='current'
        currentValue={currentValue}
        goalValue={goalValue}
        growth={status}
      >
        <AppFlex className='container' direction='column' align='center' gap={'5px'}>
          <p>{currentValue.date}</p>
          <AppFlex gap={'4px'} align='center'>
            <p>{currentValue.value}</p>
            <p>{inputs.unit}</p>
          </AppFlex>
          <IoMdArrowDropdown className='lable' fill='#F35F6E' />
        </AppFlex>
      </LableCharts>

      <LableCharts isshowlable={String(isShowLable)} name='goal' goalValue={goalValue} growth={status}>
        <AppFlex className='container' direction='column' align='center' gap={'5px'}>
          <p>{goalValue.date}</p>
          <AppFlex gap={'4px'} align='center'>
            <p>{goalValue.value}</p>
            <p>{inputs.unit}</p>
          </AppFlex>
          <IoMdArrowDropdown className='lable' fill='#139C90' />
        </AppFlex>
      </LableCharts>

      {/* LineChart */}
      <LineChartStyled reverseStackOrder={false} width={500} height={300} data={handleDataBaseOnGrowth()}>
        <Tooltip active={false} />
        <CartesianGrid strokeDasharray='3 3' />
        <defs>
          {handleLeanerGradiant()}
          <linearGradient id='stroke' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' style={{ stopColor: 'rgb(250,147,152)' }} />
            <stop offset='33%' style={{ stopColor: 'rgb(243,230,171)' }} />
            <stop offset='66%' style={{ stopColor: 'rgb(243,230,171)' }} />
            <stop offset='100%' style={{ stopColor: 'rgb(111,197,174)' }} />
          </linearGradient>
        </defs>
        <Area
          key={id}
          ref={ref as any}
          restart={1}
          repeatDur={2}
          animateNewValues={false}
          animationId={Number(id)}
          animationEasing='ease-in-out'
          activeDot={false}
          type='bump'
          strokeWidth={5}
          stroke='url(#stroke)'
          dataKey='pv'
          fill='url(#colorUv)'
          dot={(props) => CustomizedDot(props)}
          animationDuration={3000}
          animationBegin={500}
        />
      </LineChartStyled>
    </Root>
  );
};

export default LineChartProgress;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section`
  position: relative;
  padding-top: 40px;

  .rotate-90 {
    transform: rotate(90deg);
    transform-origin: center;
  }
`;

const LineChartStyled = styled(AreaChart)`
  &.recharts-surface {
    height: fit-content !important;
    position: relative !important;
    width: 100% !important;
  }

  & .recharts-cartesian-grid {
    display: none;
  }

  &.recharts-wrapper {
    width: 100% !important;
    height: fit-content !important;

    svg {
      path {
        fill: linear-gradient(to right, rgba(242, 73, 55), rgba(242, 233, 55), rgba(80, 242, 55)) !important;
      }
    }
  }
`;

const LableCharts = styled.div<{
  name: string;
  isshowlable: boolean | string;
  currentValue?: any;
  goalValue?: any;
  growth: 'up' | 'down';
}>`
  padding: 8px 12px;
  opacity: 0;
  border-radius: 4px;
  background-color: ${({ name }) => (name !== 'current' ? '#139C90' : '#F35F6E')};
  position: absolute;
  top: 208px;
  left: 5px;
  text-align: center;
  color: #fff;
  font-size: 11px;

  svg {
    scale: 1.8;
  }

  ${({ name, currentValue, goalValue, growth }) =>
    name === 'current' && growth === 'up'
      ? css`
          top: 25vw;
          left: 0vw;

          @media (min-width: 600px) {
            top: ${currentValue.cy - 15}px;
            left: ${currentValue.cx - 5}px;
          }
        `
      : name === 'goal' &&
        growth === 'up' &&
        css`
          top: -4vw;
          left: 71vw;

          @media (min-width: 600px) {
            top: ${goalValue?.cy - 40}px;
            left: ${goalValue?.cx + 35}px;
          }
        `};

  ${({ name, currentValue, goalValue, growth }) =>
    name === 'current' && growth === 'down'
      ? css`
          top: -3vw;
          left: 0vw;

          @media (min-width: 600px) {
            top: ${currentValue.cy - 35}px;
            left: ${currentValue.cx - 5}px;
          }
        `
      : name === 'goal' &&
        growth === 'down' &&
        css`
          top: 23vw;
          left: 73vw;

          @media (min-width: 600px) {
            top: ${goalValue?.cy - 20}px;
            left: ${goalValue?.cx + 40}px;
          }
        `};

  @media (min-width: 450px) {
    padding: 8px 16px;
    svg {
      scale: 2;
    }
    p {
      font-size: 10px;
    }
  }

  .lable {
    position: absolute;
    /* top: 41px; */
    left: 27%;
    bottom: -16px;

    @media (min-width: 450px) {
      bottom: -16px;
    }
  }

  ${({ isshowlable }) =>
    isshowlable === 'true' &&
    css`
      opacity: 1;
      transition: all 1s;
    `};
  .container {
    position: relative;
  }
`;
