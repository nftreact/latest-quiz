'use client';

import { AppFlex, Typography } from '@/primitives';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  footer?: string | any;
  content: {
    heroText: string;
    image: string;
    callToAction: {
      message: string;
    };
  };
};

const Guarantee = ({ content, footer }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { callToAction, heroText, image } = content;

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  const constants = [
    {
      text: 'Privacy Policy',
      link: 'https://matchafit.world/rules/privacy.php?language=it',
    },
    {
      text: 'Terms of Use',
      link: 'https://matchafit.world/rules/terms.php?language=it',
    },
    {
      text: 'Refund Policy',
      link: 'https://matchafit.world/rules/refund.php?language=it',
    },
    {
      text: 'FAQ',
      link: 'https://matchafit.world/rules/faq.php?language=it',
    },
  ];

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <AppFlex style={{ backgroundColor: '#F9F9FA' }} id='Guarantee'>
      <Container direction='column' align='center'>
        <Image src={image} width={180} height={170} alt='' />
        <Typography textalign='center' fontWeight={700} variant='h3' fontSize={28}>
          {heroText}
        </Typography>
        <div
          dangerouslySetInnerHTML={{ __html: callToAction.message }}
          style={{ color: '#767A86', fontSize: '16px' }}
        />
        <div style={{ marginTop: '20px', fontSize: '11px', color: '#767A86', lineHeight: 'normal' }}>
          <div dangerouslySetInnerHTML={{ __html: footer?.footer?.description }} />
        </div>
        {/* <AppFlex align='center' gap='3px' style={{ marginTop: '20px' }}>
          {constants.map((item, index, array) => {
            return (
              <Link href={item.link} key={index}>
                <AppFlex>
                  <Typography className='text' style={{ color: '#767A86' }}>
                    {item.text}
                  </Typography>
                  <Typography fontSize={12} style={{ color: '#767A86', display: index === 3 ? 'none' : 'flex' }}>
                    {','}
                  </Typography>
                </AppFlex>
              </Link>
            );
          })}
        </AppFlex> */}
      </Container>
    </AppFlex>
  );
};

export default Guarantee;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Container = styled(AppFlex)`
  max-width: 450px;
  margin: auto;
  text-align: center;
  line-height: 1.5;
  padding: 30px 16px;

  .text {
    font-size: 12px;

    @media (min-width: 400px) {
      font-size: 14px;
    }
  }
`;
