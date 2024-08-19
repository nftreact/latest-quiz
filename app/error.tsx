'use client';

import { AppFlex, Button } from '@/primitives';
import Typography from '@/primitives/typography/Typography';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <AppFlex
      direction='column'
      align='center'
      justify='center'
      gap={'20px'}
      style={{ margin: 'auto', height: '100vh', paddingInline: '16px' }}
    >
      <Typography>
       متاسفانه مشکلی پیش آمده لطفا دوباره امتحان نمایید
        </Typography>
      <Button variant='question' onClick={() => reset()}>
       دوباره امتحان کنید
      </Button>
    </AppFlex>
  );
}
