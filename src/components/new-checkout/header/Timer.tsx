'use client';

import { useCountDownTimer } from '@/hooks';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DecodeBase64, Encode } from '@/utils/insdex';
import { useSearchParams } from 'next/navigation';

function timeToMilliseconds(timeString: string) {
  if (typeof timeString !== 'string' || timeString.trim() === '') {
    return;
  } else {
    const [minutes, seconds] = timeString.split(':').map(Number);

    const minutesInMs = minutes * 60 * 1000;
    const secondsInMs = seconds * 1000;

    const totalMilliseconds = minutesInMs + secondsInMs;

    return totalMilliseconds;
  }
}

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  discount: string;
};

const Timer = ({ discount }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { replace } = useRouter();
  const [time, setTime] = useState<any>();
  const initialTime = localStorage.getItem('timer') ? localStorage.getItem('timer') : '600000';
  const [, { start, render, isStarted }] = useCountDownTimer(Number(initialTime), 1000, 'minutes');
  const searchParams = useSearchParams();
  const falseEncode = Encode('false');
  const discountDecode = DecodeBase64(discount);
  // dHJ1ZQ==

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    const localInitialTime = localStorage.getItem('timer');

    if (Boolean(localInitialTime) === false) {
      const localStorageTime = timeToMilliseconds('10:00');
      localStorage.setItem('timer', String(localStorageTime));
      setTime(localStorageTime);
    } else if (Boolean(initialTime) === true) {
      setTime(localInitialTime);
    }
  }, []);

  useEffect(() => {
    if (discountDecode === 'true') {
      const localStorageTime = timeToMilliseconds(String(render(time)));
      localStorage.setItem('timer', String(localStorageTime));
    }
  }, [isStarted, time, render]);

  useEffect(() => {
    if (discountDecode === 'true' && time !== undefined) {
      start();
    }
  }, [time]);

  if (render(time) === '00:00') {
    localStorage.setItem('discount', 'used');
    const params = new URLSearchParams(searchParams.toString());
    params.set('discount', `${falseEncode}`);
    params.set('offer', `${falseEncode}`);
    replace(`?${params.toString()}`);
  }

  useEffect(() => {
    if (discountDecode === 'false') {
      localStorage.removeItem('timer');
    }
  }, [discount]);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <section>
      <p style={{ color: '#454E57', fontSize: '25px', fontWeight: 700 }}> {render(time)}</p>
    </section>
  );
};

export default Timer;

/**
 * styled-component
 * _______________________________________________________________________________
 */
