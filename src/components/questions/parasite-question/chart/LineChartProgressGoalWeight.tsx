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
  };
};

const LineChartProgressGoalWeight = ({ inputs }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [id, setId] = useState(0);
  const ref = useRef<any>();
  const [isShowLable, setIsShowLable] = useState(false);
  const { current, goal, status } = inputs;
  const goalStrValue = goal.split(':');
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

    const goalLableTimeout = setTimeout(() => {
      setGoalValue({
        value: points[4].payload.values,
        unit: points[4].payload.unit,
        cx: points[4].x,
        cy: points[4].y,
        date: goalStrValue[0],
      });
    }, 3900);

    return () => {
      clearTimeout(timeoutId);
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
          fill={'#FB513B'}
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
          fill={'#047279'}
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
          x={cx}
          y={cy - 12}
          width='20px'
          height='20px'
          stroke='#fff'
          viewBox='0 0 24 24'
          fill='#fff'
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

    return (
      <svg
        x={cx}
        y={cy - 12}
        width='20px'
        height='20px'
        stroke='#fff'
        viewBox='0 0 24 24'
        fill='#047279'
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
    return (
      <linearGradient id='colorUv' x1='0%' y1='0%' x2='100%' y2='0%'>
        <stop offset='100%' style={{ stopColor: '#F6F4EE' }} />
      </linearGradient>
    );
  };

  const handleDataBaseOnGrowth = () => {
    if (status === 'up') {
      const data = [
        {
          name: '',
          uv: 3000,
          pv: 250,
          values: 90,
          unit: 'kg',
          date: '',
        },
        {
          name: '',
          uv: 4000,
          pv: 310,
          values: 0,
          date: 0,
          unit: 'kg',
        },
        {
          name: 'B',
          uv: 4000,
          pv: 380,
          values: 110,
          date: '',
        },
        {
          name: 'goal',
          uv: 4000,
          pv: 470,
          values: goalStrValue[1],
          date: goalStrValue[0],
          unit: 'kg',
        },
        {
          name: 'current',
          uv: 4000,
          pv: 530,
          values: 110,
          date: '',
        },
        {
          name: 'last',
          uv: 4000,
          pv: 530,
          values: 110,
          date: '',
        },
      ];
      return data;
    }

    if (status === 'down') {
      const data = [
        {
          name: 'A',
          uv: 3000,
          pv: 900,
          values: 90,
          unit: 'kg',
          date: '',
        },
        {
          name: 'A',
          uv: 3000,
          pv: 750,
          values: 90,
          unit: 'kg',
          date: '',
        },
        {
          name: 'goal',
          uv: 4000,
          pv: 600,
          values: 0,
          date: 0,
          unit: 'kg',
        },
        {
          name: 'B',
          uv: 4000,
          pv: 480,
          values: 110,
          date: '',
        },
        {
          name: 'current',
          uv: 4000,
          pv: 360,
          values: goalStrValue[1],
          date: goalStrValue[0],
          unit: 'kg',
        },
        {
          name: 'last',
          uv: 4000,
          pv: 355,
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

      <LableCharts isshowlable={String(isShowLable)} name='goal' goalValue={goalValue} growth={status}>
        <AppFlex className='container' direction='column' align='center' gap={'5px'}>
          <p style={{ fontSize: '16px' }}>{goal}</p>
          <IoMdArrowDropdown className='lable' fill='#139c90' />
        </AppFlex>
      </LableCharts>

      {/* LineChart */}
      <LineChartStyled reverseStackOrder={false} width={500} height={300} data={handleDataBaseOnGrowth()}>
        <Tooltip active={false} />
        <CartesianGrid strokeDasharray='3 3' />
        <defs>
          {handleLeanerGradiant()}
          <linearGradient id='stroke' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='100%' style={{ stopColor: '#C3AE88' }} focusable={false} pointsAtY={0} pointsAtX={0} />
          </linearGradient>
        </defs>
        <Area
          style={{ border: '1px solid green', width: '100%' }}
          key={id}
          ref={ref as any}
          animateNewValues={true}
          animationId={1}
          activeDot={false}
          animationEasing='ease-in-out'
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

export default LineChartProgressGoalWeight;

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
    width: 100% !important;
    position: relative !important;
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
  padding: 6px 12px;
  opacity: 0;
  border-radius: 4px;
  background-color: #139c90;
  position: absolute;
  top: 208px;
  left: 5px;
  text-align: center;
  color: #fff;
  font-size: 13px;
  svg {
    scale: 1.8;
  }

  ${({ name, goalValue, growth }) =>
    name === 'goal' &&
    growth === 'up' &&
    css`
      top: 2vw;
      left: 66vw;

      @media (min-width: 600px) {
        top: ${goalValue?.cy - 30}px;
        left: ${goalValue?.cx + 15}px;
      }
    `};

  ${({ name, goalValue, growth }) =>
    name === 'goal' &&
    growth === 'down' &&
    css`
      top: 25vw;
      left: 67vw;

      @media (min-width: 600px) {
        top: ${goalValue?.cy - 10}px;
        left: ${goalValue?.cx + 30}px;
      }
    `};

  @media (min-width: 450px) {
    padding: 8px 16px;
  }

  .lable {
    position: absolute;
    /* top: 25px; */
    left: 28%;
    bottom: -15px;

    @media (min-width: 450px) {
      bottom: -17px;
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
