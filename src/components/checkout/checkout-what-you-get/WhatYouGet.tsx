'use client';

import { AppFlex, Typography } from '@/primitives';
import { WygItem } from '@/types/checkout';
import { styled } from 'styled-components';
import WygCard from './WygCard';

/**
 * props
 * _______________________________________________________________________________
 */
export interface WygProps {
  wyg: WygItem[];
  sectionTitle: string;
  video?: {
    link: string;
    text: string;
  };
}

const WhatYouGet = ({ sectionTitle, wyg, video }: WygProps) => {
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
    <Container gap={'20px'} direction='column' align='center'>
      <Typography variant='h1' tag='h1'>
        {sectionTitle}
      </Typography>
      {/* {video && <VideoPlayer inputs={video} />} */}
      <AppFlex direction='column' gap={"20px"}>
        {wyg?.map((item, i) => {
          return (
            <WygCard
              key={item.title + item.description}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </AppFlex>
    </Container>
  );
};

export default WhatYouGet;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Container = styled(AppFlex)`
  padding: 24px 16px;
  margin: auto;
  max-width: 600px;
`;
