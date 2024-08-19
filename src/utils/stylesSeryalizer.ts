export interface UseStyles {
  textAlign?: string;
  background?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
}

export interface StylesInUseStyles extends UseStyles {
  text?: string;
  textAlign?: string;
  bgColor?: string;
  textColor?: string;
  textSize?: string;
}

export const stylesSeryalizer = (styles: StylesInUseStyles, useFor = ''): UseStyles | void => {
  const obj = {} as UseStyles;

  const allowedStyles = ['bgColor', 'textColor', 'textAlign', 'textSize'];

  Object.entries(styles).forEach(([key, value]) => {
    allowedStyles.forEach((style) => {
      if (key === style && value) {
        key === 'bgColor'
          ? (obj['background'] = value)
          : key === 'textColor'
          ? (obj['color'] = value)
          : key === 'textSize'
          ? (obj['fontSize'] = value)
          : (obj[key as keyof typeof obj] = value);
      }
    });
  });

  if (!obj['textAlign'] && useFor === 'select') {
    obj['textAlign'] = '-webkit-auto';
    obj['fontWeight'] = '600';
  }

  if ((!obj['textAlign'] && useFor === 'parasite') || useFor === 'hint') {
    obj['textAlign'] = '-webkit-auto';
  }

  return Object.entries(obj).length > 0 ? obj : undefined;
};
