export const convertFootToCm = (heightFT: string, heightIN: string) => {
  const heightCm = Math.round(Number(heightFT) * 30.48 + Number(heightIN) * 2.54);

  return heightCm;
};
