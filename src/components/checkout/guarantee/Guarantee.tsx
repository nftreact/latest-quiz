'use client';

import { AppFlex, Typography } from '@/primitives';
import { colors } from '@/theme';
import { styled } from 'styled-components';
import GuaranteeIcon from '../../../../public/icon/GuaranteeIcon';

/**
 * props
 * _______________________________________________________________________________
 */
export interface GuaranteeProps {
  title: string;
  description: string;
}

const Guarantee = ({ title, description }: GuaranteeProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

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
    <Container>
      <ContentWrapper direction='column' justify='center' gap={'16px'}>
        <Typography style={{ fontSize: '24px', fontWeight: 600, color: '#090A0A' }}>{title}</Typography>
        <Typography style={{ fontSize: '14px', color: '#6C727A' }} dangerouslySetInnerHTML={{ __html: description }} />
      </ContentWrapper>
      <div style={{ position: 'absolute', right: '34px', bottom: '-50px' }}>
        <GuaranteeIcon />
      </div>
    </Container>
  );
};

export default Guarantee;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Container = styled.div`
  min-height: 182px;
  margin: auto;
  padding: 12px;
  box-shadow: 0 2px 6px rgb(22 42 65 / 6%), 0 12px 24px rgb(7 21 37 / 8%);
  border-radius: 12px;
  background-color: white;
  position: relative;
  overflow: visible;
  max-width: 600px;
  margin: auto;
  margin-block: 30px;
`;

const ContentWrapper = styled(AppFlex)`
  border: 2px solid ${colors.secondary};
  min-height: 182px;
  border-radius: 12px;
  padding-inline: 16px;
  padding-top: 24px;
  padding-bottom: 40px;
`;
