'use client';

import { AppFlex, Typography } from '@/primitives';
import { colors } from '@/theme';
import { PlanItem } from '@/types/checkout';
import { forwardRef } from 'react';
import { css, styled } from 'styled-components';

/**
 * props
 * _______________________________________________________________________________
 */
interface PlansVerticalListItemProps {
  thisPlan: PlanItem;
  index: string;
  discounted: boolean;
  selectedPlan: string;
}

type props = PlansVerticalListItemProps & React.HTMLAttributes<HTMLElement>;

const VerticalListItem = forwardRef(({ discounted, index, thisPlan, selectedPlan, ...rest }: props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  const isSelected = selectedPlan === index;

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
    <Root isselected={String(isSelected)} featured={thisPlan.featured} {...rest}>
      {/* /** * Flag * _______________________________________________________________________________ */}
      {thisPlan?.featured === 'true' && (
        <Flag
          justify='center'
          style={{
            backgroundColor: isSelected ? '#4ed09a' : '#8490a1',
          }}
        >
          <Typography variant='subtitle1' tag='p' textcolor={colors.white} fontWeight={600}>
            {thisPlan?.featuredTitle}
          </Typography>
        </Flag>
      )}
      <CardContainer justify='space-between'>
        {/* /** * TitleCard * _______________________________________________________________________________ */}
        <TitleCard direction='column' gap='5px'>
          <Typography
            tag='p'
            fontSize={17}
            textcolor={isSelected ? '#000' : '#8490a1'}
            style={{
              fontWeight: '600',
              lineHeight: '22px',
            }}
          >
            {thisPlan.title}
          </Typography>
          <Typography
            tag='p'
            fontSize={12}
            textcolor={isSelected ? '#000' : '#8490a1'}
            style={{
              fontWeight: '600',
              lineHeight: '22px',
            }}
          >
            {thisPlan.description}
          </Typography>
        </TitleCard>

        {/* /** * PriceCard * _______________________________________________________________________________ */}
        <PriceCard gap={'8px'} align='center' justify='flex-end'>
          <div>
            <Typography
              textcolor={discounted && isSelected ? colors.secondary : '#8490a1'}
              fontWeight={600}
              fontSize={18}
              tag='p'
              style={{
                display: discounted ? 'block' : 'none',
              }}
            >
              {thisPlan?.price?.discounted}
            </Typography>
            <Typography
              tag='p'
              fontSize={16}
              textcolor='#8490a1'
              style={{
                textDecoration: discounted ? 'line-through' : 'none',
              }}
            >
              {thisPlan?.price?.regular}
            </Typography>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              tag='p'
              fontSize={14}
              fontWeight={discounted ? '600' : '400'}
              textcolor={discounted && isSelected ? 'red' : '#8490a1'}
            >
              {thisPlan?.price?.preUnit}
            </Typography>
            <Typography
              tag='p'
              fontSize={14}
              fontWeight={discounted ? '600' : '400'}
              textcolor={discounted && isSelected ? colors.secondary : '#8490a1'}
            >
              {thisPlan?.price?.unit}
            </Typography>
          </div>
        </PriceCard>

        {/* /** * svg-icon * _______________________________________________________________________________ */}
        <AppFlex align='center'>
          <AppFlex
            justify='center'
            align='center'
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              border: `3px solid ${isSelected ? colors.secondary : '#d1d5db'}`,
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: `${isSelected ? colors.secondary : '#fff'}`,
              }}
            />
          </AppFlex>
        </AppFlex>
      </CardContainer>
    </Root>
  );
});

export default VerticalListItem;

VerticalListItem.displayName = 'VerticalListItem';

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.div<{ isselected: boolean | string; featured: string }>`
  background-color: ${({ isselected }) => (isselected === 'true' ? 'white' : '#f7f7f8')};
  width: 100%;

  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;

  ${({ isselected }) =>
    isselected === 'true' &&
    css`
      box-shadow: 0 2px 6px rgb(22 42 65 / 10%), 0 12px 24px rgb(103 125 150 / 10%);
      border: ${`1px solid ${colors.secondary}`};
      color: '#8490a1';
    `}
`;

const Flag = styled(AppFlex)`
  padding: 4px 24px;
  position: relative;
`;

const CardContainer = styled(AppFlex)`
  padding: 16px;
`;

const TitleCard = styled(AppFlex)`
  width: 55%;
  align-items: flex-start !important;
  justify-content: center;
`;

const PriceCard = styled(AppFlex)`
  width: 20%;
  justify-content: center;
`;
