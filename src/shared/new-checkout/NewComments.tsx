'use client';

import { CommentsItem } from '@/types/checkout';

import styled from 'styled-components';
import { AppFlex, Typography } from '@/primitives';
import NewCommentCard from './NewCommentCard';

/**
 * props
 * _______________________________________________________________________________
 */

export interface CommentsProps {
  comments: CommentsItem[];
  sectionTitle: string;
}

const NewComments = ({ comments, sectionTitle }: CommentsProps) => {
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
    <Root
      style={{ padding: '24px', maxWidth: '1200px', margin: 'auto' }}
      direction='column'
      align='center'
      gap={'40px'}
    >
      <Typography className='title' tag='h1' fontWeight={800}>
        {sectionTitle}
      </Typography>
      <LayoutCard>
        {comments?.map((item, index) => {
          return (
            <NewCommentCard
              key={index}
              profileName={item.profileName}
              profileImage={item.profileImage}
              date={item.date}
              title={item.title}
              text={item.text}
              image={item.image}
              rate={item.rate}
              voice={item?.voice}
            />
          );
        })}
      </LayoutCard>
    </Root>
  );
};

export default NewComments;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(AppFlex)`
  .title {
    font-size: 24px;

    @media (min-width: 600px) {
      font-size: 32px !important;
    }
  }
`;

const LayoutCard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(1, 1fr));
  /* overflow: scroll; */
  gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
