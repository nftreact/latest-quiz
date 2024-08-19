export const Encode = (value: string | undefined): string => {
  if (!value) return '';

  return btoa(encodeURIComponent(value));
};

export const Decode = (encodedValue: string | undefined): string => {
  if (!encodedValue) return '';

  return decodeURIComponent(encodedValue);
};

export const DecodeBase64 = (value: string | undefined) => {
  if (!value) return '';
  return atob(value);
};

export const DecodePertionDate = (encodedValue: string | undefined): string => {
  if (!encodedValue) return '';

  return decodeURIComponent(atob(encodedValue));
};
