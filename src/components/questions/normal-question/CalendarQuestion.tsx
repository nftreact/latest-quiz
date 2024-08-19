'use client';

import type { Value } from 'react-multi-date-picker';
import { DateObject } from 'react-multi-date-picker';
import { useEffect, useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import { THISPROJECT } from '@/constants/projects';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import persian from 'react-date-object/calendars/persian';
import gregorian from 'react-date-object/calendars/gregorian';
import styled from 'styled-components';
import { Button, Typography } from '@/primitives';
import { Answer } from '@/types/questions';
import { useQuestionContext } from '@/providers';
import { Encode, getCookies } from '@/utils/insdex';
// import { convertToLatinDigits } from '@/utils/question/convertToLatinDigits';

export const convertToLatinDigits = (persianDateStr: string): string => {
  const latinDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const latinDateStr = persianDateStr
    .split('')
    .map((digit) => (latinDigits.indexOf(digit) !== -1 ? String(latinDigits.indexOf(digit)) : digit))
    .join('');

  return latinDateStr;
};
/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  error: string;
  answer: Answer;
};

const CalendarQuestion = ({ error, answer }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const today = new Date();
  const { dispatch } = useQuestionContext();
  const thisCalendar = THISPROJECT.DEFAULT_LOCALE === 'fa_IR' ? persian : gregorian;
  const thisLocale = THISPROJECT.DEFAULT_LOCALE === 'fa_IR' ? persian_fa : gregorian_en;
  const [value, setValue] = useState<Value>(new DateObject({ calendar: thisCalendar, locale: thisLocale }));
  const [calendarError, setCalendarError] = useState(error ?? '');
  const { type } = getCookies();

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    if (error) setCalendarError(error);
  }, [error]);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const handleclick = () => {
    const newDate = value?.toLocaleString();

    dispatch({
      type: 'UPDATE_QUESTIONS',
      payload: {
        aid: answer.aid,
        type: type,
        calendar: Encode(String(convertToLatinDigits(String(newDate)))),
      },
    });
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <>
      <Root>
        <Typography variant='subtitle2' textcolor=''>
          {calendarError}
        </Typography>
        <Calendar
          currentDate={today.toLocaleDateString('en') as any}
          minDate={today}
          calendar={thisCalendar}
          locale={thisLocale}
          value={value}
          onChange={(dateObject: DateObject | DateObject[] | any) => {
            setCalendarError('');
            setValue(dateObject.format());
          }}
        />
      </Root>
      <Button variant='question' onClick={handleclick} position='fixed'>
        <Typography fontWeight={700}>{answer.text}</Typography>
      </Button>
    </>
  );
};

export default CalendarQuestion;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section`
  display: flex;
  align-items: center;
  gap: 20;
  flex-direction: column;
`;
