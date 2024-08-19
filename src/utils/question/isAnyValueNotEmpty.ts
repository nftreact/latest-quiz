export const isAnyValueNotEmpty = (obj: { [key: string]: string }): boolean => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'string' && obj[key].trim() !== '') {
        return true;
      }
    }
  }
  return false;
};
