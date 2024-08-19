import { THISPROJECT } from '@/constants/projects';

const Enamad = () => {
  return (
    <section
      style={{ margin: 'auto', width: 'max-content', marginTop: '10px' }}
      dangerouslySetInnerHTML={{ __html: THISPROJECT.ENAMAD ?? '' }}
    />
  );
};

export default Enamad;
