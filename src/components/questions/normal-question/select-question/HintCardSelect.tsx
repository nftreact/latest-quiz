'use client';

import styled from 'styled-components';
import Text from '../../parasite-question/Text';
import { AppFlex } from '@/primitives';

/**
 * props
 * _______________________________________________________________________________
 */

const HintCardSelect = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root justify='center' gap={"10px"}>
      <div>🙌</div>
      <AppFlex direction='column' gap={"3px"}>
        {title && <Text inputs={{ text: title }} variant='h4' component='p' textColor={'#757575'} fontSize={16} />}
        <Text inputs={{ text: description }} variant='subtitle2' component='p' textColor={'#757575'} fontSize={12} />
      </AppFlex>
    </Root>
  );
};

export default HintCardSelect;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(AppFlex)`
  background-color: rgba(247, 247, 248, 0.5);
  border-radius: 12px;
  padding: 10px 16px;
  border: 1px solid rgb(234, 238, 242);
  z-index: 10;
`;
