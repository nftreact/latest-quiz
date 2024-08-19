export const validatePhoneInput = (thisValue: string) => {
  if (!thisValue) return true;
  const validChars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '۰',
    '۱',
    '۲',
    '۳',
    '۴',
    '۵',
    '۶',
    '۷',
    '۸',
    '۹',
  ];
  return validChars.some((item) => item === thisValue.slice(thisValue.length - 1, thisValue.length));
};
