'use client';

import { thisLanguage } from '@/constants/projects';
import { AppFlex, Button } from '@/primitives';
import Typography from '@/primitives/typography/Typography';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const language = thisLanguage;
  return (
    <AppFlex
      direction='column'
      align='center'
      justify='center'
      gap={'20px'}
      style={{ margin: 'auto', height: '100vh', paddingInline: '16px' }}
    >
      <Typography>
        {language === 'en'
          ? 'Unfortunately, a problem occurred. Please try again'
          : language === 'it'
          ? 'Purtroppo si è verificato un problema. Riprova'
          : 'متاسفانه مشکلی پیش آمده لطفا دوباره امتحان نمایید'}
      </Typography>
      <Button variant='question' onClick={() => reset()}>
        {language === 'en' ? 'Try again' : language === 'it' ? 'Riprova' : 'دوباره امتحان کنید'}
      </Button>
    </AppFlex>
  );
}
