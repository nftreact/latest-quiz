'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {};

const Loading = (props: Props) => {
  return (
    <Root>
      <SkeletonContainer className='styled' />
    </Root>
  );
};

export default Loading;

const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const Root = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  padding-block: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  .styled {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 100%);
    background-size: 200px 100%;
    animation: ${loadingAnimation} 3s infinite linear;
    border-radius: 20px;
    width: 90%;
    max-width: 600px;
  }
`;

const SkeletonContainer = styled.div`
  height: 800px;
`;

const TitleSkeleton = styled.div`
  height: 60px;
`;

const HintSkeleton = styled.div`
  height: 80px;
`;
