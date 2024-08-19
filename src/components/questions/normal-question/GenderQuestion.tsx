'use client';

import { useQuestionContext } from '@/providers';
import { Answer } from '@/types/questions';
import { styled } from 'styled-components';
import Image from 'next/image';
import { colors } from '@/theme';
import { Typography } from '@/primitives';
import { getCookies } from '@/utils/insdex';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  answers: Answer[];
};

const GenderQuestion = ({ answers }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { dispatch } = useQuestionContext();
  const { type } = getCookies();

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
    <Root>
      {answers?.map((item, index) => {
        return (
          <ItemContainer
            key={index}
            onClick={() => {
              dispatch({ type: 'UPDATE_QUESTIONS', payload: { aid: item.aid, type: type } });
            }}
          >
            <ContentBorder />
            <Image
              priority
              src={item.image}
              // loading='lazy'
              fill
              alt='gender-image'
              style={{ objectPosition: 'top', objectFit: 'contain' }}
              sizes='(max-width: 768px) 100vw, 33vw'
            />
            <BottomSection>
              <Typography textcolor={colors.white} variant='h4' tag='p'>
                {item.text}
              </Typography>
              <CircleOutlined color='inherit' />
            </BottomSection>
          </ItemContainer>
        );
      })}
    </Root>
  );
};

export default GenderQuestion;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.div`
  gap: 20px;
  justify-content: space-between;
  display: flex;

  @media (min-width: 600px) {
    justify-content: center;
    gap: 40px;
  }
`;

export const ItemContainer = styled.div`
  width: 50%;
  min-width: 130px;
  min-height: 270px;
  max-height: 450px;
  height: 90vw;
  position: relative;
  cursor: pointer;
`;

export const ContentBorder = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  height: 67%;
  bottom: 0;
  border: 2px solid ${colors.secondary};
  border-radius: 8px;
`;

export const BottomSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 47px;
  background-color: ${colors.secondary};
  position: absolute;
  bottom: 0;
  border-radius: 0px 0px 8px 8px;
  padding-inline: 16px;
`;

const CircleOutlined = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 2px solid ${colors.white};

  @media (min-width: 430px) {
    width: 20px;
    height: 20px;
  }
`;
