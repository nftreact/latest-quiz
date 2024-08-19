import { ImageLoader } from 'next/image';

export const imageLoader: ImageLoader = ({ src, width, quality = 75 }) => {
  return `${src}?w=${width}&q=${quality}`;
};
