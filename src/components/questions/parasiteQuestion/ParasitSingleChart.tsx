'use client'

import Image from 'next/image'
import styled from 'styled-components'
import Tooltip from './Tooltip'

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  inputs: {
    status: 'up' | 'down'
    goal: string
    unit: null
    inputs: {
      status: 'up' | 'down'
      weekNames: string[]
      tooltipCurrent: string
      tooltipGoal: string
    }
  }
}

const ParasitSingleChart = (props: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { inputs } = props

  const { locale } = global.config
  const weeks = {
    fa_IR: ['هفته 1', 'هفته 2', 'هفته 3', 'هفته 4'],
    en_US: ['Week1', 'Week2', 'Week3', 'Week4'],
    it_US: ['Setti1', 'Setti2', 'Setti3', 'Setti4'],
  } as { [key: string]: string[] }

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const loaderProp = ({ src }: { src: string }) => {
    return src
  }

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Container>
      <ChartWrapper>
        <GridLineImage
          loader={loaderProp}
          className='gridLineFade'
          width={343}
          height={257}
          alt='grid-line'
          src={`/svg/parasite-single-chart/grid-line.svg`}
        />
        <ChartImageWrapper>
          <LineChartImage
            loader={loaderProp}
            status={inputs.inputs.status}
            width={286}
            height={195}
            alt={inputs.inputs.status === 'down' ? 'line-chart' : 'line-chart-up'}
            src={
              inputs.inputs.status === 'down'
                ? `/svg/parasite-single-chart/line-chart.svg`
                : `/svg/parasite-single-chart/line-chart-up.svg`
            }
          />
          <>
            <Tooltip
              text={inputs.inputs.tooltipCurrent}
              borderColor={'#f2efee'}
              extraStyles={{
                backgroundColor: '#f2efee',
                color: '#252d48',
                top: '-31px',
                width: '36px',
                fontSize: '10px',
                fontWeight: 'normal',
                height: '28px',
                [inputs.inputs.status === 'down' ? 'left' : 'right']: 'calc(100% - 17.3rem)',
              }}
              delay={1000}
              isLast={false}
            />
            <Tooltip
              text={inputs.inputs.tooltipGoal}
              borderColor={'#f2efee'}
              extraStyles={{
                backgroundColor: '#f2efee',
                color: '#252d48',
                fontSize: '10px',
                fontWeight: 'normal',
                width: '52px',
                height: '40px',
                top: 'calc(100% - 185px)',
                [inputs.inputs.status === 'down' ? 'left' : 'right']: 'calc(100% - 3.7rem)',
              }}
              delay={1000}
              isLast={false}
            />
          </>
        </ChartImageWrapper>
        <AnimationOverlay className='singleChartAnimation' />
        <WeekLabels className='gridLineFade'>
          {inputs.inputs.weekNames.map((week, index) => (
            <p key={index}>{week}</p>
          ))}
        </WeekLabels>
      </ChartWrapper>
    </Container>
  )
}

export default ParasitSingleChart

/**
 * styled-component
 * _______________________________________________________________________________
 */
const Container = styled.div`
  width: 100%;
  margin-top: 2rem;
`

const ChartWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const GridLineImage = styled(Image)`
  min-width: 343px;
  opacity: 0;
`

const ChartImageWrapper = styled.div`
  min-width: 300px;
  position: absolute;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
`

const LineChartImage = styled(Image)<{ status: 'up' | 'down' }>`
  aspect-ratio: 1;
  transform: ${({ status }) => (status === 'down' ? 'scale(0.95)' : 'scale(0.9)')};
`

const AnimationOverlay = styled.div`
  position: absolute;
  width: 100%;
  top: 1.25rem;
  right: 0;
  // transform: translateX(50%);
  height: 195px;
  background-color: white;
  z-index: 50;
`

const WeekLabels = styled.div`
  position: absolute;
  bottom: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 245px;
  font-size: 0.75rem;
  color: #4a5056;
  opacity: 0;
  flex-direction: row-reverse;
`
