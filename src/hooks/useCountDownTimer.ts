import { useState } from 'react';
import useCountDown from 'react-countdown-hook';

interface CountdownActions {
  start(ttc?: number): void;
  pause(): void;
  resume(): void;
  reset(): void;
  render(text: string): string;
  isStarted: boolean;
}

const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Number(((millis % 60000) / 1000).toFixed(0));
  if (minutes < 10) return `0${minutes}` + ':' + (seconds < 10 ? '0' : '') + seconds;
  else return `${minutes}` + ':' + (seconds < 10 ? '0' : '') + seconds;
};

const useCountDownTimer = (
  initialTime: number,
  interval: number,
  format: string,
  onComplated?: (initialTime: number) => void,
): [string, CountdownActions] => {
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, interval);
  const [isStarted, setIsStarting] = useState(false);
  const [isCalled, setIsCalled] = useState(false);

  const render = (text: string) => {
    return isStarted ? formatTime(format, timeLeft) : '';
  };

  if (timeLeft === 0 && !isCalled && isStarted) {
    setIsCalled(true);
    onComplated && onComplated(initialTime);
    setIsStarting(false);
  }

  const onStart = (ttc?: number) => {
    reset();
    start(ttc);
    setIsCalled(false);
    setIsStarting(true);
  };

  return [formatTime(format, timeLeft), { start: onStart, pause, resume, reset, render, isStarted }];
};

const formatTime = (format: string, time: number) => {
  switch (format) {
    default:
      return time.toString();
    case 'minutes':
      return millisToMinutesAndSeconds(time);
  }
};

export default useCountDownTimer;
