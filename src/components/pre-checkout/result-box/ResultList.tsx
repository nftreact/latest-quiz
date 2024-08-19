'use client';

import { thisLocale } from '@/constants/projects';
import { AppFlex, Typography } from '@/primitives';

/**
 * props
 * _______________________________________________________________________________
 */

export interface ResultBoxListItem {
  icon: string;
  title: string;
  description: string;
  descriptionColor: string;
}
export interface ResultListProps {
  list: ResultBoxListItem[];
  showContent: boolean;
}

const ResultList = ({ list, showContent }: ResultListProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const locale = thisLocale;

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
    <AppFlex
      justify='flex-end'
      className={`resultBoxList${showContent ? 'Shown' : ''}`}
      style={{ paddingLeft: '20%', paddingBlock: '10px', zIndex: 10, position: 'relative' }}
    >
      <AppFlex
        direction='column'
        gap={'15px'}
        style={{ marginRight: locale === 'en_US' || locale === 'it_US' ? '40px' : '' }}
      >
        {list?.map((item, i) => {
          return (
            <AppFlex align='flex-start' direction='column' key={item.title + i} gap={'5px'}>
              <Typography
                textcolor='#8490a1'
                fontSize={14}
                fontWeight={600}
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <Typography
                textcolor={item.descriptionColor}
                fontSize={14}
                fontWeight={600}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </AppFlex>
          );
        })}
      </AppFlex>
    </AppFlex>
  );
};

export default ResultList;

/**
 * styled-component
 * _______________________________________________________________________________
 */
