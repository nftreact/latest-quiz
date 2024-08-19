export const convertToLatinDigits = (persianDateStr: string): string => {
  const latinDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const latinDateStr = persianDateStr
    .split('')
    .map((digit) => (latinDigits.indexOf(digit) !== -1 ? String(latinDigits.indexOf(digit)) : digit))
    .join('');

  return latinDateStr;
};
