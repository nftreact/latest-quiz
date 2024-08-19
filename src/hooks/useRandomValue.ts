import { getRandomNumber } from '@/utils/insdex';

export function useRandomValue() {
  const firstStep = getRandomNumber(20, 33);
  const secondStep = getRandomNumber(33, 55);
  const thirdStep = getRandomNumber(70, 100);

  return { firstStep, secondStep, thirdStep };
}

useRandomValue;

export function useRandomValueMultiLoadingProgress() {
  const first = getRandomNumber(5, 20);
  const second = getRandomNumber(20, 35);
  const third = getRandomNumber(35, 70);
  const forth = getRandomNumber(70, 100);

  return { first, second, third, forth };
}
