'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaQuestion } from 'react-icons/fa6';
import ArrowDownsvg from './ArrowDownSvg';
import styled from 'styled-components';
import Typography from '../typography/Typography';
import { AppFlex } from '..';

/**
 * props
 * _______________________________________________________________________________
 */

type AccordionProps = {
  title: string;
  content: string;
};

const Accordion = ({ title, content }: AccordionProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [isOpen, setIsOpen] = useState(false);
  const [childClientHeight, setChildClientHeight] = useState();
  const [rootClientHeight, setRootClientHeight] = useState<number>();
  const contentRef = useRef<any>();
  const contentRefWrapper = useRef<any>();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  /**
   * useEffect
   * _______________________________________________________________________________
   */
  useEffect(() => {
    if (contentRef.current) {
      if (contentRef && contentRef?.current && contentRefWrapper && contentRefWrapper?.current) {
        const height = contentRefWrapper.current.clientHeight - contentRef.current.clientHeight - 2;
        setChildClientHeight(contentRefWrapper.current.clientHeight);
        setRootClientHeight(height);
      }
    }
  }, []);

  

  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

  const iconStyle = {
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
    transition: 'transform 0.3s ease',
  };

  return (
    <>
      <Container
        ref={contentRefWrapper}
        childClientHeight={childClientHeight}
        rootClientHeight={rootClientHeight}
      >
        <AppFlex
          align='center'
          justify='space-between'
          style={{ padding: '20px', cursor: 'pointer' }}
          onClick={toggleAccordion}
        >
          <AppFlex align='center' gap={'15px'} style={{ paddingInline: '15px' }}>
            <AppFlex>
              <ArrowDownsvg style={iconStyle} />
            </AppFlex>
            <Typography fontSize={16}>{title}</Typography>
          </AppFlex>
          <AppFlex
            justify='center'
            align='center'
            style={{ borderRadius: '50%', backgroundColor: '#E76D85', padding: '3px' }}
          >
            <FaQuestion fill='#fff' />
          </AppFlex>
        </AppFlex>
        {isOpen && <Divier />}
        {isOpen && (
          <AppFlex ref={contentRef}>
            <div style={{ height: '2px', backgroundColor: '#fff', opacity: '10%' }} />
            <Typography
              variant='body2'
              fontSize={14}
              textcolor='#93989D'
              style={{ padding: '20px', lineHeight: '35px' }}
            >
              {content}
            </Typography>
          </AppFlex>
        )}
      </Container>
    </>
  );
};

export default Accordion;

/**
 * styled-component
 * _______________________________________________________________________________
 */
const Container = styled.div<{
  rootClientHeight: number | undefined;
  childClientHeight: undefined;
}>`
  overflow: hidden;
  transition: height 0.5s ease, opacity 1s ease;
  border-radius: 10px;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  appearance: none;

  svg {
    scale: 0.9;
  }
`;

const Divier = styled.div`
  width: 100%;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.15);
  opacity: 70%;
  height: 1px;
`;
