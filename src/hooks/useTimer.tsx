'use clinet';

import { useEffect, useState } from 'react';
import useCountDownTimer from './useCountDownTimer';

type props = {
  discount: string;
};

export const useTimer = ({ discount }: props) => {
  const [time, setTime] = useState<any>();
  const [, { start, render, isStarted, reset, pause }] = useCountDownTimer(Number(time), 1000, 'minutes');

  useEffect(() => {
    setTime(
      localStorage.getItem('timer') && localStorage.getItem('timer') !== '0' ? localStorage.getItem('timer') : '60000',
    );
    const MillisecondsTime = timeToMilliseconds(render(time));
    localStorage.setItem('timer', String(MillisecondsTime));
  }, [isStarted, render, time]);

  useEffect(() => {
    if (discount === 'true') {
      start();
    }
  }, []);

  return { time };
};

// timeToMilliseconds ____________________________________________________________________________________________
function timeToMilliseconds(timeString: string) {
  // Check if timeString is undefined, empty, or consists of only whitespace
  if (typeof timeString !== 'string' || timeString.trim() === '') {
    return 0;
  }

  // Split the time string into hours and minutes
  const [hours, minutes] = timeString.split(':').map(Number);

  // Convert hours and minutes to milliseconds
  const hoursInMs = hours * 60 * 60 * 1000;
  const minutesInMs = minutes * 60 * 1000;

  // Calculate total milliseconds
  const totalMilliseconds = hoursInMs + minutesInMs;

  return totalMilliseconds;
}
