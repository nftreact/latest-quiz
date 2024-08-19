export const getTextSize = (value: any) => {
  let size: number = 0;

  if (value === 'small') {
    return (size = 22);
  } else if (value === 'normall') {
    return (size = 24);
  } else if (value === 'big') {
    return (size = 30);
  } else if (value === 'bigUltra') {
    return (size = 45);
  } else {
    return (size = 22);
  }
};
