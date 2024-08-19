'use client';

import { AppFlex, Typography } from '@/primitives';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  content: {
    title: string;
    questions: {
      answer: string;
      question: string;
    }[];
  };
};

const PeopleOftenAsk = ({ content }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { questions, title } = content;

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
    <AppFlex gap='20px' direction='column' align='center' >
      <Typography textalign='center' variant='h2' fontWeight={600} color='#252D48'>
        {title}
      </Typography>
      <AppFlex
        gap='25px'
        direction='column'
        style={{ border: '1px solid #D6D7DB', borderRadius: '8px', padding: '10px 16px' }}
      >
        {questions.map((item) => {
          return (
            <AppFlex direction='column' gap='5px' key={item.answer}>
              <AppFlex gap='7px'>
                <AppFlex style={{ paddingTop: '5px' }}>
                  <BsFillQuestionCircleFill style={{ scale: 1.2 }} fill='#3AD7AB' />
                </AppFlex>
                <Typography fontSize={18} fontWeight={600}>
                  {item.question}
                </Typography>
              </AppFlex>
              <Typography fontSize={16} style={{ color: '#767A86' ,paddingInline:"20px" }}>
                {item.answer}
              </Typography>
            </AppFlex>
          );
        })}
      </AppFlex>
    </AppFlex>
  );
};

export default PeopleOftenAsk;

/**
 * styled-component
 * _______________________________________________________________________________
 */
