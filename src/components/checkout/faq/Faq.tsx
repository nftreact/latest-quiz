'use client';

import { Accordion, AppFlex, Typography } from '@/primitives';
import Image from 'next/image';
import styled from 'styled-components';

/**
 * props
 * _______________________________________________________________________________
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqProps {
  faq: FaqItem[];
  backgroundImage?: {
    left?: string;
    right?: string;
  };
  sectionTitle: string;
}

const Faq = ({ faq, backgroundImage, sectionTitle }: FaqProps) => {
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
    <Container direction='column' justify='center' align='center' gap={'40px'}>
      <Typography variant='h1' tag='h1' style={{ position: 'relative', zIndex: '1' }} fontWeight={600}>
        {sectionTitle}
      </Typography>
      {backgroundImage && (
        <section style={{ position: 'absolute', top: '0', right: '0', width: '100%', zIndex: '0' }}>
          <section>
            <Image
              src={backgroundImage.right ?? ''}
              width={247}
              height={500}
              alt='checkout background'
              style={{ maxWidth: '100%', height: 'auto' }}
              loading='lazy'
            />
          </section>
          <section>
            <Image
              src={backgroundImage.left ?? ''}
              width={247}
              height={500}
              alt='checkout background'
              style={{ marginTop: '100px', maxWidth: '100%', height: 'auto' }}
              loading='lazy'
            />
          </section>
        </section>
      )}
      <AppFlex direction='column' gap={'20px'} style={{ position: 'relative', zIndex: '1' }}>
        {faq?.map((item: any, i) => {
          return <Accordion key={i} title={item.question} content={item.answer} />;
        })}
      </AppFlex>
    </Container>
  );
};

export default Faq;

/**
 * styled-component
 * _______________________________________________________________________________
 */
const Container = styled(AppFlex)`
  position: relative;
  padding-inline: 16px;
  max-width: 600px;
  margin: auto;
`;
